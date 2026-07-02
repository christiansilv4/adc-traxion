// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/charts.tsx

"use client"

import { Section, ComponentDemo } from "./shared"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

// ─── Data ────────────────────────────────────────────────────────────────────

const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

const viajesPorMesData = meses.map((mes, i) => ({
  mes,
  viajes: 80 + Math.round(Math.sin(i * 0.6) * 20 + i * 3),
}))

const unidadesMarcaData = [
  { marca: "Kenworth", unidades: 34 },
  { marca: "Peterbilt", unidades: 22 },
  { marca: "Volvo", unidades: 18 },
  { marca: "Freightliner", unidades: 27 },
  { marca: "International", unidades: 14 },
]

const ingresosCumData = meses.map((mes, i) => ({
  mes,
  ingresos: Math.round(500 + i * 80 + Math.random() * 40),
}))

const tipoCargaData = [
  { tipo: "General", valor: 40, fill: "var(--color-general)" },
  { tipo: "Refrigerada", valor: 25, fill: "var(--color-refrigerada)" },
  { tipo: "Peligrosa", valor: 15, fill: "var(--color-peligrosa)" },
  { tipo: "Granel", valor: 20, fill: "var(--color-granel)" },
]

const tipoCargaConfig = {
  general:     { label: "General",     color: "var(--chart-2)" },
  refrigerada: { label: "Refrigerada", color: "var(--chart-3)" },
  peligrosa:   { label: "Peligrosa",   color: "var(--chart-4)" },
  granel:      { label: "Granel",      color: "var(--chart-5)" },
} satisfies ChartConfig

const metricas = [
  { metrica: "Puntualidad", actual: 85, objetivo: 90 },
  { metrica: "Eficiencia", actual: 78, objetivo: 85 },
  { metrica: "Seguridad", actual: 92, objetivo: 95 },
  { metrica: "Consumo", actual: 70, objetivo: 80 },
  { metrica: "Mantenimiento", actual: 88, objetivo: 90 },
  { metrica: "Satisfacción", actual: 82, objetivo: 88 },
]

const viajesRegionData = [
  { region: "Norte", q1: 42, q2: 38, q3: 50, q4: 45 },
  { region: "Centro", q1: 60, q2: 72, q3: 65, q4: 80 },
  { region: "Sur", q1: 28, q2: 33, q3: 30, q4: 35 },
  { region: "Bajío", q1: 35, q2: 40, q3: 38, q4: 42 },
]

// ─── Configs ─────────────────────────────────────────────────────────────────

const lineConfig = {
  viajes: { label: "Viajes", color: "var(--chart-2)" },
} satisfies ChartConfig

const barConfig = {
  unidades: { label: "Unidades", color: "var(--chart-3)" },
} satisfies ChartConfig

const areaConfig = {
  ingresos: { label: "Ingresos (k MXN)", color: "var(--chart-1)" },
} satisfies ChartConfig

const radarConfig = {
  actual:   { label: "Actual",   color: "var(--chart-2)" },
  objetivo: { label: "Objetivo", color: "var(--chart-5)" },
} satisfies ChartConfig

const stackedBarConfig = {
  q1: { label: "Q1", color: "var(--chart-2)" },
  q2: { label: "Q2", color: "var(--chart-3)" },
  q3: { label: "Q3", color: "var(--chart-4)" },
  q4: { label: "Q4", color: "var(--chart-5)" },
} satisfies ChartConfig

const chartMargins = { top: 4, right: 12, bottom: 0, left: -12 }

// ─── Component ───────────────────────────────────────────────────────────────

