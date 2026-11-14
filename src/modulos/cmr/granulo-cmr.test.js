import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirUrlGranuloCmr, extraerGranuloCmr, obtenerGranuloCmr } from './granulo-cmr.js';

const EJEMPLO_CMR = {
  feed: {
    entry: [
      {
        id: 'G3173503906-LPCLOUD',
        title: 'EMIT_L3_ASA_002',
        dataset_id: 'EMIT L3 Aggregated Mineral Spectral Abundance and Uncertainty 0.5 Deg V002',
        data_center: 'LPCLOUD',
        time_start: '2022-08-10T01:14:48.000Z',
        time_end: '2024-01-20T00:00:00.000Z',
        granule_size: '21.820922851562504',
        links: [
          {
            rel: 'http://esipfed.org/ns/fedsearch/1.1/browse#',
            href: 's3://lp-prod-public/EMITL3ASA.002/EMIT_L3_ASA_002/EMIT_L3_ASA_002.png',
          },
          {
            rel: 'http://esipfed.org/ns/fedsearch/1.1/browse#',
            href: 'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/EMITL3ASA.002/EMIT_L3_ASA_002/EMIT_L3_ASA_002.png',
          },
          {
            rel: 'http://esipfed.org/ns/fedsearch/1.1/metadata#',
            href: 'https://doi.org/10.5067/EMIT/EMITL3ASA.002',
          },
        ],
      },
    ],
  },
};

test('construirUrlGranuloCmr arma el endpoint de CMR para EMITL3ASA v002', () => {
  assert.equal(
    construirUrlGranuloCmr(),
    'https://cmr.earthdata.nasa.gov/search/granules.json?short_name=EMITL3ASA&version=002&page_size=1',
  );
});

test('extraerGranuloCmr normaliza el primer granulo del feed y elige enlaces https', () => {
  assert.deepEqual(extraerGranuloCmr(EJEMPLO_CMR), {
    id: 'G3173503906-LPCLOUD',
    titulo: 'EMIT_L3_ASA_002',
    dataset: 'EMIT L3 Aggregated Mineral Spectral Abundance and Uncertainty 0.5 Deg V002',
    centro: 'LPCLOUD',
    inicio: '2022-08-10',
    fin: '2024-01-20',
    tamanoMb: '21.8',
    imagenUrl:
      'https://data.lpdaac.earthdatacloud.nasa.gov/lp-prod-public/EMITL3ASA.002/EMIT_L3_ASA_002/EMIT_L3_ASA_002.png',
    enlaceUrl: 'https://doi.org/10.5067/EMIT/EMITL3ASA.002',
  });
  assert.equal(extraerGranuloCmr({ feed: { entry: [] } }), null);
  assert.equal(extraerGranuloCmr(null), null);
});

test('obtenerGranuloCmr consulta con fetch y devuelve el granulo cuando status es 200', async () => {
  let urlLlamada = '';
  const fetchSimulado = async (url) => {
    urlLlamada = url;
    return { status: 200, json: async () => EJEMPLO_CMR };
  };

  const resultado = await obtenerGranuloCmr({ fetchFn: fetchSimulado });
  assert.equal(
    urlLlamada,
    'https://cmr.earthdata.nasa.gov/search/granules.json?short_name=EMITL3ASA&version=002&page_size=1',
  );
  assert.equal(resultado?.id, 'G3173503906-LPCLOUD');
  assert.equal(resultado?.titulo, 'EMIT_L3_ASA_002');
});

test('obtenerGranuloCmr devuelve null si status no es 200 o falla la red', async () => {
  const no200 = await obtenerGranuloCmr({ fetchFn: async () => ({ status: 500, json: async () => ({}) }) });
  assert.equal(no200, null);

  const falloRed = await obtenerGranuloCmr({
    fetchFn: async () => {
      throw new Error('sin red');
    },
  });
  assert.equal(falloRed, null);
});
