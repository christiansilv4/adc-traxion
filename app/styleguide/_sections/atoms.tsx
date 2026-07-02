// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/atoms.tsx

"use client"

import { useState } from "react"
import { TruckIcon, RouteIcon } from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function AtomsSection() {
  const [sliderValue, setSliderValue] = useState([60])

  return (
    <Section id="atoms" title="Átomos">
      {/* Button */}
      <ComponentDemo
        title="Button"
        code={`import { Button } from "@/components/ui/button"

// variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
// size: "xs" | "sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"

<Button variant="default" size="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><TruckIcon /></Button>`}
      >
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <TruckIcon />
            </Button>
            <Button size="icon-sm">
              <RouteIcon />
            </Button>
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Badge */}
      <ComponentDemo
        title="Badge"
        code={`import { Badge } from "@/components/ui/badge"

// variant: "default" | "secondary" | "destructive" | "outline"

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`}
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Avatar */}
      <ComponentDemo
        title="Avatar"
        code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// size: "sm" | "default" | "lg"

<Avatar size="sm">
  <AvatarImage src="/avatar.png" alt="CM" />
  <AvatarFallback>CM</AvatarFallback>
</Avatar>
<Avatar size="default">
  <AvatarFallback>JR</AvatarFallback>
</Avatar>
<Avatar size="lg">
  <AvatarFallback>AL</AvatarFallback>
</Avatar>`}
      >
        <div className="flex items-center gap-4">
          <Avatar size="sm">
            <AvatarFallback>CM</AvatarFallback>
          </Avatar>
          <Avatar size="default">
            <AvatarFallback>JR</AvatarFallback>
          </Avatar>
          <Avatar size="lg">
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Checkbox */}
      <ComponentDemo
        title="Checkbox"
        code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-2">
  <Checkbox id="cb" />
  <Label htmlFor="cb">Sin marcar</Label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="cb-checked" defaultChecked />
  <Label htmlFor="cb-checked">Marcado</Label>
</div>
<div className="flex items-center gap-2">
  <Checkbox id="cb-disabled" disabled />
  <Label htmlFor="cb-disabled">Deshabilitado</Label>
</div>`}
      >
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Checkbox id="cb-unchecked" />
            <Label htmlFor="cb-unchecked">Sin marcar</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb-checked" defaultChecked />
            <Label htmlFor="cb-checked">Marcado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb-disabled" disabled />
            <Label htmlFor="cb-disabled">Deshabilitado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="cb-checked-disabled" defaultChecked disabled />
            <Label htmlFor="cb-checked-disabled">Marcado + deshabilitado</Label>
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Switch */}
      <ComponentDemo
        title="Switch"
        code={`import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// size: "sm" | "default"

<div className="flex items-center gap-2">
  <Switch id="sw-off" />
  <Label htmlFor="sw-off">Apagado</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="sw-on" defaultChecked />
  <Label htmlFor="sw-on">Encendido</Label>
</div>
<div className="flex items-center gap-2">
  <Switch id="sw-sm" size="sm" defaultChecked />
  <Label htmlFor="sw-sm">Small</Label>
</div>`}
      >
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-2">
            <Switch id="sw-off" />
            <Label htmlFor="sw-off">Apagado</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw-on" defaultChecked />
            <Label htmlFor="sw-on">Encendido</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw-sm" size="sm" defaultChecked />
            <Label htmlFor="sw-sm">Small</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="sw-disabled" disabled />
            <Label htmlFor="sw-disabled">Deshabilitado</Label>
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* RadioGroup */}
      <ComponentDemo
        title="Radio Group"
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

