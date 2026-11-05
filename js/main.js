/* Lumen Studio — interacción
   1) luz del farol en el hero y luz del ratón por toda la página   2) barra fija
   3) entradas por sección e inclinación de las capturas   4) vídeos solo en pantalla
   5) TPV real incrustado (demos/tpv)   6) selector de personajes de Fendaria
   8) calculadora de presupuesto   9) formulario de contacto (api/contact.js, con correo de respaldo)
   10) Champi: pasea, comenta, se puede arrastrar y responde preguntas (api/champi.mjs o respuestas preparadas) */
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
  // estadísticas (Vercel Web Analytics): eventos anónimos, sin cookies; si el script no carga, no pasa nada
  var track = function (name, data) { try { if (window.va) window.va('event', { name: name, data: data || {} }); } catch (e) {} };
  var where = function (el) { var sec = el.closest('section[id], footer, header, #champi'); return sec ? (sec.id || sec.tagName.toLowerCase()) : 'otro'; };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/wa\.me\//.test(h)) track('whatsapp', { lugar: a.id === 'calcWa' ? 'calculadora' : where(a) });
    else if (/^mailto:/.test(h)) track('email', { lugar: where(a) });
    else if (/instagram\.com|tiktok\.com/.test(h)) track('redes', { red: /tiktok/.test(h) ? 'tiktok' : 'instagram', lugar: where(a) });
    else if (/archivum\.es|vitralesperafan\.com|althaya\.com\.au/.test(h)) track('visita_proyecto', { web: a.hostname });
  }, true);
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
      var modern = doc.getAttribute('data-theme') === 'light'; // el logo moderno no se balancea: late
      if (reduce || modern) { lampBtn.classList.remove('is-hit'); void lampBtn.offsetWidth; lampBtn.classList.add('is-hit'); setTimeout(function () { lampBtn.classList.remove('is-hit'); }, 600); if (modern) sparks(x, y, dir); return; }
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

  /* ---------- 1c. modo claro (Lumen moderno): a claro con bloques, a oscuro rompiéndose; todo nace del farol ---------- */
  var themeBtns = document.querySelectorAll('.theme-btn');
  if (themeBtns.length) {
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    var paint = function () {
      var light = doc.getAttribute('data-theme') === 'light';
      Array.prototype.forEach.call(themeBtns, function (b) {
        b.setAttribute('aria-pressed', light ? 'true' : 'false');
        b.setAttribute('aria-label', light ? T('Cambiar a modo oscuro', 'Switch to dark mode') : T('Cambiar a modo claro', 'Switch to light mode'));
      });
      if (metaTheme) metaTheme.setAttribute('content', light ? '#f6f4ef' : '#0a090d');
    };
    var apply = function (light) {
      if (light) doc.setAttribute('data-theme', 'light'); else doc.removeAttribute('data-theme');
      try { localStorage.setItem('lumen-theme', light ? 'light' : 'dark'); } catch (e) {}
      paint();
      var lb = $('lamp'); if (lb) { lb.classList.remove('is-hit'); void lb.offsetWidth; lb.classList.add('is-hit'); setTimeout(function () { lb.classList.remove('is-hit'); }, 700); }
    };
    var switching = false;
    var toggleTheme = function (btn) {
      if (switching) return;
      var toLight = doc.getAttribute('data-theme') !== 'light';
      track('tema', { modo: toLight ? 'claro' : 'oscuro' });
      if (reduce) { apply(toLight); return; }
      switching = true;
      var w = innerWidth, h = innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
      var cv = document.createElement('canvas'); cv.className = 'pixel-veil';
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      document.body.appendChild(cv);
      var ctx = cv.getContext('2d'); ctx.scale(dpr, dpr);
      // todo nace del centro del farol (aunque esté fuera de la pantalla); si no hay farol, del botón
      var src = $('lamp'), r = (src || btn).getBoundingClientRect();
      var ox = r.left + r.width / 2, oy = r.top + r.height * 0.55;
      var done = function () { cv.remove(); switching = false; };
      (toLight ? blocks : shatter)(ctx, w, h, ox, oy, function () { apply(toLight); }, done);
    };
    var ease = function (t) { return t < 0 ? 0 : t > 1 ? 1 : 1 - Math.pow(1 - t, 3); };
    var rrect = function (c, x, y, ww, hh, rad) {
      rad = Math.min(rad, ww / 2, hh / 2);
      c.beginPath(); c.moveTo(x + rad, y); c.arcTo(x + ww, y, x + ww, y + hh, rad); c.arcTo(x + ww, y + hh, x, y + hh, rad);
      c.arcTo(x, y + hh, x, y, rad); c.arcTo(x, y, x + ww, y, rad); c.closePath();
    };
    // oscuro → claro: bloques redondeados que crecen en ola desde el farol y luego se retiran
    var blocks = function (ctx, w, h, ox, oy, swap, done) {
      var size = Math.max(64, Math.round(Math.min(w, h) / 6.5)), gap = 6;
      var cols = Math.ceil(w / size) + 1, rows = Math.ceil(h / size) + 1, list = [], maxD = 0;
      for (var y = 0; y < rows; y++) for (var x = 0; x < cols; x++) {
        var cx = x * size + size / 2, cy = y * size + size / 2, d = Math.hypot(cx - ox, cy - oy);
        var roll = Math.random();
        list.push({ x: x * size, y: y * size, d: d, c: roll < 0.1 ? '#e8a33a' : roll < 0.16 ? '#141218' : '#f6f4ef' });
        if (d > maxD) maxD = d;
      }
      var WAVE = 900, GROW = 520, HOLD = 160, t0 = performance.now(), swapped = false;
      var draw = function (k, out) {
        ctx.clearRect(0, 0, w, h);
        for (var i = 0; i < list.length; i++) {
          var c = list[i], local = (k - (c.d / maxD) * WAVE) / GROW, e = ease(local);
          if (out) e = 1 - e;
          if (e <= 0.001) continue;
          var full = size + 1, s = (out ? full : full - gap * (1 - e)) * e, inset = (full - s) / 2;
          ctx.fillStyle = out ? '#f6f4ef' : (e > 0.999 ? '#f6f4ef' : c.c);
          rrect(ctx, c.x + inset, c.y + inset, s, s, 18 * (1 - e) + (out ? 18 * (1 - e) : 2));
          ctx.fill();
        }
      };
      var frame = function (t) {
        var k = t - t0;
        if (!swapped) {
          draw(k, false);
          if (k >= WAVE + GROW + HOLD) { ctx.fillStyle = '#f6f4ef'; ctx.fillRect(0, 0, w, h); swap(); swapped = true; t0 = t; }
        } else {
          draw(k, true);
          if (k >= WAVE + GROW) return done();
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    // claro → oscuro: la página se agrieta desde el farol y los pedazos caen dejando ver el estilo oscuro
    var shatter = function (ctx, w, h, ox, oy, swap, done) {
      var R = Math.hypot(Math.max(ox, w - ox), Math.max(oy, h - oy)) + 80;
      var N = 16, angles = [], rings = [0, 70, 170, 300, 470, 680, 940, 1250, 1650, 2200].filter(function (v, i, arr) { return i === 0 || arr[i - 1] < R; });
      rings.push(rings[rings.length - 1] * 1.4 + 200); // anillo de sobra: ninguna esquina queda sin cubrir
      for (var i = 0; i < N; i++) angles.push((i + 0.25 + Math.random() * 0.5) / N * Math.PI * 2);
      // vértices con algo de azar para que las grietas no sean perfectas
      var pt = function (ri, ai) {
        var rad = rings[ri] * (ri ? 0.72 + Math.random() * 0.5 : 0), a = angles[ai % N] + (ri ? (Math.random() - 0.5) * 0.22 : 0);
        return [ox + Math.cos(a) * rad, oy + Math.sin(a) * rad];
      };
      var grid = rings.map(function (_, ri) { return angles.map(function (_, ai) { return pt(ri, ai); }); });
      // como en un vidrio: solo algunos tramos de cada anillo se ven agrietados, y las grietas radiales van quebradas
      var ringSeg = rings.map(function (_, ri) { return angles.map(function () { return ri > 0 && Math.random() < (ri < 3 ? 0.75 : 0.42); }); });
      var kink = rings.map(function () { return angles.map(function () { return (Math.random() - 0.5) * 26; }); });
      var shards = [];
      for (var ri = 0; ri < rings.length - 1; ri++) for (var ai = 0; ai < N; ai++) {
        var poly = [grid[ri][ai], grid[ri][(ai + 1) % N], grid[ri + 1][(ai + 1) % N], grid[ri + 1][ai]];
        var mx = 0, my = 0; poly.forEach(function (p) { mx += p[0] / 4; my += p[1] / 4; });
        var dir = Math.atan2(my - oy, mx - ox);
        shards.push({ p: poly, cx: mx, cy: my, d: Math.hypot(mx - ox, my - oy), vx: Math.cos(dir) * (60 + Math.random() * 140), vy: Math.sin(dir) * 80 - 120 - Math.random() * 120, rot: (Math.random() - 0.5) * 2.4 });
      }
      var CRACK = 750, FALL = 1200, t0 = performance.now(), swapped = false;
      var cracks = function (k) { // grietas que avanzan desde el farol
        var reach = ease(k) * R;
        ctx.lineWidth = 1.6; ctx.strokeStyle = 'rgba(20,18,24,.55)'; ctx.beginPath();
        for (var ai = 0; ai < N; ai++) {
          ctx.moveTo(ox, oy);
          for (var ri = 1; ri < rings.length; ri++) {
            if (rings[ri - 1] > reach) break;
            var p0 = grid[ri - 1][ai], q = grid[ri][ai];
            ctx.lineTo((p0[0] + q[0]) / 2 + kink[ri][ai], (p0[1] + q[1]) / 2 - kink[ri][ai] * 0.6); ctx.lineTo(q[0], q[1]);
          }
        }
        for (var rj = 1; rj < rings.length; rj++) {
          if (rings[rj] > reach) break;
          for (var aj = 0; aj < N; aj++) {
            if (!ringSeg[rj][aj]) continue;
            var a1 = grid[rj][aj], a2 = grid[rj][(aj + 1) % N];
            ctx.moveTo(a1[0], a1[1]); ctx.lineTo(a2[0], a2[1]);
          }
        }
        ctx.stroke();
      };
      var frame = function (t) {
        var k = t - t0;
        ctx.clearRect(0, 0, w, h);
        if (!swapped) {
          var f = Math.min(1, k / CRACK);
          ctx.fillStyle = 'rgba(246,244,239,' + (ease(f) * 0.96).toFixed(3) + ')'; ctx.fillRect(0, 0, w, h); // la página se apaga bajo las grietas
          cracks(f);
          if (f >= 1) { swap(); swapped = true; t0 = t; }
        } else {
          var allGone = true;
          for (var i = 0; i < shards.length; i++) {
            var sh = shards[i], delay = (sh.d / R) * 380, tt = Math.max(0, (k - delay) / 1000);
            if (k - delay < FALL) allGone = false;
            var life = tt / (FALL / 1000), dx = sh.vx * tt, dy = sh.vy * tt + 0.5 * 3000 * tt * tt, ang = sh.rot * tt, alpha = life < 0.7 ? 1 : 1 - Math.min(1, (life - 0.7) / 0.3);
            if (alpha <= 0) continue;
            ctx.save(); ctx.globalAlpha = alpha;
            ctx.translate(sh.cx + dx, sh.cy + dy); ctx.rotate(ang); ctx.translate(-sh.cx, -sh.cy);
            ctx.beginPath(); ctx.moveTo(sh.p[0][0], sh.p[0][1]); for (var j = 1; j < 4; j++) ctx.lineTo(sh.p[j][0], sh.p[j][1]); ctx.closePath();
            ctx.fillStyle = '#f6f4ef'; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = 'rgba(20,18,24,.35)'; ctx.stroke();
            ctx.restore();
          }
          if (allGone) return done();
        }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    Array.prototype.forEach.call(themeBtns, function (b) { b.addEventListener('click', function () { toggleTheme(b); }); });
    paint();
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
      if (!frame.src) { frame.src = frame.dataset.src + (route || '#/'); track('tpv_demo'); }
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
    var calcUsed = false;
    calcEl.addEventListener('change', function (e) {
      if (!calcUsed) { calcUsed = true; track('calculadora'); }
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
          if (res.ok) { track('formulario'); status.className = 'form-status is-ok'; status.textContent = T('¡Recibido! Te respondemos lo antes posible.', 'Got it! We will get back to you soon.'); form.reset(); }
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
    // la ✕ solo lo esconde hasta recargar; se borra lo que guardaban las versiones anteriores
    try { localStorage.removeItem('champi-off'); } catch (e) {}
    var TIPS = {
      inicio: T('¡Hola! Soy Champi. Tócame para preguntarme algo, o agárrame y llévame a pasear.', 'Hi! I’m Champi. Tap me to ask me something, or pick me up and take me for a walk.'),
      proyectos: T('Toca las miniaturas para ver más de cada proyecto.', 'Tap the thumbnails to see more of each project.'),
      servicios: T('Webs, apps, TPV… aquí nadie se aburre.', 'Websites, apps, POS… nobody gets bored here.'),
      tpv: T('Pide un kebab en el kiosco y mira cómo llega a cocina.', 'Order a kebab at the kiosk and watch it reach the kitchen.'),
      fendaria: T('¡Yo salgo en Fendaria! Busca a mis primos en las Grietas.', 'I’m in Fendaria! Look for my cousins in the Rifts.'),
      opiniones: T('Clientes contentos, setas contentas.', 'Happy clients, happy mushrooms.'),
      proceso: T('Primero hablamos, luego diseñamos y después programamos.', 'First we talk, then we design, then we code.'),
      presupuesto: T('Elige lo que necesitas y te digo cuánto cuesta.', 'Pick what you need and I’ll tell you what it costs.'),
      contacto: T('Escríbenos: yo vigilo el buzón.', 'Write to us: I keep an eye on the inbox.')
    };
    var size = function () { return innerWidth <= 680 ? 48 : 88; };
    var x = -120, target = 24, dir = 1, walking = false, lastT = 0, bubbleTimer = 0, wanderTimer = 0, lastSec = '';
    var cy = 0, ang = 0, held = false, falling = false; // arrastrar: altura sobre el suelo y balanceo
    var running = false, arrive = null, chatting = false, runSpeed = 320; // correr a su rincón mientras el chat está abierto
    var maxX = function () { return Math.max(24, innerWidth - size() - (innerWidth <= 680 ? 84 : 110)); };
    var cChat = $('champiChat');
    var place = function () {
      champi.style.setProperty('--cx', x.toFixed(1) + 'px');
      champi.style.setProperty('--cy', cy.toFixed(1) + 'px');
      champi.style.setProperty('--dir', dir);
      champi.classList.toggle('is-right', x > innerWidth / 2);
      cBody.style.transform = Math.abs(ang) > 0.1 ? 'rotate(' + ang.toFixed(2) + 'deg)' : '';
      if (cChat && !cChat.hidden) { // el chat nunca se sale de la pantalla
        var w = cChat.offsetWidth, left = Math.max(12, Math.min(innerWidth - 12 - w, x));
        cChat.style.left = (left - x) + 'px';
      }
    };
    var say = function (text, ms) {
      clearTimeout(bubbleTimer);
      cBubble.textContent = text;
      cBubble.classList.add('is-on');
      bubbleTimer = setTimeout(function () { cBubble.classList.remove('is-on'); }, ms || 4200);
    };
    var walk = function (t) {
      if (held || falling) { walking = false; champi.classList.remove('is-walk'); return; } // lo han cogido: deja de andar
      var dt = Math.min(0.05, (t - lastT) / 1000 || 0.016); lastT = t;
      var d = target - x, speed = running ? runSpeed : (innerWidth <= 680 ? 70 : 95);
      if (Math.abs(d) < 2) {
        walking = false; running = false; champi.classList.remove('is-walk', 'is-run'); x = target; place();
        var cb = arrive; arrive = null; if (cb) cb();
        return;
      }
      dir = d > 0 ? 1 : -1;
      x += dir * Math.min(Math.abs(d), speed * dt);
      place();
      requestAnimationFrame(walk);
    };
    var goTo = function (nx, opts) {
      opts = opts || {};
      if (held || falling) return;
      if (chatting && !opts.force) return; // con el chat abierto se queda quieto en su rincón
      target = Math.max(16, Math.min(maxX(), nx));
      running = !!opts.run; arrive = opts.done || null;
      if (running) runSpeed = Math.max(innerWidth <= 680 ? 190 : 320, Math.abs(target - x) / 1.3); // la carrera dura como mucho 1,3 s
      champi.classList.toggle('is-run', running);
      if (reduce) { x = target; place(); var cb = arrive; arrive = null; if (cb) cb(); return; }
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
      if (champi.hidden || held || falling || chatting) return;
      var mid = innerHeight * 0.5, cur = null;
      sections.forEach(function (sec) { var r = sec.getBoundingClientRect(); if (r.top < mid && r.bottom > mid) cur = sec.id; });
      if (cur && cur !== lastSec) {
        lastSec = cur;
        goTo(16 + Math.random() * (maxX() - 16));
        setTimeout(function () { if (!chatting && !held) say(TIPS[cur]); }, reduce ? 0 : 500);
      }
    };
    var sTick = false;
    addEventListener('scroll', function () { if (!sTick) { sTick = true; setTimeout(function () { sTick = false; checkSection(); }, 250); } }, { passive: true });
    addEventListener('resize', function () { if (x > maxX()) { x = maxX(); target = x; place(); } });
    var wave = function () {
      champi.classList.remove('is-wave'); void champi.offsetWidth; champi.classList.add('is-wave');
      setTimeout(function () { champi.classList.remove('is-wave'); }, 800);
    };

    // --- coger y soltar: se queda colgando de la cabeza, se balancea y al soltarlo cae ---
    var DROPS = [T('¡Uf, qué vértigo!', 'Whoa, I’m dizzy!'), T('¡Aterrizaje perfecto!', 'Perfect landing!'),
      T('Avisa antes de volar, ¿eh?', 'Warn me before we fly, OK?'), T('Me gustan las alturas… desde abajo.', 'I like heights… from down here.')];
    var drag = null, prevX = 0, angV = 0, swingRaf = 0;
    var swing = function () {
      if (!held) { swingRaf = 0; return; }
      var vx = x - prevX; prevX = x;
      angV += vx * 0.9 - ang * 0.1;   // muelle: el cuerpo se queda atrás al moverlo y luego oscila
      angV *= 0.88;
      ang = Math.max(-35, Math.min(35, ang + angV));
      place();
      swingRaf = requestAnimationFrame(swing);
    };
    var holdAt = function (px, py) {
      var sz = size();
      x = px - sz / 2;
      cy = Math.min(0, py - innerHeight + sz);   // la argolla de la seta bajo el puntero
      if (reduce) place();
    };
    var startHold = function () {
      held = true; walking = false; running = false; arrive = null; champi.classList.remove('is-walk', 'is-run');
      champi.classList.add('is-held');
      cBubble.classList.remove('is-on'); closeChat();
      prevX = x; angV = 0;
      if (!reduce && !swingRaf) swingRaf = requestAnimationFrame(swing);
    };
    var drop = function () {
      held = false; champi.classList.remove('is-held');
      var land = function () {
        falling = false; champi.classList.remove('is-falling'); cy = 0; ang = 0;
        x = Math.max(16, Math.min(maxX(), x)); target = x; place();
        say(DROPS[Math.floor(Math.random() * DROPS.length)], 2600);
        wander();
      };
      if (reduce || cy >= 0) { land(); return; }
      falling = true; champi.classList.add('is-falling');
      var vy = 0, t0 = performance.now(), bounced = false;
      var fall = function (t) {
        var dt = Math.min(0.033, (t - t0) / 1000); t0 = t;
        vy += 2600 * dt; cy += vy * dt; ang *= 0.86;
        if (cy >= 0) {
          cy = 0;
          if (!bounced && vy > 500) { vy = -vy * 0.28; bounced = true; } else { place(); land(); return; }
        }
        place(); requestAnimationFrame(fall);
      };
      requestAnimationFrame(fall);
    };
    cBody.addEventListener('pointerdown', function (e) {
      if (e.button > 0 || falling) return;
      drag = { sx: e.clientX, sy: e.clientY, moved: false };
      try { cBody.setPointerCapture(e.pointerId); } catch (err) {}
    });
    cBody.addEventListener('pointermove', function (e) {
      if (!drag) return;
      if (!drag.moved) {
        if (Math.abs(e.clientX - drag.sx) + Math.abs(e.clientY - drag.sy) < 8) return;
        drag.moved = true; startHold();
      }
      holdAt(e.clientX, e.clientY);
      e.preventDefault();
    });
    var endDrag = function (cancel) {
      if (!drag) return;
      var moved = drag.moved; drag = null;
      if (moved) drop(); else if (!cancel) toggleChat();
    };
    cBody.addEventListener('pointerup', function () { endDrag(false); });
    cBody.addEventListener('pointercancel', function () { endDrag(true); });
    // con teclado (Enter/Espacio) el botón dispara click sin pointerdown
    cBody.addEventListener('click', function (e) { if (e.detail === 0) toggleChat(); });

    // --- chat: Claude si hay clave en el servidor (api/champi.mjs); si no, respuestas preparadas ---
    var cLog = $('champiLog'), cForm = $('champiForm'), cInput = $('champiInput'), cChips = $('champiChips');
    var chat = [], aiOff = false, busy = false;
    // --- respuestas guardadas (assets/data/champi-faq.json): se responden al momento y sin gastar créditos ---
    // Cada entrada tiene palabras clave (k), respuesta en es/en y, si es de precio o de plazo, su «intent».
    // Solo si ninguna encaja se pregunta a la IA (api/champi.mjs).
    var norm = function (t) { return t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim(); };
    var esc = function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
    var FAQ = null;
    var faqReady = fetch(BASE + 'assets/data/champi-faq.json').then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; })
      .then(function (list) {
        FAQ = list.map(function (e) {
          e.re = e.k.map(function (k) { k = norm(k); return { re: new RegExp('\\b' + esc(k) + '(s|es)?\\b'), w: k.split(' ').length }; });
          return e;
        });
      });
    var INTENT = {
      price: /\b(precios?|cuanto (cuesta|cuestan|vale|valen|cobran|cobrais|sale|salen)|cuesta|costos?|coste|tarifas?|presupuestos?|cotiza\w*|price\w*|cost\w*|how much|quotes?|rates?|budget)\b/,
      time: /\b(cuanto tiempo|tarda|tardan|tardais|tardaria|demora|demoran|plazos?|semanas|tiempo de entrega|cuando (sale|salen|estara|estaria|lanzan|llega|sera)|how long|timeline|when|weeks?)\b/
    };
    var OFF = function () {
      return T('Solo puedo ayudarte con lo que tiene que ver con Lumen Studio: webs, apps, el TPV, precios o contacto. Si es algo de tu proyecto, el equipo te responde por WhatsApp al +57 311 873 9670.', 'I can only help with things about Lumen Studio: websites, apps, the POS, prices or contact. If it’s about your project, the team will answer on WhatsApp at +57 311 873 9670.');
    };
    // la entrada que mejor encaja, o null si ninguna
    var local = function (q) {
      if (!FAQ || !FAQ.length) return null;
      var n = norm(q), intent = INTENT.price.test(n) ? 'price' : INTENT.time.test(n) ? 'time' : null;
      var best = null, top = 0, base = null;
      FAQ.forEach(function (e) {
        if (e.intent && e.intent !== intent) return;
        if (e.base) { base = e; return; }
        var sc = 0;
        e.re.forEach(function (r) { if (r.re.test(n)) sc += r.w * 2; });
        if (!sc) return;
        if (e.intent) sc += 0.5;           // «¿cuánto cuesta una app?» → el precio de la app, no «hacemos apps»
        if (e.weak) sc *= 0.4;             // un «hola» no gana a una pregunta de verdad
        if (sc > top) { top = sc; best = e; }
      });
      if (best && best.weak && n.split(' ').length > 3) best = null; // «hola, ¿…algo raro…?» → que lo vea la IA
      if (!best && intent) best = base;
      return best ? T(best.es, best.en) : null;
    };
    var add = function (text, who) {
      var p = document.createElement('p');
      p.className = 'champi-msg champi-msg--' + who;
      p.textContent = text;
      cLog.appendChild(p); cLog.scrollTop = cLog.scrollHeight;
      return p;
    };
    var CHIPS = [T('¿Cuánto cuesta una web?', 'How much is a website?'), T('¿Qué incluye el TPV?', 'What does the POS include?'),
      T('¿Hacen apps?', 'Do you build apps?'), T('¿Cómo los contacto?', 'How do I contact you?')];
    var ask = function (q) {
      q = q.trim(); if (!q || busy) return;
      busy = true; cChips.hidden = true;
      add(q, 'me'); chat.push({ role: 'user', content: q });
      var typing = add('…', 'bot'); typing.classList.add('champi-msg--typing');
      wave();
      var finish = function (reply) {
        typing.remove(); add(reply, 'bot');
        chat.push({ role: 'assistant', content: reply }); chat = chat.slice(-8); busy = false;
      };
      faqReady.then(function () {
        var saved = local(q);
        track('champi_pregunta', { respuesta: saved ? 'guardada' : aiOff ? 'sin_ia' : 'ia' });
        if (saved || aiOff) { setTimeout(function () { finish(saved || OFF()); }, 450); return; }
        fetch('/api/champi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: chat }) })
          .then(function (r) {
            if ([403, 404, 405, 501, 503].indexOf(r.status) >= 0) aiOff = true;
            if (r.status === 429) return { reply: T('Uf, me has hecho muchas preguntas seguidas. Para seguir, escríbenos por WhatsApp al +57 311 873 9670 y te responde el equipo.', 'Phew, that’s a lot of questions in a row. To keep going, message us on WhatsApp at +57 311 873 9670 and the team will answer.') };
            return r.ok ? r.json() : null;
          })
          .then(function (j) { finish(j && j.reply ? j.reply : OFF()); })
          .catch(function () { aiOff = true; finish(OFF()); });
      });
    };
    // al tocarlo: «dame un momento», corre a la esquina derecha, resopla y abre el chat ahí
    var showPanel = function () {
      if (!chatting || !cChat) return; // lo cerraron o lo cogieron mientras corría
      cBubble.classList.remove('is-on'); clearTimeout(bubbleTimer);
      cChat.hidden = false;
      if (!cLog.childElementCount) {
        add(T('¡Hola! Soy Champi. Pregúntame lo que quieras sobre webs, apps, el TPV o precios.', 'Hi! I’m Champi. Ask me anything about websites, apps, the POS or prices.'), 'bot');
        cChips.innerHTML = '';
        CHIPS.forEach(function (c) { var b = document.createElement('button'); b.type = 'button'; b.textContent = c; b.addEventListener('click', function () { ask(c); }); cChips.appendChild(b); });
      }
      place(); wave();
      if (finePointer) cInput.focus({ preventScroll: true });
    };
    var openChat = function () {
      if (!cChat || chatting) return;
      chatting = true; clearTimeout(wanderTimer); track('champi_chat');
      var dest = maxX();
      if (Math.abs(x - dest) < 24) { showPanel(); return; } // ya está en su rincón
      say(T('¡Dame un momento!', 'Give me a second!'), 1500);
      setTimeout(function () {
        if (!chatting) return;
        goTo(dest, { run: true, force: true, done: function () {
          if (!chatting) return;
          dir = -1; place(); // mira hacia la página
          say(T('Uff, me cansé… Aquí no te molesto.', 'Phew, I’m tired… I won’t get in your way here.'), 1600);
          setTimeout(showPanel, reduce ? 0 : 1300);
        } });
      }, reduce ? 0 : 450);
    };
    var closeChat = function () {
      if (!chatting && (!cChat || cChat.hidden)) return;
      chatting = false;
      if (cChat) cChat.hidden = true;
      if (!champi.hidden && !held) wander(); // vuelve a pasear como siempre
    };
    var toggleChat = function () { if (chatting) closeChat(); else openChat(); };
    if (cChat) {
      cForm.addEventListener('submit', function (e) { e.preventDefault(); var q = cInput.value; cInput.value = ''; ask(q); });
      $('champiChatClose').addEventListener('click', function () { closeChat(); cBody.focus(); });
      cChat.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeChat(); cBody.focus(); } });
    }

    var show = function () {
      champi.hidden = false; if (cBack) cBack.hidden = true;
      x = -size() - 20; place();
      setTimeout(function () { goTo(innerWidth <= 680 ? 16 : 40); lastSec = ''; setTimeout(checkSection, 1400); }, 600);
      wander();
    };
    $('champiClose').addEventListener('click', function () {
      champi.hidden = true; clearTimeout(wanderTimer); closeChat();
      if (cBack) { cBack.hidden = false; }
    });
    if (cBack) cBack.addEventListener('click', show);
    setTimeout(show, 1200);
  }
})();
