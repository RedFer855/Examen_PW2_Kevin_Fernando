/** Preferencia de movimiento reducido, leída en vivo para seguir los cambios del sistema. */
const consulta = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export const prefiereMovimientoReducido = () => Boolean(consulta?.matches);

/** @param {(reducido: boolean) => void} manejador */
export function alCambiarMovimientoReducido(manejador) {
  consulta?.addEventListener('change', (evento) => manejador(evento.matches));
}
