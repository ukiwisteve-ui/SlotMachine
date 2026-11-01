/* Rift Riches artwork: original cartoon symbols drawn as inline SVG (viewBox 0 0 100 100). */
(function (root) {
  'use strict';
  var K = '#1b0d2e'; // outline ink
  var s = 'stroke="' + K + '" stroke-width="3" stroke-linejoin="round"';
  function svg(body) { return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + body + '</svg>'; }

  var ART = {
    VEX: svg(
      '<path d="M14 100 Q16 74 50 70 Q84 74 86 100Z" fill="#7b4fd6" ' + s + '/>' +
      '<path d="M38 72 L50 86 L62 72" fill="#e8e3f5" ' + s + '/>' +
      '<circle cx="70" cy="90" r="4" fill="#7CFF4F"/><circle cx="25" cy="94" r="2.5" fill="#7CFF4F"/>' +
      '<path d="M30 34 L24 8 L37 21 L41 2 L50 19 L59 2 L63 21 L76 8 L70 34Z" fill="#f4f7ff" ' + s + '/>' +
      '<ellipse cx="50" cy="46" rx="21" ry="25" fill="#f0c9a0" ' + s + '/>' +
      '<rect x="28" y="26" width="44" height="6" fill="#3a2a4f"/>' +
      '<circle cx="40" cy="29" r="7" fill="#8fe8ff" ' + s + '/><circle cx="60" cy="29" r="7" fill="#8fe8ff" ' + s + '/>' +
      '<path d="M57 24 L61 29 L58 33" stroke="' + K + '" stroke-width="1.5" fill="none"/>' +
      '<path d="M35 40 L46 43 M65 40 L54 43" stroke="' + K + '" stroke-width="3.5" stroke-linecap="round"/>' +
      '<circle cx="42" cy="47" r="2.6" fill="' + K + '"/><circle cx="58" cy="47" r="2.6" fill="' + K + '"/>' +
      '<path d="M38 51 Q42 53 46 51 M54 51 Q58 53 62 51" stroke="#b3866a" stroke-width="1.6" fill="none"/>' +
      '<path d="M41 61 Q50 57 60 60" stroke="' + K + '" stroke-width="3" fill="none" stroke-linecap="round"/>'
    ),
    DEX: svg(
      '<path d="M12 100 Q14 70 50 66 Q86 70 88 100Z" fill="#f5c542" ' + s + '/>' +
      '<path d="M44 72 L43 88 M56 72 L57 88" stroke="' + K + '" stroke-width="2.2"/>' +
      '<ellipse cx="50" cy="44" rx="20" ry="22" fill="#f6d2ae" ' + s + '/>' +
      '<path d="M29 40 Q28 17 50 17 Q72 17 71 40 Q66 29 60 33 Q56 25 50 31 Q44 25 40 33 Q34 29 29 40Z" fill="#7a4a24" ' + s + '/>' +
      '<path d="M36 36 L46 33.5 M64 36 L54 33.5" stroke="' + K + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="42" cy="44" r="6.5" fill="#fff" stroke="' + K + '" stroke-width="2.5"/><circle cx="58" cy="44" r="6.5" fill="#fff" stroke="' + K + '" stroke-width="2.5"/>' +
      '<circle cx="42" cy="44" r="1.8" fill="' + K + '"/><circle cx="58" cy="44" r="1.8" fill="' + K + '"/>' +
      '<rect x="42" y="54" width="16" height="7.5" rx="3" fill="#fff" stroke="' + K + '" stroke-width="2.5"/>' +
      '<path d="M42.5 57.8 H57.5" stroke="#9aa3b5" stroke-width="1.6"/>' +
      '<path d="M73 27 Q77.5 36 73 39.5 Q68.5 36 73 27Z" fill="#6fd3ff" stroke="' + K + '" stroke-width="1.6"/>'
    ),
    GLORP: svg(
      '<path d="M20 64 Q10 60 7 51 M81 62 Q91 58 93 49" stroke="' + K + '" stroke-width="3.5" fill="none" stroke-linecap="round"/>' +
      '<path d="M18 88 Q11 60 26 40 Q38 17 54 21 Q79 23 82 50 Q90 74 82 88 Q74 95 66 88 Q58 95 50 88 Q42 95 34 88 Q24 95 18 88Z" fill="#7CFF4F" ' + s + '/>' +
      '<ellipse cx="33" cy="40" rx="4.5" ry="9" fill="#fff" opacity=".55" transform="rotate(25 33 40)"/>' +
      '<circle cx="70" cy="76" r="3" fill="#c4ffa8"/><circle cx="28" cy="74" r="2" fill="#c4ffa8"/>' +
      '<circle cx="52" cy="49" r="15" fill="#fff" ' + s + '/><circle cx="55" cy="51" r="7" fill="#2a1450"/><circle cx="57.5" cy="48" r="2.3" fill="#fff"/>' +
      '<path d="M41 71 Q52 81 63 71Z" fill="#2a1450" ' + s + '/>'
    ),
    B12: svg(
      '<path d="M26 100 V76 Q26 70 32 70 H68 Q74 70 74 76 V100Z" fill="#aeb8cc" ' + s + '/>' +
      '<path d="M38 69 L50 75 L62 69 L62 81 L50 75 L38 81Z" fill="#e0245e" ' + s + '/><circle cx="50" cy="75" r="3.2" fill="#e0245e" ' + s + '/>' +
      '<path d="M50 9 V21" stroke="' + K + '" stroke-width="3"/><circle cx="50" cy="8" r="4.5" fill="#ff3d9a" ' + s + '/>' +
      '<rect x="22" y="20" width="56" height="46" rx="8" fill="#c9d1e0" ' + s + '/>' +
      '<rect x="27" y="25" width="11" height="4" rx="2" fill="#fff" opacity=".8"/>' +
      '<rect x="31" y="33" width="38" height="15" rx="7.5" fill="' + K + '"/>' +
      '<circle cx="50" cy="40.5" r="9" fill="#ff3b3b" opacity=".35"/><circle cx="50" cy="40.5" r="5" fill="#ff3b3b"/>' +
      '<rect x="36" y="52" width="28" height="9" rx="2" fill="#8d97ab" stroke="' + K + '" stroke-width="2.2"/>' +
      '<path d="M42 52 V61 M48 52 V61 M54 52 V61 M60 52 V61" stroke="' + K + '" stroke-width="1.8"/>'
    ),
    FIZZ: svg(
      '<path d="M14 100 Q16 74 50 70 Q84 74 86 100Z" fill="#2d3550" ' + s + '/>' +
      '<path d="M43 72 L50 99 L57 72Z" fill="#fff"/><path d="M48 74 L50 93 L52 74Z" fill="#e0245e"/>' +
      '<path d="M41 22 Q35 9 26 7 M59 22 Q65 9 74 7" stroke="' + K + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<circle cx="26" cy="7" r="3.8" fill="#3fd0c0" stroke="' + K + '" stroke-width="2"/><circle cx="74" cy="7" r="3.8" fill="#3fd0c0" stroke="' + K + '" stroke-width="2"/>' +
      '<path d="M30 40 Q30 18 50 18 Q70 18 70 40 Q70 62 50 70 Q30 62 30 40Z" fill="#3fd0c0" ' + s + '/>' +
      '<path d="M29 35 H71 L69 46 Q61 53 53 44 H47 Q39 53 31 46Z" fill="#111" stroke="' + K + '" stroke-width="2"/>' +
      '<path d="M35 39 L42 39" stroke="#fff" opacity=".65" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M44 58 L50 62.5 L56 58" stroke="' + K + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<rect x="65" y="74" width="21" height="25" rx="2" fill="#c8915a" stroke="' + K + '" stroke-width="2.5"/>' +
      '<rect x="69" y="79" width="13" height="16" fill="#fff"/><path d="M71 84 H80 M71 88 H78" stroke="#9aa3b5" stroke-width="1.5"/>' +
      '<rect x="71.5" y="71" width="8" height="5" rx="1" fill="#9aa3b5" stroke="' + K + '" stroke-width="2"/>'
    ),
    RAY: svg(
      '<circle cx="88" cy="47" r="9" fill="#7CFF4F" opacity=".3"/><circle cx="88" cy="47" r="4.5" fill="#7CFF4F"/>' +
      '<path d="M34 34 L40 22 H49 L47 34" fill="#ffcc33" ' + s + '/>' +
      '<path d="M37 59 L30 82 Q30 87 35 87 H42 Q46 87 47 83 L50 59Z" fill="#7b4fd6" ' + s + '/>' +
      '<path d="M18 46 Q18 33 33 33 H64 L74 39 V55 L64 61 H33 Q18 61 18 46Z" fill="#ff3d9a" ' + s + '/>' +
      '<rect x="74" y="41" width="7" height="12" fill="#ffcc33" stroke="' + K + '" stroke-width="2.5"/>' +
      '<circle cx="38" cy="47" r="5.5" fill="#8fe8ff" stroke="' + K + '" stroke-width="2.5"/>' +
      '<path d="M52 41 H64 M52 47 H66 M52 53 H64" stroke="' + K + '" stroke-width="2" opacity=".55"/>'
    ),
    FLASK: svg(
      '<path d="M43 14 V40 L22 80 Q20 88 28 88 H72 Q80 88 78 80 L57 40 V14Z" fill="#e9f3ff"/>' +
      '<path d="M31 63 Q40 59 50 63 Q60 67 69 63 L76 80 Q78 86 72 86 H28 Q22 86 24 80Z" fill="#7CFF4F"/>' +
      '<circle cx="43" cy="75" r="3.2" fill="#c4ffa8"/><circle cx="57" cy="70" r="2.2" fill="#c4ffa8"/><circle cx="51" cy="52" r="2.6" fill="#7CFF4F"/><circle cx="48" cy="42" r="1.8" fill="#7CFF4F"/>' +
      '<path d="M43 14 V40 L22 80 Q20 88 28 88 H72 Q80 88 78 80 L57 40 V14" fill="none" ' + s + '/>' +
      '<rect x="37" y="9" width="26" height="7" rx="3.5" fill="#c9d1e0" ' + s + '/>'
    ),
    ATOM: svg(
      '<g fill="none" stroke="#8fe8ff" stroke-width="4.5">' +
      '<ellipse cx="50" cy="50" rx="38" ry="13"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="38" ry="13" transform="rotate(120 50 50)"/></g>' +
      '<circle cx="88" cy="50" r="4.5" fill="#ff3d9a" stroke="' + K + '" stroke-width="2"/><circle cx="31" cy="17" r="4.5" fill="#ff3d9a" stroke="' + K + '" stroke-width="2"/><circle cx="31" cy="83" r="4.5" fill="#ff3d9a" stroke="' + K + '" stroke-width="2"/>' +
      '<circle cx="50" cy="50" r="10" fill="#ffcc33" ' + s + '/>'
    ),
    BATT: svg(
      '<path d="M60 25 Q55 19 61 14 Q66 9 61 4" stroke="#9aa3b5" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
      '<rect x="18" y="30" width="58" height="42" rx="6" fill="#3a2a4f" ' + s + '/>' +
      '<rect x="76" y="43" width="8" height="16" rx="2" fill="#9aa3b5" ' + s + '/>' +
      '<rect x="23" y="35" width="12" height="32" rx="2" fill="#ff3b3b"/>' +
      '<path d="M54 30 L49 45 L58 51 L52 72" stroke="' + K + '" stroke-width="3" fill="none"/>' +
      '<path d="M41 47 H47 M44 44 V50 M62 47 H69" stroke="#c9d1e0" stroke-width="2.4" stroke-linecap="round"/>'
    ),
    WILD: svg(
      '<circle cx="50" cy="43" r="37" fill="#0d2a12" stroke="#7CFF4F" stroke-width="3"/>' +
      '<path d="M50 43 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16 a21 21 0 1 1 -21 -21" stroke="#7CFF4F" stroke-width="7" opacity=".3" fill="none" stroke-linecap="round"/>' +
      '<path d="M50 43 m0 -4 a4 4 0 1 1 -4 4 a8 8 0 1 1 8 8 a12 12 0 1 1 -12 -12 a16 16 0 1 1 16 16 a21 21 0 1 1 -21 -21" stroke="#c4ffa8" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<rect x="19" y="73" width="62" height="21" rx="6" fill="#ff3d9a" ' + s + '/>' +
      '<text x="50" y="89" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="15" fill="#fff">WILD</text>'
    ),
    SCAT: svg(
      '<polygon points="50,6 85,26 85,64 50,84 15,64 15,26" fill="#2a0f3d" stroke="#ff3d9a" stroke-width="4" stroke-linejoin="round"/>' +
      '<circle cx="50" cy="45" r="22" fill="#ff3d9a" opacity=".35"/><circle cx="50" cy="45" r="16" fill="#ff3d9a"/><circle cx="50" cy="45" r="8" fill="#ffe1f1"/>' +
      '<path d="M30 22 L36 32 L31 34 L38 44 M70 22 L64 32 L69 34 L62 44" stroke="#ffcc33" stroke-width="2.5" fill="none" stroke-linejoin="round"/>' +
      '<rect x="16" y="74" width="68" height="21" rx="6" fill="#ffcc33" ' + s + '/>' +
      '<text x="50" y="90" text-anchor="middle" font-family="Bungee, Impact, sans-serif" font-size="13" fill="' + K + '">BONUS</text>'
    ),
    COLLECTOR: svg(
      '<path d="M22 92 Q14 70 28 64 M38 98 Q34 78 42 70 M62 98 Q66 78 58 70 M78 92 Q86 70 72 64" stroke="#9b4fe0" stroke-width="9" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="50" cy="56" rx="30" ry="22" fill="#9b4fe0" ' + s + '/>' +
      '<rect x="34" y="8" width="32" height="26" rx="2" fill="#111" stroke="' + K + '" stroke-width="2"/><rect x="34" y="26" width="32" height="5" fill="#e0245e"/>' +
      '<rect x="24" y="32" width="52" height="7" rx="3.5" fill="#111" stroke="' + K + '" stroke-width="2"/>' +
      '<circle cx="36" cy="52" r="4" fill="#ffcc33"/><circle cx="46" cy="47" r="3" fill="#ffcc33"/><circle cx="56" cy="50" r="3.5" fill="#ffcc33"/><circle cx="66" cy="55" r="3" fill="#ffcc33"/><circle cx="42" cy="61" r="2.5" fill="#ffcc33"/><circle cx="58" cy="62" r="2.5" fill="#ffcc33"/>' +
      '<circle cx="56" cy="50" r="7.5" fill="none" stroke="#e8e3f5" stroke-width="2"/><path d="M63 53 Q68 62 64 70" stroke="#e8e3f5" stroke-width="1.5" fill="none"/>'
    )
  };
  root.RiftArt = ART;
})(this);
