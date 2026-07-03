"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckIcon, CopyIcon, BookOpenIcon, FolderIcon, PaletteIcon, PuzzleIcon, ListIcon, PlusCircleIcon, ShieldCheckIcon, ExternalLinkIcon, MoonIcon, SunIcon, MonitorIcon } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "getting-started",  label: "Getting Started",      icon: BookOpenIcon },
  { id: "estructura",       label: "Estructura",           icon: FolderIcon },
  { id: "tema-tokens",      label: "Tema y tokens",        icon: PaletteIcon },
  { id: "dark-mode",        label: "Dark Mode",            icon: MoonIcon },
  { id: "usar-componente",  label: "Usar un componente",   icon: PuzzleIcon },
  { id: "componentes",      label: "Componentes",          icon: ListIcon },
  { id: "agregar",          label: "Agregar componentes",  icon: PlusCircleIcon },
  { id: "convenciones",     label: "Convenciones",         icon: ShieldCheckIcon },
  { id: "cursor",           label: "Usar con Cursor",      icon: MonitorIcon },
] as const

type NavId = (typeof NAV_ITEMS)[number]["id"]

// ─── Shared components ────────────────────────────────────────────────────────

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      data-section={id}
      className="scroll-mt-16 space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <Separator />
      </div>
      {children}
    </section>
  )
}

