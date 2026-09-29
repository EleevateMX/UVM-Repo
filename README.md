# Tablón de estudios · UVM

Sitio estático personal (sin dependencias ni compilación) con la identidad gráfica de la Universidad del Valle de México para llevar materias, apuntes y actividades. La primera materia cargada es **Aplicaciones en Psicoterapia** y su módulo principal es la **retroalimentación de simulaciones a compañeros y al equipo**.

## Cómo usarlo

- **Local:** abre `index.html` en el navegador (funciona con doble clic, sin servidor).
- **GitHub Pages:** en *Settings → Pages* elige la rama y la carpeta raíz; el tablón queda publicado en la URL que indique GitHub.
- Los datos (sesiones de retroalimentación, pendientes, avance) se guardan en `localStorage` del navegador. Usa **Exportar JSON** en el módulo de retroalimentación para respaldarlos o pasarlos a otro dispositivo.

## Estructura

```
index.html                              Tablón principal (materias, módulos rápidos, pendientes, resumen)
assets/css/uvm.css                      Sistema de diseño UVM (tokens, componentes, impresión, tema oscuro)
assets/js/uvm-core.js                   Utilidades: iconos SVG, almacenamiento, barra superior, toast
assets/img/                             Escudo, wordmark y logotipo completo UVM
materias/aplicaciones-psicoterapia/
  index.html                            Página de la materia: módulos, unidades con avance, materiales
  data.js                               Contenido: enfoques, rúbricas, banco de frases, bibliografía
  retroalimentacion.html / .js          Módulo de evaluación a compañeros y equipo
  apuntes.html                          Apuntes por enfoque con buscador y referencias
kit/index.html                          Kit gráfico: colores, tipografía, logos, componentes, iconos
plantillas/modulo-plantilla.html        Esqueleto para un módulo nuevo
docs/identidad-uvm.md                   Investigación de la identidad UVM y origen de cada token
```

## Módulo de retroalimentación

Reproduce el formato oficial *Retroalimentación de simulación a compañeros* (30 minutos, calificación 0–5 como promedio sugerido) y lo enriquece:

- Hasta 12 compañeros por sesión, con rol (terapeuta, paciente, observador…).
- Rúbrica de 6 criterios (encuadre, escucha, aplicación del enfoque, preguntas, manejo del caso, ética) con escala 0–5 etiquetada; el promedio se calcula y puede ajustarse a mano.
- Evaluación del equipo con 5 criterios propios.
- Campos oficiales: fortalezas observadas, áreas de mejora, recomendaciones finales; banco de frases sugeridas según los puntajes.
- Panel lateral con guía del enfoque seleccionado (qué observar, técnicas, preguntas típicas), escala y bibliografía para citar.
- Varias sesiones guardadas; exportar/importar JSON; copiar texto; **imprimir/guardar PDF** con la hoja oficial.

## Agregar contenido

- **Nueva unidad:** añade un objeto a `enfoques` en `data.js` (id, nombre, resumen, conceptos, técnicas, preguntas, citas) y sus referencias en `bibliografia`. Aparece automáticamente en apuntes, guía y colores (agrega `--enf-<id>` en `uvm.css` si quieres un color nuevo).
- **Nuevo módulo:** copia `plantillas/modulo-plantilla.html` a la carpeta de la materia, ajusta rutas (`../` → `../../`) y enlázalo en la lista `mods` de `materias/<materia>/index.html`.
- **Nueva materia:** duplica `materias/aplicaciones-psicoterapia/`, cambia `data.js` y agrega su tarjeta en `index.html`.

## Créditos

Contenido académico resumido de los materiales de la Mtra. Elvira Gómez Luna (UVM). Logotipos propiedad de la Universidad del Valle de México / Laureate; uso personal de estudio.
