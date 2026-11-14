/**
 * Orden de las diapositivas. Para agregar una: crea `src/vistas/paginas/<id>.hbs`,
 * sus estilos en `src/estilos/paginas/<id>.less`, agrega una entrada aquí y su etiqueta en
 * `es/diapositivas.js` y `en/diapositivas.js`.
 *
 * - `id` es el hash de la URL y el id del DOM: queda en español en los dos idiomas.
 * - `mundo` define el terreno que se dibuja detrás de la diapositiva.
 * - `tono` define el contraste del texto: `claro` (papel) u `oscuro` (noche).
 *
 * @typedef {{ id: string, vista: string, mundo: 'tierra'|'luna'|'marte', tono: 'claro'|'oscuro' }} Diapositiva
 */

/** @type {Diapositiva[]} */
export const diapositivas = [
  { id: 'inicio', vista: 'paginas/inicio', mundo: 'tierra', tono: 'claro' },
  { id: 'reto', vista: 'paginas/reto', mundo: 'tierra', tono: 'claro' },
  { id: 'sitios', vista: 'paginas/sitios', mundo: 'luna', tono: 'oscuro' },
  { id: 'metodo', vista: 'paginas/metodo', mundo: 'luna', tono: 'oscuro' },
  { id: 'datos', vista: 'paginas/datos', mundo: 'marte', tono: 'oscuro' },
  { id: 'alcance', vista: 'paginas/alcance', mundo: 'marte', tono: 'oscuro' },
  { id: 'equipo', vista: 'paginas/equipo', mundo: 'tierra', tono: 'claro' },
  { id: 'cierre', vista: 'paginas/cierre', mundo: 'luna', tono: 'oscuro' },
];
