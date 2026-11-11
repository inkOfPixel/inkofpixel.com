// inkOfPixel: the page works without this file. It adds the ink that parts under the
// cursor, the cursor-driven details (dot spotlight, ink fills, bubbles), the theme switch,
// clips that play while on screen, the contact form sent without a reload and the mobile menu.
(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const all = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  // ---------------------------------------------------------------- ink
  // Each [data-pool] section holds an ink body made of overlapping drops. The drops sit on
  // springs: the pointer pushes them apart, so the ink parts like water and closes again.
  const pools = all('[data-pool]').map((el) => ({
    el,
    body: el.querySelector('[data-body]'),
    ink: el.querySelector('[data-ink]'),
    hole: el.querySelector('[data-hole]'),
    readout: el.querySelector('[data-xy]'),
    drops: all('[data-drop]', el).map((drop, i) => ({
      el: drop, x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0, r: 0,
      phase: i * 2.4, mobility: parseFloat(drop.dataset.drop) || 1,
    })),
    pointer: null, // { x, y, t, speed, on } in viewport coordinates
    holeX: 0, holeY: 0, holeScale: 0, seen: false, visible: true,
  }));

  const pad = (value) => String(Math.max(0, Math.round(value))).padStart(4, '0');

  // Feeds the drops, the dot spotlight and the x/y readout.
  function track(pool, clientX, clientY) {
    const now = performance.now();
    const p = pool.pointer || (pool.pointer = { x: clientX, y: clientY, t: now, speed: 0, on: false });
    const moved = Math.hypot(clientX - p.x, clientY - p.y);
    p.speed = Math.max(p.speed * 0.6, (moved / Math.max(1, now - p.t)) * 1000);
    p.x = clientX;
    p.y = clientY;
    p.t = now;
    p.on = true;
    const rect = pool.el.getBoundingClientRect();
    pool.el.style.setProperty('--mx', `${clientX - rect.left}px`);
    pool.el.style.setProperty('--my', `${clientY - rect.top}px`);
    if (pool.readout) pool.readout.textContent = `x ${pad(clientX - rect.left)} · y ${pad(clientY - rect.top)}`;
  }

  for (const pool of pools) {
    const release = () => { if (pool.pointer) pool.pointer.on = false; };
    pool.el.addEventListener('mousemove', (e) => track(pool, e.clientX, e.clientY));
    pool.el.addEventListener('mouseleave', release);
    // On a phone the finger parts the ink the same way the cursor does.
    const touch = (e) => { const t = e.touches[0]; if (t) track(pool, t.clientX, t.clientY); };
    pool.el.addEventListener('touchstart', touch, { passive: true });
    pool.el.addEventListener('touchmove', touch, { passive: true });
    pool.el.addEventListener('touchend', release);
    pool.el.addEventListener('touchcancel', release);
  }

  function measure() {
    for (const pool of pools) {
      for (const d of pool.drops) {
        d.r = d.el.offsetWidth / 2;
        d.hx = d.el.offsetLeft + d.r;
        d.hy = d.el.offsetTop + d.r;
      }
    }
  }

  function step(pool, t, dt) {
    if (!pool.body || !pool.body.offsetWidth) return;
    const bodyRect = pool.body.getBoundingClientRect();
    const p = pool.pointer;
    const on = Boolean(p && p.on);
    const boost = on ? 1 + Math.min(1.5, p.speed / 900) : 0;
    if (p) p.speed *= 0.9;
    const px = p ? p.x - bodyRect.left : 0;
    const py = p ? p.y - bodyRect.top : 0;

    for (const d of pool.drops) {
      // Idle: each drop drifts around its home, so the ink breathes on its own.
      const wobble = 9 * d.mobility;
      const targetX = Math.sin(t * 0.7 + d.phase) * wobble;
      const targetY = Math.cos(t * 0.55 + d.phase * 1.3) * wobble;
      let ax = (targetX - d.x) * 42 - d.vx * 8.5;
      let ay = (targetY - d.y) * 42 - d.vy * 8.5;
      if (on) {
        const dx = d.hx + d.x - px;
        const dy = d.hy + d.y - py;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = 150 + d.r;
        if (dist < reach) {
          const f = 1 - dist / reach;
          const push = 5600 * f * f * boost;
          ax += (dx / dist) * push;
          ay += (dy / dist) * push;
        }
      }
      d.vx += ax * dt;
      d.vy += ay * dt;
      d.x += d.vx * dt;
      d.y += d.vy * dt;
      d.el.style.transform = `translate3d(${d.x.toFixed(1)}px,${d.y.toFixed(1)}px,0)`;
    }

    // The hole is a paper-coloured circle under the pointer: the filter carves it out of the ink.
    if (pool.hole && pool.ink) {
      if (p) {
        const inkRect = pool.ink.getBoundingClientRect();
        const gx = p.x - inkRect.left;
        const gy = p.y - inkRect.top;
        if (!pool.seen) { pool.holeX = gx; pool.holeY = gy; pool.seen = true; }
        pool.holeX += (gx - pool.holeX) * 0.28;
        pool.holeY += (gy - pool.holeY) * 0.28;
      }
      pool.holeScale += ((on ? 1 : 0) - pool.holeScale) * 0.14;
      pool.hole.style.transform = `translate3d(${(pool.holeX - 56).toFixed(1)}px,${(pool.holeY - 56).toFixed(1)}px,0) scale(${pool.holeScale.toFixed(3)})`;
    }
  }

  if (pools.length && !reducedMotion) {
    let last = performance.now();
    let frame = 0;
    let running = false;

    const tick = (now) => {
      const active = pools.filter((pool) => pool.visible);
      if (!active.length || document.hidden) { running = false; return; }
      requestAnimationFrame(tick);
      frame += 1;
      // With nobody touching the ink, the idle wobble runs at half rate to keep the page light.
      const busy = active.some((pool) => pool.pointer && pool.pointer.on);
      if (!busy && frame % 2) return;
      const dt = Math.min(0.033, Math.max(0.001, (now - last) / 1000));
      last = now;
      for (const pool of active) step(pool, now / 1000, dt);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      requestAnimationFrame(tick);
    };

    // The simulation only runs while an ink section is on screen.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const pool = pools.find((candidate) => candidate.el === entry.target);
        if (pool) pool.visible = entry.isIntersecting;
      }
      start();
    }, { rootMargin: '200px' });
    pools.forEach((pool) => observer.observe(pool.el));

    document.addEventListener('visibilitychange', start);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    measure();
    start();
  }

  // ---------------------------------------------------------------- cursor origin
  // Records where the cursor is over an element, so its ink fill or bubble starts from there.
  for (const el of all('[data-ink-origin]')) {
    const record = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mouseenter', record);
    el.addEventListener('mousemove', record);
    el.addEventListener('mouseleave', record);
  }

  // ---------------------------------------------------------------- theme switch
  // <html data-theme> is set before the first paint by a line in the page head (saved
  // choice, or the system preference). The switch flips it and remembers the choice.
  const root = document.documentElement;
  const themeButtons = all('[data-theme-toggle]');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    themeButtons.forEach((button) => button.setAttribute('aria-pressed', String(theme === 'dark')));
    if (themeColor) themeColor.content = theme === 'dark' ? '#0b0b0b' : '#ffffff';
  };
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  for (const button of themeButtons) {
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch (error) { /* private mode: the choice lasts for this page only */ }
      if (!document.startViewTransition || reducedMotion) { applyTheme(next); return; }
      // The new theme spreads from the switch like a drop of ink.
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      document.startViewTransition(() => applyTheme(next)).ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 800, easing: 'cubic-bezier(.2, .8, .2, 1)', pseudoElement: '::view-transition-new(root)' }
        );
      });
    });
  }

  // ---------------------------------------------------------------- clips
  // Short silent videos (the old animated GIFs) play only while they are on screen.
  // With reduced motion they keep their controls and wait for the reader to press play.
  const clips = all('video[data-clip]');
  if (clips.length && !reducedMotion && 'IntersectionObserver' in window) {
    const clipObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        // Only a browser that refuses autoplay gets the controls back; a play interrupted by
        // scrolling away is not an error.
        if (entry.isIntersecting) entry.target.play().catch((error) => { if (error.name === 'NotAllowedError') entry.target.controls = true; });
        else entry.target.pause();
      }
    }, { rootMargin: '100px' });
    for (const video of clips) {
      video.controls = false;
      clipObserver.observe(video);
    }
  }

  // ---------------------------------------------------------------- contact form
  // Without this the form still works: the browser posts it and the server redirects back.
  for (const form of all('[data-contact-form]')) {
    const wrap = form.closest('.form-wrap');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      form.setAttribute('aria-busy', 'true');
      let sent = false;
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        sent = response.ok && (await response.json()).ok === true;
      } catch (error) {
        sent = false;
      }
      form.removeAttribute('aria-busy');
      wrap.dataset.state = sent ? 'sent' : 'error';
      if (sent) {
        form.reset();
        wrap.querySelector('.form-done').focus();
      }
    });
  }

  // ---------------------------------------------------------------- mobile menu
  const menu = document.getElementById('menu');
  if (menu) {
    const openers = all('[data-menu-open]');
    let opener = null;
    const setOpen = (open) => {
      menu.hidden = !open;
      document.documentElement.classList.toggle('menu-open', open);
      openers.forEach((button) => button.setAttribute('aria-expanded', String(open)));
      if (open) menu.querySelector('[data-menu-close]').focus();
      else if (opener) opener.focus();
    };
    openers.forEach((button) => button.addEventListener('click', () => { opener = button; setOpen(true); }));
    menu.querySelector('[data-menu-close]').addEventListener('click', () => setOpen(false));
    // Links to a section of the same page must close the menu too.
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) setOpen(false); });
    // Keep keyboard focus inside the open menu.
    menu.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = all('a[href], button', menu);
      const first = focusable[0];
      const lastItem = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastItem.focus(); }
      else if (!e.shiftKey && document.activeElement === lastItem) { e.preventDefault(); first.focus(); }
    });
  }
})();
