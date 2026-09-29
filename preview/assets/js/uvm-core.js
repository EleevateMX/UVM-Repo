/* UVM · Tablón de estudios — utilidades compartidas (sin dependencias) */
(function (global) {
  'use strict';

  /* ---------- Iconos (SVG inline, 24x24, trazo) ---------- */
  const ICONS = {
    board: '<path d="M4 5h16v11H4zM8 21l4-5 4 5"/>',
    book: '<path d="M4 4h9a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4v14h2a2 2 0 0 1 2 2z"/>',
    feedback: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8 11h8M8 14h5"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    team: '<circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 19a4 4 0 0 1 7 0"/>',
    brain: '<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 3h3V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 3h-3V4z"/>',
    couch: '<path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 11h18v6H3zM5 17v2M19 17v2"/>',
    check: '<path d="m5 12 4.5 4.5L19 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    print: '<path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
    download: '<path d="M12 3v12M6 11l6 6 6-6M4 21h16"/>',
    upload: '<path d="M12 21V9M6 13l6-6 6 6M4 3h16"/>',
    quote: '<path d="M7 7h4v6H7v4H5v-8a2 2 0 0 1 2-2zM17 7h4v6h-4v4h-2v-8a2 2 0 0 1 2-2z"/>',
    ref: '<path d="M4 19V5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2zM4 19a2 2 0 0 1 2-2h12"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18h1a2 2 0 0 0 1.5-3.3 2 2 0 0 1 1.5-3.2H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3z"/><circle cx="7.5" cy="12" r="1"/><circle cx="10" cy="7.5" r="1"/><circle cx="15" cy="7.5" r="1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5M3 17l9 5 9-5"/>',
    edit: '<path d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16z"/>',
    search: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    lightbulb: '<path d="M9 18h6M10 21h4M8 13a5 5 0 1 1 8 0c-1 1-1.5 2-1.5 3h-5c0-1-.5-2-1.5-3z"/>',
    flag: '<path d="M5 21V4M5 4h12l-2 4 2 4H5"/>'
  };

  function icon(name, cls) {
    const p = ICONS[name] || ICONS.info;
    return '<svg class="ico ' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }

  /* ---------- Almacenamiento local seguro ---------- */
  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
      catch (e) { return fallback; }
    },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; } },
    del(key) { try { localStorage.removeItem(key); } catch (e) { /* ignore */ } }
  };

  /* ---------- Utilidades ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
  function uid() { return Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3); }
  function todayISO() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function fmtDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-').map(Number);
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    return d + ' de ' + (meses[m - 1] || '') + ' de ' + y;
  }
  function debounce(fn, ms) { let t; return function () { clearTimeout(t); const a = arguments, c = this; t = setTimeout(() => fn.apply(c, a), ms || 300); }; }
  function download(filename, text, type) {
    const blob = new Blob([text], { type: type || 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (_) { } ta.remove(); return ok;
    }
  }

  /* ---------- Toast ---------- */
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('show'), 2200);
  }

  /* ---------- Tema claro/oscuro ---------- */
  function initTheme(btn) {
    const saved = store.get('uvm.theme', null);
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    if (!btn) return;
    const paint = () => { const dark = (document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark'; btn.innerHTML = icon(dark ? 'sun' : 'moon'); btn.setAttribute('aria-label', dark ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'); };
    btn.addEventListener('click', () => { const cur = document.documentElement.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); const next = cur === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-theme', next); store.set('uvm.theme', next); paint(); });
    paint();
  }

  /* ---------- Barra superior estándar ---------- */
  function renderTopbar(opts) {
    opts = opts || {};
    const root = opts.root || '';               // ruta relativa a la raíz del repo, p.ej. ''
    const items = opts.items || [
      { href: root + 'index.html', label: 'Tablón', key: 'tablon' },
      { href: root + 'materia.html', label: 'Aplicaciones en Psicoterapia', key: 'materia' },
      { href: root + 'retroalimentacion.html', label: 'Retroalimentación', key: 'retro' },
      { href: root + 'apuntes.html', label: 'Apuntes', key: 'apuntes' },
      { href: root + 'kit.html', label: 'Kit gráfico', key: 'kit' }
    ];
    const el = document.querySelector('.topbar');
    if (!el) return;
    el.innerHTML = '<div class="container">' +
      '<a class="brand" href="' + root + 'index.html"><img src="' + root + 'assets/img/uvm-escudo.png" alt="Escudo UVM" width="34" height="34"><span class="brand-txt">Tablón de estudios<small>Universidad del Valle de México</small></span></a>' +
      '<nav class="topnav" aria-label="Secciones">' + items.map(i => '<a href="' + i.href + '"' + (i.key === opts.current ? ' aria-current="page"' : '') + '>' + esc(i.label) + '</a>').join('') + '</nav>' +
      '<button class="btn ghost sm" id="themeBtn" type="button" aria-label="Cambiar tema"></button>' +
      '</div>';
    initTheme(el.querySelector('#themeBtn'));
  }

  function renderFooter(root) {
    const el = document.querySelector('.footer'); if (!el) return;
    root = root || '';
    el.innerHTML = '<div class="container"><div>Tablón de estudios · UVM · Aplicaciones en Psicoterapia. Uso personal de estudio. Los datos se guardan sólo en este navegador.</div><img src="' + root + 'assets/img/uvm-laureate.png" alt="UVM · Laureate International Universities" style="height:34px;width:auto;opacity:.75"></div>';
  }

  global.UVM = { ICONS, icon, store, esc, uid, todayISO, fmtDate, debounce, download, copyText, toast, initTheme, renderTopbar, renderFooter };
})(window);
