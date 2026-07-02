"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Section, SubSection, CodeBlock } from "./shared"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Token table data ─────────────────────────────────────────────────────────

const TOKENS: {
  name: string
  cssVar: string
  light: string
  dark: string
  note?: string
}[] = [
  {
    name: "background",
    cssVar: "--background",
    light: "oklch(1 0 0)",
    dark: "oklch(0.145 0 0)",
    note: "Fondo principal de la página",
  },
  {
    name: "foreground",
    cssVar: "--foreground",
    light: "oklch(0.145 0 0)",
    dark: "oklch(0.985 0 0)",
    note: "Texto principal — se invierte",
  },
  {
    name: "card",
    cssVar: "--card",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
    note: "Superficie de tarjetas",
  },
  {
    name: "popover",
    cssVar: "--popover",
    light: "oklch(1 0 0)",
    dark: "oklch(0.205 0 0)",
    note: "Menús desplegables y tooltips",
  },
  {
    name: "primary",
    cssVar: "--primary",
    light: "oklch(0.488 0.243 264.376)",
    dark: "oklch(0.424 0.199 265.638)",
    note: "Azul ADC — ligeramente más oscuro en dark",
  },
  {
    name: "secondary",
    cssVar: "--secondary",
    light: "oklch(0.967 0.001 286.375)",
    dark: "oklch(0.274 0.006 286.033)",
    note: "Superficie secundaria",
  },
  {
    name: "muted",
    cssVar: "--muted",
    light: "oklch(0.97 0 0)",
    dark: "oklch(0.269 0 0)",
    note: "Fondo apagado (badges, code blocks)",
  },
  {
    name: "muted-foreground",
    cssVar: "--muted-foreground",
    light: "oklch(0.556 0 0)",
    dark: "oklch(0.708 0 0)",
    note: "Texto secundario — más claro en dark",
  },
  {
    name: "destructive",
    cssVar: "--destructive",
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)",
    note: "Rojo — más brillante en dark para contraste",
  },
  {
    name: "border",
    cssVar: "--border",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 10%)",
    note: "Bordes — alfa en dark",
  },
  {
    name: "input",
    cssVar: "--input",
    light: "oklch(0.922 0 0)",
    dark: "oklch(1 0 0 / 15%)",
    note: "Borde de inputs — alfa en dark",
  },
  {
    name: "ring",
    cssVar: "--ring",
    light: "oklch(0.708 0 0)",
    dark: "oklch(0.556 0 0)",
    note: "Focus ring",
  },
  {
    name: "sidebar",
    cssVar: "--sidebar",
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.205 0 0)",
    note: "Fondo del sidebar",
  },
  {
    name: "sidebar-primary",
    cssVar: "--sidebar-primary",
    light: "oklch(0.546 0.245 262.881)",
    dark: "oklch(0.623 0.214 259.815)",
    note: "Ítem activo del sidebar",
  },
]

// ─── Swatch ───────────────────────────────────────────────────────────────────

