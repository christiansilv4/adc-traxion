// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/components.tsx

"use client"

import { useState } from "react"
import {
  TruckIcon,
  RouteIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"

const fleetRows = [
  { id: "TR-4821", driver: "Carlos Méndez", route: "CDMX → Monterrey", status: "En ruta", eta: "18:30" },
  { id: "TR-3310", driver: "Ana López", route: "Guadalajara → CDMX", status: "Detenido", eta: "20:15" },
  { id: "TR-5502", driver: "Juan Ramírez", route: "Monterrey → Saltillo", status: "En base", eta: "—" },
  { id: "TR-1890", driver: "María Torres", route: "CDMX → Puebla", status: "En ruta", eta: "16:45" },
]

const statusVariant = (s: string) =>
  s === "En ruta" ? "default" : s === "Detenido" ? "destructive" : "secondary"

export function ComponentsSection() {
  const [calendarDate, setCalendarDate] = useState<Date | undefined>(undefined)

  return (
    <Section id="components" title="Componentes">
      {/* Card */}
      <ComponentDemo
        title="Card"
        code={`import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// size: "default" | "sm"

<Card>
  <CardHeader>
    <CardTitle>Unidad TR-4821</CardTitle>
    <CardDescription>Trayecto activo — CDMX a Monterrey</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Conductor: Carlos Méndez · ETA 18:30</p>
  </CardContent>
  <CardFooter>
    <Badge variant="default">En ruta</Badge>
  </CardFooter>
</Card>`}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Unidad TR-4821</CardTitle>
              <CardDescription>Trayecto activo — CDMX a Monterrey</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Conductor: Carlos Méndez · ETA 18:30
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="default">En ruta</Badge>
            </CardFooter>
          </Card>
          <Card size="sm">
            <CardHeader>
              <CardTitle>Unidad TR-3310</CardTitle>
              <CardDescription>Parada no programada</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Última posición: km 342, Querétaro
              </p>
            </CardContent>
            <CardFooter>
              <Badge variant="destructive">Detenido</Badge>
            </CardFooter>
          </Card>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Table */}
      <ComponentDemo
        title="Table — flota de unidades"
        code={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>ID</TableHead>
      <TableHead>Conductor</TableHead>
      <TableHead>Estado</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-mono font-medium">TR-4821</TableCell>
      <TableCell>Carlos Méndez</TableCell>
      <TableCell><Badge variant="default">En ruta</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`}
      >
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Conductor</TableHead>
                  <TableHead>Ruta</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono font-medium">{row.id}</TableCell>
                    <TableCell>{row.driver}</TableCell>
                    <TableCell>{row.route}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </ComponentDemo>

      <Separator />

      {/* Select */}
      <ComponentDemo
        title="Select"
        code={`import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// SelectTrigger size: "sm" | "default"

<Select>
  <SelectTrigger className="w-52">
    <SelectValue placeholder="Seleccionar ruta" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="cdmx-mty">CDMX → Monterrey</SelectItem>
    <SelectItem value="gdl-cdmx">Guadalajara → CDMX</SelectItem>
  </SelectContent>
</Select>`}
      >
        <div className="flex flex-wrap gap-4">
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Seleccionar ruta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cdmx-mty">CDMX → Monterrey</SelectItem>
              <SelectItem value="gdl-cdmx">Guadalajara → CDMX</SelectItem>
              <SelectItem value="mty-slp">Monterrey → Saltillo</SelectItem>
              <SelectItem value="cdmx-pue">CDMX → Puebla</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger size="sm" className="w-40">
              <SelectValue placeholder="Tamaño sm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Opción A</SelectItem>
              <SelectItem value="b">Opción B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Tabs */}
      <ComponentDemo
        title="Tabs — variantes"
        code={`import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// TabsList variant: "default" | "line"

<Tabs defaultValue="flota">
  <TabsList>
    <TabsTrigger value="flota">Flota</TabsTrigger>
    <TabsTrigger value="rutas">Rutas</TabsTrigger>
  </TabsList>
  <TabsContent value="flota">Gestión de unidades.</TabsContent>
  <TabsContent value="rutas">Planificación de rutas.</TabsContent>
</Tabs>

<Tabs defaultValue="flota-line">
  <TabsList variant="line">
    <TabsTrigger value="flota-line">Flota</TabsTrigger>
    <TabsTrigger value="rutas-line">Rutas</TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="space-y-6">
          <Tabs defaultValue="flota">
            <TabsList>
              <TabsTrigger value="flota">Flota</TabsTrigger>
              <TabsTrigger value="rutas">Rutas</TabsTrigger>
              <TabsTrigger value="conductores">Conductores</TabsTrigger>
            </TabsList>
            <TabsContent value="flota">
              <p className="text-sm text-muted-foreground pt-2">Gestión de unidades de la flota.</p>
            </TabsContent>
            <TabsContent value="rutas">
              <p className="text-sm text-muted-foreground pt-2">Planificación y seguimiento de rutas.</p>
            </TabsContent>
            <TabsContent value="conductores">
              <p className="text-sm text-muted-foreground pt-2">Perfil y asignación de conductores.</p>
            </TabsContent>
          </Tabs>

          <Tabs defaultValue="flota-line">
            <TabsList variant="line">
              <TabsTrigger value="flota-line">Flota</TabsTrigger>
              <TabsTrigger value="rutas-line">Rutas</TabsTrigger>
              <TabsTrigger value="conductores-line">Conductores</TabsTrigger>
            </TabsList>
            <TabsContent value="flota-line">
              <p className="text-sm text-muted-foreground pt-2">Variante line — Flota.</p>
            </TabsContent>
            <TabsContent value="rutas-line">
              <p className="text-sm text-muted-foreground pt-2">Variante line — Rutas.</p>
            </TabsContent>
            <TabsContent value="conductores-line">
              <p className="text-sm text-muted-foreground pt-2">Variante line — Conductores.</p>
            </TabsContent>
          </Tabs>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Accordion */}
      <ComponentDemo
        title="Accordion"
        code={`import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>¿Cómo asigno una unidad a una ruta?</AccordionTrigger>
    <AccordionContent>
      Desde el panel de flota, selecciona la unidad disponible y utiliza
      el botón "Asignar ruta".
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>¿Qué significa el estado "Detenido"?</AccordionTrigger>
    <AccordionContent>
      Indica que la unidad se ha detenido fuera de un punto programado.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion className="max-w-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Cómo asigno una unidad a una ruta?</AccordionTrigger>
            <AccordionContent>
              Desde el panel de flota, selecciona la unidad disponible y utiliza el botón
              &quot;Asignar ruta&quot; para vincularla con la ruta planificada.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Qué significa el estado &quot;Detenido&quot;?</AccordionTrigger>
            <AccordionContent>
              El estado Detenido indica que la unidad se ha detenido fuera de un punto
              de parada programado por más de 15 minutos.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Cómo genero un reporte de eficiencia?</AccordionTrigger>
            <AccordionContent>
              En la sección de Reportes, selecciona el rango de fechas y las unidades
              a analizar. El sistema generará un PDF con métricas de desempeño.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentDemo>

      <Separator />

      {/* Dropdown Menu */}
      <ComponentDemo
        title="Dropdown Menu"
        code={`import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Acciones de unidad
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><UserIcon />Ver conductor</DropdownMenuItem>
    <DropdownMenuItem><RouteIcon />Asignar ruta</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive">
      <LogOutIcon />Dar de baja
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            Acciones de unidad
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <UserIcon />
              Ver conductor
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RouteIcon />
              Asignar ruta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SettingsIcon />
              Configurar unidad
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOutIcon />
              Dar de baja
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentDemo>

      <Separator />

      {/* Calendar */}
      <ComponentDemo
        title="Calendar"
        code={`import { Calendar } from "@/components/ui/calendar"

const [date, setDate] = useState<Date | undefined>(undefined)

// mode: "single" | "multiple" | "range"

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-xl border w-fit"
/>`}
      >
        <Calendar
          mode="single"
          selected={calendarDate}
          onSelect={setCalendarDate}
          className="rounded-xl border w-fit"
        />
      </ComponentDemo>

    </Section>
  )
}
