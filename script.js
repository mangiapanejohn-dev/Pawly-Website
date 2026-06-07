(() => {
  "use strict";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const silky = !reduceMotion && finePointer;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* nav border on scroll */
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* marquee: duplicate for seamless loop */
  const track = document.querySelector("[data-marquee]");
  if (track) track.innerHTML += track.innerHTML;

  /* cycling speech bubble */
  const speech = document.querySelector("[data-speech]");
  if (speech && !reduceMotion) {
    const lines = ["正在运行 npm test", "正在读取 config.json", "正在压缩上下文", "等待授权…", "正在写入 main.swift"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % lines.length;
      speech.classList.remove("swap");
      void speech.offsetWidth;
      speech.textContent = lines[i];
      speech.classList.add("swap");
    }, 2600);
  }

  /* hero pointer parallax */
  const hero = document.querySelector(".hero");
  if (hero && silky) {
    let raf = 0, tx = 0, ty = 0;
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        hero.style.setProperty("--px", tx.toFixed(3));
        hero.style.setProperty("--py", ty.toFixed(3));
        raf = 0;
      });
    });
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--px", 0);
      hero.style.setProperty("--py", 0);
    });
  }

  /* card / trading 3D tilt (rAF-throttled, transform only) */
  if (silky) {
    document.querySelectorAll(".card, .trading").forEach((el) => {
      const MAX = 6;
      let raf = 0, nx = 0, ny = 0;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        nx = (e.clientX - r.left) / r.width - 0.5;
        ny = (e.clientY - r.top) / r.height - 0.5;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--ry", (nx * 2 * MAX).toFixed(2) + "deg");
          el.style.setProperty("--rx", (-ny * 2 * MAX).toFixed(2) + "deg");
          raf = 0;
        });
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* magnetic buttons + arrow link */
  if (silky) {
    document.querySelectorAll(".btn, .link-arrow").forEach((el) => {
      const pull = el.classList.contains("btn-lg") ? 0.4 : 0.28;
      let raf = 0, mx = 0, my = 0;
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        mx = e.clientX - (r.left + r.width / 2);
        my = e.clientY - (r.top + r.height / 2);
        if (raf) return;
        raf = requestAnimationFrame(() => {
          el.style.translate = (mx * pull).toFixed(1) + "px " + (my * pull).toFixed(1) + "px";
          raf = 0;
        });
      });
      el.addEventListener("pointerleave", () => { el.style.translate = "0px 0px"; });
    });
  }

  /* trailing cursor ring */
  if (silky) {
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.append(ring, dot);
    document.documentElement.classList.add("using-ring");

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, shown = false;
    window.addEventListener("pointermove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!shown) { shown = true; ring.classList.add("on"); dot.classList.add("on"); }
    });
    window.addEventListener("pointerdown", () => ring.classList.add("press"));
    window.addEventListener("pointerup", () => ring.classList.remove("press"));
    const hotSel = "a, button, .card, .trading, input, [role='button']";
    document.addEventListener("pointerover", (e) => {
      if (e.target.closest(hotSel)) ring.classList.add("hot");
    });
    document.addEventListener("pointerout", (e) => {
      if (e.target.closest(hotSel) && !(e.relatedTarget && e.relatedTarget.closest(hotSel))) ring.classList.remove("hot");
    });
    (function loop() {
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(loop);
    })();
  }

  /* scroll reveal — rect-based (fires on any real scroll), with insurance timer */
  const revealEls = [...document.querySelectorAll(".reveal")];
  if (revealEls.length) {
    if (reduceMotion) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      document.querySelectorAll(".bento, .agents").forEach((group) => {
        [...group.children].forEach((c, n) => {
          if (c.classList.contains("reveal")) c.style.transitionDelay = (n % 3) * 0.09 + "s";
        });
      });
      let pending = revealEls.slice();
      const check = () => {
        const vh = window.innerHeight;
        for (let i = pending.length - 1; i >= 0; i--) {
          if (pending[i].getBoundingClientRect().top < vh * 0.9) {
            pending[i].classList.add("in");
            pending.splice(i, 1);
          }
        }
        if (!pending.length) {
          window.removeEventListener("scroll", check);
          window.removeEventListener("resize", check);
        }
      };
      check();
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      window.addEventListener("load", check);
      /* insurance: never leave content hidden if scroll events never come */
      setTimeout(() => { pending.forEach((el) => el.classList.add("in")); pending = []; }, 3000);
    }
  }
})();
