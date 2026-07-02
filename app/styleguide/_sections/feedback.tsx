// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/feedback.tsx

"use client"

import { toast, Toaster } from "sonner"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function FeedbackSection() {
  return (
    <Section id="feedback" title="Feedback">
      <Toaster richColors position="top-right" />

      {/* Toast buttons */}
      <ComponentDemo
        title="Toast — variantes"
        code={`import { toast, Toaster } from "sonner"

// Place <Toaster /> once in your layout or page

<Toaster richColors position="top-right" />

// Trigger variants:
toast("Ruta actualizada correctamente")
toast.success("Unidad TR-4821 asignada con éxito")
toast.error("Error al conectar con el servidor GPS")
toast.warning("La unidad TR-3310 lleva 30 min detenida")`}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => toast("Ruta actualizada correctamente")}
          >
            Toast default
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.success("Unidad TR-4821 asignada con éxito")
            }
          >
            <CheckCircleIcon />
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.error("Error al conectar con el servidor GPS")
            }
          >
            <XCircleIcon />
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast.warning("La unidad TR-3310 lleva 30 min detenida")
            }
          >
            <AlertTriangleIcon />
            Warning
          </Button>
        </div>
      </ComponentDemo>

      <Separator />

      {/* Alert */}
      <ComponentDemo
        title="Alert — variantes"
        code={`import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, AlertTriangleIcon } from "lucide-react"

// variant: "default" | "destructive"

<Alert variant="default">
  <InfoIcon />
  <AlertTitle>Actualización del sistema</AlertTitle>
  <AlertDescription>La sincronización GPS se realiza cada 5 minutos.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTriangleIcon />
  <AlertTitle>Unidad fuera de ruta</AlertTitle>
  <AlertDescription>La unidad TR-3310 se ha desviado de la ruta programada.</AlertDescription>
</Alert>`}
      >
        <div className="space-y-3 max-w-lg">
          <Alert variant="default">
            <InfoIcon />
            <AlertTitle>Actualización del sistema</AlertTitle>
            <AlertDescription>
              La sincronización de datos GPS se realiza cada 5 minutos. Los datos
              pueden tener un retraso mínimo.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTriangleIcon />
            <AlertTitle>Unidad fuera de ruta</AlertTitle>
            <AlertDescription>
              La unidad TR-3310 se ha desviado de la ruta programada. Verifica
              con el conductor de inmediato.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentDemo>

      <Separator />

      {/* AlertDialog */}
      <ComponentDemo
        title="AlertDialog"
        code={`import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

<AlertDialog>
  <AlertDialogTrigger render={<Button variant="destructive" />}>
    Eliminar unidad
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>¿Dar de baja esta unidad?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta acción eliminará permanentemente la unidad TR-4821. No podrás deshacer esta operación.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction>Confirmar baja</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`}
      >
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            Eliminar unidad
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Dar de baja esta unidad?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción eliminará permanentemente la unidad TR-4821 del
                sistema. No podrás deshacer esta operación.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction>Confirmar baja</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </ComponentDemo>

      <Separator />

      {/* Progress */}
      <ComponentDemo
        title="Progress — valores"
        code={`import { Progress } from "@/components/ui/progress"

// value: 0–100

<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`}
      >
        <div className="max-w-sm space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Carga completada</span>
              <span>25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>En tránsito</span>
              <span>50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Casi en destino</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Entregado</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </ComponentDemo>

    </Section>
  )
}
