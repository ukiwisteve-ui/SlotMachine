/* Rift Riches game engine: reel strips, paylines, payouts and spin evaluation.
   Pure logic with no DOM, so the same file runs in the browser and in Node for simulation. */
(function (root) {
  'use strict';

  var SYMBOLS = {
    WILD:  { name: 'Rift',          kind: 'wild' },
    SCAT:  { name: 'Quantum Core',  kind: 'scatter' },
    VEX:   { name: 'Professor Vex', kind: 'high' },
    DEX:   { name: 'Dex',           kind: 'high' },
    GLORP: { name: 'Glorp',         kind: 'high' },
    B12:   { name: 'Unit B-12',     kind: 'high' },
    FIZZ:  { name: 'Agent Fizz',    kind: 'mid' },
    RAY:   { name: 'Ray Gun',       kind: 'low' },
    FLASK: { name: 'Goo Flask',     kind: 'low' },
    ATOM:  { name: 'Atom',          kind: 'low' },
    BATT:  { name: 'Dead Battery',  kind: 'low' },
    ORB:   { name: 'Plasma Orb',    kind: 'orb' }
  };

  // Line pays as multiples of the line bet, for 3, 4 and 5 of a kind.
  var PAYS = {
    WILD:  [50, 200, 1000],
    VEX:   [50, 200, 1000],
    DEX:   [40, 150, 500],
    GLORP: [40, 150, 500],
    B12:   [25, 100, 400],
    FIZZ:  [20, 75, 250],
    RAY:   [15, 50, 150],
    FLASK: [12, 40, 125],
    ATOM:  [12, 40, 125],
    BATT:  [10, 30, 100]
  };
  // Scatter pays as multiples of the total bet, and free spins awarded.
  var SCATTER_PAYS = { 3: 2, 4: 10, 5: 50 };
  var FREE_SPINS = { 3: 10, 4: 15, 5: 25 };

  var FREE_SPIN_MULT = 2;      // every free-spin win pays 2x
  var COLLECTOR_MULT = 3;      // wins through The Collector's wild reel pay 3x instead
  var COLLECTOR_CHANCE = 0.24; // chance per free spin that The Collector appears

  // Symbol counts on each reel strip (reels 1 to 5).
  var COUNTS = {
    VEX:   [2, 2, 2, 2, 2],
    DEX:   [3, 3, 3, 3, 3],
    GLORP: [3, 3, 3, 3, 3],
    B12:   [4, 4, 4, 4, 4],
    FIZZ:  [5, 5, 5, 5, 5],
    RAY:   [6, 6, 6, 6, 6],
    FLASK: [7, 7, 7, 7, 7],
    ATOM:  [7, 7, 7, 7, 7],
    BATT:  [8, 8, 8, 8, 8],
    WILD:  [0, 2, 2, 2, 0],
    SCAT:  [1, 2, 2, 2, 1]
  };

  // Plasma Orbs sit on the strips in stacks of 3 so they can fill whole reels.
  var ORB_STACKS = [1, 1, 1, 1, 1];

  // 20 fixed paylines: row index (0 top, 1 middle, 2 bottom) on each reel.
  var LINES = [
    [1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],
    [0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,0,1],
    [1,2,1,2,1],[0,1,0,1,0],[2,1,2,1,2],[0,1,1,1,0],[2,1,1,1,2],
    [1,1,0,1,1],[1,1,2,1,1],[0,2,0,2,0],[2,0,2,0,2],[0,2,2,2,0]
  ];

  var BET_LEVELS = [1, 2, 5, 10, 25];

  // Small seeded random generator so the reel strips are identical every time.
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  // Build each strip with a fixed shuffle, then nudge it so no symbol
  // sits next to a copy of itself and scatters and wilds are well spread.
  function buildStrips() {
    var strips = [];
    for (var r = 0; r < 5; r++) {
      var rand = mulberry32(1000 + r * 77);
      var strip = [];
      Object.keys(COUNTS).forEach(function (s) {
        for (var i = 0; i < COUNTS[s][r]; i++) strip.push(s);
      });
      for (var i = strip.length - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1));
        var t = strip[i]; strip[i] = strip[j]; strip[j] = t;
      }
      for (var pass = 0; pass < 200; pass++) {
        var fixed = true;
        for (var k = 0; k < strip.length; k++) {
          var a = strip[k], b = strip[(k + 1) % strip.length], c = strip[(k + 2) % strip.length];
          var special = (a === 'SCAT' || a === 'WILD');
          if ((a === b && a !== 'ORB') || (special && (c === 'SCAT' || c === 'WILD'))) {
            var m = Math.floor(rand() * strip.length);
            var tmp = strip[(k + 1) % strip.length];
            strip[(k + 1) % strip.length] = strip[m]; strip[m] = tmp;
            fixed = false;
          }
        }
        if (fixed) break;
      }
      // Insert the orb stacks at evenly spaced points.
      var gap = Math.floor(strip.length / ORB_STACKS[r]);
      for (var q = ORB_STACKS[r] - 1; q >= 0; q--) {
        var at = Math.floor(q * gap + gap / 2);
        strip.splice(at, 0, 'ORB', 'ORB', 'ORB');
      }
      strips.push(strip);
    }
    return strips;
  }

  var STRIPS = buildStrips();

  // Visible 5x3 grid from stop positions: grid[reel][row].
  function gridFromStops(stops) {
    return stops.map(function (p, r) {
      var s = STRIPS[r], n = s.length;
      return [s[p % n], s[(p + 1) % n], s[(p + 2) % n]];
    });
  }

  function randomStops(rand) {
    rand = rand || Math.random;
    return STRIPS.map(function (s) { return Math.floor(rand() * s.length); });
  }

  // Best pay for one line: leftmost run, wild substitutes for everything but the scatter.
  function evalLine(syms) {
    var best = { pay: 0, count: 0, symbol: null };
    var w = 0;
    while (w < 5 && syms[w] === 'WILD') w++;
    if (w >= 3) best = { pay: PAYS.WILD[w - 3], count: w, symbol: 'WILD' };
    var first = null;
    for (var i = 0; i < 5; i++) {
      if (syms[i] === 'SCAT' || syms[i] === 'ORB') break;
      if (syms[i] !== 'WILD') { first = syms[i]; break; }
    }
    if (first) {
      var n = 0;
      while (n < 5 && (syms[n] === first || syms[n] === 'WILD')) n++;
      if (n >= 3 && PAYS[first][n - 3] > best.pay) best = { pay: PAYS[first][n - 3], count: n, symbol: first };
    }
    return best;
  }

  /* Evaluate a spin.
     opts.lineBet, opts.free (bool), opts.collectorReel (index or -1) */
  function evaluate(grid, opts) {
    var lineBet = opts.lineBet, totalBet = lineBet * LINES.length;
    var g = grid;
    var cr = (opts.free && opts.collectorReel >= 0) ? opts.collectorReel : -1;
    if (cr >= 0) {
      g = grid.map(function (col, r) { return r === cr ? ['WILD', 'WILD', 'WILD'] : col; });
    }
    var wins = [], total = 0;
    LINES.forEach(function (line, li) {
      var syms = line.map(function (row, r) { return g[r][row]; });
      var res = evalLine(syms);
      if (res.pay > 0) {
        var mult = 1;
        if (opts.free) mult = (cr >= 0 && cr < res.count) ? COLLECTOR_MULT : FREE_SPIN_MULT;
        var amount = res.pay * lineBet * mult;
        total += amount;
        wins.push({ line: li, symbol: res.symbol, count: res.count, amount: amount, mult: mult });
      }
    });
    var scatterCells = [];
    g.forEach(function (col, r) { col.forEach(function (s, row) { if (s === 'SCAT') scatterCells.push([r, row]); }); });
    var sc = Math.min(scatterCells.length, 5);
    var freeSpins = 0, scatterWin = 0;
    if (sc >= 3) {
      scatterWin = SCATTER_PAYS[sc] * totalBet * (opts.free ? FREE_SPIN_MULT : 1);
      freeSpins = FREE_SPINS[sc];
      total += scatterWin;
    }
    return { grid: g, wins: wins, scatterCells: sc >= 3 ? scatterCells : [], scatterWin: scatterWin,
             freeSpins: freeSpins, total: total, totalBet: totalBet, collectorReel: cr };
  }


  /* ---------- Orb Lockdown (hold and spin) ----------
     6 or more Plasma Orbs on a base spin lock in place and the player gets 3 respins.
     Every new orb that lands locks too and resets the respins to 3.
     Each orb carries a prize: a multiple of the total bet, or a Minor, Major or Grand jackpot.
     Filling all 15 spaces also wins the Jackpot. */
  var ORB_TRIGGER = 6;
  var ORB_RESPINS = 3;
  var ORB_LAND_CHANCE = 0.045;   // chance per empty space per respin that an orb lands
  var JACKPOTS = { MINOR: 25, MAJOR: 100, GRAND: 500, JACKPOT: 2000 }; // multiples of total bet
  var ORB_VALUES = [            // [prize, weight]
    [1, 300], [2, 250], [3, 160], [5, 100], [10, 40], ['MINOR', 15], ['MAJOR', 4], ['GRAND', 1]
  ];
  var ORB_WEIGHT = ORB_VALUES.reduce(function (a, v) { return a + v[1]; }, 0);
  function orbValue(rand) {
    var x = (rand || Math.random)() * ORB_WEIGHT;
    for (var i = 0; i < ORB_VALUES.length; i++) { x -= ORB_VALUES[i][1]; if (x < 0) return ORB_VALUES[i][0]; }
    return 1;
  }
  function orbMultiple(v) { return typeof v === 'number' ? v : JACKPOTS[v]; }

  // Plays a whole lockdown round. cells: 15 entries (index reel*3+row), null or a prize.
  // Returns every respin step so the screen can replay it, plus the total in multiples of total bet.
  function playLockdown(cells, rand) {
    rand = rand || Math.random;
    cells = cells.slice();
    var respins = ORB_RESPINS, steps = [];
    while (respins > 0 && cells.some(function (c) { return c === null; })) {
      var landed = [];
      for (var i = 0; i < 15; i++) {
        if (cells[i] === null && rand() < ORB_LAND_CHANCE) { cells[i] = orbValue(rand); landed.push(i); }
      }
      respins = landed.length ? ORB_RESPINS : respins - 1;
      steps.push({ landed: landed, cells: cells.slice(), respins: respins });
    }
    var full = cells.every(function (c) { return c !== null; });
    var total = cells.reduce(function (a, c) { return a + (c === null ? 0 : orbMultiple(c)); }, 0);
    if (full) total += JACKPOTS.JACKPOT;
    return { steps: steps, cells: cells, full: full, totalMultiple: total };
  }

  // One complete spin, including deciding whether The Collector appears.
  function spin(opts, rand) {
    rand = rand || Math.random;
    var stops = randomStops(rand);
    var grid = gridFromStops(stops);
    var cr = -1;
    if (opts.free && rand() < COLLECTOR_CHANCE) cr = 1 + Math.floor(rand() * 3);
    var res = evaluate(grid, { lineBet: opts.lineBet, free: opts.free, collectorReel: cr });
    res.stops = stops;
    res.rawGrid = grid;
    // Give every orb on screen a prize; 6 or more in the base game start Orb Lockdown.
    res.orbs = [];
    var orbCount = 0;
    for (var r = 0; r < 5; r++) for (var row = 0; row < 3; row++) {
      var v = grid[r][row] === 'ORB' ? orbValue(rand) : null;
      if (v !== null) orbCount++;
      res.orbs.push(v);
    }
    res.lockdown = !opts.free && orbCount >= ORB_TRIGGER;
    return res;
  }

  var api = {
    SYMBOLS: SYMBOLS, PAYS: PAYS, SCATTER_PAYS: SCATTER_PAYS, FREE_SPINS: FREE_SPINS,
    FREE_SPIN_MULT: FREE_SPIN_MULT, COLLECTOR_MULT: COLLECTOR_MULT, COLLECTOR_CHANCE: COLLECTOR_CHANCE,
    LINES: LINES, STRIPS: STRIPS, BET_LEVELS: BET_LEVELS,
    gridFromStops: gridFromStops, randomStops: randomStops, evaluate: evaluate, evalLine: evalLine,
    spin: spin, mulberry32: mulberry32,
    ORB_TRIGGER: ORB_TRIGGER, ORB_RESPINS: ORB_RESPINS, JACKPOTS: JACKPOTS, ORB_VALUES: ORB_VALUES,
    orbValue: orbValue, orbMultiple: orbMultiple, playLockdown: playLockdown
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.RiftEngine = api;
})(this);
