/**
 * Cifras del ensayo del 2026-11-12. El repo del proyecto es privado (ADR-005): cada cifra lleva su ruta de origen
 * como texto, nunca como enlace. La de sitios objetivo no está aquí: sale del largo de `sitios.js`.
 * @typedef {{ id: string, valor: number, fuente: string }} Cifra
 */

/** @type {Cifra[]} */
export const cifras = [
  // Fuente: contexto/70-bitacora/2026-11/2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md:62
  {
    id: 'celdas',
    valor: 58700374,
    fuente: 'contexto/70-bitacora/2026-11/2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md',
  },
  // Fuente: contexto/70-bitacora/2026-11/2026-11-12-fernando-reauditoria-y-tabla-v2.md:20
  {
    id: 'columnas',
    valor: 80,
    fuente: 'contexto/70-bitacora/2026-11/2026-11-12-fernando-reauditoria-y-tabla-v2.md',
  },
  // Fuente: contexto/INDEX-sitios.md (ST-01 a ST-43)
  { id: 'analogos', valor: 43, fuente: 'contexto/INDEX-sitios.md' },
];

/** Ruta de origen de la cifra de sitios objetivo, que se calcula. */
export const fuenteSitios = 'contexto/32-sitios/SL-01 … SL-21';

/** Fecha del ensayo que respalda las cifras. */
export const fechaEnsayo = '2026-11-12';
