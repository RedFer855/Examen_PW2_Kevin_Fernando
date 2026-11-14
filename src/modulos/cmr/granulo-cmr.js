/**
 * Consulta en vivo al catálogo CMR de NASA Earthdata (EMITL3ASA v002) siguiendo el patrón de servicio
 * con fetch + validación de status 200 y normalización de respuesta.
 */

const URL_BASE_CMR = 'https://cmr.earthdata.nasa.gov/search/granules.json';

/**
 * @param {string} [shortName]
 * @param {string} [version]
 * @param {number} [pageSize]
 */
export function construirUrlGranuloCmr(shortName = 'EMITL3ASA', version = '002', pageSize = 1) {
  return `${URL_BASE_CMR}?short_name=${encodeURIComponent(shortName)}&version=${encodeURIComponent(version)}&page_size=${pageSize}`;
}

/**
 * Extrae y normaliza el primer gránulo del feed de CMR (equivalente a getPokemonImg / mapeo de ítem).
 * @param {any} data
 */
export function extraerGranuloCmr(data) {
  const entrada = data?.feed?.entry?.[0];
  if (!entrada) return null;

  const enlaces = Array.isArray(entrada.links) ? entrada.links : [];
  const enlaceBrowse = enlaces.find(
    (l) => typeof l?.rel === 'string' && l.rel.endsWith('/browse#') && typeof l?.href === 'string' && l.href.startsWith('https://'),
  );
  const enlaceDoi = enlaces.find((l) => typeof l?.href === 'string' && l.href.startsWith('https://doi.org/'));
  const enlaceDatos = enlaces.find(
    (l) => typeof l?.href === 'string' && l.href.startsWith('https://search.earthdata.nasa.gov/'),
  );
  const tamanoNumero = Number(entrada.granule_size);

  return {
    id: entrada.id ?? '',
    titulo: entrada.title ?? '',
    dataset: entrada.dataset_id ?? '',
    centro: entrada.data_center ?? '',
    inicio: typeof entrada.time_start === 'string' ? entrada.time_start.slice(0, 10) : '',
    fin: typeof entrada.time_end === 'string' ? entrada.time_end.slice(0, 10) : '',
    tamanoMb: Number.isFinite(tamanoNumero) ? tamanoNumero.toFixed(1) : '',
    imagenUrl: enlaceBrowse?.href ?? '',
    enlaceUrl: enlaceDoi?.href ?? enlaceDatos?.href ?? '',
  };
}

/**
 * Consulta el endpoint de CMR con fetch y promesas (.then / .catch) validando status === 200.
 * @param {{ shortName?: string, version?: string, pageSize?: number, fetchFn?: typeof fetch }} [opciones]
 */
export function obtenerGranuloCmr({
  shortName = 'EMITL3ASA',
  version = '002',
  pageSize = 1,
  fetchFn = globalThis.fetch,
} = {}) {
  const urlToFetch = construirUrlGranuloCmr(shortName, version, pageSize);
  return Promise.resolve()
    .then(() => fetchFn(urlToFetch))
    .then((response) => {
      if (response && response.status === 200) {
        return response.json();
      } else {
        return null;
      }
    })
    .then((data) => {
      return extraerGranuloCmr(data);
    })
    .catch((error) => {
      console.error('Error al cargar CMR Earthdata API', error);
      return null;
    });
}

/**
 * Conecta el bloque `[data-granulo-cmr]` de la diapositiva de datos con la respuesta en vivo de CMR.
 * @param {HTMLElement | null} raiz
 */
export function vincularGranuloCmr(raiz) {
  if (!raiz) return;

  const nodoEstado = raiz.querySelector('[data-cmr-estado]');
  const nodoTitulo = raiz.querySelector('[data-cmr-titulo]');
  const nodoDataset = raiz.querySelector('[data-cmr-dataset]');
  const nodoMeta = raiz.querySelector('[data-cmr-meta]');
  const nodoEnlace = /** @type {HTMLAnchorElement | null} */ (raiz.querySelector('[data-cmr-enlace]'));
  const nodoImagen = /** @type {HTMLImageElement | null} */ (raiz.querySelector('[data-cmr-imagen]'));

  obtenerGranuloCmr().then((granulo) => {
    if (!granulo) {
      if (nodoEstado) nodoEstado.textContent = raiz.dataset.textoError ?? 'Sin conexión';
      return;
    }

    if (nodoEstado) nodoEstado.textContent = `${granulo.centro} · ${granulo.id}`;
    if (nodoTitulo) nodoTitulo.textContent = granulo.titulo;
    if (nodoDataset) nodoDataset.textContent = granulo.dataset;
    if (nodoMeta) {
      const partes = [
        granulo.tamanoMb ? `${granulo.tamanoMb} MB` : '',
        granulo.inicio && granulo.fin ? `${granulo.inicio} → ${granulo.fin}` : '',
      ].filter(Boolean);
      nodoMeta.textContent = partes.join(' · ');
    }
    if (nodoEnlace && granulo.enlaceUrl) {
      nodoEnlace.href = granulo.enlaceUrl;
      nodoEnlace.textContent = granulo.enlaceUrl.replace(/^https?:\/\//, '');
      nodoEnlace.hidden = false;
    }
    if (nodoImagen && granulo.imagenUrl) {
      nodoImagen.src = granulo.imagenUrl;
      nodoImagen.alt = granulo.titulo;
      nodoImagen.hidden = false;
    }
  });
}
