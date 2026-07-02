"use client"

import * as React from "react"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  LayoutDashboardIcon,
  TruckIcon,
  UsersIcon,
  TargetIcon,
  BarChart2Icon,
  TagIcon,
  FrameIcon,
  FileTextIcon,
  FileBarChartIcon,
  BellIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { Section, SubSection, CodeBlock } from "./shared"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

// ─── Static wireframe helpers ─────────────────────────────────────────────────

function Frame({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border bg-background shadow-sm", className)}>
      {children}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function DashboardSection() {
  return (
    <Section id="dashboard" title="Dashboard — Motor de Tracción">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Documentación del dashboard principal en{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">app/dashboard/page.tsx</span>.
        Combina todos los componentes del sistema para construir una vista de métricas de ventas
        en tiempo real.
      </p>

      {/* ── Árbol de componentes ── */}
      <SubSection title="Árbol de componentes">
        <div className="rounded-xl border bg-card px-5 py-6">
          <CodeBlock code={`app/dashboard/page.tsx
└── SidebarProvider                      // contexto global, CSS vars de layout
    ├── AppSidebar (variant="inset")      // components/adc-traxion/app-sidebar.tsx
    │   ├── SidebarHeader
    │   │   └── SidebarMenuButton size="lg"  // logo + nombre app
    │   ├── SidebarContent
    │   │   ├── NavMain                   // nav-main.tsx — Collapsible + sub-ítems
    │   │   └── NavProjects               // nav-projects.tsx — SidebarMenuAction hover
    │   ├── SidebarFooter
    │   │   └── NavUser                   // nav-user.tsx — DropdownMenu en footer
    │   └── SidebarRail
    └── SidebarInset
        ├── SiteHeader                    // site-header.tsx
        │   ├── SidebarTrigger
        │   ├── Separator (vertical)
        │   ├── título + subtítulo
        │   ├── SearchCommand             // search-command.tsx — CommandDialog ⌘K
        │   └── ThemeToggle               // theme-toggle.tsx — localStorage dark mode
        └── main (flex col)
            ├── encabezado + Tabs         // selector de período: 1d/7d/30d/90d/1y
            ├── KpiFilters                // kpi-filters.tsx — Popover + Calendar + Checkbox
            ├── SectionCards              // section-cards.tsx — 4 KPI Cards animadas
            ├── ChartAreaInteractive      // chart-area-interactive.tsx — Area chart
            ├── grid @xl/main:cols-2
            │   ├── Card + BarChart       // ventas por marca
            │   └── Card + PieChart       // distribución por tipo
            ├── Card + Table              // últimas ventas (Avatar + Badge)
            └── grid @xl/main:cols-2
                ├── Card + Progress[]     // objetivos del mes
                └── Card + Table          // acuerdos (Badge + DropdownMenu inline)`} />

          {/* Visual layout diagram */}
          <div className="mt-6 overflow-x-auto">
            <div className="min-w-[480px]">
              <Frame className="flex h-72">
                {/* Sidebar */}
                <div className="flex flex-col w-36 border-r bg-sidebar text-sidebar-foreground text-[10px]">
                  <div className="flex items-center gap-1.5 border-b p-2">
                    <div className="size-5 rounded overflow-hidden bg-card flex items-center justify-center">
                      <TruckIcon className="size-3 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold leading-none">ADC Traxión</p>
                      <p className="text-muted-foreground text-[9px]">Motor de Tracción</p>
                    </div>
                  </div>
                  <div className="flex-1 px-1.5 py-2 space-y-0.5">
                    {[
                      { icon: LayoutDashboardIcon, label: "Dashboard", active: true },
                      { icon: TrendingUpIcon,      label: "Ventas" },
                      { icon: TagIcon,             label: "Marcas" },
                      { icon: UsersIcon,           label: "Vendedores" },
                      { icon: TargetIcon,          label: "Leads" },
                      { icon: BarChart2Icon,        label: "Reportes" },
                    ].map(({ icon: Icon, label, active }) => (
                      <div key={label} className={cn(
                        "flex items-center gap-1.5 rounded px-1.5 py-1",
                        active ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "text-sidebar-foreground/60"
                      )}>
                        <Icon className="size-3 shrink-0" />
                        <span>{label}</span>
                      </div>
                    ))}
                    <Separator className="my-1.5 bg-sidebar-border" />
                    <p className="px-1.5 text-[9px] font-medium uppercase tracking-wider text-sidebar-foreground/50">Documentos</p>
                    {[
                      { icon: FrameIcon,        label: "Catálogo" },
                      { icon: FileTextIcon,     label: "Cotizaciones" },
                      { icon: FileBarChartIcon, label: "Reportes PDF" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 rounded px-1.5 py-1 text-sidebar-foreground/60">
                        <Icon className="size-3 shrink-0" />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 border-t p-2">
                    <div className="size-5 rounded bg-muted flex items-center justify-center text-[9px] font-bold">CV</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium leading-none truncate">Carlos Vega</p>
                      <p className="text-[9px] text-muted-foreground truncate">c.vega@adc…</p>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  {/* Header */}
                  <div className="flex h-9 items-center gap-2 border-b bg-card px-3">
                    <div className="size-3.5 rounded bg-muted" />
                    <div className="h-4 w-px bg-border" />
                    <div>
                      <p className="text-[10px] font-medium leading-none">Motor de Tracción</p>
                      <p className="text-[9px] text-muted-foreground">ADC Traxión — Ventas</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="flex items-center gap-1 rounded border px-1.5 py-0.5 text-[9px] text-muted-foreground">
                        <SearchIcon className="size-2.5" />
                        Buscar…
                      </div>
                      <div className="size-5 rounded flex items-center justify-center">
                        <MoonIcon className="size-3 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Dashboard content */}
                  <div className="flex-1 overflow-hidden p-2 space-y-2">
                    {/* Title + Tabs */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-2.5 w-24 rounded bg-foreground/80" />
                        <div className="h-2 w-32 rounded bg-muted mt-1" />
                      </div>
                      <div className="flex gap-0.5 rounded bg-muted px-1 py-0.5">
                        {["1d","7d","30d","90d","1y"].map((t, i) => (
                          <div key={t} className={cn(
                            "rounded px-1 py-0.5 text-[8px]",
                            i === 2 ? "bg-background shadow-sm font-medium" : "text-muted-foreground"
                          )}>{t}</div>
                        ))}
                      </div>
                    </div>
                    {/* Filters row */}
                    <div className="flex gap-1">
                      {["Fecha","Marcas","Ubicaciones"].map(f => (
                        <div key={f} className="rounded border px-1.5 py-0.5 text-[9px] text-muted-foreground">{f} ▾</div>
                      ))}
                    </div>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {[
                        { label: "Unidades", val: "318", delta: "+14%" },
                        { label: "Ingresos",  val: "$56.8M", delta: "+12%" },
                        { label: "Leads",     val: "1,240",  delta: "+22%" },
                        { label: "Meta",      val: "106%",   delta: "+6pp" },
                      ].map(({ label, val, delta }) => (
                        <div key={label} className="rounded-lg border bg-gradient-to-t from-muted to-card p-1.5">
                          <p className="text-[8px] text-muted-foreground uppercase tracking-wide">{label}</p>
                          <p className="text-[11px] font-bold tabular-nums">{val}</p>
                          <p className="text-[8px] text-green-600 dark:text-green-400">{delta}</p>
                        </div>
                      ))}
                    </div>
                    {/* Area chart placeholder */}
                    <div className="rounded-lg border bg-card p-1.5 h-10 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="h-2 w-16 rounded bg-muted" />
                        <div className="h-1.5 w-24 rounded bg-muted" />
                      </div>
                      <div className="h-8 flex-1 mx-2 rounded bg-muted/50 relative overflow-hidden">
                        <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
                          <polyline points="0,18 15,14 30,15 45,10 60,11 75,7 90,5 100,3" fill="none" stroke="var(--color-chart-4)" strokeWidth="1.5" />
                          <polyline points="0,20 15,17 30,18 45,14 60,14 75,12 90,10 100,9" fill="none" stroke="var(--color-chart-2)" strokeWidth="1" strokeDasharray="3,2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </div>
      </SubSection>

      <Separator />

      {/* ── Layout shell ── */}
      <SubSection title="Layout shell — SidebarProvider + CSS variables">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">CSS Variable</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Valor</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Efecto</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["--sidebar-width", "calc(var(--spacing) * 72)", "Ancho del sidebar: 72 × 4px = 288px"],
                ["--header-height", "calc(var(--spacing) * 12)", "Alto del header: 12 × 4px = 48px"],
              ].map(([v, val, desc]) => (
                <tr key={v}>
                  <td className="px-3 py-2 font-mono font-medium">{v}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{val}</td>
                  <td className="px-3 py-2 text-muted-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={`<SidebarProvider
  style={{
    "--sidebar-width": "calc(var(--spacing) * 72)",   // 288 px
    "--header-height": "calc(var(--spacing) * 12)",   // 48 px
  } as React.CSSProperties}
>
  <AppSidebar variant="inset" />

  <SidebarInset>
    <SiteHeader />

    {/* Container query root — habilita @xl/main:grid-cols-2 etc */}
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

        {/* Padding responsivo — breakpoints device-specific definidos en globals.css */}
        <div className="px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40">
          {/* contenido de la sección */}
        </div>

        {/* Grid que reacciona al container, no al viewport */}
        <div className="grid gap-4 @xl/main:grid-cols-2">
          {/* 2 columnas cuando el container ≥ xl */}
        </div>

      </div>
    </div>
  </SidebarInset>
</SidebarProvider>`} />
      </SubSection>

      <Separator />

      {/* ── AppSidebar ── */}
      <SubSection title="AppSidebar — components/adc-traxion/app-sidebar.tsx">
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Componente shadcn</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Prop / variante usada</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Función</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[
                ["Sidebar",           'collapsible="icon"',                      "Colapsa a íconos con tooltip automático"],
                ["Sidebar",           'variant="inset"',                         "Panel con rounded corners y shadow (pasado desde page)"],
                ["SidebarMenuButton", 'size="lg"',                               "Logo en header — altura mayor, layout 2 líneas"],
                ["NavMain",           "items={data.navMain}",                    "Menú principal con Collapsible + sub-ítems"],
                ["NavProjects",       "projects={data.projects}",                "Sección Documentos con SidebarMenuAction hover"],
                ["NavUser",           "user={data.user}",                        "Footer con DropdownMenu para perfil de usuario"],
                ["SidebarRail",       "—",                                       "Franja clickeable para colapsar/expandir"],
              ].map(([comp, prop, fn]) => (
                <tr key={comp + prop}>
                  <td className="px-3 py-2 font-mono font-medium">{comp}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{prop}</td>
                  <td className="px-3 py-2 text-muted-foreground">{fn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock code={`// components/adc-traxion/app-sidebar.tsx
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header: logo como SidebarMenuButton size="lg" */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/logo-adc.png" className="size-6 object-contain" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate text-sm font-semibold">ADC Traxión</span>
                <span className="truncate text-xs text-muted-foreground">Motor de Tracción</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />       {/* Collapsible nav con sub-ítems */}
        <NavProjects projects={data.projects} /> {/* Documentos con acción hover */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />           {/* Perfil con DropdownMenu */}
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}`} />
      </SubSection>

      <Separator />

      {/* ── NavMain ── */}
      <SubSection title="NavMain — Collapsible con sub-ítems">
        <CodeBlock code={`// components/adc-traxion/nav-main.tsx
// Usa Collapsible de shadcn integrado con SidebarMenuItem via render prop

<Collapsible
  defaultOpen={item.isActive}
  className="group/collapsible"
  render={<SidebarMenuItem />}          // base-ui: Collapsible renderiza como li
>
  <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title} />}>
    {item.icon}
    <span className="font-semibold">{item.title}</span>
    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    {/* Chevron rota 90° cuando group-data-open */}
    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
  </CollapsibleTrigger>

  <CollapsibleContent>
    <SidebarMenuSub>
      {item.items.map((subItem) => (
        <SidebarMenuSubItem key={subItem.title}>
          <SidebarMenuSubButton render={<a href={subItem.url} />}>
            <span>{subItem.title}</span>
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  </CollapsibleContent>
</Collapsible>

// Props del ítem:
// { title, url?, icon?, isActive?, badge?, items?: { title, url }[] }`} />
      </SubSection>

      <Separator />

      {/* ── NavUser ── */}
      <SubSection title="NavUser — DropdownMenu en el footer del sidebar">
        <CodeBlock code={`// components/adc-traxion/nav-user.tsx
// DropdownMenuTrigger usa render={<SidebarMenuButton>} — patrón base-ui

const { isMobile } = useSidebar()   // detecta si el sidebar está en Sheet mobile

<DropdownMenuTrigger
  render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
>
  <Avatar className="size-8 rounded-lg">
    <AvatarImage src={user.avatar} />
    <AvatarFallback className="rounded-lg">{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
  </Avatar>
  <div className="grid flex-1 text-left text-sm leading-tight">
    <span className="truncate font-medium">{user.name}</span>
    <span className="truncate text-xs">{user.email}</span>
  </div>
  <ChevronsUpDownIcon className="ml-auto" />
</DropdownMenuTrigger>

<DropdownMenuContent
  side={isMobile ? "bottom" : "right"}  // posición adaptada a mobile/desktop
  align="end"
  sideOffset={4}
>
  {/* DropdownMenuLabel como mini-perfil + grupos de acciones */}
  <DropdownMenuGroup>
    <DropdownMenuItem><SparklesIcon />Actualizar plan</DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem><BadgeCheckIcon />Mi cuenta</DropdownMenuItem>
    <DropdownMenuItem><CreditCardIcon />Facturación</DropdownMenuItem>
    <DropdownMenuItem><BellIcon />Notificaciones</DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem><LogOutIcon />Cerrar sesión</DropdownMenuItem>
</DropdownMenuContent>`} />
      </SubSection>

      <Separator />

      {/* ── SiteHeader ── */}
      <SubSection title="SiteHeader — components/adc-traxion/site-header.tsx">
        <div className="rounded-xl border bg-card px-5 py-6">
          {/* Live preview */}
          <div className="rounded-lg border overflow-hidden">
            <div className="flex h-12 items-center gap-2 px-4">
              <div className="flex h-6 w-6 items-center justify-center rounded border bg-muted">
                <div className="h-2.5 w-2.5 rounded-sm bg-muted-foreground/40" />
              </div>
              <Separator orientation="vertical" className="h-4 mx-1" />
              <div>
                <p className="text-sm font-medium leading-none">Motor de Tracción</p>
                <p className="text-xs text-muted-foreground">ADC Traxión — Ventas por Marca</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <div className="flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs text-muted-foreground w-48 justify-between">
                  <span className="flex items-center gap-2"><SearchIcon className="size-3" />Buscar…</span>
                  <span className="flex items-center gap-1 font-mono text-[10px]">⌘K</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted">
                  <MoonIcon className="size-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CodeBlock code={`// components/adc-traxion/site-header.tsx
// h-(--header-height) usa la CSS var definida en SidebarProvider

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b
      transition-[width,height] ease-linear
      group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">

        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />

        <div>
          <p className="text-sm font-medium leading-none">Motor de Tracción</p>
          <p className="text-xs text-muted-foreground">ADC Traxión — Ventas por Marca</p>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <SearchCommand />   {/* CommandDialog con ⌘K */}
          <ThemeToggle />     {/* localStorage dark mode */}
        </div>

      </div>
    </header>
  )
}

// SearchCommand: Button variant="outline" size="sm" + CommandDialog
// ThemeToggle: Button variant="ghost" size="icon" + localStorage + classList.toggle("dark")`} />
      </SubSection>

      <Separator />

      {/* ── SectionCards ── */}
      <SubSection title="SectionCards — KPI Cards con CardAction y AnimatedValue">
        <div className="rounded-xl border bg-card px-5 py-6">
          {/* Live Card preview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Unidades vendidas", val: "318",      delta: "+14%",  positivo: true,  desc: "Mejor mes del trimestre" },
              { label: "Ingresos totales",  val: "$56.8 M",  delta: "+12%",  positivo: true,  desc: "Crecimiento sostenido" },
              { label: "Leads activos",     val: "1,240",    delta: "+22%",  positivo: true,  desc: "Pipeline más amplio" },
              { label: "Meta del mes",      val: "106%",     delta: "+6 pp", positivo: true,  desc: "Meta superada este mes" },
            ].map(({ label, val, delta, positivo, desc }) => (
              <Card key={label} className="bg-gradient-to-t from-muted to-card shadow-xs">
                <CardHeader>
                  <CardDescription className="text-xs uppercase tracking-wider">{label}</CardDescription>
                  <CardTitle className="text-3xl font-bold tabular-nums">{val}</CardTitle>
                  <CardAction>
                    <Badge variant="outline">
                      {positivo ? <TrendingUpIcon /> : <TrendingDownIcon />}
                      {delta}
                    </Badge>
                  </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                  <div className="flex gap-2 font-medium">
                    {positivo ? "Tendencia al alza" : "Tendencia a la baja"}
                    <TrendingUpIcon className="size-4" />
                  </div>
                  <div className="text-muted-foreground text-xs">{desc}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        <CodeBlock code={`// components/adc-traxion/section-cards.tsx
// CardAction: área de acción alineada a la derecha del CardHeader (badge de delta)
// AnimatedValue: anima el número con ease-out cubic en 900ms al montar

import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedValue } from "@/components/adc-traxion/animated-value"
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

// El gradiente se aplica al contenedor, no a la Card:
// *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-muted *:data-[slot=card]:to-card

<Card className="@container/card">
  <CardHeader>
    <CardDescription className="text-xs uppercase tracking-wider">
      Unidades vendidas
    </CardDescription>
    <CardTitle className="text-3xl font-bold tabular-nums">
      {/* key={valor} fuerza remount → re-ejecuta la animación */}
      <AnimatedValue key={valor} value={valor} />
    </CardTitle>
    <CardAction>
      <Badge variant="outline">
        <TrendingUpIcon />
        +14%
      </Badge>
    </CardAction>
  </CardHeader>
  <CardFooter className="flex-col items-start gap-1.5 text-sm">
    <div className="flex gap-2 font-medium">
      Tendencia al alza <TrendingUpIcon className="size-4" />
    </div>
    <div className="text-muted-foreground">Mejor mes del trimestre</div>
  </CardFooter>
</Card>

// Props de SectionCards:
// periodo: "1d" | "7d" | "30d" | "90d" | "1y"
// Los datos de cada período están hardcodeados en kpiData`} />

        <div className="rounded-xl border bg-card px-5 py-6 space-y-3">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">AnimatedValue — formatos soportados</p>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Valor de entrada</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Formato detectado</th>
                  <th className="px-3 py-2 text-left font-medium text-muted-foreground">Ejemplo animado</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ['"$56.8 M"',   "Moneda + sufijo M",     "$0.0 M → $56.8 M"],
                  ['"106%"',      "Porcentaje",             "0% → 106%"],
                  ['"1,240"',     "Entero con separador",   "0 → 1,240"],
                  ['"318"',       "Entero plano",           "0 → 318"],
                  ['"texto"',     "Sin formato — sin animar", "muestra directamente"],
                ].map(([input, fmt, ex]) => (
                  <tr key={input}>
                    <td className="px-3 py-2 font-mono">{input}</td>
                    <td className="px-3 py-2 text-muted-foreground">{fmt}</td>
                    <td className="px-3 py-2 font-mono text-muted-foreground">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </SubSection>

      <Separator />

      {/* ── Tabs período ── */}
      <SubSection title="Tabs — selector de período">
        <div className="rounded-xl border bg-card px-5 py-6">
          <Tabs defaultValue="30d">
            <TabsList>
              <TabsTrigger value="1d">Hoy</TabsTrigger>
              <TabsTrigger value="7d">7 días</TabsTrigger>
              <TabsTrigger value="30d">30 días</TabsTrigger>
              <TabsTrigger value="90d">90 días</TabsTrigger>
              <TabsTrigger value="1y">Este año</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <CodeBlock code={`// Tabs solo como control de estado — no hay TabsContent
// El cambio de valor actualiza el estado kpiPeriodo que pasa a SectionCards

const [kpiPeriodo, setKpiPeriodo] = React.useState<"1d"|"7d"|"30d"|"90d"|"1y">("30d")

<Tabs value={kpiPeriodo} onValueChange={(v) => v && setKpiPeriodo(v as KpiPeriodo)}>
  <TabsList>
    <TabsTrigger value="1d">Hoy</TabsTrigger>
    <TabsTrigger value="7d">7 días</TabsTrigger>
    <TabsTrigger value="30d">30 días</TabsTrigger>
    <TabsTrigger value="90d">90 días</TabsTrigger>
    <TabsTrigger value="1y">Este año</TabsTrigger>
  </TabsList>
</Tabs>

<SectionCards periodo={kpiPeriodo} />`} />
      </SubSection>

      <Separator />

      {/* ── KpiFilters ── */}
      <SubSection title="KpiFilters — Popover + Calendar + Checkbox multi-select">
        <CodeBlock code={`// components/adc-traxion/kpi-filters.tsx
// Tres filtros: rango de fecha (Calendar), multi-select Marcas, multi-select Ubicaciones
// PopoverTrigger usa render={<Button>} — patrón base-ui

import type { DateRange } from "react-day-picker"

export interface KpiFiltersValue {
  dateRange: DateRange | undefined
  marcas: string[]
  ubicaciones: string[]
}

export const defaultKpiFilters: KpiFiltersValue = {
  dateRange: undefined,
  marcas: [],
  ubicaciones: [],
}

// Uso en page.tsx:
const [kpiFilters, setKpiFilters] = React.useState<KpiFiltersValue>(defaultKpiFilters)
<KpiFilters value={kpiFilters} onChange={setKpiFilters} />

// ── Popover con Calendar (rango de fecha) ──
<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" className="h-8" />}>
    <CalendarIcon className="size-3.5 text-muted-foreground" />
    <span>{dateLabel}</span>         {/* "12 jun – 25 jun" o "Fecha" */}
    <ChevronDownIcon className="size-3.5 text-muted-foreground" />
  </PopoverTrigger>
  <PopoverContent align="start" className="w-fit p-0">
    <Calendar
      mode="range"
      selected={value.dateRange}
      onSelect={(range) => onChange({ ...value, dateRange: range })}
      numberOfMonths={2}
    />
  </PopoverContent>
</Popover>

// ── Multi-select (Marcas / Ubicaciones) ──
<Popover>
  <PopoverTrigger render={<Button variant="outline" size="sm" className="h-8" />}>
    <span>Marcas</span>
    {selected.length > 0 && (
      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
        {selected.length}              {/* contador de seleccionados */}
      </Badge>
    )}
    <ChevronDownIcon className="size-3.5 text-muted-foreground" />
  </PopoverTrigger>
  <PopoverContent align="start" className="w-48 p-1">
    {options.map((opt) => (
      <button key={opt} onClick={() => onToggle(opt)}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted">
        <Checkbox checked={selected.includes(opt)} className="pointer-events-none" />
        {opt}
      </button>
    ))}
  </PopoverContent>
</Popover>

// ── Botón limpiar (solo visible si hay filtros activos) ──
{hasFilters && (
  <>
    <Separator orientation="vertical" className="h-5" />
    <Button variant="ghost" size="sm" onClick={() => onChange(defaultKpiFilters)}>
      <XIcon className="size-3.5" />
      Limpiar
    </Button>
  </>
)}`} />
      </SubSection>

      <Separator />

      {/* ── ChartAreaInteractive ── */}
      <SubSection title="ChartAreaInteractive — Area chart con gradiente y Select de rango">
        <CodeBlock code={`// components/adc-traxion/chart-area-interactive.tsx
// Card con Select de rango (3m/6m/1y) en el header

const chartConfig = {
  ventas: { label: "Ventas", color: "var(--color-chart-4)" },
  meta:   { label: "Meta",   color: "var(--color-chart-2)" },
} satisfies ChartConfig

<Card>
  <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
    <div className="grid flex-1 gap-1">
      <CardTitle>Ventas vs Meta</CardTitle>
      <CardDescription>Unidades vendidas frente a objetivo mensual</CardDescription>
    </div>
    {/* Select de rango en el header */}
    <Select value={rango} onValueChange={(v) => v && setRango(v as Rango)}>
      <SelectTrigger className="w-36 rounded-lg sm:ml-auto">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="3m">Últimos 3 meses</SelectItem>
          <SelectItem value="6m">Últimos 6 meses</SelectItem>
          <SelectItem value="1y">Este año</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </CardHeader>

  <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
    <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>

          {/* Gradientes SVG para el relleno de las áreas */}
          <defs>
            <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-chart-4)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="fillMeta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-chart-2)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />

          {/* Meta: línea punteada */}
          <Area type="monotone" dataKey="meta"
            stroke="var(--color-chart-2)" strokeWidth={2} strokeDasharray="5 4"
            fill="url(#fillMeta)" />

          {/* Ventas: línea sólida sobre la meta */}
          <Area type="monotone" dataKey="ventas"
            stroke="var(--color-chart-4)" strokeWidth={2}
            fill="url(#fillVentas)" />

        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  </CardContent>
</Card>`} />
      </SubSection>

      <Separator />

      {/* ── Gráficas inline ── */}
      <SubSection title="Gráficas inline — BarChart y PieChart dentro de Card">
        <CodeBlock code={`// Gráficas inline en page.tsx — no extraídas a componentes propios

// ChartConfig con tokens de color del sistema:
const barChartConfig = {
  unidades: { label: "Unidades", color: "var(--color-chart-4)" },
} satisfies ChartConfig

const pieChartConfig = {
  SUV:       { label: "SUV",       color: "var(--color-chart-1)" },
  Sedán:     { label: "Sedán",     color: "var(--color-chart-2)" },
  Pickup:    { label: "Pickup",    color: "var(--color-chart-3)" },
  Eléctrico: { label: "Eléctrico", color: "var(--color-chart-4)" },
} satisfies ChartConfig

// ── Bar Chart ──
<ChartContainer config={barChartConfig} className="h-56 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={ventasPorMarca} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
      <XAxis dataKey="marca" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
      <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="unidades" fill="var(--color-chart-4)" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</ChartContainer>

// ── Pie Chart con Cell por color ──
const distribucionTipo = [
  { tipo: "SUV",       valor: 38, color: "var(--color-chart-1)" },
  { tipo: "Sedán",     valor: 28, color: "var(--color-chart-2)" },
  { tipo: "Pickup",    valor: 21, color: "var(--color-chart-3)" },
  { tipo: "Eléctrico", valor: 13, color: "var(--color-chart-4)" },
]

<PieChart>
  <Pie data={distribucionTipo} dataKey="valor" nameKey="tipo"
    cx="50%" cy="50%" outerRadius={80}
    label={({ name, value }) => \`\${name} \${value}%\`}
    labelLine={false}
  >
    {distribucionTipo.map((entry) => (
      <Cell key={entry.tipo} fill={entry.color} />
    ))}
  </Pie>
  <ChartTooltip content={<ChartTooltipContent />} />
</PieChart>`} />
      </SubSection>

      <Separator />

      {/* ── Tabla de ventas ── */}
      <SubSection title="Tabla de ventas — Table + Avatar + Badge por estado">
        <div className="rounded-xl border bg-card px-5 py-6 space-y-4">
          {/* Badge variants */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Mapeo de estado → Badge variant
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { estado: "Completado",   variant: "default" as const },
                { estado: "En proceso",   variant: "outline" as const },
                { estado: "Entregado",    variant: "secondary" as const },
                { estado: "Cancelado",    variant: "destructive" as const },
              ].map(({ estado, variant }) => (
                <div key={estado} className="flex items-center gap-2">
                  <Badge variant={variant}>{estado}</Badge>
                  <span className="text-xs text-muted-foreground font-mono">{variant}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini table preview */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { folio: "VNT-1041", modelo: "Nissan Sentra",  vendedor: "R. Gutiérrez", initials: "RG", monto: "$198,000", estado: "Entregado",    v: "secondary" as const },
                  { folio: "VNT-1042", modelo: "Toyota RAV4",    vendedor: "M. Sánchez",   initials: "MS", monto: "$524,000", estado: "En proceso",  v: "outline" as const },
                  { folio: "VNT-1043", modelo: "Honda CR-V",     vendedor: "A. López",     initials: "AL", monto: "$468,000", estado: "Completado",  v: "default" as const },
                  { folio: "VNT-1044", modelo: "VW Tiguan",      vendedor: "J. Morales",   initials: "JM", monto: "$499,000", estado: "Cancelado",   v: "destructive" as const },
                ].map((row) => (
                  <TableRow key={row.folio}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.folio}</TableCell>
                    <TableCell className="font-medium">{row.modelo}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar size="sm">
                          <AvatarFallback className="bg-primary text-primary-foreground font-bold text-[10px]">
                            {row.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{row.vendedor}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{row.monto}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={row.v}>{row.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <CodeBlock code={`// Mapeo de estado a Badge variant — patrón type-safe
type VentaEstado = "Completado" | "En proceso" | "Entregado" | "Cancelado"

const statusVariant: Record<VentaEstado, "default" | "secondary" | "outline" | "destructive"> = {
  Completado:   "default",
  "En proceso": "outline",
  Entregado:    "secondary",
  Cancelado:    "destructive",
}

// Avatar con DiceBear + fallback con iniciales
function avatarUrl(name: string) {
  return \`https://api.dicebear.com/9.x/notionists-neutral/svg?seed=\${encodeURIComponent(name)}\`
}
function initials(name: string) {
  return name.split(" ").filter(w => w.replace(".", "").length > 0)
    .map(w => w[0].toUpperCase()).slice(0, 2).join("")
}

// Fila de la tabla:
<TableRow key={v.folio}>
  <TableCell className="font-mono text-xs text-muted-foreground">{v.folio}</TableCell>
  <TableCell className="font-medium">{v.marca}</TableCell>
  <TableCell>{v.modelo}</TableCell>
  <TableCell>
    <div className="flex items-center gap-2">
      <Avatar size="sm">
        <AvatarImage src={avatarUrl(v.vendedor)} alt={v.vendedor} />
        <AvatarFallback className="bg-primary text-primary-foreground font-bold">
          {initials(v.vendedor)}
        </AvatarFallback>
      </Avatar>
      {v.vendedor}
    </div>
  </TableCell>
  <TableCell className="text-muted-foreground">{v.fecha}</TableCell>
  <TableCell className="text-right tabular-nums">{v.monto}</TableCell>
  <TableCell className="text-center">
    <Badge variant={statusVariant[v.estado]}>{v.estado}</Badge>
  </TableCell>
</TableRow>`} />
      </SubSection>

      <Separator />

      {/* ── Objetivos ── */}
      <SubSection title="Objetivos del mes — Progress con label y porcentaje calculado">
        <div className="rounded-xl border bg-card px-5 py-6">
          <div className="flex flex-col gap-5 max-w-sm">
            {[
              { label: "Unidades vendidas",    actual: 318, meta: 350, unidad: "uds" },
              { label: "Ingresos del mes",     actual: 568, meta: 600, unidad: "MXN" },
              { label: "Satisfacción cliente", actual: 84,  meta: 100, unidad: "%" },
            ].map((obj) => {
              const pct = Math.round((obj.actual / obj.meta) * 100)
              return (
                <div key={obj.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{obj.label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {obj.actual}{obj.unidad}{" "}
                      <span className="text-xs">/ {obj.meta}{obj.unidad}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={pct} className="flex-1" />
                    <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                      {pct}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <CodeBlock code={`// Patrón: calcular porcentaje, mostrar Progress + valor actual/meta

const objetivos = [
  { label: "Unidades vendidas",     actual: 318, meta: 350, unidad: "uds" },
  { label: "Ingresos del mes",      actual: 568, meta: 600, unidad: "MXN" },
  { label: "Leads captados",        actual: 124, meta: 150, unidad: "" },
  { label: "Satisfacción cliente",  actual: 84,  meta: 100, unidad: "%" },
  { label: "Nuevos distribuidores", actual: 3,   meta: 5,   unidad: "" },
]

{objetivos.map((obj) => {
  const pct = Math.round((obj.actual / obj.meta) * 100)
  return (
    <div key={obj.label} className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{obj.label}</span>
        <span className="tabular-nums text-muted-foreground">
          {obj.actual}{obj.unidad}
          <span className="text-xs"> / {obj.meta}{obj.unidad}</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Progress value={pct} className="flex-1" />
        <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
          {pct}%
        </span>
      </div>
    </div>
  )
})}`} />
      </SubSection>

      <Separator />

      {/* ── Acuerdos ── */}
      <SubSection title="Acuerdos de reuniones — DropdownMenu sobre Badge para cambiar estado">
        <div className="rounded-xl border bg-card px-5 py-6 space-y-3">
          <p className="text-sm text-muted-foreground">
            El estado de cada acuerdo es editable inline: el <Badge variant="outline">Badge</Badge>{" "}
            actúa como trigger de un{" "}
            <span className="font-mono bg-muted px-1 rounded text-xs">DropdownMenu</span>.
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-muted-foreground">Estados:</span>
            {[
              { e: "Pendiente",  v: "secondary" as const },
              { e: "En curso",   v: "outline" as const },
              { e: "Completado", v: "default" as const },
              { e: "Vencido",    v: "destructive" as const },
            ].map(({ e, v }) => (
              <div key={e} className="flex items-center gap-1.5">
                <Badge variant={v}>{e}</Badge>
                <span className="font-mono text-[10px] text-muted-foreground">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock code={`// Estado editable inline: Badge como DropdownMenuTrigger
// El DropdownMenuTrigger envuelve el Badge directamente (sin render prop)

type AcuerdoEstado = "Pendiente" | "En curso" | "Completado" | "Vencido"

const acuerdoVariant: Record<AcuerdoEstado, "default"|"secondary"|"outline"|"destructive"> = {
  Completado: "default",
  "En curso": "outline",
  Pendiente:  "secondary",
  Vencido:    "destructive",
}

// State en el componente padre:
const [acuerdos, setAcuerdos] = React.useState(acuerdosIniciales)

function cambiarEstado(id: string, estado: AcuerdoEstado) {
  setAcuerdos((prev) => prev.map((a) => a.id === id ? { ...a, estado } : a))
}

// En la TableCell de estado:
<TableCell className="text-center">
  <DropdownMenu>
    <DropdownMenuTrigger className="cursor-pointer">
      <Badge variant={acuerdoVariant[a.estado]}>{a.estado}</Badge>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuGroup>
        {(["Pendiente", "En curso", "Completado", "Vencido"] as AcuerdoEstado[]).map((e) => (
          <DropdownMenuItem
            key={e}
            onSelect={() => cambiarEstado(a.id, e)}
            data-active={a.estado === e}
          >
            <Badge variant={acuerdoVariant[e]}>{e}</Badge>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</TableCell>`} />
      </SubSection>

    </Section>
  )
}
