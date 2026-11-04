// Motor de los videos: cada página define window.TIMELINE = [[segundo, función], …] y window.DURATION.
// grabar.cjs llama a window.play() cuando las letras ya cargaron.
(function () {
  var $ = function (id) { return document.getElementById(id); };
  window.V = {
    // Champi y el cursor se ven sin la clase «on»: para ellos on/off también cambia la visibilidad
    on: function () { for (var i = 0; i < arguments.length; i++) { var e = $(arguments[i]); e.classList.add('on'); e.style.visibility = ''; } },
    off: function () { for (var i = 0; i < arguments.length; i++) { var e = $(arguments[i]); e.classList.remove('on'); if (e.classList.contains('ch') || e.classList.contains('cursor')) e.style.visibility = 'hidden'; } },
    cap: function (text) { var c = $('cap'); c.textContent = text || ''; },
    pose: function (id, kind, dir) { var e = $(id); e.className = 'el ch' + (kind ? ' ' + kind : ''); if (dir) e.style.setProperty('--dir', dir); },
    move: function (id, x, y, secs) { var e = $(id); e.style.transition = 'left ' + secs + 's linear, top ' + secs + 's linear'; e.style.left = x + 'px'; if (y != null) e.style.top = y + 'px'; },
    at: function (id, x, y) { var e = $(id); e.style.transition = 'none'; e.style.left = x + 'px'; e.style.top = y + 'px'; },
    sparks: function (x, y, n) {
      for (var i = 0; i < (n || 14); i++) {
        var s = document.createElement('i'); s.className = 'spark';
        var a = Math.random() * Math.PI * 2, r = 120 + Math.random() * 220;
        s.style.left = x + 'px'; s.style.top = y + 'px';
        s.style.setProperty('--dx', Math.cos(a) * r + 'px'); s.style.setProperty('--dy', Math.sin(a) * r + 'px');
        document.querySelector('.stage').appendChild(s); setTimeout(function (el) { el.remove(); }, 1000, s);
      }
    }
  };
  window.play = function () {
    var t0 = performance.now();
    (window.TIMELINE || []).forEach(function (step) { setTimeout(step[1], step[0] * 1000); });
    return new Promise(function (res) { setTimeout(res, (window.DURATION || 10) * 1000 + 200); });
  };
})();
