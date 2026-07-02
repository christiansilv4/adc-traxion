"use client"

import * as React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const allData = [
  { mes: "Ene", ventas: 280, meta: 300 },
  { mes: "Feb", ventas: 310, meta: 300 },
  { mes: "Mar", ventas: 295, meta: 310 },
  { mes: "Abr", ventas: 340, meta: 310 },
  { mes: "May", ventas: 325, meta: 320 },
  { mes: "Jun", ventas: 318, meta: 300 },
  { mes: "Jul", ventas: 356, meta: 330 },
  { mes: "Ago", ventas: 342, meta: 340 },
  { mes: "Sep", ventas: 378, meta: 350 },
  { mes: "Oct", ventas: 391, meta: 360 },
  { mes: "Nov", ventas: 410, meta: 380 },
  { mes: "Dic", ventas: 438, meta: 400 },
]

const chartConfig = {
  ventas: { label: "Ventas",  color: "var(--color-chart-4)" },
  meta:   { label: "Meta",    color: "var(--color-chart-2)" },
} satisfies ChartConfig

type Rango = "3m" | "6m" | "1y"

const sliceMap: Record<Rango, number> = { "3m": 3, "6m": 6, "1y": 12 }

export function ChartAreaInteractive() {
  const [rango, setRango] = React.useState<Rango>("6m")
  const data = allData.slice(0, sliceMap[rango])

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Ventas vs Meta</CardTitle>
          <CardDescription>Unidades vendidas frente a objetivo mensual</CardDescription>
        </div>
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
              <defs>
                <linearGradient id="fillVentas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-chart-4)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="fillMeta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="var(--color-chart-2)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="var(--color-chart-2)" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
              <Area type="monotone" dataKey="meta"   stroke="var(--color-chart-2)" strokeWidth={2} strokeDasharray="5 4" fill="url(#fillMeta)"   />
              <Area type="monotone" dataKey="ventas" stroke="var(--color-chart-4)" strokeWidth={2} fill="url(#fillVentas)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
