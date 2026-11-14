# Análogos Tierra · Luna · Marte — landing de J4Ks

Presentación interactiva del proyecto de J4Ks para el NASA Space Apps Challenge 2026: buscar en la Tierra lugares
que se parezcan, por procesos físicos y no por su aspecto, a los sitios de bases permanentes en la Luna y a Marte.

El fondo es un campo de curvas de nivel en WebGL. El cursor funciona como sonda y levanta el relieve. Cada
diapositiva muestra el terreno de su mundo: Tierra en papel claro, Luna y Marte de noche.

## Uso

```bash
npm install
npm run dev       # servidor local con recarga
npm run build     # genera dist/
npm run preview   # sirve dist/
npm test          # pruebas con node --test
```

Requiere Node 20 o superior.

Al compilar, la ruta base sale del repositorio: con `GITHUB_REPOSITORY=usuario/mi-landing` (GitHub Actions lo define
solo) los enlaces quedan bajo `/mi-landing/`; sin esa variable, bajo `/`.

## Diapositivas

| # | id (hash) | Qué muestra | Mundo |
| :-- | :-- | :-- | :-- |
| 1 | `inicio` | Propuesta de valor y botón de la demo | Tierra |
| 2 | `reto` | Qué pide el reto según su página oficial, su título en inglés, los análogos conocidos que quedan fuera y los 43 de control | Tierra |
| 3 | `sitios` | Los 21 sitios objetivo: SL-01 a SL-09 (Luna) y SL-10 a SL-21 (Marte) | Luna |
| 4 | `metodo` | Entrada, proceso y resultado del buscador | Luna |
| 5 | `datos` | Recursos del reto: los 11 de la pestaña *Resources*, por agencia, y las tecnologías (pendiente) | Marte |
| 6 | `alcance` | Cifras del ensayo del 2026-11-12, cada una con su fuente | Marte |
| 7 | `equipo` | Integrantes (pendientes por ahora) y contacto | Tierra |
| 8 | `cierre` | Para qué sirve y botón de la demo | Luna |

## Cómo está organizado

Todo el código usa nombres en español. Solo quedan en inglés los nombres que exige la herramienta: `main.js`,
`vite.config.js`, `package.json`, `index.html`, el sufijo `.test.js` y las APIs del navegador, de WebGL y de Handlebars.

```
src/
├─ main.js          # arranca todo y conecta los módulos
├─ contenido/       # QUÉ se dice: datos compartidos; textos en es/ y en/
├─ vistas/          # CÓMO se ve: Handlebars (plantillas, paginas, componentes, ayudantes.js)
├─ estilos/         # Less en orden ITCSS: ajustes → herramientas → base → componentes → paginas
├─ modulos/         # comportamiento, una carpeta por módulo
│  ├─ terreno/      # fondo WebGL, mundos y respaldo sin WebGL
│  ├─ sonda/        # lectura que sigue al cursor
│  ├─ presentacion/ # diapositivas, teclado y progreso
│  └─ idioma/       # botón ES/EN que conserva el hash
├─ utilidades/      # ayudantes sin conocimiento del dominio
└─ recursos/marca/  # logo
```

Reglas que mantienen el orden:

- **Las dependencias van en un solo sentido:** `main.js → modulos → utilidades`. El contenido llega a las vistas por
  el contexto de Handlebars (`vite.config.js`).
- **Los módulos no se importan entre sí.** Se comunican con eventos del DOM (`src/utilidades/eventos.js`). Por
  ejemplo, la presentación avisa el cambio de diapositiva y el terreno dibuja su mundo.
- **Los colores viven solo en `estilos/ajustes/tokens.less`.** El sombreador los lee como variables CSS
  (`modulos/terreno/mundos.js`).

## Tareas comunes

**Activar la demo:** pon la URL en `urlDemo` de `src/contenido/sitio.js`. Los tres botones (encabezado, inicio y
cierre) dicen "Ir a probar la demo" ("Probar demo" en el encabezado de pantallas chicas) y siempre se ven activos.
Con `urlDemo: ''` son un `<a aria-disabled="true">` sin `href`: no navegan ni reciben foco de teclado. Con una URL
pasan a ser enlaces normales. `construirDemo` en `src/contenido/contexto.js` decide el estado y tiene pruebas.

**Cambiar los recursos del reto:** la lista, por agencia, está en `agencias` de `src/contenido/datos.js` y la
descripción de cada recurso en `descripciones` de `src/contenido/es/datos.js` y `src/contenido/en/datos.js`. Un
recurso solo lleva `url` si su dirección aparece escrita en el repo del proyecto; los demás se muestran sin enlace.
La fecha de la fuente es `fechaRecursos`. El bloque "Tecnologías y herramientas" muestra "pendiente" hasta que se
defina la lista.

