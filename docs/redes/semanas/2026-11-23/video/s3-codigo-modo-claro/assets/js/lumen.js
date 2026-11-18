// Ayudas compartidas de los videos de Lumen Studio (HyperFrames).
// Uso: const tl = gsap.timeline({ paused: true }); const L = Lumen(tl, DURACION);
// Todo es función del tiempo de la línea: nada de Math.random, relojes ni temporizadores.
window.Lumen = function (tl, END) {
  const L = {};

  // titulares: palabra a palabra con desenfoque, la línea entera, o salida palabra a palabra
  L.wordsIn = (sel, t) => tl.fromTo(sel + " .w", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.16, stagger: 0.075, ease: "power2.out" }, t);
  L.lineIn = (sel, t) => tl.fromTo(sel, { opacity: 0, filter: "blur(10px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "power2.out" }, t);
  L.wordsOut = (sel, t) => tl.to(sel + " .w", { opacity: 0, filter: "blur(8px)", duration: 0.16, stagger: 0.03, ease: "power1.in" }, t);
  L.out = (sel, t) => tl.to(sel, { opacity: 0, filter: "blur(6px)", duration: 0.2, ease: "power1.in" }, t);

  // ciclo de una tira de sprites entre t0 y t1 (fondo con repeat-x para que la vuelta no quede vacía)
  L.cycle = (sel, frames, w, t0, t1, fps) => {
    const d = frames / fps, reps = Math.max(0, Math.ceil((t1 - t0) / d) - 1);
    tl.fromTo(sel, { backgroundPosition: "0px 0px" }, { backgroundPosition: -frames * w + "px 0px", duration: d, ease: "steps(" + frames + ")", repeat: reps }, t0);
  };
  // Champi: muestra un solo sprite (walk, idle o wave) dentro de su contenedor
  L.pose = (id, t, name) => { for (const n of ["walk", "idle", "wave"]) tl.set(id + " ." + n, { opacity: n === name ? 1 : 0 }, t); };

  // dedo que llega, toca y se va (coordenadas dentro de su pantalla)
  L.finger = (sel) => {
    let inside = false;
    return {
      tap(t, x, y) {
        if (!inside) { tl.fromTo(sel, { x: x + 120, y: y + 170, opacity: 0, scale: 1 }, { x, y, opacity: 1, duration: 0.45, ease: "power3.out" }, t - 0.5); inside = true; }
        else tl.to(sel, { x, y, opacity: 1, duration: 0.4, ease: "power2.inOut" }, t - 0.45);
        tl.to(sel, { scale: 0.78, duration: 0.09, ease: "power2.in" }, t).to(sel, { scale: 1, duration: 0.22, ease: "power3.out" }, t + 0.09);
      },
      leave(t) { if (inside) tl.to(sel, { opacity: 0, duration: 0.18, ease: "power1.in" }, t); inside = false; },
    };
  };

  // pantallas que se cambian: la nueva entra un poco grande y se asienta (o con barrido lateral)
  L.screens = () => {
    let cur = null;
    return (t, sel, whip) => {
      if (cur) tl.set(cur, { opacity: 0 }, t);
      tl.set(sel, { opacity: 1 }, t);
      if (whip) tl.fromTo(sel, { x: whip * 240, filter: "blur(14px)" }, { x: 0, filter: "blur(0px)", duration: 0.34, ease: "expo.out" }, t);
      else tl.fromTo(sel, { scale: 1.04 }, { scale: 1, duration: 0.42, ease: "expo.out" }, t);
      cur = sel;
    };
  };

  // brasas que suben despacio por el fondo
  L.embers = (seed) => {
    const rnd = () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const box = document.getElementById("embers");
    const list = Array.from({ length: 18 }, () => {
      const e = document.createElement("i"); e.className = "ember";
      const s = 4 + rnd() * 6; e.style.width = e.style.height = s + "px"; box.appendChild(e);
      return { e, x: 40 + rnd() * 1000, sp: 70 + rnd() * 90, ph: rnd() * 2200, sw: 10 + rnd() * 26, f: 0.6 + rnd() * 1.4 };
    });
    const clock = { t: 0 };
    const draw = () => { const t = clock.t; for (const m of list) gsap.set(m.e, { x: m.x + Math.sin(t * m.f + m.ph) * m.sw, y: 2050 - ((m.ph + t * m.sp) % 2200), opacity: 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 2.3 * m.f + m.ph)) }); };
    tl.fromTo(clock, { t: 0 }, { t: END, duration: END, ease: "none", onUpdate: draw }, 0);
    draw();
  };

  // cierre: se enciende el farol, entra Champi saludando, el eslogan y la firma (al menos 2 s en pantalla)
  L.outro = (t) => {
    tl.to("#glow2", { opacity: 1, duration: 0.5, ease: "power2.inOut" }, t);
    tl.to("#glow", { opacity: 0.4, duration: 0.5, ease: "power2.inOut" }, t);
    tl.fromTo("#outro .farol", { opacity: 0, scale: 0.82, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "expo.out" }, t + 0.15);
    L.cycle("#outro .farol", 8, 384, t, END, 8.9);
    tl.fromTo("#outro .champi", { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.5, ease: "power3.out" }, t + 0.35);
    L.cycle("#outro .champi", 8, 282, t, END, 10);
    L.wordsIn("#slogan", t + 0.4);
    tl.fromTo("#sign", { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.25, ease: "power2.out" }, t + 0.7);
  };

  return L;
};
