/* Aplicaciones en Psicoterapia — contenido de la materia
   Fuente: apuntes y presentaciones de la clase (Mtra. Elvira Gómez Luna, UVM) resumidos para estudio personal.
   Para agregar una unidad nueva: añade un objeto a MATERIA.enfoques y (opcional) su bibliografía. */
window.MATERIA = {
  clave: 'aplicaciones-psicoterapia',
  nombre: 'Aplicaciones en Psicoterapia',
  docente: 'Mtra. Elvira Gómez Luna',
  contacto: 'elvira_gomez@my.uvm.edu.mx',
  descripcion: 'Aplicación de los principales enfoques psicoterapéuticos (psicoanalítico, humanista-existencial, cognitivo y cognitivo-conductual) mediante simulaciones de sesión, análisis de casos y retroalimentación entre compañeros.',
  actividadPrincipal: {
    nombre: 'Retroalimentación de simulación a compañeros',
    duracion: '30 minutos',
    escala: 'Calificación final: promedio sugerido entre 0 y 5 puntos',
    nota: 'Este formato está diseñado para fomentar la evaluación formativa, la reflexión crítica y el desarrollo de habilidades clínicas en estudiantes de psicología.'
  },

  /* ---------------- Escala 0–5 ---------------- */
  escala: [
    { v: 0, label: 'No se observó', desc: 'La conducta o habilidad no apareció durante la simulación.' },
    { v: 1, label: 'Insuficiente', desc: 'Aparece de forma aislada o incorrecta; interfiere con la sesión.' },
    { v: 2, label: 'En desarrollo', desc: 'Se intenta, pero con errores o poca consistencia.' },
    { v: 3, label: 'Adecuado', desc: 'Cumple lo esperado para el nivel del curso.' },
    { v: 4, label: 'Bueno', desc: 'Consistente, oportuno y coherente con el enfoque.' },
    { v: 5, label: 'Excelente', desc: 'Sobresaliente; podría servir de modelo para el grupo.' }
  ],

  /* ---------------- Rúbrica individual (terapeuta en la simulación) ---------------- */
  criteriosIndividual: [
    { id: 'encuadre', nombre: 'Encuadre y rapport', desc: 'Saludo, presentación, consentimiento/confidencialidad, objetivo de la sesión y clima de confianza.' },
    { id: 'escucha', nombre: 'Escucha activa y empatía', desc: 'Atención plena, reflejo de sentimientos, parafraseo, silencios bien manejados, sin juzgar.' },
    { id: 'enfoque', nombre: 'Aplicación del enfoque', desc: 'Usa técnicas propias del modelo trabajado (p. ej. asociación libre, silla vacía, reestructuración) de forma coherente.' },
    { id: 'preguntas', nombre: 'Preguntas e intervenciones', desc: 'Preguntas abiertas, pertinentes y oportunas; intervenciones que hacen avanzar al paciente.' },
    { id: 'manejo', nombre: 'Manejo del caso y del tiempo', desc: 'Sigue el hilo del relato, sostiene emociones intensas, administra los 30 minutos y cierra la sesión.' },
    { id: 'etica', nombre: 'Ética y actitud profesional', desc: 'Lenguaje respetuoso, postura, límites, no da consejos ni diagnósticos apresurados.' }
  ],

  /* ---------------- Rúbrica de equipo ---------------- */
  criteriosEquipo: [
    { id: 'coherencia', nombre: 'Coherencia caso–enfoque', desc: 'El caso y las intervenciones son consistentes con el enfoque asignado.' },
    { id: 'roles', nombre: 'Organización y roles', desc: 'Terapeuta, paciente y observadores con funciones claras; preparación previa evidente.' },
    { id: 'participacion', nombre: 'Participación equilibrada', desc: 'Todos los integrantes aportan; nadie carga con todo ni queda fuera.' },
    { id: 'tiempo', nombre: 'Manejo del tiempo', desc: 'La simulación y el análisis se ajustan al tiempo asignado.' },
    { id: 'analisis', nombre: 'Análisis y reflexión', desc: 'El equipo explica qué técnicas usó, por qué, y qué mejoraría.' }
  ],

  /* ---------------- Banco de frases para redactar retroalimentación ---------------- */
  frases: {
    fortalezas: {
      encuadre: ['Estableció un encuadre claro desde el inicio (presentación, confidencialidad y objetivo de la sesión).', 'Generó un clima de confianza que permitió que el paciente se abriera con rapidez.'],
      escucha: ['Mostró escucha activa: reflejó sentimientos y parafraseó sin interrumpir.', 'Sostuvo los silencios con naturalidad, dando espacio al relato del paciente.'],
      enfoque: ['Aplicó técnicas coherentes con el enfoque trabajado y las explicó con claridad en el análisis.', 'La intervención principal fue pertinente al momento de la sesión y al caso.'],
      preguntas: ['Formuló preguntas abiertas que ayudaron al paciente a profundizar en su experiencia.', 'Sus intervenciones fueron oportunas y respetaron el ritmo del paciente.'],
      manejo: ['Mantuvo el hilo del caso y administró bien el tiempo, con un cierre ordenado.', 'Manejó con serenidad los momentos de mayor carga emocional.'],
      etica: ['Mantuvo una actitud profesional, respetuosa y sin juicios durante toda la sesión.', 'Evitó dar consejos directos o diagnósticos apresurados.']
    },
    mejora: {
      encuadre: ['Faltó explicitar el objetivo de la sesión y el acuerdo de confidencialidad al inicio.', 'El rapport tardó en construirse; conviene dedicar los primeros minutos a la relación.'],
      escucha: ['Interrumpió en varios momentos; el reflejo de sentimientos fue escaso.', 'Los silencios se llenaron con demasiada rapidez, restando espacio al paciente.'],
      enfoque: ['Las técnicas utilizadas no siempre correspondieron al enfoque asignado.', 'Se quedó en la descripción del problema sin aplicar una técnica concreta del modelo.'],
      preguntas: ['Predominaron las preguntas cerradas o dirigidas; conviene abrir más la exploración.', 'Algunas intervenciones llegaron antes de tiempo, sin suficiente exploración previa.'],
      manejo: ['Se perdió el hilo del caso en la parte media y el cierre quedó apresurado.', 'Le costó sostener la emoción intensa del paciente y cambió de tema.'],
      etica: ['Dio consejos directos en lugar de acompañar la reflexión del paciente.', 'El lenguaje corporal (postura, mirada) transmitió poca presencia.']
    },
    recomendaciones: {
      encuadre: ['Preparar un guion breve de apertura: quién soy, cómo trabajaremos, confidencialidad y objetivo.'],
      escucha: ['Practicar el reflejo simple ("Escucho que te sientes…") y contar hasta tres antes de intervenir.'],
      enfoque: ['Elegir una o dos técnicas del enfoque antes de la simulación y ensayarlas con el equipo.'],
      preguntas: ['Convertir preguntas cerradas en abiertas: "¿Qué pasó?" en lugar de "¿Te sentiste mal?".'],
      manejo: ['Poner un reloj visible y reservar los últimos 5 minutos para síntesis y cierre.'],
      etica: ['Revisar el código ético: acompañar la decisión del paciente en lugar de decidir por él.']
    },
    equipo: {
      fortalezas: ['El equipo mostró preparación previa: roles claros y caso bien construido.', 'La participación fue equilibrada y el análisis posterior explicó con claridad las técnicas empleadas.'],
      mejora: ['El caso resultó poco coherente con el enfoque asignado; conviene revisar sus principios antes de diseñarlo.', 'La participación se concentró en una o dos personas.'],
      recomendaciones: ['Ensayar la simulación completa al menos una vez con cronómetro y repartir intervenciones entre todos.']
    }
  },

  /* ---------------- Unidades / enfoques ---------------- */
  enfoques: [
    {
      id: 'psicoanalisis', clase: 'psicoanalisis', nombre: 'Enfoque psicoanalítico', corto: 'Psicoanálisis',
      autores: 'Sigmund Freud (1856–1939), Josef Breuer, Jean-Martin Charcot; lecturas lacanianas (J.-D. Nasio, A. Eidelsztein).',
      resumen: 'Modelo que explica el síntoma como signo de un conflicto psíquico inconsciente. La cura se produce por la palabra: al conectar lo reprimido con el relato, el afecto "atorado" puede tramitarse y el síntoma cede.',
      conceptos: [
        { t: 'Trauma (Charcot vs. Freud)', d: 'Charcot: trauma mecánico/físico y "estado hipnoide" como predisposición. Freud: lo que enferma no es el hecho físico sino la condición psíquica (el temor vivido); está en juego la palabra, no el hecho.' },
        { t: 'Aparato psíquico y representaciones', d: 'El aparato está formado por representaciones (palabra en estado práctico) con un monto de afecto (suma de excitación) que circula entre ellas. El YO es un conjunto de representaciones conciliables.' },
        { t: 'Principio de constancia', d: 'Basado en la termodinámica: el organismo tiende a descargar los excesos de energía y a mantener el nivel bajo y constante (homeostasis). Lo que quedó cargado y no se descargó resulta traumático.' },
        { t: 'Representación inconciliable y defensa', d: 'Una representación que no puede integrarse al YO genera conflicto. La defensa la debilita (le quita afecto) y la aísla en un "segundo núcleo psíquico". El afecto separado debe tener un destino.' },
        { t: 'Conversión y obsesión', d: 'Si el afecto se traspone al cuerpo: conversión (histeria). Si permanece en lo psíquico y pasa a otra representación que se vuelve hiperpotente: obsesión.' },
        { t: 'Síntoma', d: 'Signo clínico de malestar (displacer). Freud no valora el síntoma cristalizado sino la posibilidad de pasar del síntoma a un relato: de un elemento coagulado a una cadena discursiva.' },
        { t: 'Tres vías de descarga', d: 'Acción, palabra y tramitación psíquica. Lo olvidado ("saber no sabido") conserva mucha carga; al recordarlo y relatarlo se tramita: lo reprimido produce síntoma.' },
        { t: 'Neurosis', d: 'Trastorno psíquico originado por un conflicto intrapsíquico entre deseos inconscientes (ello) y las defensas (yo / superyó). En términos lacanianos: modo de defensa contra la castración por fijación a un escenario edípico; "tener un saber hacer con la falta y el deseo".' },
        { t: 'Neurosis obsesiva', d: 'Deseo dirigido a servir el deseo del otro; superyó fortalecido, castigador y exigente; autorreproche. Defensas: formación reactiva (principal), desplazamiento, aislamiento, anulación retroactiva.' },
        { t: 'Neurosis histérica', d: 'Privilegia el cuerpo como lugar de inscripción de los síntomas; busca poner en primera instancia su propio deseo y "curar" su deseo a través del otro. Es una lógica psíquica presente también en hombres.' },
        { t: 'Tópicas freudianas', d: 'Primera tópica (1900): consciente – preconsciente – inconsciente. Segunda tópica (1923): ello (pulsiones), yo (mediador, principio de realidad), superyó (normas, moral).' }
      ],
      tecnicas: [
        { t: 'Método catártico – hipnosis', d: 'Breuer y Freud buscaban el momento traumático bajo hipnosis; al relatarlo se descarga el afecto (catarsis). Freud la abandona: no todos son hipnotizables, no se consideraba buen hipnotizador y el paciente no enfrentaba sus resistencias.' },
        { t: 'Presión sobre la frente', d: 'Sugestión para quienes no podían ser hipnotizados: mientras la mano estaba en la frente, vendrían recuerdos e imágenes que darían lugar al relato.' },
        { t: 'Asociación libre', d: 'Comprometer al paciente a decir todo lo que se le ocurra sin selección ni censura. Logra por la palabra la descarga del afecto sin tramitación motriz. "Cesa la causa, cesa el efecto".' },
        { t: 'Escucha del significante', d: 'Cada palabra tiene un valor de afecto distinto para cada persona (p. ej. "pistola" – pene). El analista escucha las asociaciones, los lapsus y las repeticiones.' },
        { t: 'Diagnóstico estructural', d: '"No se diagnostica por el síntoma, el deseo o el fantasma… es la covariancia de todos ellos en lo que se funda el diagnóstico del analista" (Eidelsztein).' }
      ],
      queObservar: ['¿Invita al paciente a hablar libremente y tolera los silencios?', '¿Escucha repeticiones, lapsus y palabras cargadas en vez de "resolver" el síntoma?', '¿Explora el pasado y las asociaciones sin interpretar demasiado pronto?', '¿Distingue conversión (cuerpo) de obsesión (pensamiento) en el caso?', '¿Evita dar consejos y sugestión directa?'],
      preguntas: ['¿Qué se te viene a la mente cuando dices eso?', '¿A qué te recuerda esta sensación?', '¿Cuándo fue la primera vez que sentiste algo parecido?', '¿Qué palabra usarías para eso que te pasa en el cuerpo?', '¿Qué es lo que no se puede decir de esto?'],
      citas: [
        { q: 'Las emociones reprimidas nunca mueren. Están enterradas vivas y saldrán a la luz de la peor manera.', a: 'Atribuida a Sigmund Freud' },
        { q: 'El neurótico ama a su síntoma como el psicótico a su delirio.', a: 'Sigmund Freud' },
        { q: 'Aquel que sabe no huir de su propia angustia será también aquel que no huya de su propio deseo.', a: 'Jacques Lacan, Seminario 7' }
      ],
      recursos: [
        { t: 'Película: Freud (1962), J. Huston (opcional)', u: 'https://archive.org/details/Freud1962' },
        { t: 'Video de clase (YouTube): método catártico y asociación libre', u: 'https://www.youtube.com/watch?v=7SqA5kuxZxk' }
      ]
    },
    {
      id: 'humanista', clase: 'humanista', nombre: 'Enfoque humanista-existencial', corto: 'Humanista-Existencial',
      autores: 'Carl Rogers, Abraham Maslow, Fritz Perls (Gestalt), Viktor Frankl (logoterapia), Rollo May, James Bugental, Irvin Yalom, Ludwig Binswanger.',
      resumen: '"Tercera vía" frente al psicoanálisis y el conductismo. Centrada en la dignidad, la libertad y el potencial de la persona; la relación terapéutica genuina, empática y sin juicio es el medio del cambio. La vertiente existencial añade la libertad, la responsabilidad, la angustia y la búsqueda de sentido.',
      conceptos: [
        { t: 'Objetivo de la unidad', d: 'Comprender e identificar cómo se aplican los principios y técnicas de la psicoterapia humanista-existencial en el proceso terapéutico, reconociendo su enfoque centrado en la experiencia, la autenticidad y la libertad.' },
        { t: 'Centrado en la persona', d: 'El "cliente" (Rogers) es el agente principal de su cambio. El terapeuta no dirige ni interpreta: facilita.' },
        { t: 'Tendencia actualizante', d: 'Toda persona posee una tendencia innata a desarrollarse y realizar su potencial si se le brinda un ambiente adecuado.' },
        { t: 'Aquí y ahora', d: 'Se valora la experiencia inmediata y la conciencia del momento presente.' },
        { t: 'Relación terapéutica como herramienta', d: 'Una relación genuina, empática y libre de juicio es el medio por el cual se produce el cambio.' },
        { t: 'Enfoque holístico', d: 'Cuerpo, mente, emociones, contexto y espiritualidad como totalidad.' },
        { t: 'Raíces filosóficas', d: 'Humanismo clásico, fenomenología (Husserl) y existencialismo (Kierkegaard, Nietzsche, Heidegger, Sartre, Merleau-Ponty). Binswanger crea el análisis existencial (Daseinsanalyse); Jaspers conecta existencialismo y psiquiatría.' },
        { t: 'Temas existenciales', d: 'Libertad y responsabilidad, autenticidad, búsqueda de sentido, ansiedad existencial (el sufrimiento puede tener valor transformador), muerte y aislamiento (Yalom).' }
      ],
      tecnicas: [
        { t: 'Centrada en la persona (Rogers)', d: 'Escucha activa, reflejo de sentimientos, aceptación incondicional positiva, congruencia/autenticidad y empatía profunda.' },
        { t: 'Gestalt (Perls)', d: 'Silla vacía, monodrama o dramatización, focalización en el cuerpo, lenguaje en primera persona y presente ("yo me siento mal ahora"), diálogo de polaridades.' },
        { t: 'Logoterapia (Frankl)', d: 'Diálogo socrático (preguntas abiertas para descubrir el sentido), intención paradójica (humor/exageración para reducir la ansiedad ante el síntoma), dereflexión (desplazar el foco del problema hacia valores y propósitos).' },
        { t: 'Otras herramientas', d: 'Mindfulness, visualizaciones guiadas, técnicas artísticas y expresivas, exploración de valores y construcción de sentido, autorrevelación genuina del terapeuta cuando es útil.' }
      ],
      queObservar: ['¿El terapeuta acompaña sin dirigir ni interpretar?', '¿Refleja sentimientos y comunica empatía de forma explícita?', '¿Lleva al paciente al aquí y ahora (cuerpo, emoción presente)?', '¿Aplica una técnica concreta (silla vacía, diálogo socrático, dereflexión) y la nombra en el análisis?', '¿Trabaja la libertad y la responsabilidad del paciente ante su situación?'],
      preguntas: ['¿Qué estás sintiendo justo ahora mientras hablamos?', '¿Puedes describir lo que notas en tu cuerpo en este momento?', '¿Qué aspectos de ti mismo te gustaría fortalecer o desarrollar más?', '¿Qué sientes cuando te escucho sin juzgar?', '¿Qué papel juega tu entorno (familia, amigos, trabajo) en cómo te sientes?', '¿Qué aprendizajes, aunque dolorosos, te ha dejado esta experiencia?', '¿Qué podrías hacer hoy que honre lo que valoras y ayude a alguien más?'],
      caso: { t: 'Caso ejemplo: María, 48 años, duelo por la pérdida de su hijo', d: '1) Exploración del vacío existencial con diálogo socrático. 2) Redirección del sufrimiento hacia un propósito ("no elegiste esta pérdida, pero sí qué haces con tu dolor"). 3) Dereflexión: dirigir la atención hacia los demás y valores superiores (blog y grupo de apoyo). Resultado esperado: el dolor sigue, pero ya no paraliza; reconstruye desde el amor, no desde la pérdida.' },
      citas: [
        { q: 'Cuando alguien te escucha sin juzgar, sin intentar asumir la responsabilidad de ti, sin tratar de moldearte, es profundamente liberador.', a: 'Carl Rogers, On Becoming a Person' },
        { q: 'El hombre está condenado a ser libre.', a: 'Jean-Paul Sartre' },
        { q: 'Al hombre se le puede arrebatar todo salvo una cosa: la última de las libertades humanas, la elección de la actitud personal ante un conjunto de circunstancias.', a: 'Viktor Frankl' }
      ],
      recursos: [
        { t: 'Ejemplo en video (Coschool)', u: 'https://www.youtube.com/watch?v=OUDGNvUo0P0' },
        { t: 'Información complementaria (Farid Dieck)', u: 'https://www.youtube.com/watch?v=GdAQcaO4kSs' }
      ]
    },
    {
      id: 'tcc', clase: 'tcc', nombre: 'Terapia cognitivo-conductual (TCC)', corto: 'TCC',
      autores: 'Aaron Beck (terapia cognitiva), Albert Ellis (TREC), Skinner, Pávlov, Watson, Bandura, Wolpe, Meichenbaum, Kanfer.',
      resumen: 'Enfoque estructurado, breve y orientado a objetivos: pensamientos, emociones y conductas están interrelacionados. Se centra en el aquí y ahora, en identificar y modificar pensamientos automáticos, creencias y conductas aprendidas; el paciente tiene un rol activo con tareas fuera de sesión.',
      conceptos: [
        { t: 'Terapia cognitiva (Beck)', d: 'Los trastornos emocionales resultan de pensamientos automáticos negativos y esquemas cognitivos distorsionados sobre uno mismo, el mundo y el futuro. Los esquemas se aprenden y pueden modificarse.' },
        { t: 'Definición de Eysenck', d: '"El intento de cambiar el comportamiento humano y la emoción en forma benéfica según las leyes de la moderna teoría del aprendizaje".' },
        { t: 'Tres modalidades de aprendizaje', d: 'Condicionamiento clásico (Pávlov, Watson), condicionamiento operante (Skinner) y aprendizaje observacional o social (Bandura).' },
        { t: 'Principios de la TCC', d: 'Psicoterapia breve (6 semanas a 6 meses); foco en el presente y en la solución; prevención de futuros trastornos; trabajo conjunto con metas claras y compartidas; rol activo del paciente con tareas para casa.' },
        { t: 'Familia de terapias cognitivas', d: 'TREC, terapia cognitiva, terapia de esquemas, cognitivo-constructivistas, evaluación cognitiva, mindfulness, aceptación y compromiso (ACT), dialéctico-conductual (DBT), metacognitiva.' },
        { t: 'Modelo ABC de Ellis (TREC)', d: 'A: acontecimiento activador. B: creencias (racionales o irracionales) con las que se interpreta A. C: consecuencias emocionales y conductuales. El malestar no lo crea A sino B. D: debate de creencias. E: nuevas creencias racionales y sus efectos.' }
      ],
      tecnicas: [
        { t: 'Reestructuración cognitiva (Beck, 1979)', d: 'Identificar pensamientos distorsionados o irracionales y reemplazarlos por otros más realistas y funcionales.' },
        { t: 'Exposición gradual (Foa y Kozak, 1986)', d: 'Exponer progresivamente al paciente a las situaciones temidas hasta que la ansiedad disminuya (fobias, ansiedad, TOC).' },
        { t: 'Desensibilización sistemática (Wolpe, 1958)', d: 'Exposición combinada con técnicas de relajación.' },
        { t: 'Inoculación del estrés (Meichenbaum, 1985)', d: 'Enseñar habilidades de afrontamiento antes de enfrentar situaciones estresantes.' },
        { t: 'Debate (D) en TREC', d: 'Debate empírico ("¿qué evidencia tienes?"), lógico ("¿es lógico que una falla te convierta en un fracaso total?") y pragmático ("¿te ayuda pensar así?").' },
        { t: 'Cuestionamiento socrático', d: 'Guiar con preguntas para que el paciente descubra la irracionalidad de sus creencias en lugar de imponerla.' },
        { t: 'Tareas para casa – triple columna', d: 'Columna 1: acontecimiento (A). Columna 2: pensamiento/creencia (B). Columna 3: debate (D) y alternativa racional.' },
        { t: 'Autorrevelación del terapeuta', d: 'Compartir de forma cuidadosa cómo él mismo debatió pensamientos distorsionados, para mostrar que el cambio es posible.' }
      ],
      queObservar: ['¿Estructura la sesión (agenda, objetivo, resumen, tarea)?', '¿Identifica con el paciente pensamientos automáticos y los conecta con emoción y conducta?', '¿Usa el ABC o la triple columna de forma explícita?', '¿Debate creencias con preguntas (empírico, lógico, pragmático) sin discutir con el paciente?', '¿Asigna una tarea concreta para casa y la explica?'],
      preguntas: ['¿Qué pasó exactamente (A)? ¿Qué pensaste en ese momento (B)? ¿Qué sentiste e hiciste (C)?', '¿Qué evidencia tienes de que esta creencia es totalmente cierta?', '¿Dónde está la prueba de que debes ser perfecto?', '¿Es lógico pensar que una sola falla te convierte en un fracaso total?', '¿Te ayuda a sentirte mejor o a alcanzar tus metas pensar de esta manera?', '¿Qué pasaría si sigues creyendo esto? ¿Te acerca o te aleja de tus objetivos?'],
      citas: [
        { q: 'El paciente debe entender que él es responsable de sus emociones y acciones, y que tiene el poder de decidir cómo reaccionar ante la adversidad.', a: 'Apuntes de clase, TREC' }
      ],
      recursos: [
        { t: 'Actividad en video (YouTube)', u: 'https://www.youtube.com/watch?v=YmnZISnZh84' },
        { t: 'Principales representantes del enfoque cognitivo-conductual (Bloc conductual)', u: 'https://conductual.home.blog/principales-representantes/' }
      ]
    },
    {
      id: 'cognitiva', clase: 'cognitiva', nombre: 'Terapia cognitiva: sesgos, distorsiones y creencias', corto: 'Conceptos cognitivos',
      autores: 'Aaron Beck (modelo cognitivo); perfil del terapeuta cercano al racional-emotivo de Ellis con postura rogeriana.',
      resumen: 'Clase del 23 de septiembre de 2025: "Desmontando la arquitectura del pensamiento: de los sesgos a las creencias nucleares". La forma en que afrontamos la realidad está definida por cómo procesamos la información; las creencias negativas filtran la atención, la interpretación y la memoria.',
      conceptos: [
        { t: 'El filtro de la realidad', d: 'Realidad objetiva → creencias negativas → atención (a qué prestamos atención), interpretación (cómo leemos los hechos) y memoria (qué recordamos).' },
        { t: 'Sesgos cognitivos', d: 'Errores sistemáticos al procesar información: atajos que interpretan rápido pero distorsionan los hechos y mantienen el sufrimiento. Ansiedad generalizada: búsqueda constante de peligro. Pánico: hipervigilancia corporal. Depresión y obsesiones: atención secuestrada por las propias creencias o pensamientos intrusivos.' },
        { t: 'Distorsiones – Extremismo', d: 'Pensamiento dicotómico/absolutista ("si no soy perfecto, soy un fracaso"); sobregeneralización ("me fue mal una vez, siempre será igual").' },
        { t: 'Distorsiones – Adivinación', d: 'Lectura de pensamiento ("todos creen que soy tonto"); predicciones negativas; inferencia arbitraria (conclusiones sin evidencia).' },
        { t: 'Distorsiones – Filtros', d: 'Abstracción selectiva (filtro negativo); magnificación y minimización; catastrofismo ("seguro me despiden por este error").' },
        { t: 'Distorsiones – El Yo', d: 'Etiquetado (definirse por los errores); personalización (atribuirse eventos incontrolables: "fue mi culpa que se molestaran").' },
        { t: 'Matriz patológica (transdiagnóstico)', d: 'Depresión: tríada depresiva (visión negativa del mundo y de sí mismo), expectativas pesimistas. Ansiedad generalizada: hipervigilancia, subestimación de la propia capacidad. Pánico: foco somático, cuerpo como señal de peligro. TOC: percibir riesgo en situaciones seguras; obsesiones y compulsiones.' },
        { t: 'Anatomía de la creencia', d: 'Nivel 1: pensamientos automáticos ("seguro me despiden por este error"). Nivel 2: creencias intermedias – actitudes, reglas, supuestos ("si fallo, me rechazarán"). Nivel 3: creencias nucleares – esquemas profundos y rígidos aprendidos en la infancia ("soy inútil").' },
        { t: 'Objetivos del tratamiento', d: '1) Consciencia del impacto de los pensamientos en emoción y conducta. 2) Localización de pensamientos automáticos y alternativas. 3) Mapeo de distorsiones. 4) Modificación estructural de esquemas y creencias centrales.' },
        { t: 'Perfil del terapeuta', d: 'Guía activo, colaborativo e instigador de cambios. Método principal: comprobación de la realidad (evaluar empíricamente las creencias). Postura psicoeducativa y rogeriana: empatía profunda, autenticidad, aceptación incondicional.' },
        { t: 'Mapa de ruta (~20 sesiones)', d: 'Fase 1: evaluación y formulación (entrevistas, cuestionarios, autorregistros, relación terapéutica). Fase 2: debate socrático con pensamientos automáticos, sesgos y creencias centrales; tareas para casa. Fase 3: autonomía, prevención de recaídas y devolución de la responsabilidad al paciente.' }
      ],
      tecnicas: [
        { t: 'Cuatro pilares de intervención', d: 'Técnicas para trabajar con creencias (automáticas, intermedias y nucleares); con sesgos cognitivos y atencionales; técnicas específicas con imágenes; técnicas conductuales complementarias.' },
        { t: 'Intervención por niveles', d: 'Nivel 1 (pensamientos automáticos): identificación en situaciones concretas, preguntas socráticas y reestructuración. Nivel 2 (creencias nucleares): exploración de actitudes, reglas y supuestos; experimentos conductuales para comprobar su falsedad y reformular hacia creencias adaptativas.' },
        { t: 'Autorregistros', d: 'Registrar situación, pensamiento, emoción y conducta para hacer visible el filtro.' },
        { t: 'Experimentos conductuales', d: 'Diseñar pruebas en el mundo real que pongan a prueba la creencia.' }
      ],
      queObservar: ['¿Nombra la distorsión concreta que aparece en el relato (catastrofismo, etiquetado…)?', '¿Distingue pensamiento automático, creencia intermedia y creencia nuclear?', '¿Propone comprobar la creencia con evidencia o un experimento conductual?', '¿Mantiene una postura colaborativa y empática mientras instiga el cambio?'],
      preguntas: ['¿Qué pasó por tu mente justo en ese momento?', '¿Qué regla o supuesto hay detrás de ese pensamiento ("si… entonces…")?', '¿Qué dice ese pensamiento sobre ti como persona?', '¿Qué evidencia a favor y en contra tienes?', '¿Cómo podríamos comprobarlo esta semana?'],
      citas: [
        { q: 'Al desmitificar y reestructurar nuestra forma de procesar la información, recuperamos el control sobre nuestras emociones y nuestra realidad.', a: 'Cierre de la clase, 23 de septiembre de 2025' }
      ],
      recursos: []
    }
  ],

  /* ---------------- Bibliografía (APA, tomada de las presentaciones de clase) ---------------- */
  bibliografia: [
    { enf: 'psicoanalisis', ref: 'Florenzano, R. (1999). Breve historia del psicoanálisis. Editorial Universitaria.' },
    { enf: 'psicoanalisis', ref: 'Tallaferro, A. (2001). Curso básico de psicoanálisis. Paidós.' },
    { enf: 'psicoanalisis', ref: 'Nunberg, H. (1987). Principios del psicoanálisis. Amorrortu.' },
    { enf: 'psicoanalisis', ref: 'Cosentino, J. (1999). Construcción de los conceptos freudianos I. Ediciones Manantial.' },
    { enf: 'psicoanalisis', ref: 'García de la Hoz, A. (2004). De Edipo a Narcisismo.' },
    { enf: 'psicoanalisis', ref: 'Nasio, J.-D. Edipo: el concepto crucial del psicoanálisis.' },
    { enf: 'psicoanalisis', ref: 'Escuela Freudiana de Buenos Aires (2001). Red de seminarios: articulación Freud–Lacan. Panel de apertura con E. Lerner, I. S. Levin e I. Vegh. https://revistas.unlp.edu.ar/AnuarioPsicologia/article/view/9690/8537' },
    { enf: 'general', ref: 'Douglas, A. y Michael, T. Introducción a la psicología clínica (6.ª ed.).' },
    { enf: 'general', ref: 'Alberto, R. Manual de psicoterapia.' },
    { enf: 'humanista', ref: 'Balarezo, L. (2017). Psicoterapia (2.ª ed.). Editorial de la Pontificia Universidad Católica del Ecuador.' },
    { enf: 'humanista', ref: 'Maslow, A. H. (1954). Motivation and personality. Harper & Row.' },
    { enf: 'humanista', ref: 'Rogers, C. R. (1961). On becoming a person: A therapist\'s view of psychotherapy. Houghton Mifflin.' },
    { enf: 'humanista', ref: 'Bugental, J. F. T. (1964). The third force in psychology. Journal of Humanistic Psychology, 4(1), 19–26.' },
    { enf: 'humanista', ref: 'May, R. (1958). Existence: A new dimension in psychiatry and psychology.' },
    { enf: 'humanista', ref: 'Yalom, I. D. (1980). Existential psychotherapy.' },
    { enf: 'humanista', ref: 'Binswanger, L. (1963). Being-in-the-world: Selected papers of Ludwig Binswanger (J. Needleman, Ed. y Trad.).' },
    { enf: 'humanista', ref: 'Frankl, V. E. (1959). The doctor and the soul: From psychotherapy to logotherapy. Vintage Books.' },
    { enf: 'humanista', ref: 'Unobravo. Psicología humanista. https://www.unobravo.com/es/blog/psicologia-humanista' },
    { enf: 'tcc', ref: 'Beck, A. T. (2013). Terapia cognitiva de los trastornos emocionales. Paidós.' },
    { enf: 'tcc', ref: 'Bernstein, D. A., & Nietzel, M. T. (1982). Introducción a la psicología clínica.' },
    { enf: 'tcc', ref: 'Burns, D. D. (1989). Sentirse bien: La nueva terapia cognitiva. HarperCollins Español.' },
    { enf: 'tcc', ref: 'Rodríguez-Morejón, A. (2019). Manual de psicoterapias. Teoría y técnica. Herder.' },
    { enf: 'tcc', ref: 'Principales representantes del enfoque cognitivo-conductual. (2019, 15 de marzo). Bloc conductual. https://conductual.home.blog/principales-representantes/' },
    { enf: 'tcc', ref: 'Yates, J. (1970). La definición de terapia conductual. Revista Latinoamericana de Psicología, 2(2), 113–121.' },
    { enf: 'tcc', ref: 'Sociedad Española de Psiquiatría y Salud Mental (2022). Terapia cognitivo conductual.' },
    { enf: 'tcc', ref: 'Fernández, M. A. R., García, M. I. D., & Crespo, A. V. (2017). Manual de técnicas y terapias cognitivo conductuales. Capacpsico. https://dialnet.unirioja.es/servlet/libro?codigo=759505' }
  ],

  /* ---------------- Materiales entregados en clase ---------------- */
  materiales: [
    { t: 'Introducción al Psicoanálisis (presentación, 30 diapositivas)', enf: 'psicoanalisis' },
    { t: 'Neurosis – Enfoque psicoanalítico (presentación, 11 diapositivas)', enf: 'psicoanalisis' },
    { t: 'Aplicación Humanista-Existencial (presentación, 39 diapositivas)', enf: 'humanista' },
    { t: 'Terapia Cognitivo-Conductual (presentación, 27 diapositivas)', enf: 'tcc' },
    { t: 'Conceptos Cognitivos (infografías, 12 páginas, clase del 23/09/2025)', enf: 'cognitiva' },
    { t: 'Formato: Retroalimentaciones entre alumnos (documento Word, 12 evaluados)', enf: 'general' }
  ]
};
