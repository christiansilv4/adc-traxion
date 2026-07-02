// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/overlay.tsx

"use client"

import { TruckIcon, CalendarIcon, MapPinIcon } from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function OverlaySection() {
  return (
    <Section id="overlay" title="Overlays">
      {/* Dialog */}
      <ComponentDemo
        title="Dialog"
        code={`import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Abrir Dialog
  </DialogTrigger>
  <DialogContent showCloseButton>
    <DialogHeader>
      <DialogTitle>Reasignar ruta</DialogTitle>
      <DialogDescription>
        Selecciona una nueva ruta para la unidad TR-4821.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-1">
      <Label htmlFor="nueva-ruta">Nueva ruta</Label>
      <Input id="nueva-ruta" placeholder="CDMX → Guadalajara" />
    </div>
    <DialogFooter>
      <Button variant="outline">Cancelar</Button>
      <Button>Confirmar reasignación</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            Abrir Dialog
          </DialogTrigger>
          <DialogContent showCloseButton>
            <DialogHeader>
              <DialogTitle>Reasignar ruta</DialogTitle>
              <DialogDescription>
                Selecciona una nueva ruta para la unidad TR-4821. Esta acción
                notificará al conductor automáticamente.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="nueva-ruta">Nueva ruta</Label>
                <Input id="nueva-ruta" placeholder="CDMX → Guadalajara" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Confirmar reasignación</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentDemo>

      <Separator />

      {/* Sheet */}
      <ComponentDemo
        title="Sheet — lados"
        code={`import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// side: "right" | "left" | "top" | "bottom"

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>
    Sheet derecho
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Detalle de unidad</SheetTitle>
      <SheetDescription>TR-4821 · Trayecto CDMX → Monterrey</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>`}
      >
        <div className="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Sheet derecho
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Detalle de unidad</SheetTitle>
                <SheetDescription>
                  TR-4821 · Trayecto CDMX → Monterrey
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <TruckIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">Camión de 20 toneladas</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPinIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">Km 342, Querétaro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="size-4 text-muted-foreground" />
                  <span className="text-sm">ETA: 18:30 hrs</span>
                </div>
                <Badge variant="default">En ruta</Badge>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet>
            <SheetTrigger render={<Button variant="outline" />}>
              Sheet inferior
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Acciones rápidas</SheetTitle>
                <SheetDescription>
                  Opciones de gestión para la unidad seleccionada.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-wrap gap-2 mt-4">
                <Button variant="outline" size="sm">Contactar conductor</Button>
                <Button variant="outline" size="sm">Ver en mapa</Button>
                <Button variant="outline" size="sm">Asignar nueva ruta</Button>
                <Button variant="destructive" size="sm">Reportar incidencia</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Popover */}
      <ComponentDemo
        title="Popover"
        code={`import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>
    Ver detalles
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Unidad TR-4821</PopoverTitle>
      <PopoverDescription>Detalles de la unidad activa</PopoverDescription>
    </PopoverHeader>
    <div className="space-y-2 mt-1">
      <Label htmlFor="conductor">Conductor</Label>
      <Input id="conductor" defaultValue="Carlos Méndez" />
      <Button size="sm" className="w-full">Guardar cambios</Button>
    </div>
  </PopoverContent>
</Popover>`}
      >
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Ver detalles
          </PopoverTrigger>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Unidad TR-4821</PopoverTitle>
              <PopoverDescription>Detalles de la unidad activa</PopoverDescription>
            </PopoverHeader>
            <div className="space-y-2 mt-1">
              <div className="space-y-1">
                <Label htmlFor="pop-conductor">Conductor</Label>
                <Input id="pop-conductor" defaultValue="Carlos Méndez" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="pop-km">Kilómetros</Label>
                <Input id="pop-km" type="number" defaultValue={940} />
              </div>
              <Button size="sm" className="w-full">Guardar cambios</Button>
            </div>
          </PopoverContent>
        </Popover>
      </ComponentDemo>

      <Separator />

      {/* HoverCard */}
      <ComponentDemo
        title="HoverCard"
        code={`import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

// Opens on hover — use for non-interactive previews

<HoverCard>
  <HoverCardTrigger>
    <span className="text-sm font-medium underline decoration-dotted underline-offset-4 cursor-pointer text-primary">
      Carlos Méndez
    </span>
  </HoverCardTrigger>
  <HoverCardContent>
    <div className="flex gap-3">
      <Avatar size="lg"><AvatarFallback>CM</AvatarFallback></Avatar>
      <div className="space-y-1">
        <p className="text-sm font-semibold">Carlos Méndez</p>
        <p className="text-xs text-muted-foreground">Conductor — 8 años de experiencia</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger>
            <span className="text-sm font-medium underline decoration-dotted underline-offset-4 cursor-pointer text-primary">
              Carlos Méndez
            </span>
          </HoverCardTrigger>
          <HoverCardContent>
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-semibold">Carlos Méndez</p>
                <p className="text-xs text-muted-foreground">
                  Conductor — 8 años de experiencia
                </p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">CDMX → Mty</Badge>
                  <Badge variant="default" className="text-xs">En ruta</Badge>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <CalendarIcon className="size-3" />
                  Próxima pausa: 20:00 hrs
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ComponentDemo>

      <Separator />

      {/* Tooltip */}
      <ComponentDemo
        title="Tooltip — lados"
        code={`import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// side: "top" | "right" | "bottom" | "left"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" size="icon" />}>
      <TruckIcon />
    </TooltipTrigger>
    <TooltipContent side="top">Ver flota activa</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                <TruckIcon />
              </TooltipTrigger>
              <TooltipContent side="top">Ver flota activa</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                <MapPinIcon />
              </TooltipTrigger>
              <TooltipContent side="right">Ver en mapa</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" size="icon" />}>
                <CalendarIcon />
              </TooltipTrigger>
              <TooltipContent side="bottom">Historial de rutas</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentDemo>
    </Section>
  )
}
