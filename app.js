/* ============================================================
   Logica del sito. Non serve modificare questo file:
   testi, ordine e foto si cambiano da config.js
   ============================================================ */
(() => {
  const S = window.SITE;
  const A = window.ART;
  const $ = (sel, root = document) => root.querySelector(sel);
  const stage = $('#stage');
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- utilità testo ---------- */
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tpl = (s) => String(s ?? '').split('{nome}').join(S.nome).split('{soprannome}').join(S.soprannome);
  const fmt = (s) => esc(tpl(s)).replace(/\n/g, '<br>');
  const rnd = (a, b) => a + Math.random() * (b - a);

  /* ---------- fiori decorativi ---------- */
  const dataUri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  document.documentElement.style.setProperty('--fl-pink', dataUri(A.flower('#ff9ec7', '#ffe27a', 5)));
  document.documentElement.style.setProperty('--fl-blue', dataUri(A.flower('#8ecbff', '#fff3b0', 6)));

  (function fallingFlowers() {
    if (REDUCED) return;
    const wrap = $('#flowers');
    const n = innerWidth < 600 ? 12 : 20;
    for (let i = 0; i < n; i++) {
      const size = rnd(20, 52);
      const pink = Math.random() < 0.55;
      const d = document.createElement('div');
      d.className = 'fl';
      d.style.cssText = `left:${rnd(0, 100)}%;width:${size}px;height:${size}px;opacity:${rnd(0.55, 0.95)};` +
        `animation-duration:${rnd(16, 34)}s;animation-delay:${-rnd(0, 30)}s`;
      d.innerHTML = `<div class="sw" style="animation-duration:${rnd(3, 6)}s;animation-delay:${-rnd(0, 4)}s">` +
        (pink ? A.flower('#ff9ec7', '#ffe27a', 5) : A.flower('#8ecbff', '#fff3b0', 6)) + '</div>';
      wrap.appendChild(d);
    }
  })();

  /* ---------- esplosione di cuori e fiori ---------- */
  const PARTS = [
    () => A.heart('#e8405f'), () => A.heart('#ff7fb0'), () => A.heart('#ff4d7a'),
    () => A.heart('#7fc2ff'), () => A.flower('#ff9ec7', '#ffe27a', 5), () => A.flower('#8ecbff', '#fff3b0', 6)
  ];
  function explode(x, y, n = 90) {
    for (let i = 0; i < n; i++) {
      const p = document.createElement('span');
      const size = rnd(16, 36);
      p.className = 'burst';
      p.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px`;
      p.innerHTML = PARTS[Math.floor(Math.random() * PARTS.length)]();
      document.body.appendChild(p);
      if (!p.animate) { setTimeout(() => p.remove(), 50); continue; }
      const ang = rnd(0, Math.PI * 2);
      const dist = rnd(90, Math.min(innerWidth, 520) * 0.85);
      const dx = Math.cos(ang) * dist;
      const dy = Math.sin(ang) * dist - 70;
      const rot = rnd(-200, 200);
      p.animate([
        { transform: 'translate(-50%,-50%) scale(.2) rotate(0deg)', opacity: 1 },
        { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1) rotate(${rot}deg)`, opacity: 1, offset: 0.5 },
        { transform: `translate(calc(-50% + ${dx * 1.1}px),calc(-50% + ${dy + 280}px)) scale(.8) rotate(${rot * 1.4}deg)`, opacity: 0 }
      ], { duration: rnd(1700, 2900), easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' })
        .onfinish = () => p.remove();
    }
  }

  /* ---------- musica (YouTube, solo nel carosello) ---------- */
  const Music = {
    player: null, ready: false, want: false, muted: false, timer: 0,
    btn: $('#music-btn'),
    init() {
      if (!S.musica || !S.musica.videoId) return;
      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player('yt-holder', {
          width: '1', height: '1', videoId: S.musica.videoId,
          playerVars: { playsinline: 1, controls: 0, loop: 1, playlist: S.musica.videoId, start: S.musica.inizio || 0, rel: 0, modestbranding: 1 },
          events: {
            onReady: () => { this.ready = true; if (this.want && !this.muted) this.play(); },
            onStateChange: (e) => this.paint(e.data === 1)
          }
        });
      };
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      document.head.appendChild(tag);
      this.btn.addEventListener('click', () => this.toggle());
    },
    paint(playing) {
      this.btn.classList.toggle('playing', !!playing);
      this.btn.classList.toggle('muted', !playing);
    },
    play() {
      this.want = true;
      clearInterval(this.timer);
      if (!this.ready || this.muted) return;
      try { this.player.setVolume(S.musica.volume ?? 70); this.player.playVideo(); } catch (e) { /* ignora */ }
    },
    fadeOut() {
      this.want = false;
      if (!this.ready) return;
      clearInterval(this.timer);
      try {
        let v = this.player.getVolume();
        this.timer = setInterval(() => {
          v -= 8;
          if (v <= 0) { clearInterval(this.timer); this.player.pauseVideo(); this.player.setVolume(S.musica.volume ?? 70); }
          else this.player.setVolume(v);
        }, 80);
      } catch (e) { /* ignora */ }
    },
    toggle() {
      if (!this.ready) return;
      try {
        if (this.player.getPlayerState() === 1) { this.muted = true; this.player.pauseVideo(); }
        else { this.muted = false; this.want = true; this.player.setVolume(S.musica.volume ?? 70); this.player.playVideo(); }
      } catch (e) { /* ignora */ }
    },
    showButton(show) { this.btn.hidden = !show; }
  };
  Music.init();

  /* ---------- navigazione tra gli step ---------- */
  let idx = 0, current = null, busy = false;
  const steps = S.step;

  const progress = $('#progress');
  progress.innerHTML = steps.map(() => '<i class="pd"></i>').join('');
  function paintProgress() {
    [...progress.children].forEach((d, i) => {
      d.classList.toggle('on', i === idx);
      d.classList.toggle('done', i < idx);
    });
  }

  function go(i) {
    if (busy || i < 0 || i >= steps.length) return;
    busy = true;
    const old = stage.firstElementChild;
    const swap = () => {
      if (current && current.cleanup) current.cleanup();
      stage.replaceChildren();
      idx = i;
      current = render(steps[i]) || {};
      paintProgress();
      window.scrollTo(0, 0);
      busy = false;
    };
    if (old) { old.classList.add('out'); setTimeout(swap, 260); } else swap();
  }

  /* Va allo step successivo. La musica va avviata qui, dentro il tocco dell'utente
     (su iPhone altrimenti il browser la blocca). */
  function next() {
    const cur = steps[idx];
    const nx = steps[idx + 1];
    const needsMusic = (s) => s && s.tipo === 'carosello' && s.musica !== false;
    if (needsMusic(nx)) Music.play();
    else if (needsMusic(cur)) Music.fadeOut();
    go(idx + 1);
  }
  function restart() {
    if (Music.want) Music.fadeOut();
    go(0);
  }

  /* ---------- costruzione schermate ---------- */
  const illo = (k) => (A[k] && typeof A[k] === 'string' ? `<div class="illo">${A[k]}</div>` : '');
  const button = (label, cls = '') => `<button class="btn ${cls}" type="button">${fmt(label)}</button>`;
  function screen(html, cls = '') {
    const s = document.createElement('section');
    s.className = 'screen';
    s.innerHTML = `<div class="card ${cls}">${html}</div>`;
    stage.appendChild(s);
    return s;
  }

  function render(st) {
    switch (st.tipo) {
      case 'testo': return rTesto(st);
      case 'carosello': return rCarosello(st);
      case 'bigliettini': return rBigliettini(st);
      case 'lettera': return rLettera(st);
      case 'domanda': return rDomanda(st);
      case 'finale': return rFinale(st);
      default: return rTesto({ titolo: 'Step sconosciuto', testo: `Tipo "${esc(st.tipo)}" non valido in config.js`, bottone: 'Continua' });
    }
  }

  /* --- testo --- */
  function rTesto(st) {
    const s = screen(`${illo(st.illustrazione)}<h1 class="title">${fmt(st.titolo)}</h1>
      <p class="text">${fmt(st.testo)}</p>${button(st.bottone || 'Continua')}`);
    $('.btn', s).addEventListener('click', next);
    return {};
  }

  /* --- carosello polaroid --- */
  function rCarosello(st) {
    const foto = st.foto || [];
    const rot = [-3, 2.5, -2, 3, -2.5, 2];
    const pol = foto.map((f, i) => `
      <figure class="polaroid" style="--r:${rot[i % rot.length]}deg">
        <div class="ph"><img src="${esc(f.src)}" alt="${esc(f.didascalia || 'Foto ' + (i + 1))}" loading="${i < 2 ? 'eager' : 'lazy'}" draggable="false">
          <div class="ph-art">${A.coniglietto}</div></div>
        <figcaption>${fmt(f.didascalia || '')}</figcaption>
      </figure>`).join('');
    const dots = foto.map(() => '<i class="cdot"></i>').join('');
    const s = screen(`
      <h2 class="title sm">${fmt(st.titolo)}</h2>
      <p class="text">${fmt(st.testo)}</p>
      <div class="carousel" tabindex="0" aria-label="Foto">${pol}</div>
      <div class="car-nav">
        <button class="car-arrow prev" type="button" aria-label="Foto precedente">‹</button>
        <div class="cdots">${dots}</div>
        <button class="car-arrow nxt" type="button" aria-label="Foto successiva">›</button>
      </div>
      ${button(st.bottone || 'Continua')}`, 'wide');

    const car = $('.carousel', s);
    const items = [...car.children];
    const cdots = [...s.querySelectorAll('.cdot')];
    let best = 0, raf = 0;

    s.querySelectorAll('.ph img').forEach((img) => {
      const miss = () => img.closest('.ph').classList.add('missing');
      img.addEventListener('error', miss);
      if (img.complete && img.naturalWidth === 0) miss();
    });

    const update = () => {
      raf = 0;
      const c = car.scrollLeft + car.clientWidth / 2;
      let bd = Infinity;
      items.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - c);
        if (d < bd) { bd = d; best = i; }
      });
      items.forEach((el, i) => el.classList.toggle('active', i === best));
      cdots.forEach((d, i) => d.classList.toggle('on', i === best));
    };
    const goTo = (i) => {
      i = Math.max(0, Math.min(items.length - 1, i));
      const el = items[i];
      car.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - car.clientWidth / 2, behavior: 'smooth' });
    };
    car.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    $('.prev', s).addEventListener('click', () => goTo(best - 1));
    $('.nxt', s).addEventListener('click', () => goTo(best + 1));
    car.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goTo(best + 1);
      if (e.key === 'ArrowLeft') goTo(best - 1);
    });
    requestAnimationFrame(update);
    $('.btn', s).addEventListener('click', next);

    const withMusic = st.musica !== false;
    if (withMusic) { Music.showButton(true); Music.paint(Music.player && Music.ready && Music.player.getPlayerState && Music.player.getPlayerState() === 1); }
    return { cleanup() { Music.showButton(false); } };
  }

  /* --- bigliettini --- */
  function rBigliettini(st) {
    const list = st.bigliettini || [];
    const tints = ['#ffe0ec', '#d9ecff', '#fff0f5', '#cfe6ff', '#ffd3e4'];
    const cards = list.map((t, i) => `
      <button class="note" type="button" style="--tint:${tints[i % tints.length]}" aria-label="Apri il bigliettino ${i + 1}">
        <span class="front">${i % 2 ? A.flower('#8ecbff', '#fff3b0', 6) : A.flower('#ff9ec7', '#ffe27a', 5)}<small>tocca per aprire</small></span>
        <span class="back">${fmt(t)}</span>
      </button>`).join('');
    const lock = st.tuttiObbligatori !== false;
    const s = screen(`
      <h2 class="title sm">${fmt(st.titolo)}</h2>
      <p class="text">${fmt(st.testo)}</p>
      <div class="notes">${cards}</div>
      <p class="count"></p>
      ${button(st.bottone || 'Continua')}`);
    const notes = [...s.querySelectorAll('.note')];
    const count = $('.count', s);
    const cont = $('.btn', s);
    let opened = 0;
    const paint = () => {
      const left = list.length - opened;
      count.textContent = left > 0 ? `Ne restano ${left} da aprire` : 'Li hai aperti tutti!';
      cont.disabled = lock && left > 0;
    };
    notes.forEach((n) => n.addEventListener('click', () => {
      if (n.classList.contains('open')) return;
      n.classList.add('open');
      opened++;
      const r = n.getBoundingClientRect();
      explode(r.left + r.width / 2, r.top + r.height / 2, 10);
      paint();
    }));
    paint();
    cont.addEventListener('click', next);
    return {};
  }

  /* --- lettera --- */
  function rLettera(st) {
    const L = st.lettera || {};
    const s = screen(`
      <h2 class="title sm">${fmt(st.titolo)}</h2>
      <p class="text">${fmt(st.testo)}</p>
      <div class="slot">
        <div class="env-wrap">
          <div class="envelope">
            <div class="env-back"></div>
            <div class="paper-peek"></div>
            <div class="env-front"><i class="l"></i><i class="r"></i><i class="b"></i></div>
            <div class="env-flap"><i></i></div>
            <button class="seal" type="button" aria-label="Apri la lettera">${A.heart('#e8405f')}</button>
          </div>
        </div>
        <p class="env-hint">tocca il cuore</p>
      </div>`);
    const card = $('.card', s);
    const slot = $('.slot', s);
    const env = $('.envelope', s);
    const wrap = $('.env-wrap', s);
    let opened = false;
    $('.seal', s).addEventListener('click', () => {
      if (opened) return;
      opened = true;
      const r = $('.seal', s).getBoundingClientRect();
      explode(r.left + r.width / 2, r.top + r.height / 2, 28);
      env.classList.add('open');
      wrap.classList.add('go');
      setTimeout(() => wrap.classList.add('fade'), 1100);
      setTimeout(() => {
        card.classList.add('opened');
        $('.title', s).hidden = true;
        $('.text', s).hidden = true;
        slot.innerHTML = `
          <div class="paper"><div class="paper-body">
            <p class="greet">${fmt(L.saluto || '')}</p>
            ${(L.paragrafi || []).map((p) => `<p>${fmt(p)}</p>`).join('')}
            <p class="sign">${fmt(L.firma || '')}</p>
          </div></div>
          <div class="letter-btn-wrap">${button(st.bottone || 'Continua')}</div>`;
        $('.btn', slot).addEventListener('click', next);
      }, 1650);
    });
    return {};
  }

  /* --- domanda con il "No" che scappa --- */
  function rDomanda(st) {
    const s = screen(`${illo(st.illustrazione)}
      <h1 class="title q">${fmt(st.titolo)}</h1>
      <p class="text">${fmt(st.sottotitolo || '')}</p>
      <div class="q-row">
        <button class="btn yes" type="button">${fmt(st.si || 'Sí')}</button>
        <button class="btn ghost no" type="button">${fmt(st.no || 'No')}</button>
      </div>
      <p class="tease" aria-live="polite"></p>`);
    const yes = $('.yes', s), no = $('.no', s), tease = $('.tease', s);
    const teases = st.scherzi && st.scherzi.length ? st.scherzi : ['Ops!'];
    let moved = false, ph = null, tries = 0, lastT = 0, lx = -999, ly = -999, done = false;

    function overlapsYes(x, y, w, h) {
      const r = yes.getBoundingClientRect(), pad = 16;
      return x < r.right + pad && x + w > r.left - pad && y < r.bottom + pad && y + h > r.top - pad;
    }
    function runAway(e) {
      if (done) return;
      if (e) e.preventDefault();
      const now = Date.now();
      if (now - lastT < 280) return;   // evita doppi spostamenti con un solo tocco
      lastT = now;
      tries++;
      if (!moved) {
        moved = true;
        const r = no.getBoundingClientRect();
        ph = document.createElement('span');
        ph.style.cssText = `display:inline-block;width:${r.width}px;height:${r.height}px`;
        no.before(ph);
        document.body.appendChild(no);          // fuori dalla card, così "fixed" funziona
        no.classList.add('no-fixed');
        no.style.left = r.left + 'px';
        no.style.top = r.top + 'px';
        void no.offsetWidth;
      }
      const w = no.offsetWidth, h = no.offsetHeight, m = 14, top = 64;
      let x, y, k = 0;
      do {
        x = m + Math.random() * Math.max(1, innerWidth - w - 2 * m);
        y = top + Math.random() * Math.max(1, innerHeight - h - top - m);
        k++;
      } while (k < 40 && (Math.hypot(x - lx, y - ly) < 130 || overlapsYes(x, y, w, h)));
      lx = x; ly = y;
      no.style.left = x + 'px';
      no.style.top = y + 'px';
      tease.textContent = tpl(teases[(tries - 1) % teases.length]);
      yes.style.setProperty('--ys', Math.min(1 + tries * 0.07, 1.5).toFixed(2));
    }
    no.addEventListener('pointerdown', runAway);
    no.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') runAway(e); });
    no.addEventListener('click', runAway);     // tastiera

    yes.addEventListener('click', () => {
      if (done) return;
      done = true;
      yes.disabled = true;
      no.style.opacity = '0';
      no.style.pointerEvents = 'none';
      tease.textContent = '';
      const r = yes.getBoundingClientRect();
      explode(r.left + r.width / 2, r.top + r.height / 2, 110);
      setTimeout(() => explode(innerWidth / 2, innerHeight * 0.45, 90), 450);
      setTimeout(() => explode(innerWidth / 2, innerHeight * 0.3, 70), 900);
      if (idx < steps.length - 1) setTimeout(next, 2900);
    });
    return { cleanup() { no.remove(); if (ph) ph.remove(); } };
  }

  /* --- finale --- */
  function rFinale(st) {
    const s = screen(`${illo(st.illustrazione)}<h1 class="title">${fmt(st.titolo)}</h1>
      <p class="text">${fmt(st.testo)}</p>${button(st.bottone || 'Rivedi dall\'inizio', 'ghost')}`);
    $('.btn', s).addEventListener('click', restart);
    const t = setTimeout(() => explode(innerWidth / 2, innerHeight * 0.3, 45), 500);
    return { cleanup() { clearTimeout(t); } };
  }

  /* ---------- via! ---------- */
  document.title = `Per ${S.nome}`;
  go(0);
})();
