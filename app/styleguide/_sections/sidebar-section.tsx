"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  TrendingUpIcon,
  TagIcon,
  UsersIcon,
  TargetIcon,
  BarChart2Icon,
  FrameIcon,
  FileTextIcon,
  FileBarChartIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  LogOutIcon,
  BellIcon,
  CreditCardIcon,
  BadgeCheckIcon,
  SparklesIcon,
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
  PanelLeftIcon,
} from "lucide-react"

import { Section, SubSection, ComponentDemo, CodeBlock } from "./shared"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Datos del dashboard ──────────────────────────────────────────────────────

const navMain = [
  {
    title: "Dashboard",
    icon: <LayoutDashboardIcon />,
    isActive: true,
    items: [{ title: "Resumen", url: "#" }, { title: "Métricas", url: "#" }],
  },
  {
    title: "Ventas",
    icon: <TrendingUpIcon />,
    items: [{ title: "Historial", url: "#" }, { title: "Cotizaciones", url: "#" }, { title: "Facturas", url: "#" }],
  },
  {
    title: "Marcas",
    icon: <TagIcon />,
    items: [{ title: "Catálogo", url: "#" }, { title: "Comparativa", url: "#" }],
  },
  {
    title: "Vendedores",
    icon: <UsersIcon />,
    items: [{ title: "Equipo", url: "#" }, { title: "Comisiones", url: "#" }],
  },
  {
    title: "Leads",
    icon: <TargetIcon />,
    items: [{ title: "Pipeline", url: "#" }, { title: "Captación", url: "#" }],
  },
  {
    title: "Reportes",
    icon: <BarChart2Icon />,
    items: [{ title: "PDF", url: "#" }, { title: "Exportar", url: "#" }],
  },
]

const projects = [
  { name: "Catálogo",     url: "#", icon: <FrameIcon /> },
  { name: "Cotizaciones", url: "#", icon: <FileTextIcon /> },
  { name: "Reportes PDF", url: "#", icon: <FileBarChartIcon /> },
]

const user = {
  name: "Carlos Vega",
  email: "c.vega@adctraxion.com",
}

// ─── DemoFrame ────────────────────────────────────────────────────────────────
// collapsible="none" renders Sidebar as an inline flex div (no fixed/absolute).
// minHeight: 0 overrides the SidebarProvider's min-h-svh class.

function DemoFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-xl border", className)}>
      {children}
    </div>
  )
}

const DEMO_PROVIDER_STYLE = {
  "--sidebar-width": "14rem",
  minHeight: 0,
  height: "100%",
} as React.CSSProperties

// ─── NavMain inline (sin importar el componente real para no usar collapsible="icon") ─

