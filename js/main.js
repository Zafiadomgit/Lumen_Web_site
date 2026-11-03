/* Lumen Studio — interacción
   1) luz del farol en el hero y luz del ratón por toda la página   2) barra fija
   3) entradas por sección e inclinación de las capturas   4) vídeos solo en pantalla
   5) TPV real incrustado (demos/tpv)   6) selector de héroes de Fendaria   7) juego a pantalla completa
   8) calculadora de presupuesto   9) formulario de contacto (api/contact.js, con correo de respaldo) */
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
    hero.addEventListener('pointermove', function (e) { if (!e.clientX && !e.clientY) return; inHero = true; tx = e.clientX; ty = e.clientY; if (!raf) raf = requestAnimationFrame(loop); });
    hero.addEventListener('pointerleave', function () { inHero = false; anchor(); if (!raf) raf = requestAnimationFrame(loop); });
    addEventListener('pointermove', function (e) {
      doc.style.setProperty('--mx', e.clientX + 'px');
      doc.style.setProperty('--my', e.clientY + 'px');
    }, { passive: true });
  }

  /* ---------- 1b. golpear el farol: se balancea como un péndulo y suelta chispas ---------- */
  var lampBtn = $('lamp');
  if (lampBtn) {
    var ang = 0, vel = 0, swinging = false, last = 0;
    var K = 55, DAMP = 2.1, MAX = 38; // rigidez del muelle, rozamiento y ángulo máximo (grados)
    var step = function (t) {
      var dt = Math.min(0.032, (t - last) / 1000 || 0.016); last = t;
      vel += (-K * ang - DAMP * vel) * dt;
      ang += vel * dt;
      if (ang > MAX) { ang = MAX; vel *= -0.4; } else if (ang < -MAX) { ang = -MAX; vel *= -0.4; }
      lampBtn.style.transform = 'rotate(' + ang.toFixed(2) + 'deg)';
      if (Math.abs(ang) < 0.25 && Math.abs(vel) < 2) {
        swinging = false; ang = 0; vel = 0;
        lampBtn.style.transform = ''; lampBtn.classList.remove('is-hit');
        return;
      }
      requestAnimationFrame(step);
    };
    var sparks = function (x, y, dir) {
      if (reduce) return;
      for (var i = 0; i < 14; i++) {
        var sp = document.createElement('span');
        sp.className = 'spark';
        document.body.appendChild(sp);
        var a = (-90 + dir * 35 + (Math.random() - 0.5) * 140) * Math.PI / 180;
        var d = 50 + Math.random() * 110, dx = Math.cos(a) * d, dy = Math.sin(a) * d;
        var sz = 3 + Math.random() * 5;
        sp.style.width = sp.style.height = sz.toFixed(1) + 'px';
        if (Math.random() < 0.35) sp.style.background = '#fff3c4';
        var anim = sp.animate([
          { transform: 'translate(' + x + 'px,' + y + 'px) scale(1)', opacity: 1 },
          { transform: 'translate(' + (x + dx) + 'px,' + (y + dy + 60) + 'px) scale(.2)', opacity: 0 }
        ], { duration: 550 + Math.random() * 450, easing: 'cubic-bezier(.16,1,.3,1)' });
        anim.onfinish = (function (el) { return function () { el.remove(); }; })(sp);
      }
    };
    var hit = function (x, y) {
      var r = lampBtn.getBoundingClientRect();
      var dir = x < r.left + r.width / 2 ? 1 : -1; // golpe desde la izquierda → se va a la derecha
      var force = 0.6 + Math.min(1, Math.abs(x - (r.left + r.width / 2)) / (r.width / 2)) * 0.6;
      if (reduce) { lampBtn.classList.add('is-hit'); setTimeout(function () { lampBtn.classList.remove('is-hit'); }, 600); return; }
      vel += dir * 260 * force;
      lampBtn.classList.remove('is-hit'); void lampBtn.offsetWidth; lampBtn.classList.add('is-hit'); // reinicia el destello
      sparks(x, y, dir);
      if (!swinging) { swinging = true; last = performance.now(); requestAnimationFrame(step); }
    };
    lampBtn.addEventListener('click', function (e) {
      var r = lampBtn.getBoundingClientRect();
      // con teclado (sin coordenadas) se golpea desde un lado al azar
      var x = e.clientX || (r.left + r.width / 2 + (Math.random() < 0.5 ? -1 : 1) * r.width * 0.4);
      var y = e.clientY || (r.top + r.height * 0.55);
      hit(x, y);
    });
  }

  /* ---------- 2. barra fija ---------- */
  var bar = $('bar'), waFloat = document.querySelector('.wa-float');
  var links = bar ? bar.querySelectorAll('.bar-links a') : [];
  function onScroll() {
    bar.classList.toggle('is-on', scrollY > innerHeight * 0.7);
    if (waFloat) waFloat.classList.toggle('is-on', scrollY > innerHeight * 0.7);
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
    });
    // precarga las demás animaciones solo cuando el selector está a punto de verse
    var preloaded = false;
    var preload = function () {
      if (preloaded) return; preloaded = true;
      HEROES.forEach(function (h) { ['attack', 'cast', 'dash'].forEach(function (m) { var im = new Image(); im.src = src(h, m); }); });
    };
    if ('IntersectionObserver' in window) {
      var po = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { preload(); po.disconnect(); } }, { rootMargin: '400px 0px' });
      po.observe(sprite);
    } else preload();
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
    // el foco del teclado no sale de la ventana del juego mientras está abierta
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = modal.querySelectorAll('button, iframe'), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }
  /* ---------- 8. calculadora de presupuesto ---------- */
  // PRECIOS ORIENTATIVOS: cámbialos aquí. [mín, máx] en dólares (USD).
  var WA = 'https://wa.me/573118739670';
  var CALC = {
    web: { label: 'Web', sizeLabel: '¿Qué tipo de web?', sizes: [
      { id: 'landing', n: 'Landing de una página', p: [600, 1200], w: 2 },
      { id: 'corp', n: 'Corporativa (hasta 8 páginas)', p: [1500, 3000], w: 4 },
      { id: 'shop', n: 'Tienda online', p: [3000, 6000], w: 6 } ],
      extras: [ { id: 'i18n', n: 'Varios idiomas', p: [300, 600] }, { id: 'blog', n: 'Blog o gestor de contenidos', p: [300, 700] },
        { id: 'book', n: 'Reservas o citas', p: [500, 1200] }, { id: 'seo', n: 'SEO inicial', p: [300, 600] } ] },
    app: { label: 'App', sizeLabel: '¿Para qué móviles?', sizes: [
      { id: 'android', n: 'Android', p: [5000, 10000], w: 8 },
      { id: 'ios', n: 'iPhone', p: [5000, 10000], w: 8 },
      { id: 'both', n: 'Android y iPhone', p: [8000, 16000], w: 10 } ],
      extras: [ { id: 'login', n: 'Usuarios y login', p: [800, 1600] }, { id: 'pay', n: 'Pagos dentro de la app', p: [1200, 2500] },
        { id: 'push', n: 'Notificaciones', p: [500, 1000] }, { id: 'admin', n: 'Panel de administración', p: [1500, 3500] } ] },
    game: { label: 'Videojuego', sizeLabel: '¿Qué alcance?', sizes: [
      { id: 'proto', n: 'Prototipo jugable', p: [3000, 6000], w: 6 },
      { id: 'small', n: 'Juego pequeño', p: [8000, 15000], w: 12 },
      { id: 'full', n: 'Juego completo', p: [20000, 45000], w: 24 } ],
      extras: [ { id: 'music', n: 'Música y sonido originales', p: [1000, 2500] }, { id: 'rank', n: 'Ranking online', p: [800, 1800] },
        { id: 'store', n: 'Publicación en Google Play', p: [300, 700] }, { id: 'trailer', n: 'Tráiler en vídeo', p: [600, 1500] } ] },
    tpv: { label: 'TPV', sizeLabel: '¿Cuántos locales?', monthly: 39, sizes: [
      { id: 'one', n: '1 local', p: [500, 900], w: 2, locales: 1 },
      { id: 'two', n: '2 locales', p: [800, 1400], w: 3, locales: 2 },
      { id: 'more', n: '3 o más', p: [1200, 2200], w: 4, locales: 3 } ],
      extras: [ { id: 'kiosk', n: 'Kiosco de autoservicio', p: [400, 900] }, { id: 'kds', n: 'Pantalla de cocina', p: [200, 500] },
        { id: 'print', n: 'Impresoras de tickets', p: [150, 400] }, { id: 'online', n: 'Pedidos para recoger', p: [600, 1400] } ] },
    custom: { label: 'A medida', sizeLabel: '¿Qué tamaño tiene?', sizes: [
      { id: 'tool', n: 'Herramienta interna', p: [2000, 5000], w: 4 },
      { id: 'saas', n: 'Plataforma o SaaS', p: [8000, 25000], w: 12 } ],
      extras: [ { id: 'inv', n: 'Facturación', p: [1000, 3000] }, { id: 'dash', n: 'Panel con informes', p: [1000, 2500] },
        { id: 'api', n: 'Conexión con otras herramientas', p: [800, 2000] } ] }
  };
  var calcEl = $('calc');
  if (calcEl) {
    var eur = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }); // precios en dólares
    var typeBox = $('calcType'), sizeBox = $('calcSize'), extraBox = $('calcExtras');
    var chip = function (name, type, value, text, checked, hint) {
      return '<label class="chip"><input type="' + type + '" name="' + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '><span>' + text + (hint ? ' <small>' + hint + '</small>' : '') + '</span></label>';
    };
    typeBox.innerHTML = Object.keys(CALC).map(function (k, i) { return chip('tipo', 'radio', k, CALC[k].label, i === 0); }).join('');
    var state = { type: 'web' };
    var drawOptions = function () {
      var c = CALC[state.type];
      $('calcSizeLabel').textContent = c.sizeLabel;
      sizeBox.innerHTML = c.sizes.map(function (z, i) { return chip('tam', 'radio', z.id, z.n, i === 0); }).join('');
      extraBox.innerHTML = c.extras.map(function (x) { return chip('extra', 'checkbox', x.id, x.n, false, '+' + eur.format(x.p[0])); }).join('');
      update();
    };
    var summary = '';
    var update = function () {
      var c = CALC[state.type];
      var zId = (calcEl.querySelector('input[name="tam"]:checked') || {}).value;
      var z = c.sizes.filter(function (x) { return x.id === zId; })[0] || c.sizes[0];
      var ex = Array.prototype.map.call(calcEl.querySelectorAll('input[name="extra"]:checked'), function (i) { return c.extras.filter(function (x) { return x.id === i.value; })[0]; });
      var lo = z.p[0], hi = z.p[1];
      ex.forEach(function (x) { lo += x.p[0]; hi += x.p[1]; });
      var weeks = z.w + Math.ceil(ex.length / 2);
      $('calcPrice').textContent = eur.format(lo) + ' – ' + eur.format(hi);
      var meta = 'Plazo estimado: ' + weeks + (weeks === 1 ? ' semana' : ' semanas');
      if (c.monthly) meta += ' · luego ' + eur.format(c.monthly * (z.locales || 1)) + '/mes de mantenimiento';
      $('calcMeta').textContent = meta;
      var lines = [c.label + ': ' + z.n].concat(ex.map(function (x) { return x.n; }));
      $('calcSum').innerHTML = lines.map(function (l) { return '<li>' + l + '</li>'; }).join('');
      // primera letra en minúscula, salvo nombres propios y siglas (Android, iPhone, SEO…)
      var lc = function (t) { return /^(Android|iPhone|SEO|TPV)\b/.test(t) || /^[A-Z]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1); };
      var what = { web: 'una web: ', app: 'una app para ', game: 'un videojuego: ', tpv: 'un TPV para ', custom: 'un desarrollo a medida: ' }[state.type] + lc(z.n);
      summary = 'Hola Lumen Studio, me gustaría cotizar ' + what + (ex.length ? ', con ' + ex.map(function (x) { return lc(x.n); }).join(', ') : '') + '.\n' +
        'La calculadora de la web me da ' + $('calcPrice').textContent + ' (' + lc(meta) + ').';
      $('calcWa').href = WA + '?text=' + encodeURIComponent(summary);
    };
    calcEl.addEventListener('change', function (e) {
      if (e.target.name === 'tipo') { state.type = e.target.value; drawOptions(); } else update();
    });
    calcEl.addEventListener('submit', function (e) { e.preventDefault(); });
    $('calcToForm').addEventListener('click', function () {
      var t = { web: 'Web', app: 'App', game: 'Videojuego', tpv: 'TPV', custom: 'A medida' }[state.type];
      $('cfType').value = t; $('cfMsg').value = summary + '\n\n';
      document.getElementById('contacto').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      setTimeout(function () { $('cfName').focus({ preventScroll: true }); }, 500);
    });
    drawOptions();
  }

  /* ---------- 9. formulario de contacto ---------- */
  var form = $('contactForm');
  if (form) {
    var status = $('cfStatus'), send = $('cfSend');
    var mailFallback = function (d) {
      var body = 'Nombre: ' + d.nombre + '\nEmail: ' + d.email + '\nTipo: ' + d.tipo + '\n\n' + d.mensaje;
      location.href = 'mailto:pietersd05@gmail.com?subject=' + encodeURIComponent('Proyecto: ' + d.tipo) + '&body=' + encodeURIComponent(body);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status'; status.textContent = '';
      if (!form.checkValidity()) {
        var bad = form.querySelector(':invalid'); if (bad) bad.focus();
        status.className = 'form-status is-err'; status.textContent = 'Revisa los campos marcados: nombre, un email válido y el mensaje.';
        return;
      }
      var d = { nombre: form.nombre.value.trim(), email: form.email.value.trim(), tipo: form.tipo.value, mensaje: form.mensaje.value.trim(), web: form.web.value };
      send.disabled = true; send.textContent = 'Enviando…';
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) { status.className = 'form-status is-ok'; status.textContent = '¡Recibido! Te respondemos lo antes posible.'; form.reset(); }
          else { status.className = 'form-status is-err'; status.textContent = 'No se pudo enviar desde la web: abrimos tu correo con el mensaje listo.'; mailFallback(d); }
        })
        .catch(function () { status.className = 'form-status is-err'; status.textContent = 'Sin conexión con el servidor: abrimos tu correo con el mensaje listo.'; mailFallback(d); })
        .then(function () { send.disabled = false; send.textContent = 'Enviar mensaje'; });
    });
  }
})();
