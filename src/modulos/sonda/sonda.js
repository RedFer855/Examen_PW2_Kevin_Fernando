/**
 * Lectura de la sonda que sigue al puntero. Es solo visual: las coordenadas proyectan la pantalla sobre una
 * cuadrícula simulada de latitud/longitud, y la interfaz lo dice.
 */
import { formatearNumero } from '../../utilidades/dom.js';

function aCoordenadas(x, y, puntos) {
  const lat = 90 - (y / window.innerHeight) * 180;
  const lon = (x / window.innerWidth) * 360 - 180;
  const textoLat = `${formatearNumero(Math.abs(lat), 1)}° ${lat >= 0 ? puntos.norte : puntos.sur}`;
  const textoLon = `${formatearNumero(Math.abs(lon), 1)}° ${lon >= 0 ? puntos.este : puntos.oeste}`;
  return `${textoLat} · ${textoLon}`;
}

/**
 * @param {HTMLElement} raiz `[data-sonda]`
 * @param {{ etiquetasMundo: Record<string, string>, puntos: { norte: string, sur: string, este: string, oeste: string } }} textos
 *   nombre visible de cada mundo por id y puntos cardinales del idioma
 */
export function crearSonda(raiz, { etiquetasMundo, puntos }) {
  const mundo = raiz.querySelector('[data-sonda-mundo]');
  const coordenadas = raiz.querySelector('[data-sonda-coordenadas]');

  return {
    /** @param {{ x: number, y: number, activo: boolean }} puntero */
    actualizar({ x, y, activo }) {
      raiz.classList.toggle('es-visible', activo);
      if (!activo) return;
      raiz.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      coordenadas.textContent = aCoordenadas(x, y, puntos);
    },
    fijarMundo(id) {
      mundo.textContent = etiquetasMundo[id] ?? id;
    },
  };
}
