/* Lumen Studio — interacción
   1) la luz del farol sigue al puntero  2) entradas por sección  3) demo del TPV con la carta real de California */
(function () {
  'use strict';
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. luz del farol ---------- */
  var hero = document.querySelector('.hero');
  var win = document.querySelector('.lamp');
  function anchorLight() {
    if (!win) return;
    var r = win.getBoundingClientRect();
    tx = r.left + r.width / 2; ty = r.top + r.height * 0.42;
    if (!moved) { lx = tx; ly = ty; paint(); }
  }
  var lx = 0, ly = 0, tx = 0, ty = 0, moved = false, raf = 0;
  function paint() {
    doc.style.setProperty('--lx', lx.toFixed(1) + 'px');
    doc.style.setProperty('--ly', ly.toFixed(1) + 'px');
  }
  function loop() {
    lx += (tx - lx) * 0.08; ly += (ty - ly) * 0.08;
    paint();
    if (Math.abs(tx - lx) > 0.5 || Math.abs(ty - ly) > 0.5) raf = requestAnimationFrame(loop); else raf = 0;
  }
  anchorLight();
  addEventListener('resize', anchorLight);
  addEventListener('scroll', function () { if (!moved) anchorLight(); }, { passive: true });
  if (hero && !reduce) {
    hero.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      moved = true; tx = e.clientX; ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    });
    hero.addEventListener('pointerleave', function () {
      moved = false; var r = win.getBoundingClientRect();
      tx = r.left + r.width / 2; ty = r.top + r.height * 0.42;
      if (!raf) raf = requestAnimationFrame(loop);
    });
  }

  /* ---------- 2. entradas ---------- */
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    // escalonado dentro de cada sección: título, texto, imagen…
    var count = new Map();
    items.forEach(function (el) {
      var sec = el.closest('section, .row') || document.body;
      var n = count.get(sec) || 0; count.set(sec, n + 1);
      el.style.setProperty('--d', Math.min(n, 6) * 75 + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- vídeos: solo se reproducen en pantalla ---------- */
  var vids = document.querySelectorAll('video.autoplay');
  if ('IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting && !reduce) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else v.pause();
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vo.observe(v); });
  }

  /* ---------- deriva lenta de las capturas del juego al hacer scroll ---------- */
  var drift = document.querySelectorAll('.portrait img');
  if (drift.length && !reduce) {
    var ticking = false;
    var move = function () {
      var vh = innerHeight;
      drift.forEach(function (img, i) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var k = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = 'translateY(' + (k * (i % 2 ? -36 : -18)).toFixed(1) + 'px) scale(1.06)';
      });
      ticking = false;
    };
    addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
    move();
  }

  /* ---------- 3. TPV ---------- */
  // carta real de California (TPV_restaurante/supabase/migration.sql)
  var MENU = [
    { id: 'kebab-ternera', n: 'Kebab de ternera', p: 4.5, img: 'kebab' },
    { id: 'durum-mixto', n: 'Dürüm mixto', p: 6, img: 'durum' },
    { id: 'lahmacum-mixto', n: 'Lahmacum mixto', p: 6.5, img: 'lahmacun' },
    { id: 'plato-mixto', n: 'Plato mixto', p: 8, img: 'plato-mixto' },
    { id: 'hamburguesa', n: 'Hamburguesa', p: 4.5, img: 'hamburguesa-clasica' },
    { id: 'menu-doner', n: 'Menú Doner Kebab', p: 7.5, img: 'menu-doner-kebab' },
    { id: 'patatas-m', n: 'Patatas fritas', p: 5, img: 'patatas-fritas' },
    { id: 'refresco', n: 'Refresco lata', p: 1.8, img: 'coca-cola' }
  ];
  var eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
  var $ = function (id) { return document.getElementById(id); };
  var menuEl = $('posMenu'), linesEl = $('posLines'), totalEl = $('posTotal'), sendEl = $('posSend');
  var kdsEl = $('kds'), tillEl = $('till'), countEl = $('kdsCount'), whereEl = $('posWhere');
  if (!menuEl) return;

  var cart = {}, orders = [], seq = 11, table = 4;

  MENU.forEach(function (d) {
    var li = document.createElement('li');
    li.innerHTML = '<button class="dish" type="button" data-id="' + d.id + '" aria-label="Añadir ' + d.n + ', ' + eur.format(d.p) + '">' +
      '<img src="assets/img/menu/' + d.img + '.webp" width="360" height="225" alt="" loading="lazy">' +
      '<span>' + d.n + '<b>' + eur.format(d.p) + '</b></span></button>';
    menuEl.appendChild(li);
  });

  function total(c) { return Object.keys(c).reduce(function (s, id) { return s + find(id).p * c[id]; }, 0); }
  function find(id) { return MENU.filter(function (d) { return d.id === id; })[0]; }

  function renderCart() {
    var ids = Object.keys(cart);
    if (!ids.length) { linesEl.innerHTML = '<li class="pos-empty">Toca un plato para añadirlo</li>'; }
    else {
      linesEl.innerHTML = ids.map(function (id) {
        var d = find(id);
        return '<li><span class="qty">' + cart[id] + '</span><span>' + d.n + '</span>' +
          '<button type="button" data-less="' + id + '" aria-label="Quitar un ' + d.n + '">−</button></li>';
      }).join('');
    }
    totalEl.textContent = eur.format(total(cart));
    sendEl.disabled = !ids.length;
  }

  menuEl.addEventListener('click', function (e) {
    var b = e.target.closest('.dish'); if (!b) return;
    cart[b.dataset.id] = (cart[b.dataset.id] || 0) + 1;
    renderCart();
  });
  linesEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-less]'); if (!b) return;
    var id = b.dataset.less; cart[id]--; if (cart[id] <= 0) delete cart[id];
    renderCart();
  });

  sendEl.addEventListener('click', function () {
    if (!Object.keys(cart).length) return;
    seq++;
    orders.push({ n: seq, table: table, items: cart, at: Date.now(), done: false, paid: false });
    cart = {}; table = table % 12 + 1; whereEl.textContent = 'Mesa ' + table;
    renderCart(); renderKds(); renderTill();
    sendEl.textContent = 'Enviado a cocina';
    setTimeout(function () { sendEl.textContent = 'Enviar a cocina'; }, 1400);
  });

  function itemsList(c) {
    return Object.keys(c).map(function (id) { return '<li>' + c[id] + ' × ' + find(id).n + '</li>'; }).join('');
  }
  function ago(t) { var s = Math.floor((Date.now() - t) / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

  function renderKds() {
    var open = orders.filter(function (o) { return !o.done; }).length;
    countEl.hidden = !open; countEl.textContent = open;
    if (!orders.length) { kdsEl.innerHTML = '<li class="pos-empty">Sin comandas. Envía un pedido desde Sala.</li>'; return; }
    kdsEl.innerHTML = orders.slice().reverse().map(function (o) {
      return '<li class="kds-card' + (o.done ? ' is-done' : '') + '"><p class="kds-head"><span>#' + o.n + ' · Mesa ' + o.table + '</span>' +
        '<time data-at="' + o.at + '">' + ago(o.at) + '</time></p><ul>' + itemsList(o.items) + '</ul>' +
        '<button type="button" data-done="' + o.n + '">' + (o.done ? 'Hecho' : 'Marcar listo') + '</button></li>';
    }).join('');
  }
  kdsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-done]'); if (!b) return;
    orders.forEach(function (o) { if (o.n === +b.dataset.done) o.done = !o.done; });
    renderKds();
  });
  setInterval(function () {
    kdsEl.querySelectorAll('time[data-at]').forEach(function (t) { t.textContent = ago(+t.dataset.at); });
  }, 1000);

  function renderTill() {
    if (!orders.length) { tillEl.innerHTML = '<p class="pos-empty">Nada por cobrar todavía.</p>'; return; }
    tillEl.innerHTML = orders.slice().reverse().map(function (o) {
      var t = total(o.items), base = t / 1.1;
      return '<div class="till-order"><p class="till-row"><strong>#' + o.n + ' · Mesa ' + o.table + '</strong>' +
        (o.paid ? '<span class="till-paid">Cobrado · ' + o.paid + '</span>' : '<span>Pendiente</span>') + '</p>' +
        '<p class="till-row"><span>Base imponible</span><span>' + eur.format(base) + '</span></p>' +
        '<p class="till-row"><span>IVA 10 %</span><span>' + eur.format(t - base) + '</span></p>' +
        '<p class="till-row big"><span>Total</span><span>' + eur.format(t) + '</span></p>' +
        (o.paid ? '' : '<div class="till-pay"><button type="button" data-pay="' + o.n + '" data-how="tarjeta">Tarjeta</button>' +
          '<button type="button" data-pay="' + o.n + '" data-how="efectivo">Efectivo</button></div>') + '</div>';
    }).join('');
  }
  tillEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-pay]'); if (!b) return;
    orders.forEach(function (o) { if (o.n === +b.dataset.pay) o.paid = b.dataset.how; });
    renderTill();
  });

  // pestañas Sala / Cocina / Caja (teclado: flechas)
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1;
      $(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t); });
    t.addEventListener('keydown', function (e) {
      var k = e.key, j = k === 'ArrowRight' ? i + 1 : k === 'ArrowLeft' ? i - 1 : null;
      if (j === null) return; e.preventDefault();
      select(tabs[(j + tabs.length) % tabs.length], true);
    });
  });

  $('posReset').addEventListener('click', function () {
    cart = {}; orders = []; seq = 11; table = 4; whereEl.textContent = 'Mesa 4';
    renderCart(); renderKds(); renderTill(); select(tabs[0]);
  });
})();
