/**
 * Datos de la página que no cambian con el idioma. Los textos están en `es/sitio.js` y `en/sitio.js`.
 * Con `urlDemo` vacío el botón de la demo se ve igual pero no lleva a ninguna parte; con una URL se vuelve un enlace.
 * @typedef {{ equipo: string, ciudad: string, evento: string, urlDemo: string }} Sitio
 */

/** @type {Sitio} */
export const sitio = {
  equipo: 'J4Ks',
  ciudad: 'Tegucigalpa',
  evento: 'NASA Space Apps Challenge 2026',
  urlDemo: '',
};

/** Mundos del indicador del encabezado, en el orden del relato. */
export const idsMundos = ['tierra', 'luna', 'marte'];
