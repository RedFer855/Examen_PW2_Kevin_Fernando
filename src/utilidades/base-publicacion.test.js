import { test } from 'node:test';
import assert from 'node:assert/strict';
import { baseDesdeRepositorio } from './base-publicacion.js';

test('la base es el nombre del repo entre barras', () => {
  assert.equal(baseDesdeRepositorio('Juan/mi-landing'), '/mi-landing/');
});

test('sin repositorio la base es la raiz', () => {
  assert.equal(baseDesdeRepositorio(undefined), '/');
  assert.equal(baseDesdeRepositorio(''), '/');
});

test('el sitio de usuario se publica en la raiz', () => {
  assert.equal(baseDesdeRepositorio('Juan/juan.github.io'), '/');
});
