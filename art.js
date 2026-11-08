/* ============================================================
   Illustrazioni (SVG inline): peluche, fiori e cuori.
   Non serve modificare questo file.
   ============================================================ */
(function () {
  const NS = 'xmlns="http://www.w3.org/2000/svg"';

  const heartBody = (fill) =>
    `<path fill="${fill}" d="M23.6 0c-3.4 0-6.4 1.9-7.6 4.7C14.8 1.9 11.8 0 8.4 0 3.8 0 0 3.7 0 8.3c0 9.6 16 20.7 16 20.7s16-11.1 16-20.7C32 3.7 28.2 0 23.6 0z"/>`;
  const heart = (fill) => `<svg ${NS} viewBox="0 0 32 29">${heartBody(fill)}</svg>`;

  const flowerBody = (petal, center, n = 6) => {
    let petals = '';
    for (let i = 0; i < n; i++) {
      petals += `<ellipse cx="50" cy="27" rx="15" ry="23" fill="${petal}" stroke="#fff" stroke-opacity=".7" stroke-width="2.2" transform="rotate(${(360 / n) * i} 50 50)"/>`;
    }
    return `${petals}<circle cx="50" cy="50" r="12.5" fill="${center}" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><circle cx="46" cy="46" r="3.2" fill="#fff" fill-opacity=".8"/>`;
  };
  const flower = (petal, center, n = 6) => `<svg ${NS} viewBox="0 0 100 100">${flowerBody(petal, center, n)}</svg>`;

  const bunny = `
<svg ${NS} viewBox="0 0 200 200">
  <g stroke="#f1aac6" stroke-width="2.5" stroke-linejoin="round">
    <g transform="rotate(-10 72 70)">
      <ellipse cx="72" cy="44" rx="17" ry="40" fill="#fff"/>
      <ellipse cx="72" cy="49" rx="8" ry="27" fill="#ffc9dd" stroke="none"/>
    </g>
    <g transform="rotate(14 128 70)">
      <ellipse cx="128" cy="44" rx="17" ry="40" fill="#fff"/>
      <ellipse cx="128" cy="49" rx="8" ry="27" fill="#ffc9dd" stroke="none"/>
    </g>
    <ellipse cx="100" cy="168" rx="44" ry="32" fill="#fff"/>
    <ellipse cx="60" cy="162" rx="13" ry="21" fill="#fff" transform="rotate(22 60 162)"/>
    <ellipse cx="140" cy="162" rx="13" ry="21" fill="#fff" transform="rotate(-22 140 162)"/>
    <ellipse cx="100" cy="108" rx="58" ry="48" fill="#fff"/>
  </g>
  <circle cx="78" cy="104" r="5.5" fill="#4b2b3d"/><circle cx="122" cy="104" r="5.5" fill="#4b2b3d"/>
  <circle cx="80" cy="102" r="2" fill="#fff"/><circle cx="124" cy="102" r="2" fill="#fff"/>
  <circle cx="64" cy="121" r="10" fill="#ffb3cf" opacity=".65"/><circle cx="136" cy="121" r="10" fill="#ffb3cf" opacity=".65"/>
  <path d="M93 114 Q100 110 107 114 Q104 121 100 123 Q96 121 93 114Z" fill="#ff7fa8"/>
  <path d="M100 123 V128 M100 128 Q94 134 88 129 M100 128 Q106 134 112 129" stroke="#4b2b3d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M100 152 L81 142 L81 162Z M100 152 L119 142 L119 162Z" fill="#8ccaff" stroke="#fff" stroke-width="1.5"/>
  <circle cx="100" cy="152" r="5.5" fill="#4a9be8"/>
  <svg x="34" y="14" width="50" height="50" viewBox="0 0 100 100">${flowerBody('#8ecbff', '#fff3b0', 6)}</svg>
  <svg x="54" y="166" width="22" height="20" viewBox="0 0 32 29">${heartBody('#e8405f')}</svg>
</svg>`;

  const bear = `
<svg ${NS} viewBox="0 0 200 200">
  <g stroke="#d9a579" stroke-width="2.5" stroke-linejoin="round">
    <circle cx="50" cy="62" r="22" fill="#e8bd92"/><circle cx="50" cy="62" r="11" fill="#f9d9c0" stroke="none"/>
    <circle cx="150" cy="62" r="22" fill="#e8bd92"/><circle cx="150" cy="62" r="11" fill="#f9d9c0" stroke="none"/>
    <ellipse cx="100" cy="170" rx="46" ry="33" fill="#efc9a1"/>
    <ellipse cx="100" cy="172" rx="27" ry="21" fill="#fbe6d0" stroke="none"/>
    <ellipse cx="56" cy="160" rx="14" ry="22" fill="#efc9a1" transform="rotate(24 56 160)"/>
    <ellipse cx="144" cy="160" rx="14" ry="22" fill="#efc9a1" transform="rotate(-24 144 160)"/>
    <ellipse cx="100" cy="106" rx="60" ry="52" fill="#efc9a1"/>
    <ellipse cx="100" cy="124" rx="25" ry="19" fill="#fbe6d0" stroke="none"/>
  </g>
  <ellipse cx="100" cy="115" rx="8" ry="6" fill="#7b4a3e"/>
  <path d="M100 121 V127 M100 127 Q94 133 88 128 M100 127 Q106 133 112 128" stroke="#7b4a3e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <circle cx="76" cy="100" r="5.5" fill="#4b2b3d"/><circle cx="124" cy="100" r="5.5" fill="#4b2b3d"/>
  <circle cx="78" cy="98" r="2" fill="#fff"/><circle cx="126" cy="98" r="2" fill="#fff"/>
  <circle cx="62" cy="122" r="10" fill="#ff9ec0" opacity=".6"/><circle cx="138" cy="122" r="10" fill="#ff9ec0" opacity=".6"/>
  <svg x="88" y="158" width="24" height="22" viewBox="0 0 32 29">${heartBody('#e8405f')}</svg>
  <path d="M60 52 L40 42 L42 64Z M60 52 L76 40 L76 62Z" fill="#ff8fb8" stroke="#fff" stroke-width="1.5"/>
  <circle cx="60" cy="52" r="5" fill="#ff5c93"/>
  <svg x="128" y="22" width="44" height="44" viewBox="0 0 100 100">${flowerBody('#8ecbff', '#fff3b0', 5)}</svg>
</svg>`;

  const cat = `
<svg ${NS} viewBox="0 0 200 200">
  <path d="M142 176 Q190 172 180 128" stroke="#bcd9f7" stroke-width="15" fill="none" stroke-linecap="round"/>
  <g stroke="#9fc4ee" stroke-width="2.5" stroke-linejoin="round">
    <path d="M46 90 L52 28 L98 62Z" fill="#d4e8ff"/><path d="M58 76 L60 44 L84 62Z" fill="#ffc9dd" stroke="none"/>
    <path d="M154 90 L148 28 L102 62Z" fill="#d4e8ff"/><path d="M142 76 L140 44 L116 62Z" fill="#ffc9dd" stroke="none"/>
    <ellipse cx="100" cy="170" rx="42" ry="32" fill="#d4e8ff"/>
    <ellipse cx="62" cy="164" rx="12" ry="20" fill="#d4e8ff" transform="rotate(20 62 164)"/>
    <ellipse cx="138" cy="164" rx="12" ry="20" fill="#d4e8ff" transform="rotate(-20 138 164)"/>
    <ellipse cx="100" cy="108" rx="62" ry="50" fill="#d4e8ff"/>
  </g>
  <path d="M92 66 V80 M100 63 V79 M108 66 V80" stroke="#aecdf2" stroke-width="3.5" stroke-linecap="round"/>
  <ellipse cx="100" cy="124" rx="19" ry="13" fill="#f2f8ff"/>
  <path d="M94 115 Q100 111 106 115 Q103 121 100 122 Q97 121 94 115Z" fill="#ff7fa8"/>
  <path d="M100 122 V127 M100 127 Q94 133 88 128 M100 127 Q106 133 112 128" stroke="#4b2b3d" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <path d="M60 118 L34 112 M60 124 L34 128 M140 118 L166 112 M140 124 L166 128" stroke="#9bbfe6" stroke-width="2.2" stroke-linecap="round"/>
  <circle cx="76" cy="104" r="5.5" fill="#4b2b3d"/><circle cx="124" cy="104" r="5.5" fill="#4b2b3d"/>
  <circle cx="78" cy="102" r="2" fill="#fff"/><circle cx="126" cy="102" r="2" fill="#fff"/>
  <circle cx="62" cy="122" r="10" fill="#ffb3cf" opacity=".65"/><circle cx="138" cy="122" r="10" fill="#ffb3cf" opacity=".65"/>
  <path d="M100 150 L82 140 L82 160Z M100 150 L118 140 L118 160Z" fill="#ff7fa0" stroke="#fff" stroke-width="1.5"/>
  <circle cx="100" cy="150" r="5.5" fill="#e8405f"/>
  <svg x="128" y="8" width="44" height="44" viewBox="0 0 100 100">${flowerBody('#ff9ec7', '#ffe27a', 5)}</svg>
</svg>`;

  window.ART = { heart, flower, coniglietto: bunny, orsetto: bear, gattino: cat };
})();
