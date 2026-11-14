/**
 * Botón de idioma: es un enlace normal a la otra página. Antes de seguirlo se le agrega el hash actual
 * para que la persona quede en la misma diapositiva. Se actualiza en cada interacción (puntero, foco, clic)
 * así también funcionan ctrl+clic, el clic central y "abrir en otra pestaña".
 */
import { buscarTodos } from '../../utilidades/dom.js';

export function vincularCambioIdioma(raiz = document) {
  buscarTodos('[data-cambio-idioma]', raiz).forEach((enlace) => {
    const ruta = new URL(enlace.getAttribute('href') ?? '/', location.href).pathname;
    const actualizar = () => enlace.setAttribute('href', ruta + location.hash);
    ['pointerdown', 'focus', 'click'].forEach((tipo) => enlace.addEventListener(tipo, actualizar));
  });
}