function Swatch({ cssVar, className }: { cssVar: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block size-4 shrink-0 rounded-sm border border-border",
        className
      )}
      style={{ background: `var(${cssVar})` }}
    />
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function DarkModeSection() {
  const [dark, setDark] = React.useState(false)

  // Sync state with whatever ThemeToggle already set
  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle(checked: boolean) {
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem("theme", checked ? "dark" : "light")
    setDark(checked)
  }

  return (
    <Section id="dark-mode" title="Dark Mode">
      <p className="text-sm text-muted-foreground">
        El dark mode usa una clase{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">.dark</span>{" "}
        en el elemento{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">&lt;html&gt;</span>.
        Tailwind detecta los descendientes mediante la variante personalizada{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">dark:</span>.
      </p>

      {/* ── Mecanismo ── */}
      <SubSection title="Mecanismo — clase en html">
        <CodeBlock code={`// styles/globals.css
// La variante "dark:" se activa cuando el elemento (o algún ancestro)
// pertenece a un árbol con la clase .dark

@custom-variant dark (&:is(.dark *));

// Tokens en modo claro — siempre activos
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* … */
}

// Tokens en modo oscuro — activos cuando <html class="dark">
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* … */
}

// Uso en Tailwind (generado automáticamente por los tokens):
// bg-background  →  usa var(--background)
// text-primary   →  usa var(--primary)
// border-border  →  usa var(--border)`} />
      </SubSection>

      <Separator />

      {/* ── Toggle interactivo ── */}
      <SubSection title="Toggle — activar / desactivar dark mode">
        <div className="rounded-xl border bg-card px-5 py-6 space-y-4">
          <div className="flex items-center gap-3">
            <SunIcon className="size-4 text-muted-foreground" />
            <Switch
              checked={dark}
              onCheckedChange={toggle}
              aria-label="Activar dark mode"
            />
            <MoonIcon className="size-4 text-muted-foreground" />
            <Badge variant={dark ? "default" : "secondary"} className="ml-1">
              {dark ? "Dark" : "Light"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Este toggle modifica{" "}
            <span className="font-mono">document.documentElement.classList</span>{" "}
            y persiste la preferencia en{" "}
            <span className="font-mono">localStorage</span>.
          </p>
        </div>
        <CodeBlock code={`"use client"
import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitch() {
  const [dark, setDark] = React.useState(false)

  // Leer preferencia almacenada (o del sistema) al montar
  React.useEffect(() => {
    const stored = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = stored ? stored === "dark" : prefersDark
    document.documentElement.classList.toggle("dark", isDark)
    setDark(isDark)
  }, [])

  function toggle(checked: boolean) {
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem("theme", checked ? "dark" : "light")
    setDark(checked)
  }

  return (
    <Switch
      checked={dark}
      onCheckedChange={toggle}
      aria-label="Activar dark mode"
    />
  )
}`} />
      </SubSection>

      <Separator />

      {/* ── Token table ── */}
      <SubSection title="Tokens — light vs dark">
        <div className="overflow-hidden rounded-xl border text-sm">
          {/* Header */}
          <div className="grid grid-cols-[1fr_auto_1fr_1fr] gap-0 bg-muted px-4 py-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            <span>Token</span>
            <span className="w-6" />
            <span>Light</span>
            <span>Dark</span>
          </div>
          {TOKENS.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "grid grid-cols-[1fr_auto_1fr_1fr] items-start gap-0 px-4 py-2.5",
                i % 2 === 0 ? "bg-card" : "bg-muted/30",
                "border-t first:border-t-0 border-border"
              )}
            >
              {/* Token name + note */}
              <div className="space-y-0.5 pr-4">
                <span className="font-mono text-xs text-foreground">
                  --{t.name}
                </span>
                {t.note && (
                  <p className="text-xs text-muted-foreground">{t.note}</p>
                )}
              </div>

              {/* Live swatch (reflects current theme) */}
              <div className="flex w-6 items-center justify-center pt-0.5">
                <Swatch cssVar={t.cssVar} />
              </div>

              {/* Light value */}
              <span className="font-mono text-xs text-muted-foreground pr-4 pt-0.5 break-all">
                {t.light}
              </span>

              {/* Dark value */}
              <span className="font-mono text-xs text-muted-foreground pt-0.5 break-all">
                {t.dark}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          La columna de swatch refleja el tema activo en este momento.
        </p>
      </SubSection>

      <Separator />

      {/* ── Diferencias clave ── */}
      <SubSection title="Diferencias clave light → dark">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Inversión de superficie",
              body: "background y card pasan de blanco (L 100%) a gris muy oscuro (L 14–20%). El contraste de texto se invierte en paralelo.",
            },
            {
              title: "Bordes con alfa",
              body: "border e input usan oklch(1 0 0 / 10-15%) en dark: blanco semitransparente en lugar de gris sólido, para evitar halos en fondos complejos.",
            },
            {
              title: "Destructive más brillante",
              body: "El rojo sube de L 0.577 a L 0.704 en dark. Los colores saturados necesitan más luminosidad para mantener el contraste AA sobre fondos oscuros.",
            },
            {
              title: "Primary ligeramente más oscuro",
              body: "El azul baja de L 0.488 a L 0.424. Sobre fondos oscuros, el azul más saturado resulta más legible sin necesitar mayor luminosidad.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-card px-4 py-3.5 space-y-1"
            >
              <p className="text-sm font-medium">{item.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </SubSection>

    </Section>
  )
}
