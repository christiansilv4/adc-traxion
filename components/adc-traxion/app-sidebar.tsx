"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ActivityIcon,
  BarChart2Icon,
  BookOpenIcon,
  ChevronsUpDownIcon,
  CheckIcon,
  FrameIcon,
  LayoutDashboardIcon,
  PaletteIcon,
  TagIcon,
  TargetIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain }     from "@/components/adc-traxion/nav-main"
import { NavProjects } from "@/components/adc-traxion/nav-projects"
import { NavUser }     from "@/components/adc-traxion/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWorkspace } from "@/contexts/workspace-context"
import { workspaces } from "@/lib/workspaces"

const user = {
  name: "Carlos Vega",
  email: "c.vega@adctraxion.com",
  avatar: "",
}

const projects = [
  { name: "Style Guide", url: "/styleguide", icon: <PaletteIcon /> },
  { name: "How-to",      url: "/how-to",     icon: <BookOpenIcon /> },
  { name: "Catálogo",    url: "#",           icon: <FrameIcon />    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const workspace    = useWorkspace()
  const router       = useRouter()
  const { isMobile } = useSidebar()

  const navMain = [
    {
      title: "Dashboard",
      url: `/w/${workspace.id}/dashboard`,
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        { title: "Resumen",  url: `/w/${workspace.id}/dashboard` },
        { title: "Métricas", url: "#" },
      ],
    },
    {
      title: "Actividad",
      url: `/w/${workspace.id}/actividad`,
      icon: <ActivityIcon />,
      items: [
        { title: "Feed",       url: `/w/${workspace.id}/actividad` },
        { title: "Calendario", url: "#" },
      ],
    },
    {
      title: "Ventas",
      url: "#",
      icon: <TrendingUpIcon />,
      items: [
        { title: "Historial",    url: "#" },
        { title: "Cotizaciones", url: "#" },
        { title: "Facturas",     url: "#" },
      ],
    },
    {
      title: "Vendedores",
      url: "#",
      icon: <UsersIcon />,
      items: [
        { title: "Equipo",     url: "#" },
        { title: "Comisiones", url: "#" },
      ],
    },
    {
      title: "Leads",
      url: "#",
      icon: <TargetIcon />,
      items: [
        { title: "Pipeline",  url: "#" },
        { title: "Captación", url: "#" },
      ],
    },
    {
      title: "Marcas",
      url: "#",
      icon: <TagIcon />,
      items: [
        { title: "Catálogo",    url: "#" },
        { title: "Comparativa", url: "#" },
      ],
    },
    {
      title: "Reportes",
      url: "#",
      icon: <BarChart2Icon />,
      items: [
        { title: "PDF",      url: "#" },
        { title: "Exportar", url: "#" },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden bg-primary text-primary-foreground text-xs font-bold shrink-0 group-hover/menu-button:bg-primary group-hover/menu-button:text-primary-foreground">
                  {workspace.initials}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-sm font-semibold">{workspace.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{workspace.description}</span>
                </div>
                <ChevronsUpDownIcon className="ml-auto shrink-0" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Espacios de trabajo</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {workspaces.map((ws) => (
                    <DropdownMenuItem
                      key={ws.id}
                      onSelect={() => router.push(`/w/${ws.id}/dashboard`)}
                      className="gap-2"
                    >
                      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold shrink-0">
                        {ws.initials}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <span className="text-sm font-medium">{ws.name}</span>
                        <span className="text-xs text-muted-foreground">{ws.description}</span>
                      </div>
                      {ws.id === workspace.id && (
                        <CheckIcon className="ml-auto size-4 shrink-0" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
