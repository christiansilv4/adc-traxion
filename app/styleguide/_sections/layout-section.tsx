// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/layout-section.tsx

"use client"

import { Section, ComponentDemo } from "./shared"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const fleetRoutes = [
  "TR-4821 — CDMX → Monterrey",
  "TR-3310 — Guadalajara → CDMX",
  "TR-5502 — Monterrey → Saltillo",
  "TR-1890 — CDMX → Puebla",
  "TR-2201 — Tijuana → Mexicali",
  "TR-7743 — Veracruz → CDMX",
  "TR-9902 — León → Querétaro",
  "TR-6615 — Cancún → Mérida",
  "TR-4430 — Culiacán → Mazatlán",
  "TR-8817 — Chihuahua → Juárez",
  "TR-3321 — Torreón → Durango",
  "TR-5510 — Oaxaca → Pochutla",
  "TR-2280 — Tampico → Matamoros",
  "TR-6699 — Morelia → Colima",
  "TR-1102 — Hermosillo → Nogales",
]

export function LayoutSection() {
  return (
    <Section id="layout" title="Layout">
      {/* Resizable horizontal */}
      <ComponentDemo
        title="ResizablePanelGroup — horizontal"
        code={`import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

// orientation: "horizontal" | "vertical"
// withHandle adds a visible drag handle

<ResizablePanelGroup orientation="horizontal" className="h-48 rounded-xl border">
  <ResizablePanel defaultSize={25} minSize={15}>
    {/* left content */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50} minSize={20}>
    {/* center content */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={25} minSize={15}>
    {/* right content */}
  </ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup orientation="horizontal" className="h-48 rounded-xl border border-border">
          <ResizablePanel defaultSize={25} minSize={15}>
            <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle>Panel izquierdo</CardTitle>
                <CardDescription>25%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Contenido lateral</p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle>Panel central</CardTitle>
                <CardDescription>50%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Contenido principal</p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={15}>
            <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle>Panel derecho</CardTitle>
                <CardDescription>25%</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Panel auxiliar</p>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentDemo>

      <Separator />

      {/* Resizable vertical */}
      <ComponentDemo
        title="ResizablePanelGroup — vertical"
        code={`import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"

<ResizablePanelGroup orientation="vertical" className="h-64 rounded-xl border">
  <ResizablePanel defaultSize={50} minSize={20}>
    {/* top content */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50} minSize={20}>
    {/* bottom content */}
  </ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup orientation="vertical" className="h-64 rounded-xl border border-border">
          <ResizablePanel defaultSize={50} minSize={20}>
            <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle>Panel superior</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Mapa de rutas activas</p>
              </CardContent>
            </Card>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50} minSize={20}>
            <Card className="h-full rounded-none border-0 ring-0">
              <CardHeader>
                <CardTitle>Panel inferior</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Lista de eventos recientes</p>
              </CardContent>
            </Card>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentDemo>

      <Separator />

      {/* Drawer */}
      <ComponentDemo
        title="Drawer"
        code={`import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Detalle de ruta</DrawerTitle>
      <DrawerDescription>Trayecto CDMX → Monterrey.</DrawerDescription>
    </DrawerHeader>
    <div className="px-4 pb-4">
      <p className="text-sm"><span className="font-medium">Unidad:</span> TR-4821</p>
    </div>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="outline">Cerrar</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Abrir Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalle de ruta</DrawerTitle>
              <DrawerDescription>
                Información completa del trayecto CDMX → Monterrey.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-4 space-y-2">
              <p className="text-sm"><span className="font-medium">Unidad:</span> TR-4821</p>
              <p className="text-sm"><span className="font-medium">Conductor:</span> Carlos Méndez</p>
              <p className="text-sm"><span className="font-medium">Distancia:</span> 940 km</p>
              <p className="text-sm"><span className="font-medium">ETA:</span> 18:30</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Cerrar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentDemo>

      <Separator />

      {/* ScrollArea */}
      <ComponentDemo
        title="ScrollArea"
        code={`import { ScrollArea } from "@/components/ui/scroll-area"

// Use className to set a fixed height; content scrolls within it

<ScrollArea className="h-48 w-full max-w-sm rounded-xl border p-3">
  {items.map((item, i) => (
    <p key={i} className="text-sm py-1.5 border-b border-border last:border-0">
      {item}
    </p>
  ))}
</ScrollArea>`}
      >
        <ScrollArea className="h-48 w-full max-w-sm rounded-xl border border-border p-3">
          {fleetRoutes.map((route, i) => (
            <p key={i} className="text-sm py-1.5 border-b border-border last:border-0">
              {route}
            </p>
          ))}
        </ScrollArea>
      </ComponentDemo>
    </Section>
  )
}
