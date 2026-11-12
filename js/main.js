/* ==========================================================================
   Reparación de PC — interacciones
   ========================================================================== */

/* Datos de contacto: cambiá este número (formato internacional, sin + ni espacios). */
const WHATSAPP_NUMBER = "5491100000000";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Tema claro / oscuro ---------- */
function initTheme() {
  const btn = document.querySelector("[data-theme-toggle]");
  const meta = document.querySelectorAll('meta[name="theme-color"]');
  const sync = () => {
    const dark = root.getAttribute("data-theme") === "dark";
    btn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    meta.forEach((m) => m.setAttribute("content", dark ? "#161719" : "#f5f6f3"));
  };
  btn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked */ }
    sync();
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) { /* storage blocked */ }
    if (!saved) { root.setAttribute("data-theme", e.matches ? "dark" : "light"); sync(); }
  });
  sync();
}

/* ---------- Header y menú móvil ---------- */
function initHeader() {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-menu-toggle]");

  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.style.overflow = open ? "hidden" : "";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
  });
  window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });

  // Sección activa en la navegación
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.toggleAttribute("aria-current", a.getAttribute("href") === `#${entry.target.id}`));
      links.forEach((a) => { if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true"); });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Dibujo explotado: apertura y piezas vinculadas ---------- */
function initExploded() {
  const figure = document.querySelector(".exploded");
  if (!figure) return;

  // Apertura: las piezas salen del gabinete una sola vez.
  const open = () => figure.classList.add("is-open");
  if (reduceMotion.matches) open();
  else setTimeout(open, 300);

  const byPart = (id) => document.querySelectorAll(`[data-part="${id}"]`);
  let pinned = null;
  const light = (id, on) => byPart(id).forEach((el) => el.classList.toggle("is-lit", on));
  const clearAll = () => document.querySelectorAll(".is-lit").forEach((el) => el.classList.remove("is-lit"));

  const bind = (el) => {
    const id = el.dataset.part;
    el.addEventListener("pointerenter", () => { if (!pinned) light(id, true); });
    el.addEventListener("pointerleave", () => { if (!pinned) light(id, false); });
    el.addEventListener("focusin", () => { clearAll(); light(id, true); });
    el.addEventListener("focusout", () => { if (!pinned) light(id, false); });
  };
  document.querySelectorAll(".callout, .part-row, .exploded-svg .part").forEach(bind);

  // Al tocar un número: ir a la pieza en la lista y dejarla marcada.
  document.querySelectorAll(".callout").forEach((c) => {
    c.addEventListener("click", (e) => {
      e.preventDefault();
      const id = c.dataset.part;
      const row = document.getElementById(`svc-${id}`);
      clearAll();
      pinned = id;
      light(id, true);
      row.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
      row.focus({ preventScroll: true });
      history.replaceState(null, "", `#svc-${id}`);
      setTimeout(() => { pinned = null; }, 2500);
    });
  });

  // En pantallas angostas no hay dibujo al lado de la lista: se enciende
  // la fila que pasa por el centro de la pantalla, con su pieza dibujada.
  const narrow = window.matchMedia("(max-width: 960px)");
  const rows = [...document.querySelectorAll(".part-row")];
  const scrollLit = new IntersectionObserver((entries) => {
    if (!narrow.matches || pinned) return;
    entries.forEach((e) => { if (e.isIntersecting) { clearAll(); e.target.classList.add("is-lit"); } });
  }, { rootMargin: "-45% 0px -45% 0px" });
  rows.forEach((r) => scrollLit.observe(r));

  // Tocar una pieza del dibujo equivale a tocar su número.
  document.querySelectorAll(".exploded-svg .part").forEach((p) => {
    p.addEventListener("click", () => {
      const c = document.querySelector(`.callout[data-part="${p.dataset.part}"]`);
      if (c) c.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    });
  });
}

/* ---------- Proceso: indicador "tu equipo está acá" ---------- */
function initProcess() {
  const wrap = document.querySelector("[data-process]");
  if (!wrap) return;
  const steps = [...wrap.querySelectorAll(".process-step")];
  const panels = [...wrap.querySelectorAll(".process-panel")];

  const go = (i) => {
    wrap.style.setProperty("--at", i);
    steps.forEach((s, k) => {
      s.setAttribute("aria-pressed", String(k === i));
      s.classList.toggle("is-done", k < i);
    });
    panels.forEach((p, k) => { p.hidden = k !== i; });
  };
  steps.forEach((s, i) => s.addEventListener("click", () => go(i)));
  wrap.addEventListener("keydown", (e) => {
    const current = steps.findIndex((s) => s.getAttribute("aria-pressed") === "true");
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); const n = Math.min(current + 1, steps.length - 1); go(n); steps[n].focus(); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); const n = Math.max(current - 1, 0); go(n); steps[n].focus(); }
  });

  go(0);
}

/* ---------- Mensaje de WhatsApp ---------- */
function waUrl(text) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function initComposer() {
  const form = document.querySelector("[data-composer]");
  if (!form) return;
  const preview = form.querySelector("[data-preview]");
  const error = form.querySelector("[data-form-error]");

  const build = () => {
    const data = new FormData(form);
    const name = String(data.get("nombre") || "").trim();
    const detail = String(data.get("detalle") || "").trim();
    const symptoms = data.getAll("sintoma").map(String);
    const lines = [name ? `Hola, soy ${name}. Quiero consultar por mi PC.` : "Hola, quiero consultar por mi PC."];
    if (symptoms.length) lines.push(`Lo que noto: ${symptoms.join(", ").toLowerCase()}.`);
    if (detail) lines.push(detail);
    return { text: lines.join("\n"), ok: symptoms.length > 0 || detail.length > 0 };
  };

  const update = () => {
    const { text, ok } = build();
    preview.textContent = text;
    if (ok) { error.hidden = true; form.classList.remove("has-error"); }
  };
  form.addEventListener("input", update);
  form.addEventListener("change", update);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { text, ok } = build();
    if (!ok) {
      error.hidden = false;
      form.classList.add("has-error");
      form.querySelector('input[name="sintoma"]').focus();
      return;
    }
    const win = window.open(waUrl(text), "_blank", "noopener,noreferrer");
    if (!win) window.location.href = waUrl(text);
  });
  update();
}

/* ---------- Barra fija de WhatsApp (celular) ---------- */
function initWaBar() {
  const bar = document.querySelector(".wa-bar");
  const hero = document.querySelector(".hero-actions");
  const contact = document.getElementById("contacto");
  if (!bar || !hero || !contact) return;
  const state = { hero: true, contact: false };
  const sync = () => bar.classList.toggle("is-hidden", state.hero || state.contact);
  new IntersectionObserver(([e]) => { state.hero = e.isIntersecting; sync(); }).observe(hero);
  new IntersectionObserver(([e]) => { state.contact = e.isIntersecting; sync(); }, { threshold: 0.15 }).observe(contact);
  sync();
}

function initLinks() {
  document.querySelectorAll("[data-wa-link]").forEach((a) => { a.href = waUrl("Hola, quiero consultar por mi PC."); });
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = String(new Date().getFullYear()); });
}

initTheme();
initHeader();
initExploded();
initProcess();
initComposer();
initWaBar();
initLinks();
