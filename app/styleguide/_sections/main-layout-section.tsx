"use client"

import { Section, SubSection, ComponentDemo, CodeBlock } from "./shared"
import { Separator } from "@/components/ui/separator"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/adc-traxion/app-sidebar"
import { SiteHeader } from "@/components/adc-traxion/site-header"
import { cn } from "@/lib/utils"

// DemoFrame: overflow-hidden clips the SidebarProvider's min-h-svh.
// collapsible="none" (passed to AppSidebar) renders Sidebar as inline flex div.

function DemoFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border", className)}>
      {children}
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function MainLayoutSection() {
  return (
    <Section id="main-layout" title="Main Layout">
      <p className="text-sm text-muted-foreground">
        Layout shell del dashboard. Se define en{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">app/dashboard/page.tsx</span>{" "}
        y combina{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">SidebarProvider</span>{" "}
        →{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">AppSidebar</span>{" "}
        +{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">SiteHeader</span>{" "}
        dentro de{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">SidebarInset</span>.
      </p>

      {/* ── Layout shell ── */}
      <ComponentDemo
        title="Layout shell — estructura completa"
        code={`// app/dashboard/page.tsx
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/adc-traxion/app-sidebar"
import { SiteHeader } from "@/components/adc-traxion/site-header"

export default function DashboardPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width":  "calc(var(--spacing) * 72)",  // 18rem
        "--header-height":  "calc(var(--spacing) * 12)",  // 3rem
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* contenido de la página */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-[460px]">
          <SidebarProvider
            style={{
              "--sidebar-width":  "calc(var(--spacing) * 72)",
              "--header-height":  "calc(var(--spacing) * 12)",
              minHeight: 0,
              height: "100%",
            } as React.CSSProperties}
          >
            <AppSidebar variant="inset" collapsible="none" />
            <SidebarInset>
              <SiteHeader />
              <div className="p-6 space-y-3">
                {[75, 55, 80, 60, 70, 50, 65].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

      <Separator />

      {/* ── SiteHeader ── */}
      <ComponentDemo
        title="SiteHeader — header de página"
        code={`// components/adc-traxion/site-header.tsx
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchCommand } from "@/components/adc-traxion/search-command"
import { ThemeToggle }   from "@/components/adc-traxion/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <div>
          <p className="text-sm font-medium leading-none">Motor de Tracción</p>
          <p className="text-xs text-muted-foreground">ADC Traxión — Ventas por Marca</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

// Nota: h-(--header-height) usa la CSS var definida en SidebarProvider.
// group-has-data-[collapsible=icon] mantiene la altura fija cuando el sidebar
// está en modo icono.`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-[460px]">
          <SidebarProvider
            style={{
              "--sidebar-width":  "calc(var(--spacing) * 72)",
              "--header-height":  "calc(var(--spacing) * 12)",
              minHeight: 0,
              height: "100%",
            } as React.CSSProperties}
          >
            <AppSidebar variant="inset" collapsible="none" />
            <SidebarInset>
              <SiteHeader />
              <div className="p-6 space-y-3">
                {[75, 55, 80, 60, 70, 50, 65].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

      <Separator />

      {/* ── Container queries ── */}
      <SubSection title="Container queries y padding responsivo">
        <CodeBlock code={`// El contenedor raíz del contenido lleva @container/main
// para que los hijos puedan usar @xl/main:, @5xl/main:, etc.

<div className="@container/main flex flex-1 flex-col gap-2">

  {/* SectionCards usa container queries para el grid de KPIs */}
  <div className="grid grid-cols-1 gap-4
    @xl/main:grid-cols-2
    @5xl/main:grid-cols-4">
    ...
  </div>

</div>

// Padding lateral responsivo con breakpoints de dispositivos:
// iphone-se:px-4  iphone-pro:px-5  ipad-air:px-10  ipad-pro:px-16
// xl:px-24        2xl:px-40
<div className="px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40">
  {/* contenido */}
</div>`} />
      </SubSection>

    </Section>
  )
}
