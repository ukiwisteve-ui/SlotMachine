# Rift Riches

A Vegas-style 5-reel slot machine game for Android with an original mad-scientist multiverse theme. Coins are play money only and can never be cashed out.

## Layout

- `www/index.html`: the game screen (reels, quips, shop, settings, bonus round)
- `www/engine.js`: reel strips, paylines, payouts and spin maths (no UI, runs in Node too)
- `www/art.js`: original cartoon symbol artwork as inline SVG
- `tools/simulate.js`: Monte Carlo test of the return to player

## Check the maths

```
node tools/simulate.js 10000000
```

Current result: 95.2% return to player (normal spins 50.9%, free spins 20.4%, Orb Lockdown 24.0%). A win about 1 spin in 3.2, free spins about 1 in 148 spins, Orb Lockdown about 1 in 147.

## Status

Prototype 0.2 (step 3 of 4): Orb Lockdown hold-and-spin with Minor, Major, Grand and Jackpot prizes, plus separate looks and music for the garage, free spins and Lockdown. Android packaging with Capacitor comes next.

## Status (1 Nov 2026)

Done in step 3: painted art for every symbol, logo and the three backgrounds; landscape layout with a desktop preview; test buttons for features (Settings); 9 recorded sound effects; character voices generated with Kokoro (`tools/voices.py`, Vex = am_michael, Dex = af_river sped up 7%).

Next:
- Music: three Pixabay tracks (main, free spins, Lockdown) to loop, crossfade and duck under voices.
- Sound effects 10 to 18 still use the synth fallback.
- Optionally move Glorp and The Collector off the rubberband pitch effect (it sounds metallic).
- Step 4: package as an Android app with Capacitor, locked to landscape.
