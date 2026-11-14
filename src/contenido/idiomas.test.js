import { test } from 'node:test';
import assert from 'node:assert/strict';
import es from './es/index.js';
import en from './en/index.js';

/** Recorre ambos objetos y devuelve las rutas donde la forma no coincide. */
function diferenciasDeForma(a, b, ruta = 'contenido') {
  const tipo = (valor) => (Array.isArray(valor) ? 'array' : valor === null ? 'null' : typeof valor);
  if (tipo(a) !== tipo(b)) return [`${ruta}: ${tipo(a)} ≠ ${tipo(b)}`];
  if (tipo(a) === 'array') {
    if (a.length !== b.length) return [`${ruta}: largo ${a.length} ≠ ${b.length}`];
    return a.flatMap((elemento, i) => diferenciasDeForma(elemento, b[i], `${ruta}[${i}]`));
  }
  if (tipo(a) !== 'object') return [];
  const claves = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...claves].flatMap((clave) => {
    if (!(clave in a)) return [`${ruta}.${clave}: falta en es`];
    if (!(clave in b)) return [`${ruta}.${clave}: falta en en`];
    return diferenciasDeForma(a[clave], b[clave], `${ruta}.${clave}`);
  });
}

test('es y en tienen la misma forma: claves, largos y tipos', () => {
  assert.deepEqual(diferenciasDeForma(es, en), []);
});

test('ningún texto queda vacío', () => {
  const vacios = [];
  const revisar = (valor, ruta) => {
    if (typeof valor === 'string' && !valor.trim()) vacios.push(ruta);
    else if (valor && typeof valor === 'object') Object.entries(valor).forEach(([k, v]) => revisar(v, `${ruta}.${k}`));
  };
  revisar(es, 'es');
  revisar(en, 'en');
  assert.deepEqual(vacios, []);
});

test('cada idioma declara su código', () => {
  assert.equal(es.codigo, 'es');
  assert.equal(en.codigo, 'en');
});
