@AGENTS.md

# Reglas de desarrollo

- Siempre usar componentes de `/components/ui` cuando exista un equivalente shadcn/ui.
- Nunca hardcodear colores — usar únicamente las CSS variables definidas en `styles/globals.css`.
- Nunca crear JSX custom si existe un componente shadcn equivalente.
- Los componentes específicos del cliente van en `/components/cliente/`.
- Consultar `design.md` para tokens, paleta y tipografía antes de construir cualquier UI.

# Convenciones de layout

- Toda página bajo `app/w/[workspace]/` retorna solo un fragmento `<>...</>`. El padding responsive y el shell (sidebar, header) los provee `WorkspaceShell` vía `app/w/[workspace]/layout.tsx`.
- No agregar `px-*` / `py-*` de layout en el root de una página del workspace ni importar `SidebarProvider`, `AppSidebar`, `SidebarInset` o `SiteHeader` dentro de ellas.
- Referencia canónica de layout: `components/adc-traxion/workspace-shell.tsx`.

# Flujo de trabajo

- Al terminar un ajuste relevante (patrón, convención, decisión de arquitectura o diseño), preguntar **antes del commit** si se documenta. Si la respuesta es sí, actualizar `CLAUDE.md` y/o memoria, y commitear todo junto.

# Colores de eventos de calendario

- Usar `--cal-blue`, `--cal-teal`, `--cal-green`, `--cal-amber`, `--cal-orange`, `--cal-red`, `--cal-pink`, `--cal-purple` para colorear eventos del calendario. Definidos en `styles/globals.css` con valores light y dark.
- Para variantes con opacidad usar `color-mix(in oklch, var(--cal-X) 18%, transparent)` — NO usar `hsl(var(--cal-X) / 0.18)` ya que las variables están en oklch.
- NO usar `--chart-*` para eventos de calendario; esos son todos azules y no diferenciados.

# Convenciones de componentes

- **KPI cards:** usar siempre `<SectionCards periodo={...} />` (`components/adc-traxion/section-cards.tsx`) salvo que se pida explícitamente algo diferente.
- **Triggers de filtros:** incluir siempre `h-8 gap-1.5 text-sm font-normal` junto a `buttonVariants({ variant: "outline", size: "sm" })`. El `size="sm"` por defecto da `text-xs`, que no coincide con el estándar visual del proyecto. Referencia: `components/adc-traxion/kpi-filters.tsx`.
