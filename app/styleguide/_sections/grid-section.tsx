// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/grid-section.tsx

import { Section, ComponentDemo } from "./shared"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const units = [
  { id: "TR-4821", driver: "Carlos Méndez", route: "CDMX → Mty", status: "En ruta", km: 940 },
  { id: "TR-3310", driver: "Ana López", route: "GDL → CDMX", status: "Detenido", km: 580 },
  { id: "TR-5502", driver: "Juan Ramírez", route: "Mty → SLP", status: "En base", km: 210 },
  { id: "TR-1890", driver: "María Torres", route: "CDMX → Pue", status: "En ruta", km: 135 },
  { id: "TR-2201", driver: "Pedro Ruiz", route: "TIJ → MXL", status: "En ruta", km: 190 },
  { id: "TR-7743", driver: "Laura Vega", route: "VER → CDMX", status: "En base", km: 450 },
  { id: "TR-9902", driver: "Ernesto Gil", route: "León → QRO", status: "En ruta", km: 170 },
  { id: "TR-6615", driver: "Sofía Mora", route: "CUN → MID", status: "Detenido", km: 320 },
]

const statusVariant = (s: string) =>
  s === "En ruta" ? "default" : s === "Detenido" ? "destructive" : "secondary"

export function GridSection() {
  return (
    <Section id="grid" title="Grid">
      {/* 2 columns */}
      <ComponentDemo
        title="2 columnas"
        code={`// Tailwind 2-column grid

<div className="grid grid-cols-2 gap-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.id}</CardTitle>
          <Badge variant="default">{item.status}</Badge>
        </div>
        <CardDescription>{item.driver}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.route}</p>
      </CardContent>
    </Card>
  ))}
</div>`}
      >
        <div className="grid grid-cols-2 gap-4">
          {units.slice(0, 4).map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{u.id}</CardTitle>
                  <Badge variant={statusVariant(u.status)}>{u.status}</Badge>
                </div>
                <CardDescription>{u.driver}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{u.route}</p>
                <p className="text-xs text-muted-foreground mt-1">{u.km} km</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ComponentDemo>

      <Separator />

      {/* 3 columns */}
      <ComponentDemo
        title="3 columnas"
        code={`// Tailwind 3-column grid

<div className="grid grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.id}</CardTitle>
          <Badge variant="default">{item.status}</Badge>
        </div>
        <CardDescription>{item.driver}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.route}</p>
      </CardContent>
    </Card>
  ))}
</div>`}
      >
        <div className="grid grid-cols-3 gap-4">
          {units.slice(0, 6).map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{u.id}</CardTitle>
                  <Badge variant={statusVariant(u.status)}>{u.status}</Badge>
                </div>
                <CardDescription>{u.driver}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{u.route}</p>
                <p className="text-xs text-muted-foreground mt-1">{u.km} km</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ComponentDemo>

      <Separator />

      {/* 4 columns */}
      <ComponentDemo
        title="4 columnas"
        code={`// Tailwind 4-column grid with Card size="sm"

<div className="grid grid-cols-4 gap-4">
  {items.map((item) => (
    <Card key={item.id} size="sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.id}</CardTitle>
          <Badge className="text-xs">{item.status}</Badge>
        </div>
        <CardDescription className="truncate">{item.driver}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-xs">{item.route}</p>
      </CardContent>
    </Card>
  ))}
</div>`}
      >
        <div className="grid grid-cols-4 gap-4">
          {units.map((u) => (
            <Card key={u.id} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{u.id}</CardTitle>
                  <Badge variant={statusVariant(u.status)} className="text-xs">
                    {u.status}
                  </Badge>
                </div>
                <CardDescription className="truncate">{u.driver}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs">{u.route}</p>
                <p className="text-xs text-muted-foreground mt-1">{u.km} km</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ComponentDemo>

      <Separator />

      {/* Responsive */}
      <ComponentDemo
        title="Responsive (1 / sm:2 / lg:3)"
        code={`// Responsive Tailwind grid

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{item.id}</CardTitle>
          <Badge>{item.status}</Badge>
        </div>
        <CardDescription>{item.driver}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{item.route}</p>
      </CardContent>
    </Card>
  ))}
</div>`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {units.slice(0, 6).map((u) => (
            <Card key={u.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{u.id}</CardTitle>
                  <Badge variant={statusVariant(u.status)}>{u.status}</Badge>
                </div>
                <CardDescription>{u.driver}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{u.route}</p>
                <p className="text-xs text-muted-foreground mt-1">{u.km} km</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ComponentDemo>
    </Section>
  )
}
