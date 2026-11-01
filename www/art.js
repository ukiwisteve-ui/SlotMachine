/* Rift Riches artwork: original cartoon symbols drawn as inline SVG (viewBox 0 0 100 100).
   Shared gradients live once in RiftArt.DEFS, which the page mounts in a hidden <svg> so every symbol can use them. */
(function (root) {
  'use strict';
  var K = '#1b0d2e'; // outline ink
  var s = 'stroke="' + K + '" stroke-width="2.6" stroke-linejoin="round"';
  function svg(body) { return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + body + '</svg>'; }
  function lin(id, stops, x2, y2) {
    return '<linearGradient id="' + id + '" x1="0" y1="0" x2="' + (x2 === undefined ? 0 : x2) + '" y2="' + (y2 === undefined ? 1 : y2) + '">' +
      stops.map(function (st) { return '<stop offset="' + st[0] + '" stop-color="' + st[1] + '"' + (st[2] !== undefined ? ' stop-opacity="' + st[2] + '"' : '') + '/>'; }).join('') + '</linearGradient>';
  }
  function rad(id, stops, cx, cy, r) {
    return '<radialGradient id="' + id + '" cx="' + (cx || .5) + '" cy="' + (cy || .5) + '" r="' + (r || .5) + '">' +
      stops.map(function (st) { return '<stop offset="' + st[0] + '" stop-color="' + st[1] + '"' + (st[2] !== undefined ? ' stop-opacity="' + st[2] + '"' : '') + '/>'; }).join('') + '</radialGradient>';
  }

  var DEFS =
    lin('rrGold', [[0, '#fff7c9'], [.3, '#ffd54a'], [.55, '#b97a00'], [.75, '#ffe27a'], [1, '#7a4c00']]) +
    lin('rrGoldH', [[0, '#7a4c00'], [.25, '#ffe27a'], [.5, '#fff7c9'], [.75, '#ffd54a'], [1, '#7a4c00']], 1, 0) +
    lin('rrChrome', [[0, '#ffffff'], [.45, '#b8c2d6'], [.55, '#5d6880'], [1, '#e6ebf5']]) +
    lin('rrShine', [[0, '#ffffff', .75], [1, '#ffffff', 0]]) +
    rad('rrBgVex', [[0, '#c99bff'], [.65, '#6a2fc4'], [1, '#2d0f63']], .5, .35, .7) +
    rad('rrBgDex', [[0, '#ffd28a'], [.65, '#e07a12'], [1, '#7a3300']], .5, .35, .7) +
    rad('rrBgGlorp', [[0, '#d2ffb8'], [.6, '#3fae1e'], [1, '#0f4a08']], .5, .35, .7) +
    rad('rrBgB12', [[0, '#b8e6ff'], [.6, '#2f78c4'], [1, '#0c2a5c']], .5, .35, .7) +
    rad('rrBgFizz', [[0, '#b0fff2'], [.6, '#1aa898'], [1, '#063f3a']], .5, .35, .7) +
    rad('rrSkin', [[0, '#ffe6cc'], [.7, '#f2bf8f'], [1, '#d99a66']], .45, .35, .65) +
    rad('rrGoo', [[0, '#e2ffd0'], [.45, '#8dff5a'], [1, '#2f9a12']], .38, .3, .75) +
    lin('rrCoat', [[0, '#9b6cf0'], [1, '#4b1f9e']]) +
    lin('rrHoodie', [[0, '#ffd966'], [1, '#e09a10']]) +
    lin('rrSuit', [[0, '#46507a'], [1, '#1d2238']]) +
    lin('rrSteel', [[0, '#eef2fa'], [.5, '#b9c3d6'], [1, '#7d889e']]) +
    lin('rrInsect', [[0, '#7affea'], [1, '#1f9e8f']]) +
    lin('rrHair', [[0, '#ffffff'], [1, '#c9d4ee']]) +
    lin('rrBrown', [[0, '#9a6234'], [1, '#5a3315']]) +
    lin('rrMagenta', [[0, '#ff8fca'], [.5, '#ff3d9a'], [1, '#a3115a']]) +
    lin('rrPurple', [[0, '#a77bff'], [1, '#4b1f9e']]) +
    lin('rrGlass', [[0, '#ffffff', .85], [1, '#cfe6ff', .55]], 1, 0) +
    lin('rrBatt', [[0, '#5a4380'], [1, '#2a1a45']]) +
    rad('rrNucleus', [[0, '#fff3b0'], [.6, '#ffcc33'], [1, '#c98a00']], .4, .35, .7) +
    rad('rrOrb', [[0, '#f0fdff'], [.3, '#7fe0ff'], [.7, '#2b5cff'], [1, '#101a5c']], .38, .32, .75) +
    rad('rrCore', [[0, '#fff0f8'], [.35, '#ff7ac0'], [.8, '#c2126a'], [1, '#5a0632']], .5, .45, .6) +
    rad('rrPortal', [[0, '#eaffdd'], [.25, '#8dff5a'], [.6, '#147a3a'], [1, '#04140a']], .5, .5, .55) +
    rad('rrGlowG', [[0, '#c4ffa8', .9], [1, '#7cff4f', 0]]) +
    rad('rrGlowP', [[0, '#ffc2e2', .9], [1, '#ff3d9a', 0]]) +
    rad('rrGlowB', [[0, '#c8f2ff', .9], [1, '#3ad7ff', 0]]) +
    rad('rrGlowY', [[0, '#fff3b0', .9], [1, '#ffcc33', 0]]) +
    rad('rrSquid', [[0, '#d7a6ff'], [.7, '#8a3fd6'], [1, '#4a1580']], .45, .35, .7) +
    '<clipPath id="rrClip"><circle cx="50" cy="50" r="41"/></clipPath>';

  // Gold-rimmed medallion used by the five character symbols.
  function medal(bg, inner) {
    return svg(
      '<circle cx="50" cy="51.5" r="48" fill="#000" opacity=".35"/>' +
      '<circle cx="50" cy="50" r="47.5" fill="url(#rrGold)" stroke="' + K + '" stroke-width="1.6"/>' +
      '<circle cx="50" cy="50" r="42.5" fill="url(#rrGoldH)" opacity=".9"/>' +
      '<circle cx="50" cy="50" r="41" fill="url(#' + bg + ')"/>' +
      '<g opacity=".18" stroke="#fff" stroke-width="5">' +
        '<path d="M50 50 L50 6 M50 50 L84 18 M50 50 L94 50 M50 50 L16 18 M50 50 L6 50"/></g>' +
      '<g clip-path="url(#rrClip)">' + inner + '</g>' +
      '<circle cx="50" cy="50" r="41" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="2.5"/>' +
      '<path d="M17 36 A35 35 0 0 1 83 36 Q50 26 17 36Z" fill="url(#rrShine)" opacity=".55"/>'
    );
  }

  var VEX_INNER =
    '<path d="M12 104 Q14 76 50 72 Q86 76 88 104Z" fill="url(#rrCoat)" ' + s + '/>' +
    '<path d="M50 74 L40 104 M50 74 L60 104" stroke="#2d0f63" stroke-width="2" opacity=".5"/>' +
    '<path d="M38 73 L50 88 L62 73" fill="#f1ecff" ' + s + '/>' +
    '<circle cx="70" cy="92" r="4.2" fill="#7CFF4F"/><circle cx="71" cy="91" r="1.4" fill="#fff" opacity=".8"/><circle cx="27" cy="96" r="2.6" fill="#7CFF4F"/>' +
    '<path d="M29 36 L22 9 L36 21 L40 1 L50 18 L60 1 L64 21 L78 9 L71 36Z" fill="url(#rrHair)" ' + s + '/>' +
    '<path d="M36 21 L40 8 M60 8 L64 21" stroke="#9aa6c8" stroke-width="1.5" fill="none"/>' +
    '<ellipse cx="50" cy="48" rx="21" ry="25" fill="url(#rrSkin)" ' + s + '/>' +
    '<ellipse cx="29" cy="50" rx="3.5" ry="6" fill="url(#rrSkin)" ' + s + '/><ellipse cx="71" cy="50" rx="3.5" ry="6" fill="url(#rrSkin)" ' + s + '/>' +
    '<path d="M33 60 Q50 76 67 60 Q60 72 50 73 Q40 72 33 60Z" fill="#c98a5a" opacity=".35"/>' +
    '<rect x="28" y="27" width="44" height="6" rx="2" fill="#3a2a4f"/>' +
    '<circle cx="40" cy="30" r="7.5" fill="url(#rrChrome)" ' + s + '/><circle cx="40" cy="30" r="5" fill="#7fe8ff"/>' +
    '<circle cx="60" cy="30" r="7.5" fill="url(#rrChrome)" ' + s + '/><circle cx="60" cy="30" r="5" fill="#7fe8ff"/>' +
    '<path d="M38 27.5 L41 26.5 M58 27.5 L61 26.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>' +
    '<path d="M57.5 26 L61 30 L58.5 33.5" stroke="' + K + '" stroke-width="1.2" fill="none"/>' +
    '<path d="M35 41 L46 44 M65 41 L54 44" stroke="' + K + '" stroke-width="3.6" stroke-linecap="round"/>' +
    '<ellipse cx="42" cy="48.5" rx="4" ry="3.6" fill="#fff" stroke="' + K + '" stroke-width="1.5"/><ellipse cx="58" cy="48.5" rx="4" ry="3.6" fill="#fff" stroke="' + K + '" stroke-width="1.5"/>' +
    '<circle cx="42.5" cy="49" r="2" fill="' + K + '"/><circle cx="57.5" cy="49" r="2" fill="' + K + '"/>' +
    '<circle cx="43.2" cy="48.2" r=".7" fill="#fff"/><circle cx="58.2" cy="48.2" r=".7" fill="#fff"/>' +
    '<path d="M37.5 53 Q42 55.5 46.5 53 M53.5 53 Q58 55.5 62.5 53" stroke="#a8764f" stroke-width="1.5" fill="none"/>' +
    '<path d="M48 50 Q46 57 50 58 Q53 58 52 56" stroke="#b5835a" stroke-width="1.8" fill="none"/>' +
    '<path d="M40 63 Q50 59.5 61 62.5" stroke="' + K + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<path d="M60 62 L63 60" stroke="' + K + '" stroke-width="2" stroke-linecap="round"/>' +
    '<ellipse cx="41" cy="38" rx="9" ry="4" fill="#fff" opacity=".18"/>';

  var DEX_INNER =
    '<path d="M10 104 Q12 72 50 68 Q88 72 90 104Z" fill="url(#rrHoodie)" ' + s + '/>' +
    '<path d="M30 74 Q50 90 70 74" fill="none" stroke="#b87400" stroke-width="2.4"/>' +
    '<path d="M44 76 L42.5 94 M56 76 L57.5 94" stroke="' + K + '" stroke-width="2.2"/><circle cx="42.5" cy="95" r="2" fill="#fff" ' + s + '/><circle cx="57.5" cy="95" r="2" fill="#fff" ' + s + '/>' +
    '<ellipse cx="50" cy="46" rx="20.5" ry="22.5" fill="url(#rrSkin)" ' + s + '/>' +
    '<ellipse cx="30" cy="48" rx="3.2" ry="5.5" fill="url(#rrSkin)" ' + s + '/><ellipse cx="70" cy="48" rx="3.2" ry="5.5" fill="url(#rrSkin)" ' + s + '/>' +
    '<path d="M28.5 42 Q27 17 50 17 Q73 17 71.5 42 Q67 30 61 34 Q57 25 50 32 Q43 25 39 34 Q33 30 28.5 42Z" fill="url(#rrBrown)" ' + s + '/>' +
    '<path d="M40 22 Q46 19 52 21" stroke="#c99062" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '<path d="M35.5 37.5 L46 35 M64.5 37.5 L54 35" stroke="' + K + '" stroke-width="2.6" stroke-linecap="round"/>' +
    '<circle cx="42" cy="45.5" r="7" fill="#fff" stroke="' + K + '" stroke-width="2.2"/><circle cx="58" cy="45.5" r="7" fill="#fff" stroke="' + K + '" stroke-width="2.2"/>' +
    '<circle cx="42.5" cy="46" r="2.3" fill="#4a2a10"/><circle cx="57.5" cy="46" r="2.3" fill="#4a2a10"/>' +
    '<circle cx="43.3" cy="45.2" r=".8" fill="#fff"/><circle cx="58.3" cy="45.2" r=".8" fill="#fff"/>' +
    '<ellipse cx="35" cy="54" rx="4" ry="2.2" fill="#ff8a8a" opacity=".45"/><ellipse cx="65" cy="54" rx="4" ry="2.2" fill="#ff8a8a" opacity=".45"/>' +
    '<rect x="41.5" y="55" width="17" height="8" rx="3.5" fill="#fff" stroke="' + K + '" stroke-width="2.2"/>' +
    '<path d="M42 59 H58 M46 55.5 V62.5 M50 55.5 V62.5 M54 55.5 V62.5" stroke="#9aa3b5" stroke-width="1.3"/>' +
    '<path d="M74 26 Q79 36 74 40 Q69 36 74 26Z" fill="#7fd8ff" stroke="' + K + '" stroke-width="1.5"/><ellipse cx="72.6" cy="34" rx="1" ry="2" fill="#fff"/>';

  var GLORP_INNER =
    '<ellipse cx="50" cy="94" rx="40" ry="10" fill="#000" opacity=".25"/>' +
    '<path d="M20 66 Q9 62 6 52 M80 64 Q91 60 94 50" stroke="' + K + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<path d="M20 66 Q9 62 6 52 M80 64 Q91 60 94 50" stroke="#6fe63f" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M17 92 Q10 60 25 38 Q38 14 54 18 Q80 20 83 48 Q91 74 83 92 Q75 99 67 92 Q59 99 50 92 Q41 99 33 92 Q24 99 17 92Z" fill="url(#rrGoo)" ' + s + '/>' +
    '<path d="M28 44 Q34 28 46 24" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".5"/>' +
    '<circle cx="70" cy="80" r="3.4" fill="#e2ffd0" opacity=".8"/><circle cx="27" cy="77" r="2.2" fill="#e2ffd0" opacity=".8"/><circle cx="62" cy="30" r="1.8" fill="#e2ffd0" opacity=".8"/>' +
    '<circle cx="52" cy="49" r="16" fill="#fff" ' + s + '/><circle cx="55" cy="51" r="8.5" fill="#3a1d7a"/><circle cx="55" cy="51" r="4.5" fill="#12052b"/>' +
    '<circle cx="58" cy="47.5" r="2.8" fill="#fff"/><circle cx="52.5" cy="54.5" r="1.2" fill="#fff"/>' +
    '<path d="M36 36 Q44 30 52 32" stroke="' + K + '" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
    '<path d="M40 72 Q52 84 64 72Z" fill="#3a1d7a" ' + s + '/><path d="M45 75 Q52 80 59 75" fill="#ff7aa8"/>' +
    '<path d="M48 72 L49.5 76 L51 72" fill="#fff"/>';

  var B12_INNER =
    '<path d="M24 104 V78 Q24 71 31 71 H69 Q76 71 76 78 V104Z" fill="url(#rrSteel)" ' + s + '/>' +
    '<circle cx="40" cy="90" r="3" fill="#7d889e"/><circle cx="60" cy="90" r="3" fill="#7d889e"/>' +
    '<path d="M37 70 L50 77 L63 70 L63 84 L50 77 L37 84Z" fill="url(#rrMagenta)" ' + s + '/><circle cx="50" cy="77" r="3.4" fill="#ff3d9a" ' + s + '/>' +
    '<path d="M50 10 V22" stroke="' + K + '" stroke-width="3"/><circle cx="50" cy="9" r="5" fill="url(#rrMagenta)" ' + s + '/><circle cx="48.5" cy="7.5" r="1.4" fill="#fff"/>' +
    '<rect x="20" y="21" width="60" height="47" rx="9" fill="url(#rrSteel)" ' + s + '/>' +
    '<rect x="23" y="24" width="54" height="6" rx="3" fill="#fff" opacity=".55"/>' +
    '<circle cx="25.5" cy="63" r="1.6" fill="#7d889e"/><circle cx="74.5" cy="63" r="1.6" fill="#7d889e"/><circle cx="25.5" cy="33" r="1.6" fill="#7d889e"/><circle cx="74.5" cy="33" r="1.6" fill="#7d889e"/>' +
    '<rect x="29" y="34" width="42" height="16" rx="8" fill="' + K + '"/>' +
    '<circle cx="50" cy="42" r="11" fill="#ff3b3b" opacity=".25"/><circle cx="50" cy="42" r="6" fill="#ff3b3b"/><circle cx="50" cy="42" r="2.6" fill="#ffd0d0"/>' +
    '<path d="M33 37 L39 37" stroke="#fff" stroke-width="1.5" opacity=".5" stroke-linecap="round"/>' +
    '<rect x="35" y="54" width="30" height="9" rx="2.5" fill="#5d6880" stroke="' + K + '" stroke-width="2"/>' +
    '<path d="M41 54 V63 M47 54 V63 M53 54 V63 M59 54 V63" stroke="#2a3245" stroke-width="1.6"/>' +
    '<path d="M64 46 Q68 44 70 47" stroke="' + K + '" stroke-width="2" fill="none"/>';

  var FIZZ_INNER =
    '<path d="M12 104 Q14 76 50 71 Q86 76 88 104Z" fill="url(#rrSuit)" ' + s + '/>' +
    '<path d="M42 72 L50 104 L58 72Z" fill="#fff"/><path d="M47.5 75 L50 96 L52.5 75 L50 72Z" fill="url(#rrMagenta)"/>' +
    '<path d="M42 72 L36 86 L46 80Z M58 72 L64 86 L54 80Z" fill="#2d3550" ' + s + '/>' +
    '<path d="M41 22 Q34 8 24 6 M59 22 Q66 8 76 6" stroke="' + K + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
    '<circle cx="24" cy="6" r="4.2" fill="url(#rrInsect)" stroke="' + K + '" stroke-width="2"/><circle cx="76" cy="6" r="4.2" fill="url(#rrInsect)" stroke="' + K + '" stroke-width="2"/>' +
    '<path d="M29 41 Q29 17 50 17 Q71 17 71 41 Q71 63 50 71 Q29 63 29 41Z" fill="url(#rrInsect)" ' + s + '/>' +
    '<path d="M36 26 Q44 20 54 21" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".45"/>' +
    '<path d="M28 36 H72 L70 47 Q62 55 53.5 45 H46.5 Q38 55 30 47Z" fill="#0d0d14" stroke="' + K + '" stroke-width="2"/>' +
    '<path d="M33 39 L41 39 M58 39 L64 39" stroke="#fff" opacity=".7" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M31 44 Q36 50 42 47" stroke="#6b7cff" stroke-width="1.4" fill="none" opacity=".7"/>' +
    '<path d="M43 59 L50 64 L57 59" stroke="' + K + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
    '<path d="M46 62 L45 66 M54 62 L55 66" stroke="' + K + '" stroke-width="2" stroke-linecap="round"/>' +
    '<rect x="64" y="74" width="22" height="27" rx="2.5" fill="#c8915a" stroke="' + K + '" stroke-width="2.4"/>' +
    '<rect x="68" y="79" width="14" height="18" fill="#fff"/><path d="M70 84 H80 M70 88 H78 M70 92 H80" stroke="#9aa3b5" stroke-width="1.4"/>' +
    '<rect x="71" y="71" width="8" height="5" rx="1" fill="url(#rrChrome)" stroke="' + K + '" stroke-width="2"/>';

  var ART = {
    VEX: medal('rrBgVex', VEX_INNER),
    DEX: medal('rrBgDex', DEX_INNER),
    GLORP: medal('rrBgGlorp', GLORP_INNER),
    B12: medal('rrBgB12', B12_INNER),
    FIZZ: medal('rrBgFizz', FIZZ_INNER),

    RAY: svg(
      '<circle cx="50" cy="50" r="44" fill="url(#rrGlowP)" opacity=".55"/>' +
      '<circle cx="88" cy="46" r="10" fill="url(#rrGlowG)"/><circle cx="88" cy="46" r="4" fill="#eaffdd"/>' +
      '<path d="M33 33 L40 19 H50 L48 33" fill="url(#rrGold)" ' + s + '/>' +
      '<path d="M36 59 L28 84 Q28 89 33 89 H42 Q47 89 48 84 L51 59Z" fill="url(#rrPurple)" ' + s + '/>' +
      '<path d="M34 64 L30 80" stroke="#c9b0ff" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M16 46 Q16 31 32 31 H64 L75 38 V54 L64 61 H32 Q16 61 16 46Z" fill="url(#rrMagenta)" ' + s + '/>' +
      '<path d="M22 40 Q24 35 32 35 H62" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".6"/>' +
      '<rect x="74" y="39.5" width="8" height="13" rx="1.5" fill="url(#rrGold)" stroke="' + K + '" stroke-width="2.2"/>' +
      '<circle cx="36" cy="46" r="6.5" fill="url(#rrOrb)" stroke="' + K + '" stroke-width="2.2"/>' +
      '<path d="M50 40 H64 M50 46 H67 M50 52 H64" stroke="#7a0a40" stroke-width="2.2" stroke-linecap="round"/>'
    ),
    FLASK: svg(
      '<circle cx="50" cy="60" r="42" fill="url(#rrGlowG)" opacity=".55"/>' +
      '<path d="M42 14 V40 L20 80 Q18 90 28 90 H72 Q82 90 80 80 L58 40 V14Z" fill="url(#rrGlass)"/>' +
      '<path d="M30 62 Q40 57 50 62 Q60 67 70 62 L78 80 Q80 88 72 88 H28 Q20 88 22 80Z" fill="url(#rrGoo)"/>' +
      '<circle cx="42" cy="76" r="3.6" fill="#f0ffe6" opacity=".85"/><circle cx="57" cy="70" r="2.4" fill="#f0ffe6" opacity=".85"/><circle cx="51" cy="51" r="2.8" fill="#8dff5a"/><circle cx="47" cy="41" r="2" fill="#8dff5a"/><circle cx="53" cy="32" r="1.4" fill="#8dff5a"/>' +
      '<path d="M45 18 V42 L27 76" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".75"/>' +
      '<path d="M42 14 V40 L20 80 Q18 90 28 90 H72 Q82 90 80 80 L58 40 V14" fill="none" ' + s + '/>' +
      '<rect x="36" y="8" width="28" height="8" rx="4" fill="url(#rrChrome)" ' + s + '/>'
    ),
    ATOM: svg(
      '<circle cx="50" cy="50" r="44" fill="url(#rrGlowB)" opacity=".6"/>' +
      '<g fill="none" stroke="' + K + '" stroke-width="8"><ellipse cx="50" cy="50" rx="38" ry="13"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(120 50 50)"/></g>' +
      '<g fill="none" stroke="#7fe0ff" stroke-width="4.5"><ellipse cx="50" cy="50" rx="38" ry="13"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(120 50 50)"/></g>' +
      '<g fill="none" stroke="#e6fbff" stroke-width="1.5" opacity=".8"><ellipse cx="50" cy="49" rx="37" ry="11.5"/></g>' +
      '<circle cx="88" cy="50" r="5" fill="url(#rrMagenta)" stroke="' + K + '" stroke-width="2"/><circle cx="31" cy="17" r="5" fill="url(#rrMagenta)" stroke="' + K + '" stroke-width="2"/><circle cx="31" cy="83" r="5" fill="url(#rrMagenta)" stroke="' + K + '" stroke-width="2"/>' +
      '<circle cx="50" cy="50" r="15" fill="url(#rrGlowY)"/><circle cx="50" cy="50" r="10.5" fill="url(#rrNucleus)" ' + s + '/><circle cx="47" cy="47" r="3" fill="#fff" opacity=".8"/>'
    ),
    BATT: svg(
      '<circle cx="50" cy="52" r="42" fill="url(#rrGlowP)" opacity=".35"/>' +
      '<path d="M60 24 Q55 18 61 13 Q66 8 61 3" stroke="#c9d1e0" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>' +
      '<rect x="16" y="30" width="60" height="44" rx="7" fill="url(#rrBatt)" ' + s + '/>' +
      '<rect x="76" y="43" width="9" height="18" rx="2.5" fill="url(#rrChrome)" ' + s + '/>' +
      '<rect x="21" y="35" width="13" height="34" rx="2.5" fill="#ff3b3b"/><rect x="21" y="35" width="13" height="8" rx="2.5" fill="#ff9a9a" opacity=".7"/>' +
      '<path d="M20 34 H72" stroke="#fff" stroke-width="2.5" opacity=".3" stroke-linecap="round"/>' +
      '<path d="M54 30 L49 46 L58 52 L52 74" stroke="' + K + '" stroke-width="3" fill="none"/>' +
      '<path d="M41 48 H47 M44 45 V51 M63 48 H70" stroke="#e6ebf5" stroke-width="2.6" stroke-linecap="round"/>'
    ),
    WILD: svg(
      '<circle cx="50" cy="44" r="46" fill="url(#rrGlowG)" opacity=".7"/>' +
      '<circle cx="50" cy="42" r="37" fill="url(#rrPortal)" stroke="url(#rrGold)" stroke-width="4"/>' +
      '<path d="M50 42 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16 a21 21 0 1 1 -21 -21" stroke="#eaffdd" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>' +
      '<path d="M50 42 m0 -6 a6 6 0 1 1 -6 6 a10 10 0 1 1 10 10 a14 14 0 1 1 -14 -14 a19 19 0 1 1 19 19" stroke="#8dff5a" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M15 72 L22 62 H78 L85 72 L78 96 H22Z" fill="url(#rrMagenta)" stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M22 64 H78" stroke="#ffc2e2" stroke-width="2"/>' +
      '<text x="50" y="90" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="22" fill="url(#rrGold)" stroke="' + K + '" stroke-width="1.4" paint-order="stroke">WILD</text>'
    ),
    SCAT: svg(
      '<circle cx="50" cy="46" r="46" fill="url(#rrGlowP)" opacity=".8"/>' +
      '<polygon points="50,5 86,26 86,66 50,87 14,66 14,26" fill="url(#rrGold)" stroke="' + K + '" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<polygon points="50,12 80,30 80,62 50,80 20,62 20,30" fill="#2a0f3d"/>' +
      '<circle cx="50" cy="46" r="22" fill="url(#rrCore)"/><circle cx="50" cy="46" r="9" fill="#fff" opacity=".85"/>' +
      '<path d="M30 24 L37 34 L31 36 L39 46 M70 24 L63 34 L69 36 L61 46 M32 68 L40 60 M68 68 L60 60" stroke="#ffe27a" stroke-width="2.4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M24 32 L50 17 L76 32" stroke="#fff" stroke-width="2.5" fill="none" opacity=".35"/>' +
      '<rect x="12" y="73" width="76" height="23" rx="7" fill="url(#rrGold)" stroke="' + K + '" stroke-width="2.4"/>' +
      '<text x="50" y="90.5" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="15" fill="#3a1600">BONUS</text>'
    ),
    ORB: svg(
      '<circle cx="50" cy="46" r="46" fill="url(#rrGlowB)" opacity=".8"/>' +
      '<circle cx="50" cy="46" r="35" fill="url(#rrOrb)" stroke="' + K + '" stroke-width="2.4"/>' +
      '<path d="M44 20 L54 38 L43 43 L58 71" stroke="#fff" stroke-width="4.5" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M44 20 L54 38 L43 43 L58 71" stroke="#ff7ac0" stroke-width="1.8" fill="none" stroke-linejoin="round"/>' +
      '<path d="M27 52 Q34 46 30 38 M70 34 Q64 42 72 50" stroke="#c8f2ff" stroke-width="1.6" fill="none" opacity=".8"/>' +
      '<ellipse cx="37" cy="29" rx="10" ry="6" fill="#fff" opacity=".65" transform="rotate(-30 37 29)"/>' +
      '<circle cx="50" cy="46" r="35" fill="none" stroke="url(#rrGold)" stroke-width="2" opacity=".8"/>'
    ),
    COLLECTOR: svg(
      '<path d="M22 94 Q12 72 28 64 M38 99 Q32 78 42 70 M62 99 Q68 78 58 70 M78 94 Q88 72 72 64" stroke="' + K + '" stroke-width="12" fill="none" stroke-linecap="round"/>' +
      '<path d="M22 94 Q12 72 28 64 M38 99 Q32 78 42 70 M62 99 Q68 78 58 70 M78 94 Q88 72 72 64" stroke="#9b4fe0" stroke-width="8" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="50" cy="56" rx="30" ry="22" fill="url(#rrSquid)" ' + s + '/>' +
      '<path d="M30 50 Q36 40 48 38" stroke="#fff" stroke-width="3" fill="none" opacity=".4" stroke-linecap="round"/>' +
      '<rect x="34" y="7" width="32" height="27" rx="2" fill="#15101f" stroke="' + K + '" stroke-width="2"/><rect x="34" y="25" width="32" height="5" fill="url(#rrMagenta)"/>' +
      '<rect x="37" y="9" width="5" height="16" fill="#fff" opacity=".15"/>' +
      '<rect x="23" y="32" width="54" height="7" rx="3.5" fill="#15101f" stroke="' + K + '" stroke-width="2"/>' +
      '<g fill="url(#rrNucleus)" stroke="' + K + '" stroke-width="1"><circle cx="36" cy="53" r="4"/><circle cx="46" cy="47" r="3"/><circle cx="56" cy="51" r="3.5"/><circle cx="66" cy="56" r="3"/><circle cx="42" cy="62" r="2.5"/><circle cx="58" cy="63" r="2.5"/></g>' +
      '<circle cx="56" cy="51" r="7.5" fill="none" stroke="url(#rrGold)" stroke-width="2.2"/><path d="M63 54 Q68 63 64 71" stroke="url(#rrGold)" stroke-width="1.5" fill="none"/>'
    )
  };
  ART.DEFS = DEFS;
  root.RiftArt = ART;
})(this);

/* Plasma Orb symbol and the three background scenes (garage, rift dimension, containment lab). */
(function (root) {
  'use strict';
  var K = '#1b0d2e';


  function stars(n, seed, w, h) {
    var out = '', x = seed;
    function r() { x = (x * 9301 + 49297) % 233280; return x / 233280; }
    for (var i = 0; i < n; i++) out += '<circle cx="' + (r() * w).toFixed(1) + '" cy="' + (r() * h).toFixed(1) + '" r="' + (0.6 + r() * 1.4).toFixed(1) + '" fill="#fff" opacity="' + (0.3 + r() * 0.6).toFixed(2) + '"/>';
    return out;
  }
  var open = '<svg viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';

  var garage = open +
    '<defs><linearGradient id="scG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1645"/><stop offset="1" stop-color="#120722"/></linearGradient>' +
    '<pattern id="scPeg" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.6" fill="#ffffff16"/></pattern></defs>' +
    '<rect width="400" height="800" fill="url(#scG)"/><rect width="400" height="620" fill="url(#scPeg)"/>' +
    // left shelf with glowing jars
    '<rect x="-10" y="190" width="110" height="8" fill="#4a2f6b"/>' +
    '<rect x="8" y="160" width="18" height="30" rx="3" fill="#7cff4f" opacity=".55"/><rect x="34" y="150" width="22" height="40" rx="3" fill="#ff3d9a" opacity=".45"/><rect x="64" y="166" width="16" height="24" rx="3" fill="#3ad7ff" opacity=".5"/>' +
    '<circle cx="17" cy="175" r="22" fill="#7cff4f" opacity=".08"/><circle cx="45" cy="170" r="26" fill="#ff3d9a" opacity=".07"/>' +
    // right shelf
    '<rect x="300" y="340" width="120" height="8" fill="#4a2f6b"/>' +
    '<rect x="312" y="304" width="24" height="36" rx="4" fill="#7cff4f" opacity=".5"/><rect x="344" y="316" width="16" height="24" rx="3" fill="#ffcc33" opacity=".45"/><rect x="368" y="296" width="20" height="44" rx="3" fill="#3ad7ff" opacity=".45"/>' +
    '<circle cx="324" cy="322" r="28" fill="#7cff4f" opacity=".07"/>' +
    // hanging tools
    '<path d="M330 90 l0 40 m-8 0 h16 l-3 30 h-10z" stroke="#ffffff22" stroke-width="4" fill="none"/>' +
    '<path d="M40 420 q10 -20 20 0 l-4 70 h-12z" fill="#ffffff12"/>' +
    // hanging bulb
    '<path d="M70 0 V58" stroke="#ffffff30" stroke-width="2"/><circle cx="70" cy="66" r="9" fill="#ffe9a8"/><circle cx="70" cy="66" r="40" fill="#ffcc33" opacity=".08"/>' +
    // workbench and goo puddle
    '<rect x="0" y="640" width="400" height="160" fill="#1a0d2b"/><rect x="0" y="634" width="400" height="10" fill="#4a2f6b"/>' +
    '<ellipse cx="300" cy="700" rx="70" ry="12" fill="#7cff4f" opacity=".25"/><ellipse cx="300" cy="700" rx="40" ry="6" fill="#7cff4f" opacity=".35"/>' +
    '</svg>';

  var rift = open +
    '<defs><linearGradient id="scR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#062f3a"/><stop offset=".55" stop-color="#3a0b4a"/><stop offset="1" stop-color="#12051f"/></linearGradient></defs>' +
    '<rect width="400" height="800" fill="url(#scR)"/>' + stars(90, 7, 400, 560) +
    '<g class="swirl">' +
      '<ellipse cx="200" cy="400" rx="260" ry="260" fill="none" stroke="#7cff4f" stroke-width="30" opacity=".05"/>' +
      '<ellipse cx="200" cy="400" rx="190" ry="190" fill="none" stroke="#7cff4f" stroke-width="22" stroke-dasharray="80 40" opacity=".09"/>' +
      '<ellipse cx="200" cy="400" rx="120" ry="120" fill="none" stroke="#c4ffa8" stroke-width="14" stroke-dasharray="50 30" opacity=".12"/>' +
    '</g>' +
    '<circle cx="330" cy="150" r="88" fill="#ff7ad1"/><path d="M246 130 Q330 110 414 140 M248 170 Q330 150 412 178" stroke="#c94aa0" stroke-width="10" fill="none" opacity=".6"/>' +
    '<ellipse cx="330" cy="150" rx="150" ry="26" fill="none" stroke="#ffd36b" stroke-width="6" transform="rotate(-14 330 150)" opacity=".85"/>' +
    '<circle cx="62" cy="96" r="28" fill="#9ff7e8"/><circle cx="54" cy="90" r="6" fill="#6fd8c8"/><circle cx="72" cy="106" r="4" fill="#6fd8c8"/>' +
    '<g class="bob"><rect x="40" y="300" width="26" height="26" fill="#7cff4f" opacity=".7" transform="rotate(20 53 313)"/></g>' +
    '<g class="bob slow"><rect x="340" y="420" width="20" height="20" fill="#3fd0c0" opacity=".7" transform="rotate(-25 350 430)"/></g>' +
    '<g class="bob"><rect x="300" y="560" width="14" height="14" fill="#ffcc33" opacity=".6" transform="rotate(35 307 567)"/></g>' +
    '<path d="M0 690 Q60 650 120 680 T240 670 T400 660 V800 H0Z" fill="#1b0a2e"/>' +
    '<polygon points="30,690 44,610 58,690" fill="#3fd0c0" opacity=".85"/><polygon points="52,690 62,640 72,690" fill="#ff3d9a" opacity=".8"/>' +
    '<polygon points="330,672 346,590 362,672" fill="#ff3d9a" opacity=".8"/><polygon points="356,670 368,620 380,670" fill="#3fd0c0" opacity=".85"/>' +
    '</svg>';

  var lock = open +
    '<defs><pattern id="scGrid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#5fd0ff" stroke-opacity=".08" stroke-width="1"/></pattern>' +
    '<pattern id="scHaz" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="14" height="28" fill="#ffcc33"/><rect x="14" width="14" height="28" fill="#111"/></pattern></defs>' +
    '<rect width="400" height="800" fill="#0a1018"/><rect width="400" height="800" fill="url(#scGrid)"/>' +
    '<rect x="0" y="0" width="400" height="34" fill="url(#scHaz)"/><rect x="0" y="766" width="400" height="34" fill="url(#scHaz)"/>' +
    '<rect x="6" y="34" width="14" height="732" fill="#26313d"/><rect x="380" y="34" width="14" height="732" fill="#26313d"/>' +
    '<rect x="4" y="200" width="18" height="10" fill="#3a4757"/><rect x="4" y="520" width="18" height="10" fill="#3a4757"/><rect x="378" y="300" width="18" height="10" fill="#3a4757"/><rect x="378" y="620" width="18" height="10" fill="#3a4757"/>' +
    '<g class="alarm"><circle cx="40" cy="60" r="70" fill="#ff2a2a" opacity=".22"/><circle cx="40" cy="60" r="12" fill="#ff4d4d"/></g>' +
    '<g class="alarm late"><circle cx="360" cy="60" r="70" fill="#ff2a2a" opacity=".22"/><circle cx="360" cy="60" r="12" fill="#ff4d4d"/></g>' +
    '<text x="200" y="740" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="16" fill="#ffcc33" opacity=".5" letter-spacing="4">CONTAINMENT BREACH</text>' +
    '</svg>';

  root.RiftScenes = { garage: garage, rift: rift, lock: lock };
})(this);
