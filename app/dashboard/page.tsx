"use client"

import * as React from "react"
import {
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { AppSidebar }           from "@/components/adc-traxion/app-sidebar"
import { SiteHeader }           from "@/components/adc-traxion/site-header"
import { SectionCards }         from "@/components/adc-traxion/section-cards"
import { ChartAreaInteractive } from "@/components/adc-traxion/chart-area-interactive"
import { KpiFilters, defaultKpiFilters, type KpiFiltersValue } from "@/components/adc-traxion/kpi-filters"

// ─── Datos ───────────────────────────────────────────────────────────────────

const ventasPorMarca = [
  { marca: "Nissan",  unidades: 124 },
  { marca: "Toyota",  unidades: 98  },
  { marca: "Honda",   unidades: 87  },
  { marca: "VW",      unidades: 76  },
  { marca: "Kia",     unidades: 65  },
  { marca: "Mazda",   unidades: 43  },
  { marca: "Otro",    unidades: 27  },
]

const distribucionTipo = [
  { tipo: "SUV",       valor: 38, color: "var(--color-chart-1)" },
  { tipo: "Sedán",     valor: 28, color: "var(--color-chart-2)" },
  { tipo: "Pickup",    valor: 21, color: "var(--color-chart-3)" },
  { tipo: "Eléctrico", valor: 13, color: "var(--color-chart-4)" },
]

const barChartConfig = {
  unidades: { label: "Unidades", color: "var(--color-chart-4)" },
} satisfies ChartConfig

const pieChartConfig = {
  SUV:       { label: "SUV",       color: "var(--color-chart-1)" },
  Sedán:     { label: "Sedán",     color: "var(--color-chart-2)" },
  Pickup:    { label: "Pickup",    color: "var(--color-chart-3)" },
  Eléctrico: { label: "Eléctrico", color: "var(--color-chart-4)" },
} satisfies ChartConfig

type VentaEstado = "Completado" | "En proceso" | "Entregado" | "Cancelado"

const ultimasVentas: {
  folio: string; marca: string; modelo: string
  vendedor: string; fecha: string; monto: string; estado: VentaEstado
}[] = [
  { folio: "VNT-1041", marca: "Nissan",  modelo: "Sentra",   vendedor: "R. Gutiérrez", fecha: "25 Jun 2026", monto: "$198,000", estado: "Entregado"  },
  { folio: "VNT-1042", marca: "Toyota",  modelo: "RAV4",     vendedor: "M. Sánchez",   fecha: "25 Jun 2026", monto: "$524,000", estado: "En proceso" },
  { folio: "VNT-1043", marca: "Honda",   modelo: "CR-V",     vendedor: "A. López",     fecha: "24 Jun 2026", monto: "$468,000", estado: "Completado" },
  { folio: "VNT-1044", marca: "VW",      modelo: "Tiguan",   vendedor: "J. Morales",   fecha: "24 Jun 2026", monto: "$499,000", estado: "En proceso" },
  { folio: "VNT-1045", marca: "Kia",     modelo: "Sportage", vendedor: "C. Reyes",     fecha: "24 Jun 2026", monto: "$389,000", estado: "Cancelado"  },
  { folio: "VNT-1046", marca: "Nissan",  modelo: "NP300",    vendedor: "F. Torres",    fecha: "23 Jun 2026", monto: "$342,000", estado: "Completado" },
  { folio: "VNT-1047", marca: "Mazda",   modelo: "CX-5",     vendedor: "D. Vega",      fecha: "23 Jun 2026", monto: "$478,000", estado: "Entregado"  },
  { folio: "VNT-1048", marca: "Toyota",  modelo: "Camry",    vendedor: "L. Ramos",     fecha: "22 Jun 2026", monto: "$388,000", estado: "Completado" },
]

const statusVariant: Record<VentaEstado, "default" | "secondary" | "outline" | "destructive"> = {
  Completado:   "default",
  "En proceso": "outline",
  Entregado:    "secondary",
  Cancelado:    "destructive",
}

const objetivos = [
  { label: "Unidades vendidas",      actual: 318, meta: 350, unidad: "uds" },
  { label: "Ingresos del mes",       actual: 568, meta: 600, unidad: "MXN" },
  { label: "Leads captados",         actual: 124, meta: 150, unidad: ""    },
  { label: "Satisfacción cliente",   actual: 84,  meta: 100, unidad: "%"   },
  { label: "Nuevos distribuidores",  actual: 3,   meta: 5,   unidad: ""    },
]

type AcuerdoEstado = "Pendiente" | "En curso" | "Completado" | "Vencido"

type Acuerdo = { id: string; descripcion: string; responsable: string; fecha: string; estado: AcuerdoEstado }

const acuerdosIniciales: Acuerdo[] = [
  { id: "ACU-01", descripcion: "Presentar propuesta Nissan Q3",      responsable: "R. Gutiérrez", fecha: "30 Jun 2026", estado: "En curso"   },
  { id: "ACU-02", descripcion: "Actualizar catálogo Toyota Hilux",   responsable: "M. Sánchez",   fecha: "28 Jun 2026", estado: "Pendiente"  },
  { id: "ACU-03", descripcion: "Reunión con distribuidores Kia",     responsable: "C. Reyes",     fecha: "25 Jun 2026", estado: "Completado" },
  { id: "ACU-04", descripcion: "Revisar comisiones vendedores Mayo", responsable: "A. López",     fecha: "20 Jun 2026", estado: "Vencido"    },
  { id: "ACU-05", descripcion: "Enviar reporte mensual a dirección", responsable: "D. Vega",      fecha: "2 Jul 2026",  estado: "Pendiente"  },
  { id: "ACU-06", descripcion: "Capacitación CRM equipo ventas",     responsable: "F. Torres",    fecha: "5 Jul 2026",  estado: "Pendiente"  },
]

const acuerdoVariant: Record<AcuerdoEstado, "default" | "secondary" | "outline" | "destructive"> = {
  Completado: "default",
  "En curso": "outline",
  Pendiente:  "secondary",
  Vencido:    "destructive",
}

function avatarUrl(name: string) {
  return `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`
}

function initials(name: string) {
  return name
    .split(" ")
    .filter((w) => w.replace(".", "").length > 0)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("")
}

type KpiPeriodo = "1d" | "7d" | "30d" | "90d" | "1y"

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [kpiPeriodo, setKpiPeriodo]   = React.useState<KpiPeriodo>("30d")
  const [kpiFilters, setKpiFilters]   = React.useState<KpiFiltersValue>(defaultKpiFilters)
  const [acuerdos, setAcuerdos]       = React.useState<Acuerdo[]>(acuerdosIniciales)

  function cambiarEstado(id: string, estado: AcuerdoEstado) {
    setAcuerdos((prev) => prev.map((a) => a.id === id ? { ...a, estado } : a))
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">

              {/* Encabezado + filtros */}
              <div className="flex flex-col gap-3 px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">Resumen de ventas</h2>
                    <p className="text-sm text-muted-foreground">Métricas del período seleccionado</p>
                  </div>
                  <Tabs value={kpiPeriodo} onValueChange={(v) => v && setKpiPeriodo(v as KpiPeriodo)}>
                    <TabsList>
                      <TabsTrigger value="1d">Hoy</TabsTrigger>
                      <TabsTrigger value="7d">7 días</TabsTrigger>
                      <TabsTrigger value="30d">30 días</TabsTrigger>
                      <TabsTrigger value="90d">90 días</TabsTrigger>
                      <TabsTrigger value="1y">Este año</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <KpiFilters value={kpiFilters} onChange={setKpiFilters} />
              </div>

              {/* KPI Cards */}
              <SectionCards periodo={kpiPeriodo} />

              {/* Gráfica de área: Ventas vs Meta */}
              <div className="px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40">
                <ChartAreaInteractive />
              </div>

              {/* Barras + Pie */}
              <div className="grid gap-4 px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40 @xl/main:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Ventas por marca</CardTitle>
                    <CardDescription>Unidades vendidas en los últimos 30 días</CardDescription>
                  </CardHeader>
                  <CardContent>
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Distribución por tipo</CardTitle>
                    <CardDescription>% de unidades por segmento de vehículo</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <ChartContainer config={pieChartConfig} className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={distribucionTipo}
                            dataKey="valor"
                            nameKey="tipo"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={({ name, value }) => `${name} ${value}%`}
                            labelLine={false}
                          >
                            {distribucionTipo.map((entry) => (
                              <Cell key={entry.tipo} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Tabla últimas ventas */}
              <div className="px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Últimas ventas</CardTitle>
                    <CardDescription>Registros recientes del sistema Motor de Tracción</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Folio</TableHead>
                          <TableHead>Marca</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Vendedor</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead className="text-right">Monto</TableHead>
                          <TableHead className="text-center">Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ultimasVentas.map((v) => (
                          <TableRow key={v.folio}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{v.folio}</TableCell>
                            <TableCell className="font-medium">{v.marca}</TableCell>
                            <TableCell>{v.modelo}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar size="sm">
                                  <AvatarImage src={avatarUrl(v.vendedor)} alt={v.vendedor} />
                                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">{initials(v.vendedor)}</AvatarFallback>
                                </Avatar>
                                {v.vendedor}

                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{v.fecha}</TableCell>
                            <TableCell className="text-right tabular-nums">{v.monto}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={statusVariant[v.estado]}>{v.estado}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Objetivos + Acuerdos de reuniones */}
              <div className="grid gap-4 px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40 @xl/main:grid-cols-2">

                {/* Objetivos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Objetivos del mes</CardTitle>
                    <CardDescription>Avance frente a metas establecidas</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    {objetivos.map((obj) => {
                      const pct = Math.round((obj.actual / obj.meta) * 100)
                      return (
                        <div key={obj.label} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{obj.label}</span>
                            <span className="tabular-nums text-muted-foreground">
                              {obj.actual}{obj.unidad} <span className="text-xs">/ {obj.meta}{obj.unidad}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Progress value={pct} className="flex-1" />
                            <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Acuerdos de reuniones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Acuerdos de reuniones</CardTitle>
                    <CardDescription>Seguimiento de compromisos y pendientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Acuerdo</TableHead>
                          <TableHead>Responsable</TableHead>
                          <TableHead>Fecha límite</TableHead>
                          <TableHead className="text-center">Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {acuerdos.map((a) => (
                          <TableRow key={a.id}>
                            <TableCell className="font-mono text-xs text-muted-foreground">{a.id}</TableCell>
                            <TableCell className="font-medium">{a.descripcion}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Avatar size="sm">
                                  <AvatarImage src={avatarUrl(a.responsable)} alt={a.responsable} />
                                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">{initials(a.responsable)}</AvatarFallback>
                                </Avatar>
                                {a.responsable}
                              </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{a.fecha}</TableCell>
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
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

              </div>

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
