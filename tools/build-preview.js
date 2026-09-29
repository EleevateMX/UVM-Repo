#!/usr/bin/env node
/* Genera preview/ : copia plana del tablón (rutas sin carpetas) para publicarla
   como página de previsualización (artefacto de claude.ai o cualquier hosting).
   Uso: node tools/build-preview.js */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), OUT = path.join(ROOT, 'preview');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets/css'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets/js'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'assets/img'), { recursive: true });

const MAT = 'materias/aplicaciones-psicoterapia/';
// nombre plano de cada página
const PAGES = {
  'index.html': 'index.html',
  [MAT + 'index.html']: 'materia.html',
  [MAT + 'retroalimentacion.html']: 'retroalimentacion.html',
  [MAT + 'apuntes.html']: 'apuntes.html',
  'kit/index.html': 'kit.html',
  'plantillas/modulo-plantilla.html': 'plantilla.html'
};
// reemplazos de rutas (orden importa)
function flatten(html, src) {
  let s = html;
  s = s.replace(/\.\.\/\.\.\/index\.html/g, '@@ROOT@@').replace(/\.\.\/index\.html/g, '@@ROOT@@');
  s = s.replace(/(href|src)="index\.html"/g, (m, a) => src === 'index.html' ? m : `${a}="materia.html"`);
  s = s.replace(/@@ROOT@@/g, 'index.html');
  s = s.replace(/materias\/aplicaciones-psicoterapia\/index\.html/g, 'materia.html')
       .replace(/materias\/aplicaciones-psicoterapia\/retroalimentacion\.html/g, 'retroalimentacion.html')
       .replace(/materias\/aplicaciones-psicoterapia\/apuntes\.html/g, 'apuntes.html')
       .replace(/materias\/aplicaciones-psicoterapia\/data\.js/g, 'data.js')
       .replace(/kit\/index\.html/g, 'kit.html')
       .replace(/plantillas\/modulo-plantilla\.html/g, 'plantilla.html')
       .replace(/href="(?:\.\.\/)*docs\/identidad-uvm\.md"/g, 'href="https://github.com/EleevateMX/UVM-Repo/blob/claude/cool-edison-fvt700/docs/identidad-uvm.md" target="_blank" rel="noopener"')
       .replace(/\.\.\/\.\.\//g, '').replace(/\.\.\//g, '')
       .replace(/root:\s*'[^']*'/g, "root: ''").replace(/renderFooter\('[^']*'\)/g, "renderFooter('')");
  s = s.replace(/<script src="assets\/js\/uvm-core\.js"><\/script>/, '<script>window.UVM_PREVIEW = true;</script>\n<script src="assets/js/uvm-core.js"></script>');
  return s;
}
for (const [src, dst] of Object.entries(PAGES)) {
  let s = flatten(fs.readFileSync(path.join(ROOT, src), 'utf8'), src);
  if (dst === 'index.html') { // la página principal se publica sin esqueleto (lo añade el visor)
    s = s.replace(/<!doctype html>\s*/i, '').replace(/<html[^>]*>\s*/i, '').replace(/<\/?head>\s*/gi, '').replace(/<\/?body>\s*/gi, '').replace(/<\/html>\s*/i, '')
         .replace(/<meta charset="utf-8">\s*/i, '').replace(/<meta name="viewport"[^>]*>\s*/i, '');
  }
  fs.writeFileSync(path.join(OUT, dst), s);
}
// js/css/datos
let core = fs.readFileSync(path.join(ROOT, 'assets/js/uvm-core.js'), 'utf8');
core = flatten(core, 'core');
fs.writeFileSync(path.join(OUT, 'assets/js/uvm-core.js'), core);
fs.copyFileSync(path.join(ROOT, 'assets/css/uvm.css'), path.join(OUT, 'assets/css/uvm.css'));
fs.writeFileSync(path.join(OUT, 'data.js'), fs.readFileSync(path.join(ROOT, MAT + 'data.js'), 'utf8'));
fs.writeFileSync(path.join(OUT, 'retroalimentacion.js'), flatten(fs.readFileSync(path.join(ROOT, MAT + 'retroalimentacion.js'), 'utf8'), 'retro'));
for (const f of fs.readdirSync(path.join(ROOT, 'assets/img'))) fs.copyFileSync(path.join(ROOT, 'assets/img', f), path.join(OUT, 'assets/img', f));
fs.writeFileSync(path.join(OUT, 'README.md'), '# preview/\n\nCopia plana generada por `node tools/build-preview.js`. No edites aquí: cambia el código fuente y vuelve a generar.\n');
console.log('preview/ generado:', fs.readdirSync(OUT).join(', '));
