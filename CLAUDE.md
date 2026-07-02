@AGENTS.md

# Reglas de desarrollo

- Siempre usar componentes de `/components/ui` cuando exista un equivalente shadcn/ui.
- Nunca hardcodear colores — usar únicamente las CSS variables definidas en `styles/globals.css`.
- Nunca crear JSX custom si existe un componente shadcn equivalente.
- Los componentes específicos del cliente van en `/components/cliente/`.
- Consultar `design.md` para tokens, paleta y tipografía antes de construir cualquier UI.
