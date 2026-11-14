/** Ayudantes mínimos del DOM. Deben ser genéricos: aquí no entra conocimiento de ningún módulo. */

/**
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [raiz]
 * @returns {T | null}
 */
export const buscar = (selector, raiz = document) => raiz.querySelector(selector);

/**
 * @template {Element} T
 * @param {string} selector
 * @param {ParentNode} [raiz]
 * @returns {T[]}
 */
export const buscarTodos = (selector, raiz = document) => [...raiz.querySelectorAll(selector)];

/** Lee una propiedad personalizada de CSS desde :root, p. ej. variableCss('--cielo') → '#028EFD'. */
export const variableCss = (nombre, elemento = document.documentElement) =>
  getComputedStyle(elemento).getPropertyValue(nombre).trim();

const formateadores = new Map();
const idiomaDocumento = () => (typeof document === 'undefined' ? 'es' : document.documentElement.lang || 'es');

/** Formato numérico con decimales fijos según el idioma: 0.62 → "0,62" (es) o "0.62" (en). */
export function formatearNumero(valor, decimales = 2, locale = idiomaDocumento()) {
  const clave = `${locale}|${decimales}`;
  if (!formateadores.has(clave)) {
    formateadores.set(
      clave,
      new Intl.NumberFormat(locale, { minimumFractionDigits: decimales, maximumFractionDigits: decimales }),
    );
  }
  return formateadores.get(clave).format(valor);
}
