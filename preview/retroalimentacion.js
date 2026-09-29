/* Módulo: Retroalimentación de simulación a compañeros */
(function () {
  'use strict';
  const { icon, store, esc, uid, todayISO, fmtDate, debounce, download, copyText, toast } = UVM;
  const M = window.MATERIA;
  const KEY = 'uvm.retro.' + M.clave;
  const MAX_EV = 12;

  UVM.renderTopbar({ root: '', current: 'retro' });
  UVM.renderFooter('');
  document.getElementById('hBadgeMateria').textContent = M.nombre;

  /* ---------- Estado ---------- */
  let db = store.get(KEY, null);
  if (!db || !Array.isArray(db.sesiones) || !db.sesiones.length) db = { sesiones: [newSession()], actual: null };
  if (!db.actual || !db.sesiones.find(s => s.id === db.actual)) db.actual = db.sesiones[0].id;
  let S = db.sesiones.find(s => s.id === db.actual);
  let activeField = null; // último textarea/input con foco (para insertar frases)

  function blankScores(crits) { const o = {}; crits.forEach(c => o[c.id] = null); return o; }
  function newEvaluado() { return { id: uid(), nombre: '', rol: 'Terapeuta', puntajes: blankScores(M.criteriosIndividual), final: null, fortalezas: '', mejora: '', recomendaciones: '' }; }
  function newSession(base) {
    const s = { id: uid(), creado: new Date().toISOString(), titulo: '', fecha: todayISO(), docente: M.docente, evaluador: store.get('uvm.retro.evaluador', ''), enfoque: M.enfoques[0].id, equipo: '', notas: '', evaluados: [newEvaluado()], equipoEval: { nombre: '', puntajes: blankScores(M.criteriosEquipo), final: null, fortalezas: '', mejora: '', recomendaciones: '' } };
    if (base) { const c = JSON.parse(JSON.stringify(base)); c.id = s.id; c.creado = s.creado; c.titulo = (c.titulo || 'Sesión') + ' (copia)'; return c; }
    return s;
  }
  const save = debounce(() => { db.actual = S.id; store.set(KEY, db); if (S.evaluador) store.set('uvm.retro.evaluador', S.evaluador); setSaveState('Guardado ' + new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })); }, 250);
  function setSaveState(t) { document.getElementById('saveState').textContent = t; }
  // Confirmación en dos clics (el visor de artefactos no muestra confirm()).
  function askConfirm(btn, label, fn) {
    if (btn.dataset.armed) { delete btn.dataset.armed; btn.innerHTML = btn.dataset.old; fn(); return; }
    btn.dataset.armed = '1'; btn.dataset.old = btn.innerHTML; btn.innerHTML = label; btn.classList.add('danger');
    setTimeout(() => { if (btn.dataset.armed) { delete btn.dataset.armed; btn.innerHTML = btn.dataset.old; } }, 3500);
  }

  /* ---------- Cálculos ---------- */
  function avg(puntajes) { const v = Object.values(puntajes).filter(x => typeof x === 'number'); if (!v.length) return null; return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10; }
  function finalScore(obj) { return typeof obj.final === 'number' ? obj.final : avg(obj.puntajes); }
  function scoreLabel(v) { if (v == null) return 'Sin calificar'; const r = Math.round(v); return (M.escala.find(e => e.v === r) || {}).label || ''; }
  function scoreClass(v) { if (v == null) return ''; return v >= 4 ? 'ok' : v >= 3 ? 'info' : v >= 2 ? 'warn' : 'bad'; }
  function enfoqueActual() { return M.enfoques.find(e => e.id === S.enfoque) || null; }

  /* ---------- Render: sesiones ---------- */
  function renderSessions() {
    const sel = document.getElementById('sessionSel');
    sel.innerHTML = db.sesiones.map(s => `<option value="${s.id}"${s.id === S.id ? ' selected' : ''}>${esc(sessionTitle(s))}</option>`).join('');
  }
  function sessionTitle(s) { const enf = M.enfoques.find(e => e.id === s.enfoque); return (s.titulo || 'Sesión sin título') + ' · ' + fmtDate(s.fecha) + (enf ? ' · ' + enf.corto : ''); }

  /* ---------- Render: datos generales ---------- */
  function renderGeneral() {
    const selE = document.getElementById('fEnfoque');
    selE.innerHTML = M.enfoques.map(e => `<option value="${e.id}">${esc(e.nombre)}</option>`).join('') + '<option value="otro">Otro / mixto</option>';
    document.querySelectorAll('#form [data-k]').forEach(el => { el.value = S[el.dataset.k] == null ? '' : S[el.dataset.k]; });
  }

  /* ---------- Render: rúbrica ---------- */
  function scaleHtml(scope, id, critId, val) {
    return `<div class="scale" role="group" aria-label="Puntaje">${M.escala.map(e => `<button type="button" data-scope="${scope}" data-id="${id}" data-crit="${critId}" data-v="${e.v}" aria-pressed="${val === e.v}" title="${esc(e.desc)}">${e.v}<small>${esc(e.label)}</small></button>`).join('')}</div>`;
  }
  function criteriaHtml(scope, id, crits, puntajes) {
    return crits.map(c => `<div class="criterio"><div><div class="c-title"><h4>${esc(c.nombre)}</h4><span class="badge ${scoreClass(puntajes[c.id])}" data-badge="${scope}-${id}-${c.id}">${puntajes[c.id] == null ? '—' : puntajes[c.id] + ' · ' + scoreLabel(puntajes[c.id])}</span></div><p class="c-desc">${esc(c.desc)}</p></div>${scaleHtml(scope, id, c.id, puntajes[c.id])}</div>`).join('');
  }
  function scoreBoxHtml(scope, id, obj) {
    const a = avg(obj.puntajes), f = finalScore(obj);
    return `<div class="score-box" data-scorebox="${scope}-${id}">
      <div class="score-ring" style="--v:${f == null ? 0 : f / 5 * 100}"><b>${f == null ? '–' : f.toFixed(1)}</b><small>de 5</small></div>
      <div style="flex:1">
        <label class="field" for="final-${scope}-${id}">Calificación final <small>(promedio sugerido: <span data-avg="${scope}-${id}">${a == null ? '—' : a.toFixed(1)}</span>)</small></label>
        <div class="cluster"><input type="number" id="final-${scope}-${id}" min="0" max="5" step="0.1" data-final="${scope}" data-id="${id}" value="${typeof obj.final === 'number' ? obj.final : ''}" placeholder="${a == null ? '0–5' : a.toFixed(1)}"><button type="button" class="btn sm ghost" data-resetfinal="${scope}" data-id="${id}">Usar promedio</button><span class="badge ${scoreClass(f)}" data-finallabel="${scope}-${id}">${scoreLabel(f)}</span></div>
      </div></div>`;
  }
  function textFieldHtml(scope, id, key, label, placeholder, obj) {
    return `<div><label class="field" for="${key}-${scope}-${id}">${label}</label><textarea id="${key}-${scope}-${id}" data-text="${key}" data-scope="${scope}" data-id="${id}" placeholder="${esc(placeholder)}">${esc(obj[key])}</textarea><div class="chips" data-chips="${key}" data-scope="${scope}" data-id="${id}"></div></div>`;
  }
  function chipsFor(scope, obj, key) {
    // Sugerencias según puntajes: fortalezas de criterios altos, mejoras/recomendaciones de criterios bajos.
    const crits = scope === 'ev' ? M.criteriosIndividual : M.criteriosEquipo;
    if (scope === 'eq') { const bank = M.frases.equipo[key] || []; return bank.map(t => ({ t })); }
    const bank = M.frases[key] || {};
    const scored = crits.filter(c => typeof obj.puntajes[c.id] === 'number');
    let pick = key === 'fortalezas' ? scored.filter(c => obj.puntajes[c.id] >= 4) : scored.filter(c => obj.puntajes[c.id] <= 2);
    if (!pick.length) pick = key === 'fortalezas' ? scored.slice().sort((a, b) => obj.puntajes[b.id] - obj.puntajes[a.id]).slice(0, 2) : scored.slice().sort((a, b) => obj.puntajes[a.id] - obj.puntajes[b.id]).slice(0, 2);
    if (!pick.length) pick = crits.slice(0, 3);
    const out = []; pick.forEach(c => (bank[c.id] || []).forEach(t => out.push({ t, c: c.nombre }))); return out;
  }
  function renderChips(scope, id) {
    const obj = scope === 'ev' ? S.evaluados.find(e => e.id === id) : S.equipoEval;
    document.querySelectorAll(`[data-chips][data-scope="${scope}"][data-id="${id}"]`).forEach(box => {
      const key = box.dataset.chips;
      box.innerHTML = chipsFor(scope, obj, key).map(x => `<button type="button" class="chip" data-insert="${esc(x.t)}" data-scope="${scope}" data-id="${id}" data-key="${key}" title="${x.c ? 'Criterio: ' + esc(x.c) : 'Insertar'}">${icon('plus')}${esc(x.t.length > 70 ? x.t.slice(0, 68) + '…' : x.t)}</button>`).join('');
    });
  }

  function evCardHtml(ev, i) {
    return `<article class="card ev-card" data-ev="${ev.id}" aria-label="Evaluado ${i + 1}">
      <header>
        <span class="num">${i + 1}</span>
        <input type="text" data-evfield="nombre" data-id="${ev.id}" value="${esc(ev.nombre)}" placeholder="Nombre del evaluado" aria-label="Nombre del evaluado ${i + 1}">
        <select data-evfield="rol" data-id="${ev.id}" aria-label="Rol en la simulación">${['Terapeuta', 'Paciente', 'Observador', 'Coterapeuta', 'Otro'].map(r => `<option${ev.rol === r ? ' selected' : ''}>${r}</option>`).join('')}</select>
        <span class="badge ${scoreClass(finalScore(ev))}" data-cardscore="${ev.id}">${finalScore(ev) == null ? 'Sin calificar' : finalScore(ev).toFixed(1) + ' / 5'}</span>
        <button type="button" class="btn sm ghost" data-toggle="${ev.id}" aria-expanded="true">Contraer</button>
        <button type="button" class="btn sm ghost danger" data-remove="${ev.id}" aria-label="Quitar evaluado">${icon('trash')}</button>
      </header>
      <div class="body stack" style="--stack:14px">
        <div><div class="eyebrow" style="margin-bottom:4px">Rúbrica de la simulación</div>${criteriaHtml('ev', ev.id, M.criteriosIndividual, ev.puntajes)}</div>
        ${scoreBoxHtml('ev', ev.id, ev)}
        ${textFieldHtml('ev', ev.id, 'fortalezas', 'Fortalezas observadas', 'Qué hizo bien y por qué funcionó…', ev)}
        ${textFieldHtml('ev', ev.id, 'mejora', 'Áreas de mejora', 'Qué faltó o qué interfirió con la sesión…', ev)}
        ${textFieldHtml('ev', ev.id, 'recomendaciones', 'Recomendaciones finales', 'Acciones concretas para la próxima simulación…', ev)}
      </div></article>`;
  }
  function renderEvaluados() {
    const list = document.getElementById('evList');
    list.innerHTML = S.evaluados.length ? S.evaluados.map(evCardHtml).join('') : '<div class="empty">Aún no hay compañeros en esta sesión. Agrega al primero.</div>';
    S.evaluados.forEach(ev => renderChips('ev', ev.id));
    const b = document.getElementById('btnAddEv'); b.innerHTML = icon('plus') + ' Agregar compañero'; b.disabled = S.evaluados.length >= MAX_EV;
  }
  function renderTeam() {
    const t = S.equipoEval;
    document.getElementById('teamSection').innerHTML = `
      <div class="section-head" style="margin-bottom:8px"><div><h2 id="hEquipo" style="margin:0">Evaluación del equipo</h2><p>Valoración global del equipo que presentó la simulación.</p></div><span class="badge ${scoreClass(finalScore(t))}" data-cardscore="eq">${finalScore(t) == null ? 'Sin calificar' : finalScore(t).toFixed(1) + ' / 5'}</span></div>
      <div class="stack" style="--stack:14px">
        <div><label class="field" for="eqNombre">Nombre del equipo / integrantes</label><input type="text" id="eqNombre" data-eqfield="nombre" value="${esc(t.nombre)}" placeholder="Ej. Equipo 3: Ana, Luis, Sofía"></div>
        <div>${criteriaHtml('eq', 'eq', M.criteriosEquipo, t.puntajes)}</div>
        ${scoreBoxHtml('eq', 'eq', t)}
        ${textFieldHtml('eq', 'eq', 'fortalezas', 'Fortalezas del equipo', 'Preparación, coherencia, roles…', t)}
        ${textFieldHtml('eq', 'eq', 'mejora', 'Áreas de mejora del equipo', '…', t)}
        ${textFieldHtml('eq', 'eq', 'recomendaciones', 'Recomendaciones finales al equipo', '…', t)}
      </div>`;
    renderChips('eq', 'eq');
  }
  function refreshScores(scope, id) {
    const obj = scope === 'ev' ? S.evaluados.find(e => e.id === id) : S.equipoEval;
    const box = document.querySelector(`[data-scorebox="${scope}-${id}"]`); if (!box) return;
    box.outerHTML = scoreBoxHtml(scope, id, obj);
    const f = finalScore(obj);
    const cs = document.querySelector(`[data-cardscore="${scope === 'ev' ? id : 'eq'}"]`);
    if (cs) { cs.className = 'badge ' + scoreClass(f); cs.textContent = f == null ? 'Sin calificar' : f.toFixed(1) + ' / 5'; }
    renderChips(scope, id);
  }

  /* ---------- Render: panel lateral ---------- */
  function renderGuide() {
    const e = enfoqueActual(); const el = document.getElementById('tab-guia');
    if (!e) { el.innerHTML = '<p class="muted">Selecciona un enfoque en los datos de la evaluación para ver su guía.</p>'; return; }
    el.innerHTML = `<span class="badge ${e.clase}">${esc(e.nombre)}</span><p style="margin:10px 0 6px">${esc(e.resumen)}</p>
      <details class="acc" open><summary>Qué observar en la simulación</summary><div class="acc-body"><ul class="obs list">${e.queObservar.map(q => `<li>${icon('check')}<span>${esc(q)}</span></li>`).join('')}</ul></div></details>
      <details class="acc"><summary>Técnicas del enfoque</summary><div class="acc-body">${e.tecnicas.map(t => `<p><b>${esc(t.t)}.</b> ${esc(t.d)}</p>`).join('')}</div></details>
      <details class="acc"><summary>Preguntas típicas (clic para insertar)</summary><div class="acc-body">${e.preguntas.map(q => `<div class="guide-q" data-insert="${esc(q)}" tabindex="0" role="button">${esc(q)}</div>`).join('')}</div></details>
      <details class="acc"><summary>Conceptos clave</summary><div class="acc-body">${e.conceptos.slice(0, 6).map(c => `<p><b>${esc(c.t)}.</b> ${esc(c.d)}</p>`).join('')}<p><a href="apuntes.html#${e.id}">Ver apuntes completos ›</a></p></div></details>`;
  }
  function renderFrases() {
    const el = document.getElementById('tab-frases');
    const sec = (title, obj) => `<details class="acc" open><summary>${title}</summary><div class="acc-body">${M.criteriosIndividual.map(c => (obj[c.id] || []).map(t => `<div class="guide-q" data-insert="${esc(t)}" tabindex="0" role="button"><small class="muted">${esc(c.nombre)}</small><br>${esc(t)}</div>`).join('')).join('')}</div></details>`;
    el.innerHTML = '<p class="muted" style="margin-bottom:8px">Haz clic en una frase para insertarla en el último campo de texto que editaste (o copiarla).</p>' + sec('Fortalezas', M.frases.fortalezas) + sec('Áreas de mejora', M.frases.mejora) + sec('Recomendaciones', M.frases.recomendaciones) +
      `<details class="acc"><summary>Equipo</summary><div class="acc-body">${['fortalezas', 'mejora', 'recomendaciones'].map(k => M.frases.equipo[k].map(t => `<div class="guide-q" data-insert="${esc(t)}" tabindex="0" role="button"><small class="muted">${k}</small><br>${esc(t)}</div>`).join('')).join('')}</div></details>`;
  }
  function renderEscala() {
    document.getElementById('tab-escala').innerHTML = `<p class="muted" style="margin-bottom:8px">${esc(M.actividadPrincipal.escala)}.</p><table class="table"><thead><tr><th>Valor</th><th>Nivel</th></tr></thead><tbody>${M.escala.map(e => `<tr><td><b>${e.v}</b></td><td><b>${esc(e.label)}</b><br><small class="muted">${esc(e.desc)}</small></td></tr>`).join('')}</tbody></table><p class="help" style="margin-top:10px">${esc(M.actividadPrincipal.nota)}</p>`;
  }
  function renderRefs() {
    const e = enfoqueActual();
    const refs = M.bibliografia.filter(r => !e || r.enf === e.id || r.enf === 'general');
    document.getElementById('tab-refs').innerHTML = `<p class="muted" style="margin-bottom:6px">Bibliografía de la materia${e ? ' · ' + esc(e.corto) : ''}. Cítala en tus recomendaciones cuando sugieras una lectura.</p>` + refs.map(r => `<div class="ref-item"><button type="button" class="btn sm ghost" data-copy="${esc(r.ref)}" aria-label="Copiar referencia">${icon('copy')}</button><span>${esc(r.ref)}</span></div>`).join('') + `<p style="margin-top:10px"><a href="apuntes.html#referencias">Todas las referencias ›</a></p>`;
  }
  function renderSide() { renderGuide(); renderFrases(); renderEscala(); renderRefs(); }

  /* ---------- Render total ---------- */
  function renderAll() { renderSessions(); renderGeneral(); renderEvaluados(); renderTeam(); renderSide(); setSaveState('Sesión cargada'); }

  /* ---------- Eventos ---------- */
  document.addEventListener('focusin', e => { if (e.target.matches('textarea, input[type="text"]')) activeField = e.target; });

  document.getElementById('form').addEventListener('input', e => {
    const t = e.target;
    if (t.dataset.k) { S[t.dataset.k] = t.value; if (t.dataset.k === 'enfoque') { renderSide(); renderSessions(); } if (t.dataset.k === 'titulo' || t.dataset.k === 'fecha') renderSessions(); save(); return; }
    if (t.dataset.evfield) { const ev = S.evaluados.find(x => x.id === t.dataset.id); if (ev) ev[t.dataset.evfield] = t.value; save(); return; }
    if (t.dataset.eqfield) { S.equipoEval[t.dataset.eqfield] = t.value; save(); return; }
    if (t.dataset.text) { const obj = t.dataset.scope === 'ev' ? S.evaluados.find(x => x.id === t.dataset.id) : S.equipoEval; obj[t.dataset.text] = t.value; save(); return; }
    if (t.dataset.final) { const obj = t.dataset.final === 'ev' ? S.evaluados.find(x => x.id === t.dataset.id) : S.equipoEval; const v = parseFloat(t.value); obj.final = isNaN(v) ? null : Math.min(5, Math.max(0, v)); const f = finalScore(obj); const ring = t.closest('.score-box').querySelector('.score-ring'); ring.style.setProperty('--v', f == null ? 0 : f / 5 * 100); ring.querySelector('b').textContent = f == null ? '–' : f.toFixed(1); const lbl = t.closest('.score-box').querySelector('[data-finallabel]'); lbl.className = 'badge ' + scoreClass(f); lbl.textContent = scoreLabel(f); const cs = document.querySelector(`[data-cardscore="${t.dataset.final === 'ev' ? t.dataset.id : 'eq'}"]`); if (cs) { cs.className = 'badge ' + scoreClass(f); cs.textContent = f == null ? 'Sin calificar' : f.toFixed(1) + ' / 5'; } save(); }
  });

  document.getElementById('form').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.scope && b.dataset.crit) {          // escala 0–5
      const obj = b.dataset.scope === 'ev' ? S.evaluados.find(x => x.id === b.dataset.id) : S.equipoEval;
      const v = Number(b.dataset.v); obj.puntajes[b.dataset.crit] = obj.puntajes[b.dataset.crit] === v ? null : v;
      b.parentElement.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', String(Number(x.dataset.v) === obj.puntajes[b.dataset.crit])));
      const badge = document.querySelector(`[data-badge="${b.dataset.scope}-${b.dataset.id}-${b.dataset.crit}"]`); const val = obj.puntajes[b.dataset.crit];
      if (badge) { badge.className = 'badge ' + scoreClass(val); badge.textContent = val == null ? '—' : val + ' · ' + scoreLabel(val); }
      refreshScores(b.dataset.scope, b.dataset.id); save(); return;
    }
    if (b.dataset.resetfinal) { const obj = b.dataset.resetfinal === 'ev' ? S.evaluados.find(x => x.id === b.dataset.id) : S.equipoEval; obj.final = null; refreshScores(b.dataset.resetfinal, b.dataset.id); save(); return; }
    if (b.dataset.insert) { insertText(b.dataset.insert, b.dataset.key ? document.getElementById(`${b.dataset.key}-${b.dataset.scope}-${b.dataset.id}`) : null); return; }
    if (b.dataset.toggle) { const body = b.closest('.ev-card').querySelector('.body'); const open = body.hasAttribute('hidden'); body.toggleAttribute('hidden', !open); b.textContent = open ? 'Contraer' : 'Expandir'; b.setAttribute('aria-expanded', String(open)); return; }
    if (b.dataset.remove) { const ev = S.evaluados.find(x => x.id === b.dataset.remove); if (!ev) return; const doIt = () => { S.evaluados = S.evaluados.filter(x => x.id !== b.dataset.remove); renderEvaluados(); save(); toast('Evaluado eliminado'); }; if (ev.nombre || ev.fortalezas || ev.mejora) askConfirm(b, '¿Quitar?', doIt); else doIt(); return; }
  });

  document.getElementById('btnAddEv').addEventListener('click', () => { if (S.evaluados.length >= MAX_EV) return; S.evaluados.push(newEvaluado()); renderEvaluados(); save(); const last = document.querySelector('#evList .ev-card:last-child input[type="text"]'); if (last) { last.scrollIntoView({ behavior: 'smooth', block: 'center' }); last.focus(); } });

  function insertText(text, target) {
    const el = target || activeField;
    if (el && (el.tagName === 'TEXTAREA' || el.type === 'text')) {
      const cur = el.value; const sep = cur && !/\s$/.test(cur) ? ' ' : '';
      el.value = cur + sep + text; el.dispatchEvent(new Event('input', { bubbles: true })); el.focus(); toast('Frase insertada');
    } else { copyText(text).then(ok => toast(ok ? 'Copiado al portapapeles' : 'No se pudo copiar')); }
  }
  document.querySelector('aside').addEventListener('click', e => {
    const q = e.target.closest('[data-insert]'); if (q) { insertText(q.dataset.insert); return; }
    const c = e.target.closest('[data-copy]'); if (c) { copyText(c.dataset.copy).then(ok => toast(ok ? 'Referencia copiada' : 'No se pudo copiar')); return; }
    const t = e.target.closest('[role="tab"]'); if (t) { document.querySelectorAll('#sideTabs [role="tab"]').forEach(x => x.setAttribute('aria-selected', String(x === t))); document.querySelectorAll('.tabpanel').forEach(p => p.hidden = p.id !== 'tab-' + t.dataset.tab); }
  });
  document.querySelector('aside').addEventListener('keydown', e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-insert]')) { e.preventDefault(); insertText(e.target.dataset.insert); } });

  /* Sesiones */
  document.getElementById('sessionSel').addEventListener('change', e => { S = db.sesiones.find(s => s.id === e.target.value); db.actual = S.id; store.set(KEY, db); renderAll(); });
  document.getElementById('btnNew').addEventListener('click', () => { S = newSession(); db.sesiones.unshift(S); db.actual = S.id; store.set(KEY, db); renderAll(); toast('Nueva sesión'); document.getElementById('fTitulo').focus(); });
  document.getElementById('btnDup').addEventListener('click', () => { S = newSession(S); db.sesiones.unshift(S); db.actual = S.id; store.set(KEY, db); renderAll(); toast('Sesión duplicada'); });
  document.getElementById('btnDel').addEventListener('click', e => askConfirm(e.currentTarget, '¿Eliminar esta sesión?', () => { db.sesiones = db.sesiones.filter(s => s.id !== S.id); if (!db.sesiones.length) db.sesiones.push(newSession()); S = db.sesiones[0]; db.actual = S.id; store.set(KEY, db); renderAll(); toast('Sesión eliminada'); }));

  /* ---------- Salida: texto / impresión / JSON ---------- */
  function asText() {
    const e = enfoqueActual(); const L = [];
    L.push('Asignatura: ' + M.nombre); L.push('Actividad: ' + M.actividadPrincipal.nombre); L.push('Duración: ' + M.actividadPrincipal.duracion);
    L.push('Docente: ' + (S.docente || '') + '    Fecha: ' + fmtDate(S.fecha)); L.push('Nombre del evaluador: ' + (S.evaluador || ''));
    if (e || S.equipo) L.push('Enfoque: ' + (e ? e.nombre : 'Otro') + (S.equipo ? '    Equipo/caso: ' + S.equipo : ''));
    S.evaluados.forEach((ev, i) => {
      const f = finalScore(ev);
      L.push(''); L.push((i + 1) + '.- Nombre del evaluado: ' + (ev.nombre || '') + (ev.rol ? ' (' + ev.rol + ')' : ''));
      L.push('Calificación final (promedio sugerido entre 0-5 puntos): ' + (f == null ? '' : f.toFixed(1)));
      const det = M.criteriosIndividual.filter(c => typeof ev.puntajes[c.id] === 'number').map(c => c.nombre + ': ' + ev.puntajes[c.id]).join(' · '); if (det) L.push('Criterios: ' + det);
      L.push('Fortalezas observadas: ' + (ev.fortalezas || '')); L.push('Áreas de mejora: ' + (ev.mejora || '')); L.push('Recomendaciones finales: ' + (ev.recomendaciones || ''));
    });
    const t = S.equipoEval; const tf = finalScore(t);
    if (t.nombre || tf != null || t.fortalezas || t.mejora || t.recomendaciones) {
      L.push(''); L.push('Evaluación del equipo: ' + (t.nombre || '')); L.push('Calificación del equipo (0-5): ' + (tf == null ? '' : tf.toFixed(1)));
      const det = M.criteriosEquipo.filter(c => typeof t.puntajes[c.id] === 'number').map(c => c.nombre + ': ' + t.puntajes[c.id]).join(' · '); if (det) L.push('Criterios: ' + det);
      L.push('Fortalezas: ' + (t.fortalezas || '')); L.push('Áreas de mejora: ' + (t.mejora || '')); L.push('Recomendaciones finales: ' + (t.recomendaciones || ''));
    }
    L.push(''); L.push('Nota: ' + M.actividadPrincipal.nota);
    return L.join('\n');
  }
  function renderPrint() {
    const e = enfoqueActual(); const fl = (k, v) => `<p class="field-line"><b>${k}:</b> ${esc(v || '')}</p>`;
    const block = (o, crits) => `${fl('Calificación final (promedio sugerido entre 0-5 puntos)', finalScore(o) == null ? '' : finalScore(o).toFixed(1))}<p class="field-line"><small>${crits.filter(c => typeof o.puntajes[c.id] === 'number').map(c => esc(c.nombre) + ': ' + o.puntajes[c.id]).join(' · ')}</small></p><p class="field-line"><b>Fortalezas observadas:</b></p><div class="text">${esc(o.fortalezas)}</div><p class="field-line"><b>Áreas de mejora:</b></p><div class="text">${esc(o.mejora)}</div><p class="field-line"><b>Recomendaciones finales:</b></p><div class="text">${esc(o.recomendaciones)}</div>`;
    const t = S.equipoEval; const hasTeam = t.nombre || finalScore(t) != null || t.fortalezas || t.mejora || t.recomendaciones;
    document.getElementById('printSheet').innerHTML = `<img src="assets/img/uvm-logo-completo.jpg" alt="UVM" style="height:60px;width:auto;margin-bottom:12pt">
      <h1>${esc(M.nombre)}</h1>${fl('Asignatura', M.nombre)}${fl('Actividad', M.actividadPrincipal.nombre)}${fl('Duración', M.actividadPrincipal.duracion)}
      <p class="field-line"><b>Docente:</b> ${esc(S.docente)} &nbsp;&nbsp;&nbsp; <b>Fecha:</b> ${esc(fmtDate(S.fecha))}</p>${fl('Nombre del evaluador', S.evaluador)}${e || S.equipo ? fl('Enfoque / equipo', (e ? e.nombre : 'Otro') + (S.equipo ? ' · ' + S.equipo : '')) : ''}
      ${S.evaluados.map((ev, i) => `<div class="ev"><p class="field-line"><b>${i + 1}.- Nombre del evaluado:</b> ${esc(ev.nombre)}${ev.rol ? ' <small>(' + esc(ev.rol) + ')</small>' : ''}</p>${block(ev, M.criteriosIndividual)}</div>`).join('')}
      ${hasTeam ? `<div class="ev"><p class="field-line"><b>Evaluación del equipo:</b> ${esc(t.nombre)}</p>${block(t, M.criteriosEquipo)}</div>` : ''}
      <p class="foot"><b>Nota:</b> ${esc(M.actividadPrincipal.nota)}</p><p class="no-print" style="margin-top:14px"><button type="button" class="btn sm" onclick="document.getElementById('printSheet').classList.remove('show')">Cerrar vista</button></p>`;
  }
  document.getElementById('btnPrint').innerHTML = icon('print') + ' Imprimir / guardar PDF';
  document.getElementById('btnCopy').innerHTML = icon('copy') + ' Copiar texto';
  document.getElementById('btnExport').innerHTML = icon('download') + ' Exportar JSON';
  document.getElementById('lblImport').innerHTML = icon('upload') + ' Importar JSON';
  document.getElementById('btnPrint').addEventListener('click', () => { renderPrint(); window.print(); });
  document.getElementById('btnSheet').innerHTML = icon('search') + ' Ver hoja oficial';
  document.getElementById('btnSheet').addEventListener('click', () => { const sh = document.getElementById('printSheet'); const open = !sh.classList.contains('show'); renderPrint(); sh.classList.toggle('show', open); if (open) sh.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
  if (window.UVM_PREVIEW) { ['btnPrint', 'btnExport'].forEach(id => document.getElementById(id).hidden = true); document.querySelector('label[for="fileImport"]').hidden = true; }
  window.addEventListener('beforeprint', renderPrint);
  document.getElementById('btnCopy').addEventListener('click', () => copyText(asText()).then(ok => toast(ok ? 'Texto copiado; pégalo en Word o en la plataforma' : 'No se pudo copiar')));
  document.getElementById('btnExport').addEventListener('click', () => { download('retroalimentacion-' + (S.fecha || 'sesion') + '.json', JSON.stringify(S, null, 2)); toast('Archivo descargado'); });
  document.getElementById('fileImport').addEventListener('change', e => {
    const f = e.target.files[0]; if (!f) return; const r = new FileReader();
    r.onload = () => { try { const d = JSON.parse(r.result); const list = Array.isArray(d) ? d : Array.isArray(d.sesiones) ? d.sesiones : [d]; let n = 0; list.forEach(s => { if (s && Array.isArray(s.evaluados)) { s.id = uid(); if (!s.equipoEval) s.equipoEval = newSession().equipoEval; db.sesiones.unshift(s); n++; } }); if (!n) throw new Error('sin sesiones'); S = db.sesiones[0]; db.actual = S.id; store.set(KEY, db); renderAll(); toast(n + ' sesión(es) importada(s)'); } catch (err) { toast('El archivo no tiene el formato esperado'); } e.target.value = ''; };
    r.readAsText(f);
  });

  renderAll();
})();
