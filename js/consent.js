/* Lumen Studio — consentimiento de cookies y Google Analytics 4 (Consent Mode v2)
   - Por defecto todo «denied». gtag.js NO se descarga hasta que la persona pulsa «Aceptar».
   - La elección se guarda en localStorage['lumen-consent'] = 'granted' | 'denied' y se respeta en la siguiente visita.
   - Publicidad siempre denegada: solo se concede analytics_storage.
   - El aviso es un <dialog popover="manual"> no modal (la página sigue usable); se reabre desde el pie
     con «Cookies: cambiar preferencia».
   - js/main.js manda los eventos con window.lumenConsent.event(nombre, datos): solo salen si hay consentimiento. */
(function () {
  'use strict';
  var ID = 'G-WMW51G27H2', KEY = 'lumen-consent';
  var doc = document.documentElement;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  // Consent Mode v2: todo denegado mientras no haya una elección (no hay red: gtag.js aún no está)
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });

  var read = function () { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  var save = function (v) { try { localStorage.setItem(KEY, v); } catch (e) {} }; // si no se puede guardar, vale para esta visita

  var granted = false, loaded = false;
  var grant = function () {
    granted = true;
    window['ga-disable-' + ID] = false;
    gtag('consent', 'update', { analytics_storage: 'granted' }); // la publicidad sigue denegada
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);
  };
  // borra _ga y _ga_* en el dominio actual y en sus dominios padre (GA las pone en el más alto posible)
  var clearCookies = function () {
    var parts = location.hostname.split('.');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (!/^_ga(_|$)/.test(name)) return;
      document.cookie = name + '=; Max-Age=0; path=/';
      for (var i = 0; i < parts.length - 1; i++) {
        document.cookie = name + '=; Max-Age=0; path=/; domain=.' + parts.slice(i).join('.');
      }
    });
  };
  var deny = function () {
    granted = false;
    window['ga-disable-' + ID] = true; // si gtag ya estaba cargado (aceptó y luego cambió de opinión), deja de medir
    if (loaded) gtag('consent', 'update', { analytics_storage: 'denied' });
    clearCookies();
  };

  // ---------- el aviso ----------
  var box = document.getElementById('consent');
  if (box) {
    var canPopover = typeof box.showPopover === 'function';
    var opener = null;
    var isOpen = function () { return canPopover ? box.matches(':popover-open') : box.open; };
    // Champi y el botón de WhatsApp suben lo que mide el aviso para no quedar tapados (css: --consent-h)
    var lift = function () { doc.style.setProperty('--consent-h', isOpen() ? (box.offsetHeight + 16) + 'px' : '0px'); };
    if ('ResizeObserver' in window) new ResizeObserver(lift).observe(box);
    addEventListener('resize', lift);
    var show = function (from) {
      opener = from || null;
      var prev = document.activeElement;
      if (!isOpen()) { if (canPopover) box.showPopover(); else box.show(); } // sin Popover API: diálogo no modal
      // un <dialog> abierto enfoca su primer control; al cargar la página no se le roba el foco a nadie
      if (!opener && box.contains(document.activeElement)) {
        if (prev && prev !== document.body && prev.focus) prev.focus({ preventScroll: true }); else document.activeElement.blur();
      }
      lift();
      // solo se mueve el foco si lo pidió la persona (botón del pie); al cargar la página no se le roba
      if (opener) box.querySelector('[data-consent]').focus();
    };
    var hide = function () {
      if (isOpen()) { if (canPopover) box.hidePopover(); else box.close(); }
      lift();
      if (opener && opener.isConnected) opener.focus(); // el foco vuelve al botón del pie
      opener = null;
    };
    Array.prototype.forEach.call(box.querySelectorAll('[data-consent]'), function (b) {
      b.addEventListener('click', function () {
        var v = b.getAttribute('data-consent');
        save(v);
        if (v === 'granted') grant(); else deny();
        hide();
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll('.consent-open'), function (b) {
      b.addEventListener('click', function () { show(b); });
    });
    var choice = read();
    if (choice === 'granted') grant();
    else if (choice !== 'denied') show();
  } else if (read() === 'granted') {
    grant();
  }

  // si la elección cambia en otra pestaña, esta la sigue
  addEventListener('storage', function (e) {
    if (e.key !== KEY) return;
    if (e.newValue === 'granted' && !granted) grant();
    else if (e.newValue !== 'granted' && granted) deny();
  });

  window.lumenConsent = {
    granted: function () { return granted; },
    event: function (name, params) { if (granted) gtag('event', name, params || {}); }
  };
})();
