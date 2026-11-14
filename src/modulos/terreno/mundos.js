/**
 * Ajustes visuales de cada mundo. Los colores son nombres de tokens CSS (src/estilos/ajustes/tokens.less),
 * así la paleta tiene una sola fuente.
 *
 * @typedef {{ mezcla: [number, number, number], fondo: string, lineaBaja: string, lineaAlta: string, alfaLinea: number }} AjusteMundo
 */

/** @type {Record<'tierra'|'luna'|'marte', AjusteMundo>} */
export const MUNDOS = {
  tierra: { mezcla: [1, 0, 0], fondo: '--papel', lineaBaja: '--cielo', lineaAlta: '--ultramar', alfaLinea: 0.7 },
  luna: { mezcla: [0, 1, 0], fondo: '--tinta', lineaBaja: '--ultramar', lineaAlta: '--cielo', alfaLinea: 0.8 },
  marte: { mezcla: [0, 0, 1], fondo: '--noche', lineaBaja: '--violeta', lineaAlta: '--cielo', alfaLinea: 0.85 },
};

export const MUNDO_PREDETERMINADO = 'tierra';