function CodeBlock({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted px-4 py-3.5 text-xs leading-relaxed font-mono text-foreground">
        <code>{code.trim()}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copiar código"
        className={cn(
          "absolute top-2 right-2 flex items-center gap-1 rounded-md border px-1.5 py-1",
          "text-xs text-muted-foreground transition-colors",
          "bg-background/80 hover:bg-background hover:text-foreground",
          "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        )}
      >
        {copied ? (
          <CheckIcon className="size-3 text-primary" />
        ) : (
          <CopyIcon className="size-3" />
        )}
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  )
}

function StepCard({
  step,
  title,
  children,
}: {
  step: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-4">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground mt-0.5">
        {step}
      </div>
      <div className="space-y-2 flex-1">
        <p className="font-medium leading-none">{title}</p>
        {children}
      </div>
    </div>
  )
}

// ─── Components table data ────────────────────────────────────────────────────

const COMPONENTS = [
  { name: "Accordion",       path: "@/components/ui/accordion",        section: "components",  desc: "Contenido colapsable" },
  { name: "Alert",           path: "@/components/ui/alert",            section: "feedback",    desc: "Mensajes de estado" },
  { name: "Alert Dialog",    path: "@/components/ui/alert-dialog",     section: "overlay",     desc: "Confirmación modal" },
  { name: "Avatar",          path: "@/components/ui/avatar",           section: "atoms",       desc: "Imagen de usuario" },
  { name: "Badge",           path: "@/components/ui/badge",            section: "atoms",       desc: "Etiqueta de estado" },
  { name: "Button",          path: "@/components/ui/button",           section: "atoms",       desc: "Acción principal" },
  { name: "Calendar",        path: "@/components/ui/calendar",         section: "components",  desc: "Selector de fecha" },
  { name: "Card",            path: "@/components/ui/card",             section: "components",  desc: "Contenedor de contenido" },
  { name: "Checkbox",        path: "@/components/ui/checkbox",         section: "atoms",       desc: "Selección múltiple" },
  { name: "Command",         path: "@/components/ui/command",          section: "components",  desc: "Búsqueda tipo spotlight" },
  { name: "Dialog",          path: "@/components/ui/dialog",           section: "overlay",     desc: "Modal de diálogo" },
  { name: "Dropdown Menu",   path: "@/components/ui/dropdown-menu",    section: "components",  desc: "Menú contextual" },
  { name: "Input",           path: "@/components/ui/input",            section: "forms",       desc: "Campo de texto" },
  { name: "Label",           path: "@/components/ui/label",            section: "forms",       desc: "Etiqueta de campo" },
  { name: "Navigation Menu", path: "@/components/ui/navigation-menu",  section: "navigation",  desc: "Menú de navegación" },
  { name: "Pagination",      path: "@/components/ui/pagination",       section: "navigation",  desc: "Paginación de datos" },
  { name: "Popover",         path: "@/components/ui/popover",          section: "overlay",     desc: "Panel flotante" },
  { name: "Progress",        path: "@/components/ui/progress",         section: "atoms",       desc: "Barra de progreso" },
  { name: "Radio Group",     path: "@/components/ui/radio-group",      section: "atoms",       desc: "Selección única" },
  { name: "Select",          path: "@/components/ui/select",           section: "forms",       desc: "Lista desplegable" },
  { name: "Separator",       path: "@/components/ui/separator",        section: "atoms",       desc: "Divisor visual" },
  { name: "Sheet",           path: "@/components/ui/sheet",            section: "overlay",     desc: "Panel lateral deslizante" },
  { name: "Skeleton",        path: "@/components/ui/skeleton",         section: "atoms",       desc: "Placeholder de carga" },
  { name: "Slider",          path: "@/components/ui/slider",           section: "atoms",       desc: "Control de rango" },
  { name: "Switch",          path: "@/components/ui/switch",           section: "atoms",       desc: "Interruptor on/off" },
  { name: "Table",           path: "@/components/ui/table",            section: "data",        desc: "Tabla de datos" },
  { name: "Tabs",            path: "@/components/ui/tabs",             section: "components",  desc: "Navegación por pestañas" },
  { name: "Textarea",        path: "@/components/ui/textarea",         section: "atoms",       desc: "Campo de texto multilínea" },
  { name: "Toast / Sonner",  path: "sonner",                           section: "feedback",    desc: "Notificaciones temporales" },
  { name: "Tooltip",         path: "@/components/ui/tooltip",          section: "components",  desc: "Ayuda contextual" },
]

const SECTION_LABELS: Record<string, string> = {
  atoms: "Átomos",
  components: "Componentes",
  forms: "Formularios",
  feedback: "Feedback",
  overlay: "Overlay",
  navigation: "Navegación",
  data: "Data",
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HowToPage() {
  const [active, setActive] = React.useState<NavId>("getting-started")
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleDark(checked: boolean) {
    document.documentElement.classList.toggle("dark", checked)
    localStorage.setItem("theme", checked ? "dark" : "light")
    setDark(checked)
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const s = entry.target.getAttribute("data-section")
            if (s) setActive(s as NavId)
          }
        }
      },
      { rootMargin: "-10% 0px -82% 0px", threshold: 0 }
    )
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="bg-background">

      {/* ── Fixed header ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-4 border-b bg-card/95 px-4 backdrop-blur-sm md:px-6">
        <Image
          src="https://adcgrupo.com/wp-content/uploads/2026/04/ADC-TRAXION-mno-1.png"
          alt="ADC Traxión"
          width={140}
          height={40}
          className="h-9 w-auto object-contain"
          unoptimized
        />
        <Separator orientation="vertical" className="h-7" />
        <div className="hidden sm:block">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Motor de Tracción
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">Guía para developers</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/styleguide"
            className="flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Design System
            <ExternalLinkIcon className="size-3" />
          </Link>
        </div>
      </header>

      {/* ── Fixed sidebar ── */}
      <aside className="fixed top-14 bottom-0 left-0 z-40 hidden w-52 flex-col border-r bg-background md:flex">
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-0.5 px-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  active === id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
            <Separator className="my-2" />
            <Link
              href="/styleguide"
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ExternalLinkIcon className="size-4 shrink-0" />
              Ver Design System
            </Link>
          </nav>
        </ScrollArea>
      </aside>

      {/* ── Main ── */}
      <main className="pt-14 md:pl-52">
        <div className="mx-auto max-w-4xl space-y-20 px-5 py-12 md:px-8">

          {/* ── Getting Started ── */}
          <Section id="getting-started" title="Getting Started">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Motor de Tracción es el Design System de ADC Traxión, construido sobre Next.js, shadcn/ui con base-ui y Tailwind CSS v4. Sigue estos pasos para empezar a desarrollar.
            </p>
            <div className="space-y-6">
              <StepCard step={1} title="Clonar el repositorio">
                <CodeBlock code={`git clone https://github.com/adc-traxion/motor-de-traccion.git
cd motor-de-traccion`} />
              </StepCard>
              <StepCard step={2} title="Instalar dependencias">
                <CodeBlock code={`npm install`} />
              </StepCard>
              <StepCard step={3} title="Correr el servidor de desarrollo">
                <CodeBlock code={`npm run dev`} />
                <p className="text-xs text-muted-foreground mt-1">
                  Abre <span className="font-mono bg-muted px-1 rounded">http://localhost:3000</span> en tu navegador.
                </p>
              </StepCard>
              <StepCard step={4} title="Explorar el Design System">
                <p className="text-xs text-muted-foreground">
                  Ve a <span className="font-mono bg-muted px-1 rounded">/styleguide</span> para ver todos los componentes y tokens disponibles.
                </p>
              </StepCard>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">Node.js</Badge>
                    v20 o superior
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">npm</Badge>
                    v10 o superior
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-mono text-xs">Git</Badge>
                    Cualquier versión reciente
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Section>

          {/* ── Estructura del proyecto ── */}
          <Section id="estructura" title="Estructura del proyecto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El proyecto sigue la convención de Next.js App Router con componentes shadcn/ui organizados por tipo.
            </p>
            <CodeBlock code={`motor-de-traccion/
├── app/
│   ├── layout.tsx          # Root layout: fuentes, providers, toaster
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Variables CSS globales (legacy — ver styles/)
│   ├── styleguide/         # Design System visual
│   │   ├── page.tsx        # Shell: header + sidebar + secciones
│   │   └── _sections/      # Una sección por categoría
│   ├── how-to/             # Esta documentación
│   └── dashboard/          # App principal (en desarrollo)
│
├── components/
│   ├── ui/                 # Componentes shadcn/ui — NO modificar directamente
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── cliente/            # Componentes específicos del producto
│
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── hooks/                  # Custom React hooks
│
├── styles/
│   └── globals.css         # Fuente de verdad: tokens, tema, variables CSS
│
└── public/                 # Assets estáticos`} />

            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">components/ui/</CardTitle>
                  <CardDescription className="text-xs">
                    Componentes generados por shadcn CLI. No modificar — agregar nuevos con el comando shadcn.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">components/cliente/</CardTitle>
                  <CardDescription className="text-xs">
                    Componentes de negocio propios del producto: tablas de flotas, widgets de rutas, etc.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">styles/globals.css</CardTitle>
                  <CardDescription className="text-xs">
                    Fuente de verdad del tema. Aquí están todos los tokens de color, tipografía y radios.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">app/styleguide/</CardTitle>
                  <CardDescription className="text-xs">
                    Documentación visual interactiva de todos los componentes y tokens del sistema.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Section>

          {/* ── Tema y tokens ── */}
          <Section id="tema-tokens" title="Tema y tokens">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El sistema de diseño usa CSS custom properties (variables) definidas en <span className="font-mono bg-muted px-1 rounded text-xs">styles/globals.css</span>. Tailwind v4 las mapea automáticamente a clases utilitarias.
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Tokens disponibles</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Variable CSS</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Clase Tailwind</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Uso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ["--background", "bg-background / text-background", "Fondo de página"],
                      ["--foreground", "text-foreground", "Texto principal"],
                      ["--primary", "bg-primary / text-primary", "Acción principal, links activos"],
                      ["--primary-foreground", "text-primary-foreground", "Texto sobre fondo primary"],
                      ["--secondary", "bg-secondary / text-secondary", "Acciones secundarias"],
                      ["--muted", "bg-muted / text-muted", "Fondos atenuados, placeholders"],
                      ["--muted-foreground", "text-muted-foreground", "Texto secundario, descripciones"],
                      ["--card", "bg-card / text-card", "Superficies de Card"],
                      ["--border", "border-border", "Bordes de componentes"],
                      ["--destructive", "bg-destructive / text-destructive", "Errores, acciones peligrosas"],
                      ["--accent", "bg-accent / text-accent", "Hover states, highlight"],
                      ["--ring", "ring ring-ring", "Focus ring"],
                      ["--chart-1..5", "var(--chart-N) en inline style", "Paleta para gráficas"],
                    ].map(([variable, tailwind, uso]) => (
                      <tr key={variable} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{variable}</td>
                        <td className="px-4 py-2.5 font-mono text-xs">{tailwind}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{uso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Cambiar un color del tema</h3>
              <p className="text-sm text-muted-foreground">
                Edita <span className="font-mono bg-muted px-1 rounded text-xs">styles/globals.css</span> — los colores usan el espacio de color <span className="font-mono bg-muted px-1 rounded text-xs">oklch()</span> para mejor interpolación.
              </p>
              <CodeBlock code={`/* styles/globals.css */
@theme inline {
  --color-primary: oklch(0.488 0.243 264.376); /* Azul ADC */
  --color-secondary: oklch(0.967 0.001 286.375);
  /* Para dark mode: */
}

.dark {
  --primary: oklch(0.623 0.214 259.815);
  /* … */
}`} />
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Regla de oro:</span> Nunca uses colores hardcodeados (<span className="font-mono">#fff</span>, <span className="font-mono">rgb(...)</span>, <span className="font-mono">blue-500</span>). Siempre usa los tokens del sistema para que el tema funcione correctamente.
                </p>
              </CardContent>
            </Card>
          </Section>

          {/* ── Dark Mode ── */}
          <Section id="dark-mode" title="Dark Mode">
            <p className="text-sm text-muted-foreground leading-relaxed">
              El dark mode usa una clase{" "}
              <span className="font-mono bg-muted px-1 rounded text-xs">.dark</span>{" "}
              en el elemento{" "}
              <span className="font-mono bg-muted px-1 rounded text-xs">&lt;html&gt;</span>.
              Tailwind detecta los descendientes vía la variante{" "}
              <span className="font-mono bg-muted px-1 rounded text-xs">dark:</span>{" "}
              definida como <span className="font-mono bg-muted px-1 rounded text-xs">@custom-variant dark (&amp;:is(.dark *))</span>.
            </p>

            {/* Mecanismo */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Mecanismo</h3>
              <CodeBlock code={`// styles/globals.css

// La variante "dark:" se activa cuando el elemento (o algún ancestro)
// tiene la clase .dark
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

// En Tailwind: dark: prefix activa estilos condicionalmente
// (generado automáticamente por los tokens del @theme)
<div className="bg-background dark:bg-card" />`} />
            </div>

            {/* Toggle interactivo */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Toggle — probar aquí</h3>
              <Card>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <SunIcon className="size-4 text-muted-foreground" />
                    <Switch
                      checked={dark}
                      onCheckedChange={toggleDark}
                      aria-label="Activar dark mode"
                    />
                    <MoonIcon className="size-4 text-muted-foreground" />
                    <Badge variant={dark ? "default" : "secondary"} className="ml-1">
                      {dark ? "Dark" : "Light"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Agrega/quita{" "}
                    <span className="font-mono">.dark</span> en{" "}
                    <span className="font-mono">document.documentElement</span>{" "}
                    y persiste en <span className="font-mono">localStorage</span>.
                  </p>
                </CardContent>
              </Card>
              <CodeBlock code={`"use client"
import * as React from "react"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitch() {
  const [dark, setDark] = React.useState(false)

  // Leer preferencia almacenada o la del sistema al montar
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
}

// El componente ThemeToggle ya existe en:
// components/adc-traxion/theme-toggle.tsx
// (usa Button size="icon" con SunIcon/MoonIcon en lugar de Switch)`} />
            </div>

            {/* Token comparison */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Tokens light vs dark</h3>
              <div className="overflow-x-auto rounded-xl border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Token</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Light</th>
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Dark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {([
                      ["--background",       "oklch(1 0 0)",                  "oklch(0.145 0 0)"],
                      ["--foreground",       "oklch(0.145 0 0)",              "oklch(0.985 0 0)"],
                      ["--card",             "oklch(1 0 0)",                  "oklch(0.205 0 0)"],
                      ["--primary",          "oklch(0.488 0.243 264.376)",    "oklch(0.424 0.199 265.638)"],
                      ["--muted",            "oklch(0.97 0 0)",               "oklch(0.269 0 0)"],
                      ["--muted-foreground", "oklch(0.556 0 0)",              "oklch(0.708 0 0)"],
                      ["--destructive",      "oklch(0.577 0.245 27.325)",     "oklch(0.704 0.191 22.216)"],
                      ["--border",           "oklch(0.922 0 0)",              "oklch(1 0 0 / 10%)"],
                      ["--input",            "oklch(0.922 0 0)",              "oklch(1 0 0 / 15%)"],
                      ["--sidebar",          "oklch(0.985 0 0)",              "oklch(0.205 0 0)"],
                    ] as const).map(([token, light, dark]) => (
                      <tr key={token} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2.5 font-mono text-xs">{token}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{light}</td>
                        <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{dark}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key differences */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Diferencias clave</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  ["Inversión de superficie", "background y card pasan de blanco (L 100%) a gris muy oscuro (L 14–20%). El foreground se invierte en paralelo."],
                  ["Bordes con alfa", "border e input usan oklch(1 0 0 / 10-15%) en dark: blanco semitransparente en lugar de gris sólido, para evitar halos sobre fondos complejos."],
                  ["Destructive más brillante", "El rojo sube de L 0.577 a L 0.704 en dark. Los colores saturados necesitan más luminosidad para mantener contraste AA sobre fondos oscuros."],
                  ["Primary ligeramente más oscuro", "El azul baja de L 0.488 a L 0.424. Sobre fondos oscuros, el azul más saturado resulta más legible sin necesitar mayor luminosidad."],
                ] as const).map(([title, body]) => (
                  <Card key={title}>
                    <CardHeader className="pb-1">
                      <CardTitle className="text-sm">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          {/* ── Cómo usar un componente ── */}
          <Section id="usar-componente" title="Cómo usar un componente">
            <p className="text-sm text-muted-foreground">
              Ejemplo paso a paso con el componente <span className="font-mono bg-muted px-1 rounded text-xs">Button</span>.
            </p>

            <div className="space-y-6">
              <StepCard step={1} title="Importar el componente">
                <CodeBlock code={`import { Button } from "@/components/ui/button"`} />
              </StepCard>

              <StepCard step={2} title="Uso básico">
                <CodeBlock code={`export default function MyPage() {
  return (
    <Button>Guardar cambios</Button>
  )
}`} />
              </StepCard>

              <StepCard step={3} title="Variantes disponibles">
                <CodeBlock code={`// variant controla el estilo visual
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Eliminar</Button>
<Button variant="link">Ver más</Button>`} />
              </StepCard>

              <StepCard step={4} title="Tamaños">
                <CodeBlock code={`// size controla el tamaño
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Íconos
<Button size="icon"><TruckIcon /></Button>
<Button size="icon-sm"><RouteIcon /></Button>
<Button size="icon-lg"><MapIcon /></Button>`} />
              </StepCard>

              <StepCard step={5} title="Con ícono + texto">
                <CodeBlock code={`import { TruckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

<Button>
  <TruckIcon className="size-4" />
  Nueva unidad
</Button>`} />
              </StepCard>

              <StepCard step={6} title="Estado deshabilitado">
                <CodeBlock code={`<Button disabled>Procesando...</Button>

// O condicionalmente:
<Button disabled={isLoading}>
  {isLoading ? "Guardando..." : "Guardar"}
</Button>`} />
              </StepCard>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Patrón general</CardTitle>
                <CardDescription className="text-xs">
                  Este mismo flujo aplica para cualquier componente del sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-1 text-xs text-muted-foreground list-decimal list-inside">
                  <li>Importa desde <span className="font-mono bg-muted px-1 rounded">@/components/ui/[nombre]</span></li>
                  <li>Revisa las props disponibles en el archivo del componente o en <span className="font-mono bg-muted px-1 rounded">/styleguide</span></li>
                  <li>Usa las variantes y tokens del sistema — no sobreescribas estilos base</li>
                  <li>Para extensiones visuales, usa <span className="font-mono bg-muted px-1 rounded">className</span> con clases Tailwind y tokens del sistema</li>
                </ol>
              </CardContent>
            </Card>
          </Section>

          {/* ── Componentes disponibles ── */}
          <Section id="componentes" title="Componentes disponibles">
            <p className="text-sm text-muted-foreground">
              Todos los componentes están en <span className="font-mono bg-muted px-1 rounded text-xs">components/ui/</span>. Haz clic en la sección para ver demos en vivo en el Design System.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Componente</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Import</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Descripción</th>
                    <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Sección</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {COMPONENTS.map((c) => (
                    <tr key={c.name} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-xs">{c.name}</td>
                      <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{c.path}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.desc}</td>
                      <td className="px-4 py-2.5">
                        <Link href={`/styleguide#${c.section}`}>
                          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted">
                            {SECTION_LABELS[c.section] ?? c.section}
                          </Badge>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* ── Agregar componentes nuevos ── */}
          <Section id="agregar" title="Agregar componentes nuevos">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Los componentes se agregan con la CLI de shadcn. El proyecto usa <span className="font-mono bg-muted px-1 rounded text-xs">@base-ui/react</span> como primitivos (no Radix UI).
            </p>

            <div className="space-y-6">
              <StepCard step={1} title="Instalar un componente shadcn">
                <CodeBlock code={`npx shadcn@latest add [nombre-del-componente]

# Ejemplos:
npx shadcn@latest add breadcrumb
npx shadcn@latest add carousel
npx shadcn@latest add data-table`} />
              </StepCard>

              <StepCard step={2} title="El componente se instala en components/ui/">
                <CodeBlock code={`# El archivo aparece automáticamente:
components/ui/breadcrumb.tsx

# Importa desde ahí:
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb"`} />
              </StepCard>

              <StepCard step={3} title="Agregar al styleguide (opcional)">
                <p className="text-xs text-muted-foreground">
                  Si es un componente importante para el sistema, agrega un demo en la sección correspondiente de <span className="font-mono bg-muted px-1 rounded">app/styleguide/_sections/</span>.
                </p>
                <CodeBlock code={`// En app/styleguide/_sections/components.tsx
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { ComponentDemo } from "./shared"

// Dentro de <ComponentsSection>:
<ComponentDemo
  title="Breadcrumb"
  code={\`import { Breadcrumb } from "@/components/ui/breadcrumb"\`}
>
  <Breadcrumb>...</Breadcrumb>
</ComponentDemo>`} />
              </StepCard>

              <StepCard step={4} title="Para componentes de negocio propios">
                <p className="text-xs text-muted-foreground">
                  Los componentes específicos del producto van en <span className="font-mono bg-muted px-1 rounded">components/cliente/</span>, no en <span className="font-mono bg-muted px-1 rounded">components/ui/</span>.
                </p>
                <CodeBlock code={`# Estructura recomendada:
components/cliente/
├── FlotaTable.tsx        # Tabla de unidades
├── RutaStatusBadge.tsx   # Badge de estado de ruta
├── ConductorCard.tsx     # Card de conductor
└── KpiWidget.tsx         # Widget de métricas`} />
              </StepCard>
            </div>
          </Section>

          {/* ── Convenciones ── */}
          <Section id="convenciones" title="Convenciones">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">Prohibido</Badge>
                    Colores hardcodeados
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CodeBlock code={`// ❌ Nunca:
<div className="bg-blue-600 text-white" />
<div style={{ color: "#1a1a1a" }} />

// ✅ Siempre:
<div className="bg-primary text-primary-foreground" />
<div className="text-foreground" />`} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">Prohibido</Badge>
                    JSX custom cuando existe shadcn equivalente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CodeBlock code={`// ❌ Nunca crear elementos HTML raw:
<button className="rounded bg-blue-500 px-4 py-2 text-white">
  Guardar
</button>

// ✅ Usar el componente shadcn:
<Button variant="default">Guardar</Button>`} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Nota</Badge>
                    base-ui: usar <code className="font-mono text-xs">render</code> en lugar de <code className="font-mono text-xs">asChild</code>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    Este proyecto usa <span className="font-mono bg-muted px-1 rounded">@base-ui/react</span> (no Radix UI). El prop de composición se llama <span className="font-mono bg-muted px-1 rounded">render</span>, no <span className="font-mono bg-muted px-1 rounded">asChild</span>.
                  </p>
                  <CodeBlock code={`// ❌ No funciona (Radix UI):
<DialogTrigger asChild>
  <Button>Abrir</Button>
</DialogTrigger>

// ✅ Correcto (base-ui):
<DialogTrigger render={<Button variant="outline" />}>
  Abrir
</DialogTrigger>`} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Convención</Badge>
                    Naming de archivos y componentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium text-muted-foreground">Tipo</th>
                          <th className="py-2 text-left font-medium text-muted-foreground">Convención</th>
                          <th className="py-2 text-left font-medium text-muted-foreground">Ejemplo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          ["Componentes React", "PascalCase", "FlotaTable.tsx"],
                          ["Archivos de página", "kebab-case (carpeta)", "app/mis-rutas/page.tsx"],
                          ["Hooks", "camelCase con use-", "useFlotaData.ts"],
                          ["Utils / helpers", "camelCase", "formatKilometraje.ts"],
                          ["CSS classes custom", "kebab-case", ".flota-badge"],
                        ].map(([tipo, conv, ejemplo]) => (
                          <tr key={tipo}>
                            <td className="py-1.5 text-muted-foreground">{tipo}</td>
                            <td className="py-1.5 font-mono">{conv}</td>
                            <td className="py-1.5 font-mono text-muted-foreground">{ejemplo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Convención</Badge>
                    Texto en español
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Toda la UI del producto debe estar en español. Los nombres de variables, funciones y comentarios técnicos pueden estar en inglés. Los labels, placeholders, mensajes de error y textos de botones van en español.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* ── Cursor ── */}
          <Section id="cursor" title="Usar con Cursor">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cursor es un editor basado en VS Code con IA integrada. Puede trabajar con este proyecto, pero a diferencia de Claude Code requiere que adjuntes manualmente el contexto en cada chat.
            </p>

            {/* 1 — Clonar */}
            <div className="space-y-6">
              <StepCard step={1} title="Clonar el repositorio e instalar dependencias">
                <CodeBlock code={`git clone https://github.com/<org>/motor-de-traccion.git
cd motor-de-traccion
npm install`} />
              </StepCard>

              {/* 2 — Abrir en Cursor */}
              <StepCard step={2} title="Abrir la carpeta en Cursor">
                <p className="text-xs text-muted-foreground">
                  <strong>File → Open Folder</strong> y selecciona la raíz del proyecto.
                  También puedes hacerlo desde la terminal:
                </p>
                <CodeBlock code={`cursor .`} />
              </StepCard>

              {/* 3 — Adjuntar contexto */}
              <StepCard step={3} title='Adjuntar archivos de contexto al chat'>
                <p className="text-xs text-muted-foreground">
                  En el chat de Cursor usa <span className="font-mono bg-muted px-1 rounded">@</span> para adjuntar archivos. Añade estos tres en cada sesión de trabajo:
                </p>
                <div className="overflow-hidden rounded-xl border text-xs">
                  <div className="grid grid-cols-[auto_1fr] bg-muted px-4 py-2 font-medium text-muted-foreground uppercase tracking-widest gap-x-4">
                    <span>Archivo</span>
                    <span>Para qué sirve</span>
                  </div>
                  {[
                    ["@CLAUDE.md",                          "Reglas del proyecto, convenciones y restricciones que debe respetar la IA"],
                    ["@design.md",                         "Tokens de color, tipografía y radios — referencia visual del sistema"],
                    ["@.claude/skills/shadcn/SKILL.md",    "Contexto de shadcn/base-ui: cómo instalar componentes, el patrón render vs asChild y reglas de composición"],
                  ].map(([file, desc]) => (
                    <div key={file} className="grid grid-cols-[auto_1fr] items-start gap-x-4 border-t px-4 py-2.5 odd:bg-card even:bg-muted/20">
                      <span className="font-mono text-foreground whitespace-nowrap">{file}</span>
                      <span className="text-muted-foreground">{desc}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Nota:</span>{" "}
                  <span className="font-mono bg-muted px-1 rounded">.claude/skills/</span> está rastreado en git — todos los que clonen el repo lo tendrán.
                  El resto de <span className="font-mono bg-muted px-1 rounded">.claude/</span> (memoria personal, settings) está en <span className="font-mono bg-muted px-1 rounded">.gitignore</span>.
                </p>
              </StepCard>

              {/* 4 — Prompt de ejemplo */}
              <StepCard step={4} title="Prompt de ejemplo para empezar a construir">
                <p className="text-xs text-muted-foreground">
                  Con los tres archivos adjuntos, usa un prompt como este para arrancar una nueva feature:
                </p>
                <CodeBlock code={`Quiero crear una nueva página en /app/conductores que muestre
una tabla de conductores con columnas: ID, nombre, unidad asignada
y estado (activo / inactivo / vacaciones).

Usa los componentes del design system (Table, Badge, Card).
Sigue las convenciones de CLAUDE.md y los tokens de design.md.
Los datos por ahora son un array estático en el mismo archivo.`} />
                <p className="text-xs text-muted-foreground mt-1">
                  Cuanto más específico el prompt (componentes, estructura de datos, ruta), mejor será el resultado.
                </p>
              </StepCard>
            </div>

            {/* Diferencias vs Claude Code */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">Diferencias vs Claude Code</h3>
              <div className="overflow-hidden rounded-xl border text-sm">
                <div className="grid grid-cols-3 bg-muted px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  <span>Capacidad</span>
                  <span>Claude Code</span>
                  <span>Cursor</span>
                </div>
                {([
                  [
                    "Contexto del proyecto",
                    "Lee CLAUDE.md, AGENTS.md y archivos automáticamente",
                    "Debes adjuntar los archivos manualmente con @",
                  ],
                  [
                    "Skills / reglas de shadcn",
                    "El skill se activa solo cuando detecta components.json",
                    "Adjunta @.claude/skills/shadcn/SKILL.md manualmente",
                  ],
                  [
                    "Memoria entre sesiones",
                    "Persiste en .claude/memory/ — recuerda decisiones pasadas",
                    "Sin memoria entre sesiones, el contexto es por chat",
                  ],
                  [
                    "Ejecución de comandos",
                    "Corre npm, git y cualquier comando de terminal directamente",
                    "Propone comandos; los ejecutas tú en la terminal integrada",
                  ],
                  [
                    "Edición de archivos",
                    "Lee y edita archivos del repo de forma autónoma",
                    "Edita inline en el editor; puedes aceptar o rechazar por bloque",
                  ],
                  [
                    "Agentes / tareas largas",
                    "Puede encadenar pasos largos con autonomía",
                    "Mejor para ediciones puntuales; agentes más limitados",
                  ],
                ] as const).map(([cap, claude, cursor], i) => (
                  <div
                    key={cap}
                    className={`grid grid-cols-3 gap-x-4 border-t px-4 py-2.5 text-xs ${i % 2 === 0 ? "bg-card" : "bg-muted/20"}`}
                  >
                    <span className="font-medium text-foreground">{cap}</span>
                    <span className="text-muted-foreground">{claude}</span>
                    <span className="text-muted-foreground">{cursor}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-4">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Recomendación:</span>{" "}
                  Usa <strong>Claude Code</strong> para tareas largas de construcción (nuevas páginas, refactors, setup inicial).
                  Usa <strong>Cursor</strong> para ediciones rápidas puntuales o si prefieres ver los cambios inline antes de aceptarlos.
                  Ambos leen el mismo codebase — no son excluyentes.
                </p>
              </CardContent>
            </Card>
          </Section>

        </div>

        <footer className="border-t">
          <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
            <p className="text-xs text-muted-foreground">
              ADC Traxión · Motor de Tracción · Design System · 2026
            </p>
          </div>
        </footer>
      </main>

    </div>
  )
}
