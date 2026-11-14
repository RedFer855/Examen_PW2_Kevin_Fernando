/**
 * Recursos que propone el reto en su pestaña Resources, por agencia. La descripción de cada uno está en
 * `es/datos.js` y `en/datos.js` (`descripciones`, por `id`). Solo lleva `url` lo que tiene su dirección escrita en
 * el repo del proyecto; el resto se muestra sin enlace.
 *
 * @typedef {{ id: string, nombre: string, ruta?: string, url?: string }} Recurso
 * @typedef {{ id: string, nombre: string, recursos: Recurso[] }} Agencia
 */

// Fuente: analogos-space-apps-2026/contexto/10-reto/reto-oficial-y-calendario.md:94-113
/** @type {Agencia[]} */
export const agencias = [
  {
    id: 'nasa',
    nombre: 'NASA',
    recursos: [
      { id: 'earthdata', nombre: 'Earthdata Search' },
      { id: 'worldview', nombre: 'Worldview' },
      { id: 'pds', nombre: 'Planetary Data System (PDS)' },
      { id: 'lro', nombre: 'LRO (LROC, LOLA, Diviner, LEND, Mini-RF)' },
      { id: 'diviner', nombre: 'LRO Diviner' },
    ],
  },
  {
    id: 'csa',
    nombre: 'CSA',
    recursos: [
      { id: 'rcm', nombre: 'RADARSAT Constellation Mission (RCM)' },
      { id: 'radarsat-1', nombre: 'RADARSAT-1' },
      // La nota da el repositorio como `asc-csa/Synthetic_Aperture_Radar_Tutorial`, la forma corta de GitHub.
      {
        id: 'tutorial-sar',
        nombre: 'Synthetic Aperture Radar Tutorial',
        ruta: 'asc-csa/Synthetic_Aperture_Radar_Tutorial',
        url: 'https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial',
      },
    ],
  },
  {
    id: 'esa',
    nombre: 'ESA',
    recursos: [
      { id: 'copernicus', nombre: 'Copernicus Data Space Ecosystem' },
      { id: 'open-science', nombre: 'ESA Open Science Catalog' },
    ],
  },
  {
    id: 'jaxa',
    nombre: 'JAXA',
    recursos: [{ id: 'g-portal', nombre: 'G-Portal' }],
  },
];

/** Día en que se copió la pestaña Resources. */
export const fechaRecursos = '2026-11-13';
