/**
 * Ayudantes de Handlebars. Solo lógica de presentación; el contenido se queda en src/contenido.
 */
export const ayudantes = {
  /** Número de diapositiva de dos dígitos a partir de un índice que empieza en cero: 0 → "01". */
  rellenar: (indice) => String(Number(indice) + 1).padStart(2, '0'),
  /** Total con cero a la izquierda, p. ej. un total de 9 → "09". */
  rellenarTotal: (lista) => String(lista?.length ?? 0).padStart(2, '0'),
  igual: (a, b) => a === b,
  /** Último tramo de una ruta: "contexto/INDEX-sitios.md" → "INDEX-sitios.md". */
  nombreArchivo: (ruta) => String(ruta).split('/').pop(),
};
