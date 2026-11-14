import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ayudantes } from './ayudantes.js';

test('nombreArchivo deja solo el último tramo de una ruta', () => {
  assert.equal(
    ayudantes.nombreArchivo('contexto/70-bitacora/2026-11/2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md'),
    '2026-11-11-fernando-etl-de-ensayo-y-vectores-objetivo.md',
  );
  assert.equal(ayudantes.nombreArchivo('contexto/INDEX-sitios.md'), 'INDEX-sitios.md');
  assert.equal(ayudantes.nombreArchivo('sin-carpeta.md'), 'sin-carpeta.md');
});
