/**
 * Carpeta donde GitHub Pages publica el sitio de un repo de proyecto.
 * @param {string} [repositorio] Valor de GITHUB_REPOSITORY, por ejemplo 'Juan/mi-landing'.
 * @returns {string} '/mi-landing/', o '/' si no hay repositorio o es el sitio de usuario (<dueno>.github.io).
 */
export function baseDesdeRepositorio(repositorio) {
  const nombre = (repositorio ?? '').split('/')[1]?.trim();
  if (!nombre || nombre.toLowerCase().endsWith('.github.io')) return '/';
  return `/${nombre}/`;
}
