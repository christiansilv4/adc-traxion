# Design System — ADC Traxión

## Package name

Published/consumed as **`@adc/traxion-ui`** (see [docs/CONSUMING.md](./docs/CONSUMING.md)).

App teams import components; they do not copy this repo into their codebase.

## Cliente

- **Nombre:** ADC Traxión
- **Sistema:** Motor de Tracción
- **Logo:** `https://adcgrupo.com/wp-content/uploads/2026/04/ADC-TRAXION-mno-1.png`
- **Web corporativa:** https://adcgrupo.com

---

## Onboarding de cliente nuevo

Pasos para adaptar este starter kit a un cliente desde cero:

1. **Clonar esta carpeta** como base del nuevo proyecto.

2. **Generar el tema** en [ui.shadcn.com/themes](https://ui.shadcn.com/themes):
   - Configurar color primario, radio de bordes y modo oscuro del cliente.
   - Copiar el bloque CSS generado.

3. **Pegar el CSS en `styles/globals.css`** reemplazando únicamente los valores dentro de `:root { }` y `.dark { }`.
   - No modificar las secciones `@theme inline` ni `@layer base`.

4. **Actualizar este archivo (`design.md`)** con los datos del cliente (secciones abajo).

5. **Crear `components/[nombre-cliente]/`** y su `meta.ts` con contexto de marca.

6. **Construir con Claude Code** usando exclusivamente los componentes de `/components/ui`.
   - Nunca hardcodear colores — solo CSS variables.
   - Nunca crear JSX custom si existe un componente shadcn equivalente.

---

## Tokens

<!-- Variables de espaciado, radios, sombras, etc. — pendiente de guía de estilo -->

## Colores

<!-- Pendiente de confirmar paleta oficial con el cliente -->
<!-- Extraer del logo y actualizar :root en styles/globals.css -->

## Tipografía

<!-- Pendiente de confirmar tipografía corporativa -->

