// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/typography.tsx

import { Section, ComponentDemo } from "./shared"
import { Separator } from "@/components/ui/separator"

export function TypographySection() {
  return (
    <Section id="typography" title="Tipografía">
      <ComponentDemo
        title="Display"
        code={`// Display — hero headlines, splash screens
<p className="text-5xl font-bold tracking-tight leading-none">
  Gestión de Flota Nacional
</p>`}
      >
        <p className="text-5xl font-bold tracking-tight leading-none">
          Gestión de Flota Nacional
        </p>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="H1"
        code={`// H1 — page titles
<h1 className="text-4xl font-bold tracking-tight">
  Panel de Control de Unidades
</h1>`}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Panel de Control de Unidades
        </h1>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="H2"
        code={`// H2 — section headings
<h2 className="text-3xl font-semibold tracking-tight">
  Rutas Activas del Día
</h2>`}
      >
        <h2 className="text-3xl font-semibold tracking-tight">
          Rutas Activas del Día
        </h2>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="H3"
        code={`// H3 — subsection headings, card titles
<h3 className="text-2xl font-semibold">
  Unidad TR-4821 — Monterrey
</h3>`}
      >
        <h3 className="text-2xl font-semibold">
          Unidad TR-4821 — Monterrey
        </h3>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="Body"
        code={`// Body — paragraph text, descriptions
<p className="text-base leading-7">
  El conductor asignado completó la ruta de distribución con una
  eficiencia del 94%. La unidad no presentó incidencias durante el trayecto.
</p>`}
      >
        <p className="text-base leading-7">
          El conductor asignado completó la ruta de distribución con una eficiencia del 94%. La unidad no presentó incidencias durante el trayecto.
        </p>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="Label"
        code={`// Label — form labels, data field names
<p className="text-sm font-medium leading-none">
  Estado de la unidad
</p>`}
      >
        <p className="text-sm font-medium leading-none">
          Estado de la unidad
        </p>
      </ComponentDemo>

      <Separator />

      <ComponentDemo
        title="Caption"
        code={`// Caption — timestamps, helper text, metadata
<p className="text-xs text-muted-foreground">
  Última actualización: hace 3 minutos
</p>`}
      >
        <p className="text-xs text-muted-foreground">
          Última actualización: hace 3 minutos
        </p>
      </ComponentDemo>
    </Section>
  )
}