function DemoNavMain({ items }: { items: typeof navMain }) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            className="group/collapsible"
            render={<SidebarMenuItem />}
          >
            <CollapsibleTrigger render={<SidebarMenuButton />}>
              {item.icon}
              <span className="font-semibold">{item.title}</span>
              <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items.map((sub) => (
                  <SidebarMenuSubItem key={sub.title}>
                    <SidebarMenuSubButton>
                      <span>{sub.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function DemoNavProjects({ projects: items }: { projects: typeof projects }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Documentos</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <SidebarMenuAction showOnHover>
              <MoreHorizontalIcon />
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function DemoNavUser({ user: u }: { user: typeof user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Avatar className="size-8 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {u.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{u.name}</span>
            <span className="truncate text-xs text-muted-foreground">{u.email}</span>
          </div>
          <ChevronsUpDownIcon className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function SidebarSection() {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <Section id="sidebar" title="Sidebar">
      <p className="text-sm text-muted-foreground">
        El sidebar del dashboard se compone de tres sub-componentes:{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">NavMain</span>,{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">NavProjects</span> y{" "}
        <span className="font-mono bg-muted px-1 rounded text-xs">NavUser</span>.
        El componente raíz es <span className="font-mono bg-muted px-1 rounded text-xs">AppSidebar</span>{" "}
        en <span className="font-mono bg-muted px-1 rounded text-xs">components/adc-traxion/app-sidebar.tsx</span>.
      </p>

      {/* ── Demo completo ── */}
      <ComponentDemo
        title="AppSidebar — vista completa"
        code={`// components/adc-traxion/app-sidebar.tsx
import { NavMain }     from "@/components/adc-traxion/nav-main"
import { NavProjects } from "@/components/adc-traxion/nav-projects"
import { NavUser }     from "@/components/adc-traxion/nav-user"
import {
  Sidebar, SidebarContent, SidebarFooter,
  SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <img src="/logo-adc.png" className="size-6 object-contain" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">ADC Traxión</span>
                <span className="truncate text-xs text-muted-foreground">Motor de Tracción</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

// Usado en app/dashboard/page.tsx:
<SidebarProvider style={{ "--sidebar-width": "calc(var(--spacing) * 72)", ... }}>
  <AppSidebar variant="inset" />
  <SidebarInset>...</SidebarInset>
</SidebarProvider>`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-[480px]">
          <SidebarProvider style={DEMO_PROVIDER_STYLE}>
            <Sidebar collapsible="none">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden bg-background">
                        <img
                          src="/logo-adc.png"
                          alt="ADC Traxión"
                          className="size-6 object-contain"
                        />
                      </div>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">ADC Traxión</span>
                        <span className="truncate text-xs text-muted-foreground">Motor de Tracción</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <DemoNavMain items={navMain} />
                <DemoNavProjects projects={projects} />
              </SidebarContent>
              <SidebarFooter>
                <DemoNavUser user={user} />
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <div className="p-4 space-y-2">
                {[75, 55, 80, 60, 70, 50, 65].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

      <Separator />

      {/* ── Toggle interactivo ── */}
      <SubSection title="Expandido / colapsado (interactivo)">
        <DemoFrame className="h-[480px]">
          <SidebarProvider
            style={{
              "--sidebar-width": collapsed ? "3rem" : "14rem",
              minHeight: 0,
              height: "100%",
            } as React.CSSProperties}
          >
            <Sidebar collapsible="none">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg overflow-hidden bg-background">
                        <img src="/logo-adc.png" alt="ADC Traxión" className="size-6 object-contain" />
                      </div>
                      {!collapsed && (
                        <div className="grid flex-1 text-left text-sm leading-tight">
                          <span className="truncate font-semibold">ADC Traxión</span>
                          <span className="truncate text-xs text-muted-foreground">Motor de Tracción</span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarMenu>
                    {navMain.map(({ title, icon, isActive }) => (
                      <SidebarMenuItem key={title}>
                        <SidebarMenuButton isActive={isActive}>
                          {icon}
                          {!collapsed && <span className="font-semibold">{title}</span>}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
                {!collapsed && <DemoNavProjects projects={projects} />}
              </SidebarContent>
              <SidebarFooter>
                {!collapsed ? (
                  <DemoNavUser user={user} />
                ) : (
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton size="lg">
                        <Avatar className="size-8 rounded-lg">
                          <AvatarFallback className="rounded-lg">CV</AvatarFallback>
                        </Avatar>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                )}
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="flex h-11 shrink-0 items-center gap-2 border-b px-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  onClick={() => setCollapsed((v) => !v)}
                >
                  <PanelLeftIcon className="size-4" />
                </Button>
                <div className="h-4 w-px bg-border" />
                <span className="text-sm font-semibold flex-1">Dashboard</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {collapsed ? "collapsed" : "expanded"}
                </Badge>
              </header>
              <div className="p-4 space-y-2">
                {[75, 55, 80, 60, 70].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </SubSection>

      <Separator />

      {/* ── NavMain ── */}
      <ComponentDemo
        title="NavMain — navegación con sub-menús colapsables"
        code={`// components/adc-traxion/nav-main.tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
         SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { ChevronRightIcon } from "lucide-react"

export function NavMain({ items, label }) {
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          item.items?.length ? (
            // Ítem con sub-menú: Collapsible render={<SidebarMenuItem />}
            <Collapsible
              key={item.title}
              defaultOpen={item.isActive}
              className="group/collapsible"
              render={<SidebarMenuItem />}
            >
              <CollapsibleTrigger render={<SidebarMenuButton tooltip={item.title} />}>
                {item.icon}
                <span className="font-semibold">{item.title}</span>
                <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((sub) => (
                    <SidebarMenuSubItem key={sub.title}>
                      <SidebarMenuSubButton render={<a href={sub.url} />}>
                        <span>{sub.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            // Ítem simple sin sub-menú
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={item.isActive}
                render={<a href={item.url ?? "#"} />}
              >
                {item.icon}
                <span className="font-semibold">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// Patrón clave: Collapsible render={<SidebarMenuItem />}
// → Collapsible actúa como el <li> del menú.
// → CollapsibleTrigger render={<SidebarMenuButton tooltip="..."/>}
// → tooltip se muestra automáticamente cuando sidebar está en mode icon.`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-72">
          <SidebarProvider style={DEMO_PROVIDER_STYLE}>
            <Sidebar collapsible="none">
              <SidebarContent>
                <DemoNavMain items={navMain.slice(0, 3)} />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-4 space-y-2">
                {[75, 55, 80].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

      <Separator />

      {/* ── NavProjects ── */}
      <ComponentDemo
        title="NavProjects — accesos rápidos con acción en hover"
        code={`// components/adc-traxion/nav-projects.tsx
import { SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function NavProjects({ projects }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documentos</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>

            {/* DropdownMenu trigger = SidebarMenuAction */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<SidebarMenuAction showOnHover className="aria-expanded:bg-muted" />}
              >
                <MoreHorizontalIcon />
                <span className="sr-only">Más</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem><FolderIcon />Abrir</DropdownMenuItem>
                <DropdownMenuItem><ArrowRightIcon />Compartir</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash2Icon />Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

// Nota: group-data-[collapsible=icon]:hidden oculta este grupo
// cuando el sidebar está colapsado a modo icono.`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-44">
          <SidebarProvider style={DEMO_PROVIDER_STYLE}>
            <Sidebar collapsible="none">
              <SidebarContent>
                <DemoNavProjects projects={projects} />
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="p-4 space-y-2">
                {[75, 55, 80].map((w, i) => (
                  <div key={i} className="h-2.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            </SidebarInset>
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

      <Separator />

      {/* ── NavUser ── */}
      <ComponentDemo
        title="NavUser — perfil de usuario con dropdown"
        code={`// components/adc-traxion/nav-user.tsx
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function NavUser({ user }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          {/* DropdownMenuTrigger render={<SidebarMenuButton size="lg">} */}
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
          >
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="rounded-lg">CV</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* ...DropdownMenuItems */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

// Patrón clave: DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}
// → el botón del footer actúa directamente como trigger del dropdown.
// → side={isMobile ? "bottom" : "right"} adapta la posición automáticamente.`}
        previewClassName="p-0"
      >
        <DemoFrame className="h-20">
          <SidebarProvider style={DEMO_PROVIDER_STYLE}>
            <Sidebar collapsible="none">
              <SidebarFooter>
                <DemoNavUser user={user} />
              </SidebarFooter>
            </Sidebar>
            <SidebarInset />
          </SidebarProvider>
        </DemoFrame>
      </ComponentDemo>

    </Section>
  )
}
