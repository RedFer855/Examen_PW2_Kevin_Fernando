/** Ayudantes numéricos compartidos por los módulos. Sin acceso al DOM. */

export const limitar = (valor, minimo, maximo) => Math.min(maximo, Math.max(minimo, valor));

export const interpolar = (desde, hasta, t) => desde + (hasta - desde) * t;

/**
 * Acercamiento suave hacia un objetivo, independiente de la tasa de cuadros.
 * @param {number} actual
 * @param {number} objetivo
 * @param {number} lambda mayor = más rápido
 * @param {number} dt segundos desde el cuadro anterior
 */
export const amortiguar = (actual, objetivo, lambda, dt) => interpolar(actual, objetivo, 1 - Math.exp(-lambda * dt));

/**
 * Convierte `#rgb` o `#rrggbb` en canales listos para WebGL, en 0..1.
 * @returns {[number, number, number]}
 */
export function hexARgb(hex) {
  let valor = hex.trim().replace('#', '');
  if (valor.length === 3) valor = [...valor].map((c) => c + c).join('');
  const entero = Number.parseInt(valor, 16);
  return [((entero >> 16) & 255) / 255, ((entero >> 8) & 255) / 255, (entero & 255) / 255];
}
