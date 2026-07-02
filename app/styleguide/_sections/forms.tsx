// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/forms.tsx

"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, PhoneIcon } from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"

const fleetSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  tipoVehiculo: z.enum(["camion", "trailer", "pipa", "plataforma"], {
    error: "Selecciona un tipo de vehículo",
  }),
  ruta: z.string().min(1, "La ruta es obligatoria"),
  terminosAceptados: z
    .boolean()
    .refine((v) => v === true, { message: "Debes aceptar los términos" }),
  notificaciones: z.boolean(),
})

type FleetFormValues = z.infer<typeof fleetSchema>

export function FormsSection() {
  const [prioridad, setPrioridad] = useState([50])
  const [fechaSalida, setFechaSalida] = useState<Date | undefined>(undefined)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FleetFormValues>({
    resolver: zodResolver(fleetSchema),
    defaultValues: {
      notificaciones: true,
      terminosAceptados: false,
    },
  })

  const onSubmit = (_data: FleetFormValues) => {
    alert("Formulario válido")
  }

  return (
    <Section id="forms" title="Formularios">
      <ComponentDemo
        title="Registro de unidad y conductor"
        code={`import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"

const schema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  tipoVehiculo: z.enum(["camion", "trailer"]),
})

const { register, handleSubmit, control, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
})

<form onSubmit={handleSubmit(onSubmit)} noValidate>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
      <Input id="nombre" {...register("nombre")} aria-invalid={!!errors.nombre} />
      <FieldError errors={errors.nombre ? [errors.nombre] : []} />
    </Field>
    <Field>
      <FieldLabel>Tipo de vehículo</FieldLabel>
      <Controller name="tipoVehiculo" control={control} render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Seleccionar tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="camion">Camión</SelectItem>
            <SelectItem value="trailer">Tráiler</SelectItem>
          </SelectContent>
        </Select>
      )} />
    </Field>
    <Button type="submit">Registrar</Button>
  </FieldGroup>
</form>`}
      >
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Registro de conductor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup>
                {/* Nombre */}
                <Field>
                  <FieldLabel htmlFor="nombre">Nombre completo</FieldLabel>
                  <Input
                    id="nombre"
                    placeholder="Carlos Méndez"
                    {...register("nombre")}
                    aria-invalid={!!errors.nombre}
                  />
                  <FieldError errors={errors.nombre ? [errors.nombre] : []} />
                </Field>

                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="carlos@flota.mx"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  <FieldError errors={errors.email ? [errors.email] : []} />
                </Field>

                <Separator />

                {/* Teléfono con InputGroup */}
                <Field>
                  <FieldLabel htmlFor="telefono">Teléfono</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon align="inline-start">
                      <PhoneIcon />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="telefono"
                      type="tel"
                      placeholder="55 1234 5678"
                      {...register("telefono")}
                      aria-invalid={!!errors.telefono}
                    />
                  </InputGroup>
                  <FieldError errors={errors.telefono ? [errors.telefono] : []} />
                </Field>

                {/* Tipo de vehículo */}
                <Field>
                  <FieldLabel>Tipo de vehículo</FieldLabel>
                  <Controller
                    name="tipoVehiculo"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger aria-invalid={!!errors.tipoVehiculo} className="w-full">
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="camion">Camión</SelectItem>
                          <SelectItem value="trailer">Tráiler</SelectItem>
                          <SelectItem value="pipa">Pipa</SelectItem>
                          <SelectItem value="plataforma">Plataforma</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError
                    errors={errors.tipoVehiculo ? [errors.tipoVehiculo] : []}
                  />
                </Field>

                {/* Ruta */}
                <Field>
                  <FieldLabel htmlFor="ruta">Ruta asignada</FieldLabel>
                  <FieldDescription>Ingresa el origen y destino principal.</FieldDescription>
                  <Input
                    id="ruta"
                    placeholder="CDMX → Monterrey"
                    {...register("ruta")}
                    aria-invalid={!!errors.ruta}
                  />
                  <FieldError errors={errors.ruta ? [errors.ruta] : []} />
                </Field>

                {/* Observaciones (free, no schema) */}
                <Field>
                  <FieldLabel htmlFor="observaciones">Observaciones</FieldLabel>
                  <Textarea
                    id="observaciones"
                    placeholder="Notas adicionales sobre la unidad o el conductor..."
                  />
                </Field>

                <Separator />

                {/* Prioridad — Slider */}
                <Field>
                  <FieldLabel>Prioridad de despacho: {prioridad[0]}</FieldLabel>
                  <Slider
                    value={prioridad}
                    onValueChange={(v: number | readonly number[]) => {
                      if (Array.isArray(v)) {
                        setPrioridad(v as number[])
                      } else {
                        setPrioridad([v as number])
                      }
                    }}
                    min={0}
                    max={100}
                  />
                </Field>

                {/* Fecha de salida — Popover + Calendar */}
                <Field>
                  <FieldLabel>Fecha de salida</FieldLabel>
                  <Popover>
                    <PopoverTrigger render={<Button variant="outline" />}>
                      <CalendarIcon />
                      {fechaSalida
                        ? fechaSalida.toLocaleDateString("es-MX")
                        : "Seleccionar fecha"}
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <PopoverHeader className="px-3 pt-3">
                        <PopoverTitle>Fecha de salida</PopoverTitle>
                      </PopoverHeader>
                      <Calendar
                        mode="single"
                        selected={fechaSalida}
                        onSelect={setFechaSalida}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>

                <Separator />

                {/* Tipo de servicio — RadioGroup */}
                <Field>
                  <FieldLabel>Tipo de servicio</FieldLabel>
                  <RadioGroup defaultValue="nacional">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="local" id="srv-local" />
                      <Label htmlFor="srv-local">Local</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="nacional" id="srv-nacional" />
                      <Label htmlFor="srv-nacional">Nacional</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="internacional" id="srv-inter" />
                      <Label htmlFor="srv-inter">Internacional</Label>
                    </div>
                  </RadioGroup>
                </Field>

                {/* Notificaciones — Switch */}
                <Field>
                  <div className="flex items-center gap-3">
                    <Controller
                      name="notificaciones"
                      control={control}
                      render={({ field }) => (
                        <Switch
                          id="notificaciones"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <FieldLabel htmlFor="notificaciones">
                      Recibir notificaciones de ruta
                    </FieldLabel>
                  </div>
                </Field>

                {/* Términos — Checkbox */}
                <Field>
                  <div className="flex items-start gap-2">
                    <Controller
                      name="terminosAceptados"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="terminos"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={!!errors.terminosAceptados}
                        />
                      )}
                    />
                    <div className="space-y-1">
                      <Label htmlFor="terminos">
                        Acepto los términos y condiciones de operación
                      </Label>
                      <FieldError
                        errors={
                          errors.terminosAceptados
                            ? [errors.terminosAceptados]
                            : []
                        }
                      />
                    </div>
                  </div>
                </Field>

                <Button type="submit" className="w-full">
                  Registrar conductor
                </Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </ComponentDemo>
    </Section>
  )
}
