import { test } from 'node:test';
import assert from 'node:assert/strict';
import { limitar, interpolar, amortiguar, hexARgb } from './matematica.js';

test('limitar mantiene los valores dentro del rango', () => {
  assert.equal(limitar(5, 0, 1), 1);
  assert.equal(limitar(-1, 0, 1), 0);
  assert.equal(limitar(0.3, 0, 1), 0.3);
});

test('interpolar interpola de forma lineal', () => {
  assert.equal(interpolar(0, 10, 0.5), 5);
});

test('amortiguar se acerca al objetivo sin pasarse', () => {
  const siguiente = amortiguar(0, 1, 8, 1 / 60);
  assert.ok(siguiente > 0 && siguiente < 1);
  assert.equal(amortiguar(0, 1, 8, 100), 1);
});

test('hexARgb convierte colores de 6 y 3 dígitos a canales en 0..1', () => {
  assert.deepEqual(hexARgb('#ff0000'), [1, 0, 0]);
  assert.deepEqual(hexARgb('#0f0'), [0, 1, 0]);
});
