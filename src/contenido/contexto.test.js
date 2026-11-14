import { test } from 'node:test';
import assert from 'node:assert/strict';
import { construirContexto, construirDemo } from './contexto.js';
import { sitiosObjetivo } from './sitios.js';

const ORDEN = ['inicio', 'reto', 'sitios', 'metodo', 'datos', 'alcance', 'equipo', 'cierre'];
const contar = (cuerpo) => sitiosObjetivo.filter((s) => s.cuerpo === cuerpo).length;

for (const codigo of ['es', 'en']) {
  test(`${codigo}: las diapositivas van en el orden del relato`, () => {
    assert.deepEqual(
      construirContexto(codigo).diapositivas.map((d) => d.id),
      ORDEN,
    );
  });

  test(`${codigo}: la cifra de sitios objetivo sale de sitios.js (9 de la Luna + 12 de Marte)`, () => {
    const cifra = construirContexto(codigo).alcance.cifras.find((c) => c.id === 'sitios');
    assert.equal(contar('luna'), 9);
    assert.equal(contar('marte'), 12);
    assert.equal(cifra.valor, 21);
    assert.equal(cifra.valor, contar('luna') + contar('marte'));
  });

  test(`${codigo}: la diapositiva de sitios separa la Luna de Marte`, () => {
    const { luna, marte } = construirContexto(codigo).sitios;
    assert.equal(luna.length, 9);
    assert.equal(marte.length, 12);
    assert.equal(luna[0].id, 'SL-01');
    assert.equal(marte.at(-1).id, 'SL-21');
  });

  test(`${codigo}: sin URL de la demo, el botón invita a probarla pero no lleva a ninguna parte`, () => {
    const { demo } = construirContexto(codigo);
    assert.deepEqual(Object.keys(demo).sort(), ['disponible', 'probar', 'probarCorto', 'url']);
    assert.equal(demo.disponible, false);
    assert.equal(demo.url, '');
  });
}

test('las cifras se agrupan según el idioma', () => {
  const celdas = (codigo) => construirContexto(codigo).alcance.cifras.find((c) => c.id === 'celdas').texto;
  assert.equal(celdas('en'), '58,700,374');
  assert.equal(celdas('es'), new Intl.NumberFormat('es').format(58700374));
});

test('construirDemo: con URL hay enlace, sin URL no; solo pasan las etiquetas de probar', () => {
  const textos = { probar: 'Ir a probar', probarCorto: 'Probar', sobrante: 'no pasa' };
  assert.deepEqual(construirDemo('', textos), { disponible: false, url: '', probar: 'Ir a probar', probarCorto: 'Probar' });
  assert.equal(construirDemo('  ', textos).disponible, false);
  assert.deepEqual(construirDemo('https://ejemplo.org/demo', textos), {
    disponible: true,
    url: 'https://ejemplo.org/demo',
    probar: 'Ir a probar',
    probarCorto: 'Probar',
  });
});

test('las etiquetas de la demo son las acordadas en los dos idiomas', () => {
  assert.deepEqual(construirContexto('es').demo, { disponible: false, url: '', probar: 'Ir a probar la demo', probarCorto: 'Probar demo' });
  assert.deepEqual(construirContexto('en').demo, { disponible: false, url: '', probar: 'Try the demo', probarCorto: 'Try demo' });
});

test('las rutas de idioma respetan la base de publicación', () => {
  assert.equal(construirContexto('es').idioma.otro.ruta, '/en/');
  assert.equal(construirContexto('es', '/betaN/').idioma.otro.ruta, '/betaN/en/');
  assert.equal(construirContexto('en', '/betaN/').idioma.otro.ruta, '/betaN/');
  assert.equal(construirContexto('en', '/betaN/').base, '/betaN/');
});

for (const codigo of ['es', 'en']) {
  test(`${codigo}: los 11 recursos del reto van por agencia y cada uno tiene nombre y descripción`, () => {
    const { agencias } = construirContexto(codigo).datos;
    assert.deepEqual(
      agencias.map((a) => [a.id, a.recursos.length]),
      [
        ['nasa', 5],
        ['csa', 3],
        ['esa', 2],
        ['jaxa', 1],
      ],
    );
    for (const recurso of agencias.flatMap((a) => a.recursos)) {
      assert.ok(recurso.nombre && recurso.descripcion, recurso.id);
    }
  });
}
