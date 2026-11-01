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

Current result: 94.85% return to player, a win about 1 spin in 2.7, the free-spins bonus about 1 in 125 spins.

## Status

Prototype 0.1 (step 2 of 4). Art polish, sound polish and Android packaging with Capacitor come next.
