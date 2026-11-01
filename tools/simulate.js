// Monte Carlo test of the Rift Riches maths. Usage: node tools/simulate.js [spins]
const E = require('../www/engine.js');
const N = parseInt(process.argv[2] || '2000000', 10);
const rand = E.mulberry32(12345);
let lockPaid = 0, locks = 0, fulls = 0, jp = { MINOR: 0, MAJOR: 0, GRAND: 0 };
let bet = 0, paid = 0, basePaid = 0, freePaid = 0, hits = 0, triggers = 0, freeSpinsPlayed = 0, big = 0;
for (let i = 0; i < N; i++) {
  const r = E.spin({ lineBet: 1, free: false }, rand);
  bet += r.totalBet; paid += r.total; basePaid += r.total;
  if (r.total > 0) hits++;
  let fs = r.freeSpins, round = r.total;
  if (fs) triggers++;
  if (r.lockdown) {
    locks++;
    const L = E.playLockdown(r.orbs, rand);
    const w = L.totalMultiple * r.totalBet;
    paid += w; lockPaid += w; round += w;
    if (L.full) fulls++;
    L.cells.forEach(c => { if (jp[c] !== undefined) jp[c]++; });
  }
  while (fs > 0) {
    fs--; freeSpinsPlayed++;
    const f = E.spin({ lineBet: 1, free: true }, rand);
    paid += f.total; freePaid += f.total; round += f.total; fs += f.freeSpins;
  }
  if (round >= 15 * r.totalBet) big++;
}
const pct = x => (100 * x).toFixed(2) + '%';
console.log(`spins ${N}`);
console.log(`return to player ${pct(paid / bet)} (base game ${pct(basePaid / bet)}, free spins ${pct(freePaid / bet)})`);
console.log(`hit rate 1 in ${(N / hits).toFixed(2)}, bonus 1 in ${(N / triggers).toFixed(0)}, avg free spins per bonus ${(freeSpinsPlayed / triggers).toFixed(1)}`);
console.log(`orb lockdown ${pct(lockPaid / bet)}, 1 in ${(N / locks).toFixed(0)}; jackpot (full screen) 1 in ${(N / Math.max(fulls,1)).toFixed(0)}; minor 1 in ${(N/jp.MINOR).toFixed(0)}, major 1 in ${(N/jp.MAJOR).toFixed(0)}, grand 1 in ${(N/Math.max(jp.GRAND,1)).toFixed(0)}`);
console.log(`big win (15x+) 1 in ${(N / big).toFixed(0)}`);
console.log('strip lengths', E.STRIPS.map(s => s.length).join(','));
