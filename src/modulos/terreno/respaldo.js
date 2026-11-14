/**
 * Fondo estático para navegadores sin WebGL2 (o cuando se pierde el contexto GL).
 * El aspecto vive en CSS (`.sin-webgl` en src/estilos/base/base.less); esto solo lo activa.
 */
export function usarFondoEstatico(lienzo) {
  lienzo.hidden = true;
  document.documentElement.classList.add('sin-webgl');
}
