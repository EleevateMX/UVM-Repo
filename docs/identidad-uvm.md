# Identidad gráfica UVM aplicada al tablón

Investigación de la identidad visual de la **Universidad del Valle de México (UVM)** y cómo se tradujo en el sistema de diseño del tablón (`assets/css/uvm.css`).

> Nota de alcance: desde el entorno donde se construyó el tablón no fue posible abrir `uvm.mx`, Wikipedia/Wikimedia ni los repositorios de logotipos (bloqueados por el proxy de red), por lo que **no se consultó el manual de identidad oficial**. Los valores de color se **muestrearon de los logotipos incrustados** en los materiales de clase y se contrastaron con lo que reportan fuentes secundarias en los resultados de búsqueda. Si consigues el manual oficial (Dirección de Comunicación / Marketing UVM), sustituye los tokens en `:root` y todo el tablón se actualiza.

## 1. Elementos de la marca

| Elemento | Descripción | Archivo en el repo |
|---|---|---|
| **Escudo** | Águila (norte del continente: majestad, independencia, libertad) y cóndor (sur: autonomía, sabiduría, fuerza) sobre el emblema de la Ciudad de México, enmarcados por el lema **«Por siempre responsable de lo que se ha cultivado»**. Va en rojo institucional. | `assets/img/uvm-escudo.png` (recortado del encabezado del formato de retroalimentación) |
| **Wordmark «UVM»** | Letras en gris degradado (de ≈ `#2B2B2E` arriba a ≈ `#6B6B70` abajo) con una **línea roja** debajo y la leyenda *Laureate International Universities*. | `assets/img/uvm-laureate.png` (de la presentación de TCC) |
| **Logotipo completo** | Escudo + wordmark + «Universidad del Valle de México». Aparece en el encabezado de los formatos oficiales. | `assets/img/uvm-logo-completo.jpg`, `assets/img/uvm-wordmark.png` |
| **Lema** | «Por siempre responsable de lo que se ha cultivado». | — |
| **Pertenencia** | Red Laureate International Universities (así aparece en los materiales de 2025). | — |

Fuentes secundarias que describen el escudo y su significado: página del escudo de la preparatoria UVM (`prepa-uvm.blogspot.com/p/noticias.html`), Academia Avanti (`academiavanti.es/universidad-del-valle-de-mexico-logo/`), 1000logos y logos-world (historia del logotipo: la versión antigua llevaba una franja roja ancha con el ave; la actual usa el wordmark gris sobre blanco).

## 2. Paleta

### Institucional (muestreada)

| Token | Hex | Origen |
|---|---|---|
| `--uvm-rojo` | `#C8202E` | Punto medio entre el rojo del escudo en el JPEG del formato (`#991A1C`, oscurecido por compresión) y la línea roja del wordmark PNG (`#CF352A`). Cercano a Pantone 186/1795 que suelen usar las universidades de la red. |
| `--uvm-rojo-oscuro` | `#9E1522` | Derivado (hover, énfasis). |
| `--uvm-rojo-suave` | `#FBE9EB` | Derivado (fondos de badge). |
| `--uvm-gris-900` | `#2B2B2E` | Parte superior del degradado del wordmark. |
| `--uvm-gris-700` | `#444446` | Promedio del wordmark. |
| `--uvm-gris-500/300/150/050` | `#6E6E73` / `#B9B9BE` / `#E6E6E9` / `#F5F5F7` | Escala neutra derivada. |

### Por enfoque (para identificar unidades de la materia)

Tomados del tema (`theme1.xml`) de cada presentación entregada en clase:

| Unidad | Hex | Origen |
|---|---|---|
| Psicoanálisis | `#A53010` | `accent1` de *Introducción al Psicoanálisis* (tema Century Gothic, acentos terracota/oliva). |
| Humanista-existencial | `#734B67` | `accent1` de *Aplicación Humanista-Existencial* (tema Univers Condensed / Calisto MT). |
| TCC | `#156082` | `accent1` de *Terapia Cognitivo-Conductual*. |
| Conceptos cognitivos | `#5F7A57` | Salvia de las infografías *Conceptos Cognitivos* (paleta crema / salvia / coral). |

### Semánticos

OK `#2F855A`, Info `#2B6CB0`, Advertencia `#B7791F`, Error `#C53030`, Foco `#1E6FD9`. Cada uno con fondo suave para badges y callouts.

## 3. Tipografía

- El wordmark es una sans geométrica de trazo grueso. Para pantalla se eligió **Montserrat** (700/800) en títulos, con respaldo `Segoe UI / system-ui`.
- Cuerpo: **Source Sans 3** (400/600), muy legible en formularios y apuntes largos.
- Ambas se cargan desde Google Fonts; sin conexión el tablón cae a la fuente del sistema sin romperse.

## 4. Motivos y reglas de uso

1. **Tarjetas blancas sobre fondo gris 050**, radio 14 px, sombra sutil. Nada de franjas decorativas.
2. **Hero oscuro** (gris 900 → gris 700) con un halo rojo en la esquina y una línea roja corta (`.hero-line`) como único acento.
3. **Color por unidad**: badges, iconos y puntos de la línea de tiempo usan el color del enfoque; el rojo se reserva para acciones y la marca.
4. **Iconos de trazo** (24 px, 1.8 px) en círculos de color suave.
5. **Escala 0–5** siempre con etiqueta (No se observó → Excelente) y anillo de puntaje.
6. **Impresión**: el módulo de retroalimentación reproduce el formato oficial (logotipo, asignatura, actividad, duración, docente, fecha, evaluador, bloques por evaluado y nota al pie).
7. Tema oscuro automático (`prefers-color-scheme`) con interruptor manual; la impresión siempre es clara.

## 5. Elementos gráficos disponibles para módulos futuros

Ver `kit/index.html` (demostración viva) y `plantillas/modulo-plantilla.html` (esqueleto). Componentes: topbar con escudo, hero, tarjetas de módulo, badges por enfoque y por puntaje, chips, botones, escala 0–5, anillo de puntaje, barra de progreso, línea de tiempo, cita, callouts, tabs, acordeones, panel lateral pegajoso, toast, tabla, hoja de impresión.

## 6. Fuentes consultadas

- Resultados de búsqueda sobre la identidad de UVM (Wikipedia «Universidad del Valle de México», archivo «Logo UVM Rojo.svg» y «Escudo de la UVM.jpg», 1000logos, logos-world, seeklogo, Brandfetch `uvm.mx`, docencium, academiavanti, wolfagenciademarketing). Sólo los extractos fueron accesibles.
- Materiales de clase: formato *Retroalimentaciones entre alumnos* (Word) y presentaciones *Introducción al Psicoanálisis*, *Neurosis*, *Aplicación Humanista-Existencial*, *Terapia Cognitivo-Conductual*, infografías *Conceptos Cognitivos*.
