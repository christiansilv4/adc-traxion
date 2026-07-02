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
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Carlos Vega",
    email: "c.vega@adctraxion.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <LayoutDashboardIcon />,
      isActive: true,
      items: [
        { title: "Resumen", url: "#" },
        { title: "Métricas", url: "#" },
      ],
    },
    {
      title: "Ventas",
      url: "#",
      icon: <TrendingUpIcon />,
      items: [
        { title: "Historial", url: "#" },
        { title: "Cotizaciones", url: "#" },
        { title: "Facturas", url: "#" },
      ],
    },
    {
      title: "Marcas",
      url: "#",
      icon: <TagIcon />,
      items: [
        { title: "Catálogo", url: "#" },
        { title: "Comparativa", url: "#" },
      ],
    },
    {
      title: "Vendedores",
      url: "#",
      icon: <UsersIcon />,
      items: [
        { title: "Equipo", url: "#" },
        { title: "Comisiones", url: "#" },
      ],
    },
    {
      title: "Leads",
      url: "#",
      icon: <TargetIcon />,
      items: [
        { title: "Pipeline", url: "#" },
        { title: "Captación", url: "#" },
      ],
    },
    {
      title: "Reportes",
      url: "#",
      icon: <BarChart2Icon />,
      items: [
        { title: "PDF", url: "#" },
        { title: "Exportar", url: "#" },
      ],
    },
  ],
  projects: [
    { name: "Catálogo",     url: "#", icon: <FrameIcon /> },
    { name: "Cotizaciones", url: "#", icon: <FileTextIcon /> },
    { name: "Reportes PDF", url: "#", icon: <FileBarChartIcon /> },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
            >
              <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden">
                <img
                  src="/logo-adc.png"
                  alt="ADC Traxión"
                  width={240}
                  height={240}
                  className="size-6 object-contain"
                />
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
