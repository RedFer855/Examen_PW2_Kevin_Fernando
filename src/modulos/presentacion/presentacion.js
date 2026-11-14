/**
 * Presentación de diapositivas sobre el desplazamiento nativo: el scroll-snap de CSS hace el ajuste,
 * este módulo sigue la diapositiva activa y ofrece siguiente/anterior/irA.
 */
import { buscarTodos } from '../../utilidades/dom.js';
import { emitir, EVENTOS } from '../../utilidades/eventos.js';
import { prefiereMovimientoReducido } from '../../utilidades/movimiento.js';

const FRANJA_CENTRAL = '-49% 0px -49% 0px';

/** @param {HTMLElement} raiz `[data-presentacion]` */
export function crearPresentacion(raiz) {
  const diapositivas = buscarTodos('[data-diapositiva]', raiz);
  let indiceActivo = -1;

  function activar(indice) {
    if (indice === indiceActivo || !diapositivas[indice]) return;
    diapositivas[indiceActivo]?.classList.remove('esta-activa');
    indiceActivo = indice;
    const diapositiva = diapositivas[indice];
    diapositiva.classList.add('esta-activa', 'fue-vista');
    emitir(EVENTOS.CAMBIO_DIAPOSITIVA, {
      indice,
      total: diapositivas.length,
      id: diapositiva.id,
      mundo: diapositiva.dataset.mundo,
      tono: diapositiva.dataset.tono,
    });
  }

  // Enlace directo: salta a la diapositiva del hash de la URL antes de observar, para que la
  // primera pasada del observador no active la portada y sobrescriba el hash.
  const desdeHash = diapositivas.findIndex((d) => `#${d.id}` === window.location.hash);
  if (desdeHash > 0) diapositivas[desdeHash].scrollIntoView({ behavior: 'instant', block: 'start' });

  // Una diapositiva está activa cuando cruza una franja delgada en medio de la ventana.
  // Funciona también con diapositivas más altas que la pantalla (móvil), a diferencia de una proporción de visibilidad.
  const observador = new IntersectionObserver(
    (entradas) => {
      const cruce = entradas.find((entrada) => entrada.isIntersecting);
      if (cruce) activar(diapositivas.indexOf(/** @type {HTMLElement} */ (cruce.target)));
    },
    { rootMargin: FRANJA_CENTRAL, threshold: 0 },
  );
  diapositivas.forEach((diapositiva) => observador.observe(diapositiva));

  function irA(indice) {
    const destino = diapositivas[Math.max(0, Math.min(diapositivas.length - 1, indice))];
    destino.scrollIntoView({ behavior: prefiereMovimientoReducido() ? 'auto' : 'smooth', block: 'start' });
  }

  activar(desdeHash >= 0 ? desdeHash : 0);

  return {
    get indice() {
      return indiceActivo;
    },
    get total() {
      return diapositivas.length;
    },
    irA,
    siguiente: () => irA(indiceActivo + 1),
    anterior: () => irA(indiceActivo - 1),
    destruir: () => observador.disconnect(),
  };
}
