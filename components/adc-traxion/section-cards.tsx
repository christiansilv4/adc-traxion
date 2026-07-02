import { TrendingUpIcon, TrendingDownIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { AnimatedValue } from "@/components/adc-traxion/animated-value"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type KpiPeriodo = "1d" | "7d" | "30d" | "90d" | "1y"

const kpiData: Record<KpiPeriodo, {
  unidades:   { valor: string; delta: string; positivo: boolean; desc: string }
  ingresos:   { valor: string; delta: string; positivo: boolean; desc: string }
  leads:      { valor: string; delta: string; positivo: boolean; desc: string }
  meta:       { valor: string; delta: string; positivo: boolean; desc: string }
}> = {
  "1d": {
    unidades: { valor: "12",       delta: "+3",    positivo: true,  desc: "3 más que ayer" },
    ingresos: { valor: "$2.1 M",   delta: "+8%",   positivo: true,  desc: "Mejor día de la semana" },
    leads:    { valor: "87",       delta: "+5",    positivo: true,  desc: "5 leads nuevos hoy" },
    meta:     { valor: "41%",      delta: "−9 pp", positivo: false, desc: "En progreso este mes" },
  },
  "7d": {
    unidades: { valor: "74",       delta: "+11%",  positivo: true,  desc: "Semana con tendencia al alza" },
    ingresos: { valor: "$13.2 M",  delta: "+9%",   positivo: true,  desc: "Récord de los últimos 30 días" },
    leads:    { valor: "312",      delta: "+18%",  positivo: true,  desc: "Pipeline en crecimiento" },
    meta:     { valor: "68%",      delta: "+8 pp", positivo: true,  desc: "Buen ritmo para el mes" },
  },
  "30d": {
    unidades: { valor: "318",      delta: "+14%",  positivo: true,  desc: "Mejor mes del trimestre" },
    ingresos: { valor: "$56.8 M",  delta: "+12%",  positivo: true,  desc: "Crecimiento sostenido" },
    leads:    { valor: "1,240",    delta: "+22%",  positivo: true,  desc: "Pipeline más amplio" },
    meta:     { valor: "106%",     delta: "+6 pp", positivo: true,  desc: "Meta superada este mes" },
  },
  "90d": {
    unidades: { valor: "924",      delta: "+18%",  positivo: true,  desc: "Trimestre por encima del objetivo" },
    ingresos: { valor: "$164.9 M", delta: "+16%",  positivo: true,  desc: "Mejor trimestre del año" },
    leads:    { valor: "3,640",    delta: "+25%",  positivo: true,  desc: "Captación en máximos" },
    meta:     { valor: "103%",     delta: "+3 pp", positivo: true,  desc: "Meta trimestral cumplida" },
  },
  "1y": {
    unidades: { valor: "3,812",    delta: "+21%",  positivo: true,  desc: "Año récord de ventas" },
    ingresos: { valor: "$681.2 M", delta: "+19%",  positivo: true,  desc: "Mayor ingreso histórico" },
    leads:    { valor: "14,820",   delta: "+28%",  positivo: true,  desc: "Pipeline histórico" },
    meta:     { valor: "97%",      delta: "−3 pp", positivo: false, desc: "Faltaron 3 pp para la meta anual" },
  },
}

export function SectionCards({ periodo }: { periodo: KpiPeriodo }) {
  const k = kpiData[periodo]

  return (
    <div className="*:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-muted *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Unidades vendidas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-wider">Unidades vendidas</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            <AnimatedValue key={k.unidades.valor} value={k.unidades.valor} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {k.unidades.positivo
                ? <TrendingUpIcon />
                : <TrendingDownIcon />}
              {k.unidades.delta}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {k.unidades.positivo ? "Tendencia al alza" : "Tendencia a la baja"}
            {k.unidades.positivo
              ? <TrendingUpIcon className="size-4" />
              : <TrendingDownIcon className="size-4" />}
          </div>
          <div className="text-muted-foreground">{k.unidades.desc}</div>
        </CardFooter>
      </Card>

      {/* Ingresos totales */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-wider">Ingresos totales</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            <AnimatedValue key={k.ingresos.valor} value={k.ingresos.valor} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {k.ingresos.positivo
                ? <TrendingUpIcon />
                : <TrendingDownIcon />}
              {k.ingresos.delta}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {k.ingresos.positivo ? "Crecimiento sostenido" : "Ingreso reducido"}
            {k.ingresos.positivo
              ? <TrendingUpIcon className="size-4" />
              : <TrendingDownIcon className="size-4" />}
          </div>
          <div className="text-muted-foreground">{k.ingresos.desc}</div>
        </CardFooter>
      </Card>

      {/* Leads activos */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-wider">Leads activos</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            <AnimatedValue key={k.leads.valor} value={k.leads.valor} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {k.leads.positivo
                ? <TrendingUpIcon />
                : <TrendingDownIcon />}
              {k.leads.delta}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {k.leads.positivo ? "Pipeline en crecimiento" : "Pipeline reducido"}
            {k.leads.positivo
              ? <TrendingUpIcon className="size-4" />
              : <TrendingDownIcon className="size-4" />}
          </div>
          <div className="text-muted-foreground">{k.leads.desc}</div>
        </CardFooter>
      </Card>

      {/* Meta del mes */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="text-xs uppercase tracking-wider">Meta del mes</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums">
            <AnimatedValue key={k.meta.valor} value={k.meta.valor} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {k.meta.positivo
                ? <TrendingUpIcon />
                : <TrendingDownIcon />}
              {k.meta.delta}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex gap-2 font-medium">
            {k.meta.positivo ? "Meta alcanzada" : "Por debajo de meta"}
            {k.meta.positivo
              ? <TrendingUpIcon className="size-4" />
              : <TrendingDownIcon className="size-4" />}
          </div>
          <div className="text-muted-foreground">{k.meta.desc}</div>
        </CardFooter>
      </Card>

    </div>
  )
}
