"use client"

import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  XIcon,
  CheckIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/contexts/workspace-context"

// ─── Constants ───────────────────────────────────────────────────────────────

const HOUR_START = 7
const HOUR_END   = 20
const ROW_H      = 64
const TOTAL_H    = (HOUR_END - HOUR_START) * ROW_H

const DAYS_ES   = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const MONTHS_ES = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]

// ─── Types ───────────────────────────────────────────────────────────────────

interface Attendee {
  id:       string
  nombre:   string
  initials: string
  cargo?:   string
}

interface AgendaItem {
  titulo:   string
  duracion?: string
}

interface Acuerdo {
  descripcion:  string
  responsable?: string
  fechaLimite?: string
  completado:   boolean
}

type MeetingColor = 1 | 2 | 3 | 4 | 5

interface Meeting {
  id:         string
  titulo:     string
  diaSemana:  number   // 0 = lun, 6 = dom
  inicio:     number   // minutos desde medianoche
  fin:        number
  lugar?:     string
  color:      MeetingColor
  asistentes: Attendee[]
  agenda:     AgendaItem[]
  acuerdos:   Acuerdo[]
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MEETINGS: Meeting[] = [
  {
    id: "1",
    titulo: "Revisión pipeline Q3",
    diaSemana: 0,
    inicio: 9 * 60,
    fin:   10 * 60,
    lugar: "Sala Conferencias A",
    color: 1,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega",    initials: "CV", cargo: "Director Comercial" },
      { id: "at", nombre: "Ana Torres",     initials: "AT", cargo: "Gerente de Ventas"  },
      { id: "lm", nombre: "Luis Mendoza",   initials: "LM", cargo: "Vendedor Senior"    },
    ],
    agenda: [
      { titulo: "Revisión de metas Q3",         duracion: "20 min" },
      { titulo: "Análisis del pipeline actual",  duracion: "25 min" },
      { titulo: "Acciones correctivas",          duracion: "15 min" },
    ],
    acuerdos: [
      { descripcion: "Actualizar CRM con leads pendientes",       responsable: "Ana Torres",   fechaLimite: "29 jul", completado: false },
      { descripcion: "Enviar reporte de conversión a dirección",  responsable: "Carlos Vega",  fechaLimite: "1 ago",  completado: false },
      { descripcion: "Calificar 20 leads nuevos",                 responsable: "Luis Mendoza", fechaLimite: "30 jul", completado: true  },
    ],
  },
  {
    id: "2",
    titulo: "Onboarding distribuidor Monterrey",
    diaSemana: 0,
    inicio: 14 * 60,
    fin:   15 * 60 + 30,
    lugar: "Zoom",
    color: 2,
    asistentes: [
      { id: "at", nombre: "Ana Torres",     initials: "AT", cargo: "Gerente de Ventas"  },
      { id: "rd", nombre: "Roberto Díaz",   initials: "RD", cargo: "Distribuidor"       },
      { id: "pn", nombre: "Patricia Núñez", initials: "PN", cargo: "Soporte Comercial"  },
    ],
    agenda: [
      { titulo: "Presentación del sistema",  duracion: "30 min" },
      { titulo: "Demo de plataforma",        duracion: "30 min" },
      { titulo: "Preguntas y respuestas",    duracion: "30 min" },
    ],
    acuerdos: [
      { descripcion: "Enviar credenciales de acceso",               responsable: "Patricia Núñez", fechaLimite: "28 jul", completado: true  },
      { descripcion: "Agendar sesión de seguimiento en 2 semanas",  responsable: "Ana Torres",     fechaLimite: "10 ago", completado: false },
    ],
  },
  {
    id: "3",
    titulo: "Standup ventas",
    diaSemana: 1,
    inicio: 9 * 60,
    fin:   9 * 60 + 30,
    color: 3,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega",    initials: "CV", cargo: "Director Comercial" },
      { id: "at", nombre: "Ana Torres",     initials: "AT", cargo: "Gerente de Ventas"  },
      { id: "lm", nombre: "Luis Mendoza",   initials: "LM", cargo: "Vendedor Senior"    },
      { id: "pn", nombre: "Patricia Núñez", initials: "PN", cargo: "Soporte Comercial"  },
    ],
    agenda: [
      { titulo: "¿Qué hiciste ayer?",  duracion: "10 min" },
      { titulo: "¿Qué harás hoy?",     duracion: "10 min" },
      { titulo: "Bloqueos",            duracion: "10 min" },
    ],
    acuerdos: [
      { descripcion: "Luis hace demo con cliente Puebla esta tarde", responsable: "Luis Mendoza", fechaLimite: "29 jul", completado: false },
    ],
  },
  {
    id: "4",
    titulo: "Propuesta Kia Fleet",
    diaSemana: 2,
    inicio: 11 * 60,
    fin:   12 * 60 + 30,
    lugar: "Oficina cliente",
    color: 4,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega",  initials: "CV", cargo: "Director Comercial" },
      { id: "lm", nombre: "Luis Mendoza", initials: "LM", cargo: "Vendedor Senior"    },
    ],
    agenda: [
      { titulo: "Presentación de la empresa",       duracion: "15 min" },
      { titulo: "Propuesta flotilla 50 unidades",   duracion: "30 min" },
      { titulo: "Condiciones comerciales",          duracion: "20 min" },
      { titulo: "Siguientes pasos",                 duracion: "15 min" },
    ],
    acuerdos: [
      { descripcion: "Enviar cotización formal en 48h",              responsable: "Luis Mendoza", fechaLimite: "31 jul", completado: false },
      { descripcion: "Coordinar visita a planta con área técnica",   responsable: "Carlos Vega",  fechaLimite: "3 ago",  completado: false },
    ],
  },
  {
    id: "5",
    titulo: "Standup ventas",
    diaSemana: 3,
    inicio: 9 * 60,
    fin:   9 * 60 + 30,
    color: 3,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega",    initials: "CV", cargo: "Director Comercial" },
      { id: "at", nombre: "Ana Torres",     initials: "AT", cargo: "Gerente de Ventas"  },
      { id: "lm", nombre: "Luis Mendoza",   initials: "LM", cargo: "Vendedor Senior"    },
      { id: "pn", nombre: "Patricia Núñez", initials: "PN", cargo: "Soporte Comercial"  },
    ],
    agenda: [
      { titulo: "¿Qué hiciste ayer?",  duracion: "10 min" },
      { titulo: "¿Qué harás hoy?",     duracion: "10 min" },
      { titulo: "Bloqueos",            duracion: "10 min" },
    ],
    acuerdos: [],
  },
  {
    id: "6",
    titulo: "Revisión métricas mensuales",
    diaSemana: 3,
    inicio: 10 * 60 + 30,
    fin:   11 * 60 + 30,
    lugar: "Sala Conferencias B",
    color: 1,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega", initials: "CV", cargo: "Director Comercial" },
      { id: "at", nombre: "Ana Torres",  initials: "AT", cargo: "Gerente de Ventas"  },
    ],
    agenda: [
      { titulo: "KPIs del mes",            duracion: "20 min" },
      { titulo: "Comparativa vs objetivo", duracion: "20 min" },
      { titulo: "Plan de acción agosto",   duracion: "20 min" },
    ],
    acuerdos: [
      { descripcion: "Preparar presentación de KPIs para dirección", responsable: "Ana Torres",  fechaLimite: "1 ago", completado: false },
      { descripcion: "Definir objetivo de cierre agosto",            responsable: "Carlos Vega", fechaLimite: "1 ago", completado: false },
    ],
  },
  {
    id: "7",
    titulo: "Demo Toyota Seminuevos",
    diaSemana: 4,
    inicio: 15 * 60,
    fin:   16 * 60,
    lugar: "Teams",
    color: 5,
    asistentes: [
      { id: "lm", nombre: "Luis Mendoza",   initials: "LM", cargo: "Vendedor Senior"   },
      { id: "pn", nombre: "Patricia Núñez", initials: "PN", cargo: "Soporte Comercial" },
    ],
    agenda: [
      { titulo: "Recorrido del sistema",  duracion: "30 min" },
      { titulo: "Módulo de inventario",   duracion: "15 min" },
      { titulo: "Dudas y cierre",         duracion: "15 min" },
    ],
    acuerdos: [
      { descripcion: "Enviar propuesta económica post-demo", responsable: "Luis Mendoza", fechaLimite: "1 ago", completado: false },
    ],
  },
  {
    id: "8",
    titulo: "Cierre semanal",
    diaSemana: 4,
    inicio: 17 * 60,
    fin:   18 * 60,
    lugar: "Sala Conferencias A",
    color: 2,
    asistentes: [
      { id: "cv", nombre: "Carlos Vega",    initials: "CV", cargo: "Director Comercial" },
      { id: "at", nombre: "Ana Torres",     initials: "AT", cargo: "Gerente de Ventas"  },
      { id: "lm", nombre: "Luis Mendoza",   initials: "LM", cargo: "Vendedor Senior"    },
      { id: "pn", nombre: "Patricia Núñez", initials: "PN", cargo: "Soporte Comercial"  },
    ],
    agenda: [
      { titulo: "Resumen de la semana",    duracion: "20 min" },
      { titulo: "Logros y pendientes",     duracion: "20 min" },
      { titulo: "Prioridades semana next", duracion: "20 min" },
    ],
    acuerdos: [
      { descripcion: "Cada vendedor envía su forecast del lunes antes de las 9am", responsable: "Equipo ventas", fechaLimite: "lun 10am", completado: false },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMonday(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = d.getDay()
  d.setDate(d.getDate() + (day === 0 ? -6 : 1 - day))
  return d
}

function addDays(date: Date, n: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}

function fmtTime(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}:${m.toString().padStart(2, "0")}`
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear()
      && a.getMonth()    === b.getMonth()
      && a.getDate()     === b.getDate()
}

function mtTop(inicio: number):             number { return ((inicio - HOUR_START * 60) / 60) * ROW_H }
function mtHeight(inicio: number, fin: number): number { return Math.max(((fin - inicio) / 60) * ROW_H, 28) }

const C: Record<MeetingColor, { bg: string; border: string; text: string }> = {
  1: { bg: "hsl(var(--chart-1)/0.12)", border: "hsl(var(--chart-1)/0.55)", text: "hsl(var(--chart-1))" },
  2: { bg: "hsl(var(--chart-2)/0.12)", border: "hsl(var(--chart-2)/0.55)", text: "hsl(var(--chart-2))" },
  3: { bg: "hsl(var(--chart-3)/0.12)", border: "hsl(var(--chart-3)/0.55)", text: "hsl(var(--chart-3))" },
  4: { bg: "hsl(var(--chart-4)/0.12)", border: "hsl(var(--chart-4)/0.55)", text: "hsl(var(--chart-4))" },
  5: { bg: "hsl(var(--chart-5)/0.12)", border: "hsl(var(--chart-5)/0.55)", text: "hsl(var(--chart-5))" },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarioPage() {
  const workspace = useWorkspace()
  const [weekStart, setWeekStart] = React.useState(() => getMonday(new Date()))
  const [selected,  setSelected]  = React.useState<Meeting | null>(null)

  const today    = React.useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const weekDays = React.useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])
  const hours    = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)

  const weekLabel = React.useMemo(() => {
    const from = weekDays[0], to = weekDays[6]
    return from.getMonth() === to.getMonth()
      ? `${from.getDate()}–${to.getDate()} ${MONTHS_ES[from.getMonth()]} ${from.getFullYear()}`
      : `${from.getDate()} ${MONTHS_ES[from.getMonth()]} – ${to.getDate()} ${MONTHS_ES[to.getMonth()]} ${from.getFullYear()}`
  }, [weekDays])

  const now        = new Date()
  const nowMin     = now.getHours() * 60 + now.getMinutes()
  const showNowLine = nowMin >= HOUR_START * 60 && nowMin <= HOUR_END * 60

  function toggleSelected(m: Meeting) {
    setSelected(prev => prev?.id === m.id ? null : m)
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendario</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {weekLabel} · {workspace.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setWeekStart(getMonday(new Date()))}>
            Hoy
          </Button>
          <div className="flex items-center rounded-md border">
            <Button
              variant="ghost" size="icon" className="size-8 rounded-r-none border-r"
              onClick={() => setWeekStart(d => addDays(d, -7))}
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="ghost" size="icon" className="size-8 rounded-l-none"
              onClick={() => setWeekStart(d => addDays(d, 7))}
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid + Detail panel */}
      <div className="flex min-h-0 flex-1 gap-4">

        {/* Calendar grid */}
        <div className="min-w-0 flex-1 overflow-hidden rounded-lg border bg-card">

          {/* Day headers */}
          <div className="flex border-b">
            <div className="w-12 shrink-0" />
            {weekDays.map((day, i) => {
              const isToday = isSameDay(day, today)
              return (
                <div key={i} className="flex-1 border-l px-1 py-2 text-center">
                  <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {DAYS_ES[i]}
                  </div>
                  <div className={cn(
                    "mx-auto mt-1 flex size-7 items-center justify-center rounded-full text-sm font-medium",
                    isToday ? "bg-primary text-primary-foreground" : "text-foreground"
                  )}>
                    {day.getDate()}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Scrollable time grid */}
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <div className="flex" style={{ height: TOTAL_H }}>

              {/* Time axis */}
              <div className="relative w-12 shrink-0">
                {hours.map(h => (
                  <div key={h} className="absolute w-full" style={{ top: (h - HOUR_START) * ROW_H - 8 }}>
                    <span className="block pr-2 text-right text-[10px] tabular-nums text-muted-foreground">
                      {h}:00
                    </span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIdx) => {
                const dayMeetings = MEETINGS.filter(m => m.diaSemana === dayIdx)
                const isToday     = isSameDay(day, today)
                return (
                  <div
                    key={dayIdx}
                    className={cn("relative flex-1 border-l", isToday && "bg-primary/[0.02]")}
                    style={{ height: TOTAL_H }}
                  >
                    {/* Hour lines */}
                    {hours.map(h => (
                      <div
                        key={h}
                        className="absolute left-0 right-0 border-t border-border/40"
                        style={{ top: (h - HOUR_START) * ROW_H }}
                      />
                    ))}

                    {/* Now indicator */}
                    {isToday && showNowLine && (
                      <div
                        className="absolute left-0 right-0 z-10 flex items-center"
                        style={{ top: mtTop(nowMin) }}
                      >
                        <div className="size-2 shrink-0 rounded-full bg-destructive -ml-1" />
                        <div className="h-px flex-1 bg-destructive" />
                      </div>
                    )}

                    {/* Meetings */}
                    {dayMeetings.map(meeting => {
                      const c          = C[meeting.color]
                      const isSelected = selected?.id === meeting.id
                      return (
                        <button
                          key={meeting.id}
                          onClick={() => toggleSelected(meeting)}
                          className={cn(
                            "absolute left-1 right-1 overflow-hidden rounded border-l-2 px-1.5 py-1 text-left transition-all hover:brightness-95",
                            isSelected && "ring-2 ring-primary ring-offset-1"
                          )}
                          style={{
                            top:             mtTop(meeting.inicio),
                            height:          mtHeight(meeting.inicio, meeting.fin),
                            backgroundColor: c.bg,
                            borderLeftColor: c.border,
                          }}
                        >
                          <p
                            className="truncate text-[11px] font-semibold leading-tight"
                            style={{ color: c.text }}
                          >
                            {meeting.titulo}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {fmtTime(meeting.inicio)}–{fmtTime(meeting.fin)}
                          </p>
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border bg-card">

            {/* Panel header */}
            <div className="flex items-start justify-between gap-2 p-4">
              <div className="min-w-0">
                <h2 className="font-semibold leading-tight">{selected.titulo}</h2>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <ClockIcon className="size-3 shrink-0" />
                  {DAYS_ES[selected.diaSemana]} · {fmtTime(selected.inicio)}–{fmtTime(selected.fin)}
                </div>
                {selected.lugar && (
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPinIcon className="size-3 shrink-0" />
                    {selected.lugar}
                  </div>
                )}
              </div>
              <Button
                variant="ghost" size="icon" className="size-6 shrink-0 text-muted-foreground"
                onClick={() => setSelected(null)}
              >
                <XIcon className="size-3.5" />
              </Button>
            </div>

            <Separator />

            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-4 p-4">

                {/* Asistentes */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Asistentes ({selected.asistentes.length})
                  </p>
                  <div className="flex flex-col gap-2">
                    {selected.asistentes.map(a => (
                      <div key={a.id} className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${a.nombre}`} />
                          <AvatarFallback className="text-[9px]">{a.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-medium leading-none">{a.nombre}</p>
                          {a.cargo && (
                            <p className="mt-0.5 text-[10px] text-muted-foreground">{a.cargo}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Agenda */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Agenda
                  </p>
                  <ol className="flex flex-col gap-2">
                    {selected.agenda.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-xs leading-snug">{item.titulo}</p>
                          {item.duracion && (
                            <p className="text-[10px] text-muted-foreground">{item.duracion}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Acuerdos */}
                {selected.acuerdos.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Acuerdos ({selected.acuerdos.filter(a => !a.completado).length} pendientes)
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {selected.acuerdos.map((a, i) => (
                          <div
                            key={i}
                            className={cn(
                              "flex items-start gap-2 rounded-md px-2 py-2",
                              a.completado ? "bg-muted/40" : "bg-muted"
                            )}
                          >
                            <div className={cn(
                              "mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-sm border",
                              a.completado
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/40 bg-background"
                            )}>
                              {a.completado && <CheckIcon className="size-2.5" />}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className={cn(
                                "text-xs leading-snug",
                                a.completado && "text-muted-foreground line-through"
                              )}>
                                {a.descripcion}
                              </p>
                              <div className="mt-0.5 flex flex-wrap gap-x-1.5 text-[10px] text-muted-foreground">
                                {a.responsable  && <span>{a.responsable}</span>}
                                {a.fechaLimite  && <span>· {a.fechaLimite}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </>
  )
}