export function ChartsSection() {
  return (
    <Section id="charts" title="Gráficas">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 1. Line — Viajes por mes */}
        <ComponentDemo
          title="LineChart — Viajes por mes"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts"

const config = {
  viajes: { label: "Viajes", color: "var(--chart-2)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-52 w-full">
  <LineChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: -12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
    <YAxis tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Line type="monotone" dataKey="viajes" stroke="var(--color-viajes)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Viajes por mes</CardTitle>
              <CardDescription>Enero – Diciembre 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineConfig} className="h-52 w-full">
                <LineChart data={viajesPorMesData} margin={chartMargins}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="viajes"
                    stroke="var(--color-viajes)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>

        {/* 2. Bar — Unidades por marca */}
        <ComponentDemo
          title="BarChart — Unidades por marca"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"

const config = {
  unidades: { label: "Unidades", color: "var(--chart-3)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-52 w-full">
  <BarChart data={data} margin={{ top: 4, right: 12, bottom: 0, left: -12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="marca" tickLine={false} axisLine={false} tickMargin={8} />
    <YAxis tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="unidades" fill="var(--color-unidades)" radius={4} />
  </BarChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Unidades por marca</CardTitle>
              <CardDescription>Distribución de la flota</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={barConfig} className="h-52 w-full">
                <BarChart data={unidadesMarcaData} margin={chartMargins}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="marca" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="unidades" fill="var(--color-unidades)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>

        {/* 3. Area — Ingresos acumulados */}
        <ComponentDemo
          title="AreaChart — Ingresos acumulados"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"

const config = {
  ingresos: { label: "Ingresos (k MXN)", color: "var(--chart-1)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-52 w-full">
  <AreaChart data={data}>
    <defs>
      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.3} />
        <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="mes" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" strokeWidth={2} fill="url(#grad)" />
  </AreaChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ingresos acumulados</CardTitle>
              <CardDescription>Miles de MXN · Enero – Diciembre 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={areaConfig} className="h-52 w-full">
                <AreaChart data={ingresosCumData} margin={chartMargins}>
                  <defs>
                    <linearGradient id="gradIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="ingresos"
                    stroke="var(--color-ingresos)"
                    strokeWidth={2}
                    fill="url(#gradIngresos)"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>

        {/* 4. Pie/Donut — Tipo de carga */}
        <ComponentDemo
          title="PieChart — Tipo de carga"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { PieChart, Pie, Cell } from "recharts"

const config = {
  general:     { label: "General",     color: "var(--chart-2)" },
  refrigerada: { label: "Refrigerada", color: "var(--chart-3)" },
} satisfies ChartConfig

const data = [
  { tipo: "General",     valor: 40, fill: "var(--color-general)" },
  { tipo: "Refrigerada", valor: 25, fill: "var(--color-refrigerada)" },
]

<ChartContainer config={config} className="h-52 w-full">
  <PieChart>
    <ChartTooltip content={<ChartTooltipContent nameKey="tipo" />} />
    <Pie data={data} dataKey="valor" nameKey="tipo" innerRadius={50} outerRadius={80} paddingAngle={2}>
      {data.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
    </Pie>
    <ChartLegend content={<ChartLegendContent nameKey="tipo" />} />
  </PieChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tipo de carga</CardTitle>
              <CardDescription>Distribución porcentual de carga transportada</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={tipoCargaConfig} className="h-52 w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent nameKey="tipo" />} />
                  <Pie
                    data={tipoCargaData}
                    dataKey="valor"
                    nameKey="tipo"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {tipoCargaData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="tipo" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>

        {/* 5. Radar — Métricas operativas */}
        <ComponentDemo
          title="RadarChart — Métricas operativas"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts"

const config = {
  actual:   { label: "Actual",   color: "var(--chart-2)" },
  objetivo: { label: "Objetivo", color: "var(--chart-5)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-52 w-full">
  <RadarChart data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="metrica" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Radar name="actual" dataKey="actual" stroke="var(--color-actual)" fill="var(--color-actual)" fillOpacity={0.2} />
    <Radar name="objetivo" dataKey="objetivo" stroke="var(--color-objetivo)" fill="var(--color-objetivo)" fillOpacity={0.15} />
    <ChartLegend content={<ChartLegendContent />} />
  </RadarChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Métricas operativas</CardTitle>
              <CardDescription>Actual vs. objetivo de desempeño</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={radarConfig} className="h-52 w-full">
                <RadarChart data={metricas}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metrica" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Radar
                    name="actual"
                    dataKey="actual"
                    stroke="var(--color-actual)"
                    fill="var(--color-actual)"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="objetivo"
                    dataKey="objetivo"
                    stroke="var(--color-objetivo)"
                    fill="var(--color-objetivo)"
                    fillOpacity={0.15}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                </RadarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>

        {/* 6. Stacked Bar — Viajes por región */}
        <ComponentDemo
          title="BarChart apilado — Viajes por región"
          code={`import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"

const config = {
  q1: { label: "Q1", color: "var(--chart-2)" },
  q2: { label: "Q2", color: "var(--chart-3)" },
  q3: { label: "Q3", color: "var(--chart-4)" },
  q4: { label: "Q4", color: "var(--chart-5)" },
} satisfies ChartConfig

<ChartContainer config={config} className="h-52 w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="region" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Bar dataKey="q1" stackId="a" fill="var(--color-q1)" />
    <Bar dataKey="q2" stackId="a" fill="var(--color-q2)" />
    <Bar dataKey="q3" stackId="a" fill="var(--color-q3)" />
    <Bar dataKey="q4" stackId="a" fill="var(--color-q4)" radius={[4, 4, 0, 0]} />
  </BarChart>
</ChartContainer>`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Viajes por región</CardTitle>
              <CardDescription>Comparativa trimestral 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={stackedBarConfig} className="h-52 w-full">
                <BarChart data={viajesRegionData} margin={chartMargins}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="region" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="q1" stackId="a" fill="var(--color-q1)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="q2" stackId="a" fill="var(--color-q2)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="q3" stackId="a" fill="var(--color-q3)" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="q4" stackId="a" fill="var(--color-q4)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </ComponentDemo>
      </div>
    </Section>
  )
}
