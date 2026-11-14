import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatearNumero } from './dom.js';

test('formatearNumero usa el separador decimal del idioma', () => {
  assert.equal(formatearNumero(0.62, 2, 'en'), '0.62');
  assert.equal(formatearNumero(0.62, 2, 'es'), '0,62');
});

test('formatearNumero funciona en Node sin document y cae en español', () => {
  assert.equal(formatearNumero(0.5), '0,50');
});