**Actualizar las cifras del ensayo:** los números, la fecha (`fechaEnsayo`) y la fuente de cada cifra están en
`src/contenido/alcance.js`. La etiqueta y el detalle de cada cifra (ahí va la herramienta o el formato usado, como
"HEALPix nivel 12") están en `src/contenido/es/alcance.js` y `src/contenido/en/alcance.js`.

**Cambiar un texto:** edítalo en `src/contenido/es/` y en `src/contenido/en/` (ver [Idiomas](#idiomas)). Con
`npm run dev` andando, el servidor se reinicia solo.

**Agregar una diapositiva:**

1. Crea `src/vistas/paginas/<id>.hbs` y envuelve su contenido en
   `{{#> componentes/diapositiva}} … {{/componentes/diapositiva}}`.
2. Crea `src/estilos/paginas/<id>.less` e impórtalo en `src/estilos/principal.less`.
3. Agrega la entrada en `src/contenido/diapositivas.js` con `vista` (`paginas/<id>`), `mundo` (`tierra`, `luna`
   o `marte`) y `tono` (`claro` u `oscuro`).
4. Agrega su etiqueta y sus textos en `src/contenido/es/` y `src/contenido/en/`, y actualiza el orden esperado en
   `src/contenido/contexto.test.js`.

**Cambiar integrantes:** edita `integrantes` en `src/contenido/equipo.js` (`id`, `nombre`, `github`) y su rol en
`roles` de `src/contenido/es/equipo.js` y `src/contenido/en/equipo.js`. Con la lista vacía (hoy) la diapositiva
muestra "Integrantes por confirmar".

**Cambiar el relieve de un mundo:** las formas están en `modulos/terreno/sombreadores/terreno.frag.glsl` (funciones
`alturaTierra`, `alturaLuna` y `alturaMarte`) y los colores en `modulos/terreno/mundos.js`.

## Idiomas

La página existe en español (`/`) y en inglés (`/en/`). Son dos páginas estáticas que se generan al compilar con el
mismo HTML: `index.html` y `en/index.html`. El botón de la esquina superior derecha lleva a la otra y conserva el
hash, así que quien está en `/#sitios` llega a `/en/#sitios`.

Dónde vive cada cosa:

- `src/contenido/*.js`: lo que no cambia con el idioma (ids, mundos, tonos, sitios, recursos del reto, cifras).
- `src/contenido/es/` y `src/contenido/en/`: los textos, con los mismos archivos y la misma forma. Se buscan por
  `id` o por clave (las descripciones de los recursos, por ejemplo). `interfaz.js` guarda los textos fijos de la interfaz (etiquetas
  accesibles, sonda, botón de idioma y de la demo).
- `src/contenido/contexto.js` une las dos partes para cada página y da formato a las cifras con
  `Intl.NumberFormat` del idioma (`58.700.374` en español, `58,700,374` en inglés).

Para cambiar un texto, edítalo en los dos idiomas. Para agregar uno, ponlo con la misma clave en `es/` y en `en/`:
`src/contenido/idiomas.test.js` (`npm test`) falla si a un idioma le falta una clave, un elemento de una lista o si
un texto cambia de tipo.

Los ids de las diapositivas quedan en español a propósito en los dos idiomas: son el hash de la URL y el id del DOM,
y así el botón de idioma puede conservar la diapositiva.

## Datos y fuentes

- Todo nombre, número y licencia se copia del repo del proyecto (`analogos-space-apps-2026`) y cada bloque de datos
  lleva un comentario `// Fuente: …` con la ruta del archivo. Lo que no aparece allí se escribe como pendiente.
- Ese repo es privado hasta el evento (ADR-005): la página no lo enlaza, las rutas de fuente se muestran como
  texto y cada cifra del ensayo lleva la marca "Ensayo, 2026-11-12".
- Los recursos del reto salen de `contexto/10-reto/reto-oficial-y-calendario.md` (pestaña *Resources* vista el
  2026-11-13). La página oficial del reto se cita como texto, sin enlace.
- Las coordenadas de la sonda son simuladas: el relieve es procedural, no es un dato.

## Accesibilidad

- Se puede navegar con flechas, Re Pág/Av Pág, espacio, Inicio y Fin. El foco de teclado es visible.
- Con `prefers-reduced-motion` el relieve queda quieto y no hay animaciones de entrada.
- Sin WebGL2 se muestra un fondo estático hecho con la misma paleta.

## Pendientes

- `src/recursos/marca/j4k.svg` es un PNG dentro de un SVG (268 KB). Conviene vectorizarlo: pesaría menos, se vería
  nítido en cualquier tamaño y permitiría una versión de un solo color.
- Nombres completos de los integrantes y el contacto del equipo.
