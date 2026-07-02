/**
 * Contexto de marca — ADC Traxión
 * Sistema: Motor de Tracción
 *
 * Usar este archivo como referencia para Claude Code al construir
 * componentes en components/adc-traxion/.
 *
 * REGLAS:
 * - Usar solo componentes de /components/ui (shadcn/ui)
 * - Nunca hardcodear colores — usar CSS variables de styles/globals.css
 * - Nunca crear JSX custom si existe un componente shadcn equivalente
 *
 * ASSETS:
 * - Logo: https://adcgrupo.com/wp-content/uploads/2026/04/ADC-TRAXION-mno-1.png
 *
 * PENDIENTE:
 * - Paleta de colores oficial → actualizar :root en styles/globals.css
 * - Tipografía corporativa → actualizar DM Sans si aplica
 * - Guía de estilo completa
 */

export const client = {
  name: "ADC Traxión",
  system: "Motor de Tracción",
  logo: "https://adcgrupo.com/wp-content/uploads/2026/04/ADC-TRAXION-mno-1.png",
} as const;
