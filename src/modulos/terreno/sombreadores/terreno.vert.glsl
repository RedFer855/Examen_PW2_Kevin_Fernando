#version 300 es
// Par de triángulos a pantalla completa; todo el trabajo ocurre en el sombreador de fragmentos.
in vec2 a_posicion;

void main() {
  gl_Position = vec4(a_posicion, 0.0, 1.0);
}
