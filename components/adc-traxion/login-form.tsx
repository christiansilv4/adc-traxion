"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail]     = React.useState("")
  const [error, setError]     = React.useState("")
  const [sent, setSent]       = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  function validateEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Ingresa un correo electrónico válido.")
      return
    }
    setError("")
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 md:min-h-[520px]">

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate className="flex flex-col justify-center p-10 md:p-14">
            <FieldGroup className="gap-6">
              <div className="flex flex-col items-center gap-4 text-center">
                <img
                  src="/logo-adc.png"
                  alt="ADC Traxión"
                  width={240}
                  height={240}
                  className="size-[96px] object-contain"
                />
                <h1 className="text-2xl font-bold">Motor de Tracción</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Inicia sesión con tu correo autorizado
                </p>
              </div>

              {sent ? (
                <Alert>
                  <AlertDescription>
                    Revisa tu correo — te enviamos un enlace mágico para entrar.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <Field data-invalid={error ? true : undefined}>
                    <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@empresa.com"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError("")
                      }}
                      aria-invalid={!!error}
                    />
                    {error && (
                      <FieldDescription className="text-destructive">
                        {error}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Enviando…" : "Enviar enlace mágico"}
                    </Button>
                  </Field>
                </>
              )}
            </FieldGroup>
          </form>

          {/* Panel derecho — imagen */}
          <div className="relative hidden md:block">
            <img
              src="https://adcgrupo.com/wp-content/uploads/2024/11/IMAGEN-SITIO-WEB-JETOUR.jpg"
              alt="ADC Traxión"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        © Grupo ADC · Núcleo ADC
      </FieldDescription>
    </div>
  )
}
