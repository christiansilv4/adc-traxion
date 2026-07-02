// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/colors.tsx

import { Section, ComponentDemo } from "./shared"
import { Separator } from "@/components/ui/separator"

const colorTokens = [
  { name: "--primary", label: "Primary" },
  { name: "--secondary", label: "Secondary" },
  { name: "--muted", label: "Muted" },
  { name: "--card", label: "Card" },
  { name: "--border", label: "Border" },
  { name: "--destructive", label: "Destructive" },
  { name: "--accent", label: "Accent" },
  { name: "--ring", label: "Ring" },
  { name: "--chart-1", label: "Chart 1" },
  { name: "--chart-2", label: "Chart 2" },
  { name: "--chart-3", label: "Chart 3" },
  { name: "--chart-4", label: "Chart 4" },
  { name: "--chart-5", label: "Chart 5" },
]

export function ColorsSection() {
  return (
    <Section id="colors" title="Colores">
      <ComponentDemo
        title="Tokens de color"
        code={`// Use CSS variables in inline styles:
<div style={{ backgroundColor: "var(--primary)" }} />
<div style={{ color: "var(--muted-foreground)" }} />

// Use via Tailwind utility classes (mapped in globals.css):
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="border border-border" />
<div className="bg-destructive text-destructive-foreground" />
<div className="bg-accent text-accent-foreground" />

// Chart palette tokens (used with ChartContainer config):
// var(--chart-1) through var(--chart-5)`}
      >
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {colorTokens.map((token) => (
            <div key={token.name} className="flex flex-col gap-1.5">
              <div
                className="h-12 w-full rounded-lg border border-border"
                style={{ backgroundColor: `var(${token.name})` }}
              />
              <p className="text-xs font-medium leading-none">{token.label}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {token.name}
              </p>
            </div>
          ))}
        </div>
      </ComponentDemo>
      <Separator />
    </Section>
  )
}
