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
  // idioma de la página (index.html = es, en/index.html = en) y ruta base para los recursos
  var LANG = doc.lang === 'en' ? 'en' : 'es';
  var BASE = doc.getAttribute('data-base') || '';
  var T = function (es, en) { return LANG === 'en' ? en : es; };
  var L = function (v) { return Array.isArray(v) ? (LANG === 'en' ? v[1] : v[0]) : v; };

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
  // proyectos: cada miniatura cambia la imagen grande de su proyecto
  document.querySelectorAll('.project').forEach(function (pr) {
    var main = pr.querySelector('.project-main img'), name = pr.querySelector('.project-name').textContent;
    var thumbs = pr.querySelectorAll('.project-thumbs button');
    thumbs.forEach(function (b) {
      b.addEventListener('click', function () {
        thumbs.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        main.classList.add('is-swap');
        setTimeout(function () {
          main.src = b.dataset.src; main.width = +b.dataset.w; main.height = +b.dataset.h;
          main.alt = name + ': ' + b.dataset.alt;
          main.classList.toggle('is-contain', b.dataset.fit === 'contain');
          main.classList.remove('is-swap');
        }, 160);
      });
    });
  });
  // proyectos: filtros por tipo
  var filters = Array.prototype.slice.call(document.querySelectorAll('.filters button'));
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.setAttribute('aria-pressed', x === f); });
      document.querySelectorAll('.project').forEach(function (pr) {
        var show = f.dataset.filter === 'all' || pr.dataset.cat === f.dataset.filter;
        pr.hidden = !show; pr.classList.add('is-in'); pr.classList.toggle('is-in-filter', show);
      });
    });
  });

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
    { id: 'kara', n: ['Kara, la Rompeyelmos', 'Kara, the Helmbreaker'], role: ['Guerrera cuerpo a cuerpo', 'Melee warrior'], ult: ['Torbellino de Acero', 'Steel Whirlwind'], sum: ['Guerrera de primera línea. Aguanta mucho castigo, golpea en arco a todo lo que tenga cerca y salta al centro de la pelea con su hacha.', 'Front-line warrior. She takes a beating, swings in an arc at everything nearby and leaps into the thick of the fight with her axe.'] },
    { id: 'teo', n: ['Teo, Ojo de Halcón', 'Teo, Hawkeye'], role: ['Explorador a distancia', 'Ranged scout'], ult: ['Lluvia de Halcones', 'Rain of Hawks'], sum: ['Explorador a distancia. Dispara sin parar y castiga a los grupos desde lejos con flechas explosivas y lluvias de flechas, pero tiene poca vida.', 'Ranged scout. He never stops shooting and punishes groups from afar with explosive arrows and arrow storms, but he has little health.'] },
    { id: 'elara', n: ['Elara, la Runista', 'Elara, the Runist'], role: ['Mago protector', 'Protective mage'], ult: ['Gran Runa Ancestral', 'Great Ancestral Rune'], sum: ['Arcanista de las runas. Se protege con escudos que absorben el daño, empuja a los enemigos y quema el suelo con círculos rúnicos.', 'Rune arcanist. She shields herself with barriers that absorb damage, pushes enemies back and burns the ground with runic circles.'] },
    { id: 'nyx', n: ['Nyx, la Sombra', 'Nyx, the Shadow'], role: ['Asesina de dagas', 'Dagger assassin'], ult: ['Danza de Mil Cortes', 'Dance of a Thousand Cuts'], sum: ['Asesina de dagas. Ataca rapidísimo, encadena críticos enormes y aparece a la espalda de sus presas. Muy frágil si la rodean.', 'Dagger assassin. She strikes incredibly fast, chains huge critical hits and appears behind her prey. Very fragile if surrounded.'] },
    { id: 'ayla', n: ['Ayla, la Domadora', 'Ayla, the Tamer'], role: ['Invocadora de bestias', 'Beast summoner'], ult: ['Estampida', 'Stampede'], sum: ['Invocadora de lobos. Su cayado de espíritus mantiene a raya a los enemigos mientras su manada los caza, y su rugido los vuelve imparables.', 'Wolf summoner. Her spirit staff keeps enemies at bay while her pack hunts them, and her roar makes them unstoppable.'] },
    { id: 'brina', n: ['Brina, la Artificiera', 'Brina, the Artificer'], role: ['Ingeniera explosiva', 'Explosives engineer'], ult: ['Bombardeo', 'Bombardment'], sum: ['Ingeniera de explosivos. Lanza bombas que estallan en área y planta torretas que disparan solas. Destroza grupos grandes.', 'Explosives engineer. She throws bombs that blast an area and plants turrets that fire on their own. She shreds large groups.'] },
    { id: 'brann', n: ['Brann, el Berserker', 'Brann, the Berserker'], role: ['Furia cuerpo a cuerpo', 'Melee fury'], ult: ['Frenesí Rojo', 'Red Frenzy'], sum: ['Guerrero salvaje. Cuanto más herido está, más fuerte golpea, y cada golpe le devuelve vida. Su espadón parte lo que toca.', 'Savage warrior. The more hurt he is, the harder he hits, and every blow heals him. His greatsword splits whatever it touches.'] }
  ];
  var sprite = $('heroSprite'), roster = $('roster');
  if (sprite && roster) {
    var cur = 0, move = 'idle';
    var src = function (h, m) { return BASE + 'assets/img/heroes/' + h.id + '_' + m + '.webp'; };
    HEROES.forEach(function (h, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', i === 0); b.setAttribute('aria-label', L(h.n));
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
      sprite.alt = L(h.n);
    };
    var pick = function (i) {
      cur = i;
      var h = HEROES[i];
      Array.prototype.forEach.call(roster.children, function (b, k) { b.setAttribute('aria-selected', k === i); b.tabIndex = k === i ? 0 : -1; });
      $('heroName').textContent = L(h.n); $('heroRole').textContent = L(h.role); $('heroSum').textContent = L(h.sum); $('heroUlt').textContent = L(h.ult);
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
    if (!gframe.src) gframe.src = BASE + 'demos/fendaria/' + T('index.html', 'index_en.html');
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
    web: { label: ['Web', 'Website'], sizeLabel: ['¿Qué tipo de web?', 'What kind of website?'], sizes: [
      { id: 'landing', n: ['Landing de una página', 'One-page landing'], p: [600, 1200], w: 2 },
      { id: 'corp', n: ['Corporativa (hasta 8 páginas)', 'Business site (up to 8 pages)'], p: [1500, 3000], w: 4 },
      { id: 'shop', n: ['Tienda online', 'Online store'], p: [3000, 6000], w: 6 } ],
      extras: [ { id: 'i18n', n: ['Varios idiomas', 'Multiple languages'], p: [300, 600] }, { id: 'blog', n: ['Blog o gestor de contenidos', 'Blog or CMS'], p: [300, 700] },
        { id: 'book', n: ['Reservas o citas', 'Bookings or appointments'], p: [500, 1200] }, { id: 'seo', n: ['SEO inicial', 'Initial SEO'], p: [300, 600] } ] },
    app: { label: ['App', 'App'], sizeLabel: ['¿Para qué móviles?', 'Which phones?'], sizes: [
      { id: 'android', n: ['Android', 'Android'], p: [5000, 10000], w: 8 },
      { id: 'ios', n: ['iPhone', 'iPhone'], p: [5000, 10000], w: 8 },
      { id: 'both', n: ['Android y iPhone', 'Android and iPhone'], p: [8000, 16000], w: 10 } ],
      extras: [ { id: 'login', n: ['Usuarios y login', 'Users and login'], p: [800, 1600] }, { id: 'pay', n: ['Pagos dentro de la app', 'In-app payments'], p: [1200, 2500] },
        { id: 'push', n: ['Notificaciones', 'Push notifications'], p: [500, 1000] }, { id: 'admin', n: ['Panel de administración', 'Admin panel'], p: [1500, 3500] } ] },
    tpv: { label: ['TPV', 'POS'], sizeLabel: ['¿Cuántos locales?', 'How many locations?'], monthly: 39, sizes: [
      { id: 'one', n: ['1 local', '1 location'], p: [500, 900], w: 2, locales: 1 },
      { id: 'two', n: ['2 locales', '2 locations'], p: [800, 1400], w: 3, locales: 2 },
      { id: 'more', n: ['3 o más', '3 or more'], p: [1200, 2200], w: 4, locales: 3 } ],
      extras: [ { id: 'kiosk', n: ['Kiosco de autoservicio', 'Self-service kiosk'], p: [400, 900] }, { id: 'kds', n: ['Pantalla de cocina', 'Kitchen display'], p: [200, 500] },
        { id: 'print', n: ['Impresoras de tickets', 'Receipt printers'], p: [150, 400] }, { id: 'online', n: ['Pedidos para recoger', 'Pickup orders'], p: [600, 1400] } ] },
    custom: { label: ['A medida', 'Custom'], sizeLabel: ['¿Qué tamaño tiene?', 'How big is it?'], sizes: [
      { id: 'tool', n: ['Herramienta interna', 'Internal tool'], p: [2000, 5000], w: 4 },
      { id: 'saas', n: ['Plataforma o SaaS', 'Platform or SaaS'], p: [8000, 25000], w: 12 } ],
      extras: [ { id: 'inv', n: ['Facturación', 'Invoicing'], p: [1000, 3000] }, { id: 'dash', n: ['Panel con informes', 'Reporting dashboard'], p: [1000, 2500] },
        { id: 'api', n: ['Conexión con otras herramientas', 'Integrations with other tools'], p: [800, 2000] } ] }
  };
  var calcEl = $('calc');
  if (calcEl) {
    var eur = new Intl.NumberFormat(T('es-CO', 'en-US'), { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }); // precios en dólares
    var typeBox = $('calcType'), sizeBox = $('calcSize'), extraBox = $('calcExtras');
    var chip = function (name, type, value, text, checked, hint) {
      return '<label class="chip"><input type="' + type + '" name="' + name + '" value="' + value + '"' + (checked ? ' checked' : '') + '><span>' + text + (hint ? ' <small>' + hint + '</small>' : '') + '</span></label>';
    };
    typeBox.innerHTML = Object.keys(CALC).map(function (k, i) { return chip('tipo', 'radio', k, L(CALC[k].label), i === 0); }).join('');
    var state = { type: 'web' };
    var drawOptions = function () {
      var c = CALC[state.type];
      $('calcSizeLabel').textContent = L(c.sizeLabel);
      sizeBox.innerHTML = c.sizes.map(function (z, i) { return chip('tam', 'radio', z.id, L(z.n), i === 0); }).join('');
      extraBox.innerHTML = c.extras.map(function (x) { return chip('extra', 'checkbox', x.id, L(x.n), false, '+' + eur.format(x.p[0])); }).join('');
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
      var meta = T('Plazo estimado: ', 'Estimated time: ') + weeks + (weeks === 1 ? T(' semana', ' week') : T(' semanas', ' weeks'));
      if (c.monthly) meta += T(' · luego ', ' · then ') + eur.format(c.monthly * (z.locales || 1)) + T('/mes de mantenimiento', '/month maintenance');
      $('calcMeta').textContent = meta;
      var lines = [L(c.label) + ': ' + L(z.n)].concat(ex.map(function (x) { return L(x.n); }));
      $('calcSum').innerHTML = lines.map(function (l) { return '<li>' + l + '</li>'; }).join('');
      // primera letra en minúscula, salvo nombres propios y siglas (Android, iPhone, SEO…)
      var lc = function (t) { return /^(Android|iPhone|SEO|TPV)\b/.test(t) || /^[A-Z]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1); };
      if (LANG === 'en') {
        var whatEn = { web: 'a website: ', app: 'an app for ', tpv: 'a POS for ', custom: 'a custom build: ' }[state.type] + L(z.n);
        summary = 'Hi Lumen Studio, I would like a quote for ' + whatEn + (ex.length ? ', with ' + ex.map(function (x) { return L(x.n).toLowerCase(); }).join(', ') : '') + '.\n' +
          'The calculator on your site says ' + $('calcPrice').textContent + ' (' + meta.toLowerCase().replace('us$', 'US$') + ').';
      } else {
        var what = { web: 'una web: ', app: 'una app para ', tpv: 'un TPV para ', custom: 'un desarrollo a medida: ' }[state.type] + lc(L(z.n));
        summary = 'Hola Lumen Studio, me gustaría cotizar ' + what + (ex.length ? ', con ' + ex.map(function (x) { return lc(L(x.n)); }).join(', ') : '') + '.\n' +
          'La calculadora de la web me da ' + $('calcPrice').textContent + ' (' + lc(meta) + ').';
      }
      $('calcWa').href = WA + '?text=' + encodeURIComponent(summary);
    };
    calcEl.addEventListener('change', function (e) {
      if (e.target.name === 'tipo') { state.type = e.target.value; drawOptions(); } else update();
    });
    calcEl.addEventListener('submit', function (e) { e.preventDefault(); });
    $('calcToForm').addEventListener('click', function () {
      var t = { web: 'Web', app: 'App', tpv: 'TPV', custom: 'A medida' }[state.type]; // valores del <select> (iguales en los dos idiomas)
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
      var body = T('Nombre: ', 'Name: ') + d.nombre + '\nEmail: ' + d.email + T('\nTipo: ', '\nType: ') + d.tipo + '\n\n' + d.mensaje;
      location.href = 'mailto:pietersd05@gmail.com?subject=' + encodeURIComponent(T('Proyecto: ', 'Project: ') + d.tipo) + '&body=' + encodeURIComponent(body);
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status'; status.textContent = '';
      if (!form.checkValidity()) {
        var bad = form.querySelector(':invalid'); if (bad) bad.focus();
        status.className = 'form-status is-err'; status.textContent = T('Revisa los campos marcados: nombre, un email válido y el mensaje.', 'Please check the highlighted fields: name, a valid email and your message.');
        return;
      }
      var d = { nombre: form.nombre.value.trim(), email: form.email.value.trim(), tipo: form.tipo.value, mensaje: form.mensaje.value.trim(), web: form.web.value };
      send.disabled = true; send.textContent = T('Enviando…', 'Sending…');
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok) { status.className = 'form-status is-ok'; status.textContent = T('¡Recibido! Te respondemos lo antes posible.', 'Got it! We will get back to you soon.'); form.reset(); }
          else { status.className = 'form-status is-err'; status.textContent = T('No se pudo enviar desde la web: abrimos tu correo con el mensaje listo.', 'It could not be sent from the site: we are opening your email app with the message ready.'); mailFallback(d); }
        })
        .catch(function () { status.className = 'form-status is-err'; status.textContent = T('Sin conexión con el servidor: abrimos tu correo con el mensaje listo.', 'No connection to the server: we are opening your email app with the message ready.'); mailFallback(d); })
        .then(function () { send.disabled = false; send.textContent = T('Enviar mensaje', 'Send message'); });
    });
  }

  /* ---------- 10. Champi, la mascota: pasea por abajo y comenta cada sección ---------- */
  var champi = $('champi');
  if (champi) {
    var cBody = $('champiBody'), cBubble = $('champiBubble'), cBack = $('champiBack');
    var store = { get: function () { try { return localStorage.getItem('champi-off'); } catch (e) { return null; } },
                  set: function (v) { try { if (v) localStorage.setItem('champi-off', '1'); else localStorage.removeItem('champi-off'); } catch (e) {} } };
    var TIPS = {
      inicio: T('¡Hola! Soy Champi. Dale un golpe al farol, verás qué pasa.', 'Hi! I’m Champi. Give the lantern a tap and see what happens.'),
      proyectos: T('Toca las miniaturas para ver más de cada proyecto.', 'Tap the thumbnails to see more of each project.'),
      servicios: T('Webs, apps, TPV… aquí nadie se aburre.', 'Websites, apps, POS… nobody gets bored here.'),
      tpv: T('Pide un kebab en el kiosco y mira cómo llega a cocina.', 'Order a kebab at the kiosk and watch it reach the kitchen.'),
      fendaria: T('¡Yo salgo en Fendaria! Busca a mis primos en las Grietas.', 'I’m in Fendaria! Look for my cousins in the Rifts.'),
      opiniones: T('Clientes contentos, setas contentas.', 'Happy clients, happy mushrooms.'),
      proceso: T('Primero hablamos, luego diseñamos y después programamos.', 'First we talk, then we design, then we code.'),
      presupuesto: T('Elige lo que necesitas y te digo cuánto cuesta.', 'Pick what you need and I’ll tell you what it costs.'),
      contacto: T('Escríbenos: yo vigilo el buzón.', 'Write to us: I keep an eye on the inbox.')
    };
    var POKES = [T('¡Ey, que hace cosquillas!', 'Hey, that tickles!'), T('Soy una seta, no un botón.', 'I’m a mushroom, not a button.'),
      T('¿Hablamos de tu proyecto?', 'Shall we talk about your project?'), T('Si me tocas otra vez, bailo.', 'Tap me again and I’ll dance.')];
    var size = function () { return innerWidth <= 680 ? 48 : 88; };
    var x = -120, target = 24, dir = 1, walking = false, lastT = 0, bubbleTimer = 0, wanderTimer = 0, poke = 0, lastSec = '';
    var maxX = function () { return Math.max(24, innerWidth - size() - (innerWidth <= 680 ? 84 : 110)); };
    var place = function () {
      champi.style.setProperty('--cx', x.toFixed(1) + 'px');
      champi.style.setProperty('--dir', dir);
      champi.classList.toggle('is-right', x > innerWidth / 2);
    };
    var say = function (text, ms) {
      clearTimeout(bubbleTimer);
      cBubble.textContent = text;
      cBubble.classList.add('is-on');
      bubbleTimer = setTimeout(function () { cBubble.classList.remove('is-on'); }, ms || 4200);
    };
    var walk = function (t) {
      var dt = Math.min(0.05, (t - lastT) / 1000 || 0.016); lastT = t;
      var d = target - x, speed = innerWidth <= 680 ? 70 : 95;
      if (Math.abs(d) < 2) { walking = false; champi.classList.remove('is-walk'); x = target; place(); return; }
      dir = d > 0 ? 1 : -1;
      x += dir * Math.min(Math.abs(d), speed * dt);
      place();
      requestAnimationFrame(walk);
    };
    var goTo = function (nx) {
      target = Math.max(16, Math.min(maxX(), nx));
      if (reduce) { x = target; place(); return; }
      if (!walking) { walking = true; champi.classList.add('is-walk'); lastT = performance.now(); requestAnimationFrame(walk); }
    };
    var wander = function () {
      clearTimeout(wanderTimer);
      wanderTimer = setTimeout(function () {
        if (!champi.hidden && !walking && document.visibilityState === 'visible') goTo(16 + Math.random() * (maxX() - 16));
        wander();
      }, 9000 + Math.random() * 7000);
    };
    // la sección que ocupa el centro de la pantalla
    var sections = ['inicio', 'proyectos', 'servicios', 'tpv', 'fendaria', 'opiniones', 'proceso', 'presupuesto', 'contacto']
      .map(function (id) { return document.getElementById(id); }).filter(Boolean);
    var checkSection = function () {
      if (champi.hidden) return;
      var mid = innerHeight * 0.5, cur = null;
      sections.forEach(function (sec) { var r = sec.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) cur = sec.id; });
      if (cur && cur !== lastSec) {
        lastSec = cur;
        goTo(16 + Math.random() * (maxX() - 16));
        setTimeout(function () { say(TIPS[cur]); }, reduce ? 0 : 500);
      }
    };
    var sTick = false;
    addEventListener('scroll', function () { if (!sTick) { sTick = true; setTimeout(function () { sTick = false; checkSection(); }, 250); } }, { passive: true });
    addEventListener('resize', function () { if (x > maxX()) { x = maxX(); target = x; place(); } });
    cBody.addEventListener('click', function () {
      champi.classList.remove('is-wave'); void champi.offsetWidth; champi.classList.add('is-wave');
      setTimeout(function () { champi.classList.remove('is-wave'); }, 800);
      say(POKES[poke++ % POKES.length], 3000);
    });
    var show = function () {
      champi.hidden = false; if (cBack) cBack.hidden = true;
      x = -size() - 20; place();
      setTimeout(function () { goTo(innerWidth <= 680 ? 16 : 40); lastSec = ''; setTimeout(checkSection, 1400); }, 600);
      wander();
    };
    $('champiClose').addEventListener('click', function () {
      champi.hidden = true; store.set(true); clearTimeout(wanderTimer);
      if (cBack) { cBack.hidden = false; }
    });
    if (cBack) cBack.addEventListener('click', function () { store.set(false); show(); });
    if (store.get()) { if (cBack) cBack.hidden = false; }
    else setTimeout(show, 1200);
  }
})();
