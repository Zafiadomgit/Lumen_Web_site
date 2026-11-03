/* Lumen Studio — interacción
   1) luz del farol en el hero y luz del ratón por toda la página   2) barra fija
   3) entradas por sección e inclinación de las capturas   4) vídeos solo en pantalla
   5) TPV real incrustado (demos/tpv)   6) selector de héroes de Fendaria   7) juego a pantalla completa */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 1. luz ---------- */
  var hero = document.querySelector('.hero');
  var lamp = document.querySelector('.lamp');
  var lx = 0, ly = 0, tx = 0, ty = 0, inHero = false, raf = 0;
  function anchor() {
    if (!lamp) return;
    var r = lamp.getBoundingClientRect();
    tx = r.left + r.width / 2; ty = r.top + r.height * 0.5;
    if (!inHero) { lx = tx; ly = ty; paint(); }
  }
  function paint() {
    doc.style.setProperty('--lx', lx.toFixed(1) + 'px');
    doc.style.setProperty('--ly', ly.toFixed(1) + 'px');
  }
  function loop() {
    lx += (tx - lx) * 0.08; ly += (ty - ly) * 0.08; paint();
    raf = (Math.abs(tx - lx) > 0.5 || Math.abs(ty - ly) > 0.5) ? requestAnimationFrame(loop) : 0;
  }
  anchor();
  addEventListener('resize', anchor);
  addEventListener('scroll', function () { if (!inHero) anchor(); }, { passive: true });
  if (finePointer && !reduce) {
    hero.addEventListener('pointermove', function (e) { inHero = true; tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    hero.addEventListener('pointerleave', function () { inHero = false; anchor(); if (!raf) raf = requestAnimationFrame(loop); });
    addEventListener('pointermove', function (e) {
      doc.style.setProperty('--mx', e.clientX + 'px');
      doc.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* ---------- 2. barra fija ---------- */
  var bar = $('bar');
  var links = bar ? bar.querySelectorAll('.bar-links a') : [];
  function onScroll() {
    bar.classList.toggle('is-on', scrollY > innerHeight * 0.7);
    var here = null;
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s && s.getBoundingClientRect().top < innerHeight * 0.4) here = a; });
    links.forEach(function (a) { a.classList.toggle('is-here', a === here); });
  }
  if (bar) { addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

  /* ---------- 3. entradas e inclinación ---------- */
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var count = new Map();
    items.forEach(function (el) {
      var sec = el.closest('.row, section') || document.body;
      var n = count.get(sec) || 0; count.set(sec, n + 1);
      el.style.setProperty('--d', Math.min(n, 6) * 75 + 'ms');
    });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }
  if (finePointer && !reduce) {
    document.querySelectorAll('.tile').forEach(function (t) {
      var img = t.querySelector('img');
      t.addEventListener('pointermove', function (e) {
        var r = img.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        img.style.setProperty('--ty', (x * 7).toFixed(2) + 'deg');
        img.style.setProperty('--tx', (-y * 7).toFixed(2) + 'deg');
      });
      t.addEventListener('pointerleave', function () { img.style.removeProperty('--tx'); img.style.removeProperty('--ty'); });
    });
  }

  /* ---------- 4. vídeos ---------- */
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && !reduce) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.25 });
    document.querySelectorAll('video.autoplay').forEach(function (v) { vo.observe(v); });
  }

  /* ---------- 5. TPV real ---------- */
  var screen = $('tpvScreen'), frame = $('tpvFrame'), on = $('tpvOn');
  if (screen && frame) {
    var fit = function () { screen.style.setProperty('--k', (screen.clientWidth / 1366).toFixed(4)); };
    fit();
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(screen); else addEventListener('resize', fit);
    var start = function (route) {
      if (!frame.src) frame.src = frame.dataset.src + (route || '#/');
      else if (route) { try { frame.contentWindow.location.hash = route; } catch (e) { frame.src = frame.dataset.src + route; } }
      screen.classList.add('is-on'); frame.tabIndex = 0;
    };
    on.addEventListener('click', function () { start(); });
    var segs = Array.prototype.slice.call(document.querySelectorAll('.seg [role="tab"]'));
    segs.forEach(function (b) {
      b.addEventListener('click', function () {
        segs.forEach(function (x) { x.setAttribute('aria-selected', x === b); });
        start(b.dataset.route);
      });
    });
  }

  /* ---------- 6. héroes de Fendaria ---------- */
  var HEROES = [
    { id: 'kara', n: 'Kara, la Rompeyelmos', role: 'Guerrera cuerpo a cuerpo', ult: 'Torbellino de Acero', sum: 'Guerrera de primera línea. Aguanta mucho castigo, golpea en arco a todo lo que tenga cerca y salta al centro de la pelea con su hacha.' },
    { id: 'teo', n: 'Teo, Ojo de Halcón', role: 'Explorador a distancia', ult: 'Lluvia de Halcones', sum: 'Explorador a distancia. Dispara sin parar y castiga a los grupos desde lejos con flechas explosivas y lluvias de flechas, pero tiene poca vida.' },
    { id: 'elara', n: 'Elara, la Runista', role: 'Mago protector', ult: 'Gran Runa Ancestral', sum: 'Arcanista de las runas. Se protege con escudos que absorben el daño, empuja a los enemigos y quema el suelo con círculos rúnicos.' },
    { id: 'nyx', n: 'Nyx, la Sombra', role: 'Asesina de dagas', ult: 'Danza de Mil Cortes', sum: 'Asesina de dagas. Ataca rapidísimo, encadena críticos enormes y aparece a la espalda de sus presas. Muy frágil si la rodean.' },
    { id: 'ayla', n: 'Ayla, la Domadora', role: 'Invocadora de bestias', ult: 'Estampida', sum: 'Invocadora de lobos. Su cayado de espíritus mantiene a raya a los enemigos mientras su manada los caza, y su rugido los vuelve imparables.' },
    { id: 'brina', n: 'Brina, la Artificiera', role: 'Ingeniera explosiva', ult: 'Bombardeo', sum: 'Ingeniera de explosivos. Lanza bombas que estallan en área y planta torretas que disparan solas. Destroza grupos grandes.' },
    { id: 'brann', n: 'Brann, el Berserker', role: 'Furia cuerpo a cuerpo', ult: 'Frenesí Rojo', sum: 'Guerrero salvaje. Cuanto más herido está, más fuerte golpea, y cada golpe le devuelve vida. Su espadón parte lo que toca.' }
  ];
  var sprite = $('heroSprite'), roster = $('roster');
  if (sprite && roster) {
    var cur = 0, move = 'idle';
    var src = function (h, m) { return 'assets/img/heroes/' + h.id + '_' + m + '.webp'; };
    HEROES.forEach(function (h, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0); b.setAttribute('aria-label', h.n);
      b.tabIndex = i === 0 ? 0 : -1;
      b.innerHTML = '<img src="' + src(h, 'idle') + '" width="174" height="174" alt="" loading="lazy">';
      b.addEventListener('click', function () { pick(i); });
      b.addEventListener('keydown', function (e) {
        var j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (j === null) return; e.preventDefault();
        j = (j + HEROES.length) % HEROES.length; pick(j); roster.children[j].focus();
      });
      roster.appendChild(b);
      ['attack', 'cast', 'dash'].forEach(function (m) { var im = new Image(); im.src = src(h, m); }); // precarga
    });
    var setSprite = function () {
      var h = HEROES[cur];
      sprite.src = src(h, move) + '?t=' + Date.now(); // reinicia la animación desde el primer fotograma
      sprite.alt = h.n;
    };
    var pick = function (i) {
      cur = i;
      var h = HEROES[i];
      Array.prototype.forEach.call(roster.children, function (b, k) { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      $('heroName').textContent = h.n; $('heroRole').textContent = h.role; $('heroSum').textContent = h.sum; $('heroUlt').textContent = h.ult;
      sprite.classList.add('is-swap');
      setTimeout(function () { setSprite(); sprite.classList.remove('is-swap'); }, 180);
    };
    var moves = Array.prototype.slice.call(document.querySelectorAll('.moves button'));
    moves.forEach(function (b) {
      b.addEventListener('click', function () {
        move = b.dataset.move;
        moves.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        setSprite();
      });
    });
    // la luz del pedestal sigue al ratón
    var ped = document.querySelector('.pedestal');
    if (ped && finePointer && !reduce) {
      ped.addEventListener('pointermove', function (e) {
        var r = ped.getBoundingClientRect();
        ped.style.setProperty('--px', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
        ped.style.setProperty('--py', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      });
    }
  }

  /* ---------- 7. jugar a Fendaria ---------- */
  var modal = $('gameModal'), gframe = $('gameFrame'), lastFocus = null;
  function openGame() {
    lastFocus = document.activeElement;
    if (!gframe.src) gframe.src = 'demos/fendaria/index.html';
    modal.hidden = false; document.body.classList.add('no-scroll');
    setTimeout(function () { try { gframe.focus(); } catch (e) {} }, 300);
  }
  function closeGame() {
    if (document.fullscreenElement) document.exitFullscreen().catch(function () {});
    modal.hidden = true; document.body.classList.remove('no-scroll');
    gframe.src = 'about:blank'; gframe.removeAttribute('src'); // para el juego y su música
    if (lastFocus) lastFocus.focus();
  }
  if (modal) {
    $('playGame').addEventListener('click', openGame);
    $('gameClose').addEventListener('click', closeGame);
    $('gameFull').addEventListener('click', function () {
      var p = modal.requestFullscreen ? modal.requestFullscreen() : null;
      if (p && p.then) p.then(function () { if (window.screen.orientation && window.screen.orientation.lock) window.screen.orientation.lock('landscape').catch(function () {}); }).catch(function () {});
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden && !document.fullscreenElement) closeGame(); });
  }
})();