<RadioGroup defaultValue="cdmx">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="cdmx" id="rg-cdmx" />
    <Label htmlFor="rg-cdmx">Ciudad de México</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="mty" id="rg-mty" />
    <Label htmlFor="rg-mty">Monterrey</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="disabled" id="rg-disabled" disabled />
    <Label htmlFor="rg-disabled">Deshabilitado</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="cdmx">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="cdmx" id="rg-cdmx" />
            <Label htmlFor="rg-cdmx">Ciudad de México</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="mty" id="rg-mty" />
            <Label htmlFor="rg-mty">Monterrey</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="gdl" id="rg-gdl" />
            <Label htmlFor="rg-gdl">Guadalajara</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="disabled" id="rg-disabled" disabled />
            <Label htmlFor="rg-disabled">Deshabilitado</Label>
          </div>
        </RadioGroup>
      </ComponentDemo>

      <Separator />

      {/* Slider */}
      <ComponentDemo
        title="Slider"
        code={`import { Slider } from "@/components/ui/slider"

const [value, setValue] = useState([60])

<Slider
  value={value}
  onValueChange={(v) => setValue(Array.isArray(v) ? v : [v])}
  min={0}
  max={100}
/>
<p className="text-xs text-muted-foreground">Valor: {value[0]}</p>`}
      >
        <div className="max-w-xs space-y-2">
          <Slider
            value={sliderValue}
            onValueChange={(v: number | readonly number[]) => {
              if (Array.isArray(v)) {
                setSliderValue(v as number[])
              } else {
                setSliderValue([v as number])
              }
            }}
            min={0}
            max={100}
          />
          <p className="text-xs text-muted-foreground">Valor: {sliderValue[0]}</p>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Progress */}
      <ComponentDemo
        title="Progress"
        code={`import { Progress } from "@/components/ui/progress"

// value: 0–100

<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
      >
        <div className="max-w-xs space-y-3">
          <Progress value={25} />
          <Progress value={50} />
          <Progress value={75} />
          <Progress value={100} />
        </div>
      </ComponentDemo>

      <Separator />

      {/* Skeleton */}
      <ComponentDemo
        title="Skeleton"
        code={`import { Skeleton } from "@/components/ui/skeleton"

// Use className to control size and shape
<div className="flex items-start gap-3">
  <Skeleton className="size-10 rounded-full shrink-0" />
  <div className="flex-1 space-y-2">
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-3 w-1/2" />
  </div>
</div>`}
      >
        <div className="flex items-start gap-3 max-w-sm p-4 rounded-xl border border-border">
          <Skeleton className="size-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Separator */}
      <ComponentDemo
        title="Separator"
        code={`import { Separator } from "@/components/ui/separator"

// orientation: "horizontal" | "vertical"

<Separator orientation="horizontal" />

<div className="flex items-center gap-4 h-6">
  <span>Flota</span>
  <Separator orientation="vertical" />
  <span>Rutas</span>
  <Separator orientation="vertical" />
  <span>Conductores</span>
</div>`}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Horizontal</p>
            <Separator orientation="horizontal" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Vertical</p>
            <div className="flex items-center gap-4 h-6">
              <span className="text-sm">Flota</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Rutas</span>
              <Separator orientation="vertical" />
              <span className="text-sm">Conductores</span>
            </div>
          </div>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Input */}
      <ComponentDemo
        title="Input"
        code={`import { Input } from "@/components/ui/input"

// States: default, disabled, aria-invalid

<Input placeholder="Nombre del conductor" />
<Input type="search" placeholder="Buscar unidad..." />
<Input placeholder="Deshabilitado" disabled />
<Input placeholder="Error de validación" aria-invalid="true" />`}
      >
        <div className="flex flex-wrap gap-3 max-w-xl">
          <Input placeholder="Nombre del conductor" className="max-w-xs" />
          <Input type="search" placeholder="Buscar unidad..." className="max-w-xs" />
          <Input placeholder="Deshabilitado" disabled className="max-w-xs" />
          <Input
            placeholder="Error de validación"
            aria-invalid="true"
            className="max-w-xs"
          />
        </div>
      </ComponentDemo>

      <Separator />

      {/* Textarea */}
      <ComponentDemo
        title="Textarea"
        code={`import { Textarea } from "@/components/ui/textarea"

<Textarea placeholder="Observaciones de la ruta..." />
<Textarea placeholder="Deshabilitado" disabled />`}
      >
        <div className="flex flex-wrap gap-3">
          <Textarea placeholder="Observaciones de la ruta..." className="max-w-xs" />
          <Textarea
            placeholder="Deshabilitado"
            disabled
            className="max-w-xs"
          />
        </div>
      </ComponentDemo>

      <Separator />

      {/* Label */}
      <ComponentDemo
        title="Label + Input"
        code={`import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

<div className="space-y-1.5">
  <Label htmlFor="unit-id">Número de unidad</Label>
  <Input id="unit-id" placeholder="TR-4821" />
</div>`}
      >
        <div className="flex flex-wrap gap-6">
          <div className="space-y-1.5">
            <Label htmlFor="label-demo-1">Número de unidad</Label>
            <Input id="label-demo-1" placeholder="TR-4821" className="w-48" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="label-demo-2">Conductor asignado</Label>
            <Input id="label-demo-2" placeholder="Carlos Méndez" className="w-48" />
          </div>
        </div>
      </ComponentDemo>
    </Section>
  )
}
