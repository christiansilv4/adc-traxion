"use client"

import * as React from "react"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  XIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useWorkspace } from "@/contexts/workspace-context"

// ─── Constants ───────────────────────────────────────────────────────────────

const HOUR_START = 7
const HOUR_END   = 21
const ROW_H      = 60   // px per hour — matches GCal proportions
const TOTAL_H    = (HOUR_END - HOUR_START) * ROW_H

const DAYS_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const MONTHS_ES  = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
const MONTHS_SHORT = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]

// ─── Types ───────────────────────────────────────────────────────────────────

interface Attendee { id: string; nombre: string; initials: string; cargo?: string }
interface AgendaItem { titulo: string; duracion?: string }
interface Acuerdo { descripcion: string; responsable?: string; fechaLimite?: string; completado: boolean }
type MeetingColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

interface Meeting {
  id:         string
  titulo:     string
  diaSemana:  number     // 0 = lun … 6 = dom
  inicio:     number     // minutos desde medianoche
  fin:        number
  lugar?:     string
  color:      MeetingColor
  asistentes: Attendee[]
  agenda:     AgendaItem[]
  acuerdos:   Acuerdo[]
}

type LayoutedMeeting = Meeting & { col: number; totalCols: number }

// ─── Mock data ────────────────────────────────────────────────────────────────

const MEETINGS: Meeting[] = [
  {
    id: "1", titulo: "Revisión pipeline Q3",
    diaSemana: 0, inicio: 9*60, fin: 10*60, lugar: "Sala Conferencias A", color: 1 as MeetingColor,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega",    initials:"CV", cargo:"Director Comercial" },
      { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
      { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"    },
    ],
    agenda: [
      { titulo:"Revisión de metas Q3",        duracion:"20 min" },
      { titulo:"Análisis del pipeline actual", duracion:"25 min" },
      { titulo:"Acciones correctivas",         duracion:"15 min" },
    ],
    acuerdos: [
      { descripcion:"Actualizar CRM con leads pendientes",      responsable:"Ana Torres",   fechaLimite:"29 jul", completado:false },
      { descripcion:"Enviar reporte de conversión a dirección", responsable:"Carlos Vega",  fechaLimite:"1 ago",  completado:false },
      { descripcion:"Calificar 20 leads nuevos",                responsable:"Luis Mendoza", fechaLimite:"30 jul", completado:true  },
    ],
  },
  {
    id: "2", titulo: "Onboarding distribuidor Monterrey",
    diaSemana: 0, inicio: 14*60, fin: 15*60+30, lugar: "Zoom", color: 3,
    asistentes: [
      { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
      { id:"rd", nombre:"Roberto Díaz",   initials:"RD", cargo:"Distribuidor"       },
      { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial"  },
    ],
    agenda: [
      { titulo:"Presentación del sistema", duracion:"30 min" },
      { titulo:"Demo de plataforma",       duracion:"30 min" },
      { titulo:"Preguntas y respuestas",   duracion:"30 min" },
    ],
    acuerdos: [
      { descripcion:"Enviar credenciales de acceso",              responsable:"Patricia Núñez", fechaLimite:"28 jul", completado:true  },
      { descripcion:"Agendar seguimiento en 2 semanas",           responsable:"Ana Torres",     fechaLimite:"10 ago", completado:false },
    ],
  },
  {
    id: "3", titulo: "Standup ventas",
    diaSemana: 1, inicio: 9*60, fin: 9*60+30, color: 3,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega",    initials:"CV", cargo:"Director Comercial" },
      { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
      { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"    },
      { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial"  },
    ],
    agenda: [
      { titulo:"¿Qué hiciste ayer?", duracion:"10 min" },
      { titulo:"¿Qué harás hoy?",    duracion:"10 min" },
      { titulo:"Bloqueos",           duracion:"10 min" },
    ],
    acuerdos: [
      { descripcion:"Luis hace demo con cliente Puebla esta tarde", responsable:"Luis Mendoza", fechaLimite:"29 jul", completado:false },
    ],
  },
  {
    id: "4", titulo: "Propuesta Kia Fleet",
    diaSemana: 2, inicio: 11*60, fin: 12*60+30, lugar: "Oficina cliente", color: 5,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega",  initials:"CV", cargo:"Director Comercial" },
      { id:"lm", nombre:"Luis Mendoza", initials:"LM", cargo:"Vendedor Senior"    },
    ],
    agenda: [
      { titulo:"Presentación de la empresa",     duracion:"15 min" },
      { titulo:"Propuesta flotilla 50 unidades", duracion:"30 min" },
      { titulo:"Condiciones comerciales",        duracion:"20 min" },
      { titulo:"Siguientes pasos",               duracion:"15 min" },
    ],
    acuerdos: [
      { descripcion:"Enviar cotización formal en 48h",            responsable:"Luis Mendoza", fechaLimite:"31 jul", completado:false },
      { descripcion:"Coordinar visita a planta con área técnica", responsable:"Carlos Vega",  fechaLimite:"3 ago",  completado:false },
    ],
  },
  {
    id: "5", titulo: "Standup ventas",
    diaSemana: 3, inicio: 9*60, fin: 9*60+30, color: 3,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega",    initials:"CV", cargo:"Director Comercial" },
      { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
      { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"    },
      { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial"  },
    ],
    agenda: [
      { titulo:"¿Qué hiciste ayer?", duracion:"10 min" },
      { titulo:"¿Qué harás hoy?",    duracion:"10 min" },
      { titulo:"Bloqueos",           duracion:"10 min" },
    ],
    acuerdos: [],
  },
  {
    id: "6", titulo: "Revisión métricas mensuales",
    diaSemana: 3, inicio: 10*60+30, fin: 11*60+30, lugar: "Sala Conferencias B", color: 6,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega", initials:"CV", cargo:"Director Comercial" },
      { id:"at", nombre:"Ana Torres",  initials:"AT", cargo:"Gerente de Ventas"  },
    ],
    agenda: [
      { titulo:"KPIs del mes",            duracion:"20 min" },
      { titulo:"Comparativa vs objetivo", duracion:"20 min" },
      { titulo:"Plan de acción agosto",   duracion:"20 min" },
    ],
    acuerdos: [
      { descripcion:"Preparar presentación de KPIs para dirección", responsable:"Ana Torres",  fechaLimite:"1 ago", completado:false },
      { descripcion:"Definir objetivo de cierre agosto",            responsable:"Carlos Vega", fechaLimite:"1 ago", completado:false },
    ],
  },
  {
    id: "7", titulo: "Demo Toyota Seminuevos",
    diaSemana: 4, inicio: 15*60, fin: 16*60, lugar: "Teams", color: 7,
    asistentes: [
      { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"   },
      { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial" },
    ],
    agenda: [
      { titulo:"Recorrido del sistema", duracion:"30 min" },
      { titulo:"Módulo de inventario",  duracion:"15 min" },
      { titulo:"Dudas y cierre",        duracion:"15 min" },
    ],
    acuerdos: [
      { descripcion:"Enviar propuesta económica post-demo", responsable:"Luis Mendoza", fechaLimite:"1 ago", completado:false },
    ],
  },
  {
    id: "8", titulo: "Cierre semanal",
    diaSemana: 4, inicio: 17*60, fin: 18*60, lugar: "Sala Conferencias A", color: 8,
    asistentes: [
      { id:"cv", nombre:"Carlos Vega",    initials:"CV", cargo:"Director Comercial" },
      { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
      { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"    },
      { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial"  },
    ],
    agenda: [
      { titulo:"Resumen de la semana",    duracion:"20 min" },
      { titulo:"Logros y pendientes",     duracion:"20 min" },
      { titulo:"Prioridades semana next", duracion:"20 min" },
    ],
    acuerdos: [
      { descripcion:"Cada vendedor envía su forecast el lunes antes de las 9am", responsable:"Equipo ventas", fechaLimite:"lun 9am", completado:false },
    ],
  },
  {
    id: "9", titulo: "Llamada Honda Express",
    diaSemana: 0, inicio: 9*60+30, fin: 10*60, lugar: "Teléfono", color: 5,
    asistentes: [
      { id:"lm", nombre:"Luis Mendoza", initials:"LM", cargo:"Vendedor Senior" },
    ],
    agenda: [{ titulo:"Seguimiento cotización", duracion:"30 min" }],
    acuerdos: [
      { descripcion:"Confirmar disponibilidad de unidades", responsable:"Luis Mendoza", fechaLimite:"28 jul", completado:false },
    ],
  },
]

// ─── Team (for new-event attendee picker) ────────────────────────────────────

const TEAM: Attendee[] = [
  { id:"cv", nombre:"Carlos Vega",    initials:"CV", cargo:"Director Comercial" },
  { id:"at", nombre:"Ana Torres",     initials:"AT", cargo:"Gerente de Ventas"  },
  { id:"lm", nombre:"Luis Mendoza",   initials:"LM", cargo:"Vendedor Senior"    },
  { id:"pn", nombre:"Patricia Núñez", initials:"PN", cargo:"Soporte Comercial"  },
  { id:"rd", nombre:"Roberto Díaz",   initials:"RD", cargo:"Distribuidor"       },
]

interface Creating { dayIdx: number; inicio: number; fin: number }

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
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function mtTop(inicio: number):                 number { return ((inicio - HOUR_START * 60) / 60) * ROW_H }
function mtHeight(inicio: number, fin: number): number { return Math.max(((fin - inicio) / 60) * ROW_H, 22) }

/** Assigns col/totalCols to handle overlapping meetings within a day */
function layoutDay(meetings: Meeting[]): LayoutedMeeting[] {
  const sorted = [...meetings].sort((a, b) => a.inicio - b.inicio || b.fin - a.fin)
  const colEnds: number[] = []

  const placed: LayoutedMeeting[] = sorted.map(m => {
    let col = colEnds.findIndex(end => end <= m.inicio)
    if (col === -1) { col = colEnds.length; colEnds.push(m.fin) }
    else colEnds[col] = m.fin
    return { ...m, col, totalCols: 1 }
  })

  // totalCols = max (col+1) among all events overlapping this one
  return placed.map(ev => ({
    ...ev,
    totalCols: placed
      .filter(o => o.inicio < ev.fin && o.fin > ev.inicio)
      .reduce((max, o) => Math.max(max, o.col + 1), 1),
  }))
}

function calColor(v: string) {
  return {
    bg:     `color-mix(in oklch, var(${v}) 18%, transparent)`,
    border: `color-mix(in oklch, var(${v}) 85%, transparent)`,
    text:   `var(${v})`,
  }
}

const COLOR: Record<MeetingColor, { bg: string; border: string; text: string }> = {
  1: calColor("--cal-blue"),
  2: calColor("--cal-teal"),
  3: calColor("--cal-green"),
  4: calColor("--cal-amber"),
  5: calColor("--cal-orange"),
  6: calColor("--cal-red"),
  7: calColor("--cal-pink"),
  8: calColor("--cal-purple"),
}

// ─── Meeting Block ────────────────────────────────────────────────────────────

function MeetingBlock({ meeting, selected, onSelect, style }: {
  meeting:  LayoutedMeeting
  selected: boolean
  onSelect: (m: Meeting) => void
  style?:   React.CSSProperties
}) {
  const c       = COLOR[meeting.color]
  const compact = mtHeight(meeting.inicio, meeting.fin) < 40

  return (
    <button
      onClick={e => { e.stopPropagation(); onSelect(meeting) }}
      className={cn(
        "absolute overflow-hidden rounded border-l-2 px-1.5 py-0.5 text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 bg-card",
        selected && "ring-2 ring-primary ring-offset-1"
      )}
      style={{ borderLeftColor: c.border, ...style }}
    >
      {/* Color wash on top of solid card bg */}
      <span className="pointer-events-none absolute inset-0" style={{ backgroundColor: c.bg }} />
      <p className="relative truncate text-[11px] font-semibold leading-tight" style={{ color: c.text }}>
        {meeting.titulo}
      </p>
      {!compact && (
        <p className="relative text-[10px] leading-tight text-muted-foreground">
          {fmtTime(meeting.inicio)}–{fmtTime(meeting.fin)}
          {meeting.lugar && ` · ${meeting.lugar}`}
        </p>
      )}
    </button>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ meeting, onClose }: { meeting: Meeting; onClose: () => void }) {
  const c = COLOR[meeting.color]
  return (
    <div className="flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border bg-card" style={{ maxHeight: "calc(100vh - 8rem)" }}>
      {/* Color stripe */}
      <div className="h-1.5 shrink-0" style={{ backgroundColor: c.border }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 p-4">
        <div className="min-w-0">
          <h2 className="font-semibold leading-tight">{meeting.titulo}</h2>
          <div className="mt-1.5 space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ClockIcon className="size-3 shrink-0" />
              {DAYS_SHORT[meeting.diaSemana]} · {fmtTime(meeting.inicio)}–{fmtTime(meeting.fin)}
            </div>
            {meeting.lugar && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPinIcon className="size-3 shrink-0" />
                {meeting.lugar}
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="size-6 shrink-0 text-muted-foreground" onClick={onClose}>
          <XIcon className="size-3.5" />
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4">

          {/* Asistentes */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Asistentes ({meeting.asistentes.length})
            </p>
            <div className="flex flex-col gap-1.5">
              {meeting.asistentes.map(a => (
                <div key={a.id} className="flex items-center gap-2">
                  <Avatar className="size-6 shrink-0">
                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${a.nombre}`} />
                    <AvatarFallback className="text-[9px]">{a.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium leading-none">{a.nombre}</p>
                    {a.cargo && <p className="mt-0.5 text-[10px] text-muted-foreground">{a.cargo}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Agenda */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Agenda</p>
            <ol className="flex flex-col gap-1.5">
              {meeting.agenda.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs leading-snug">{item.titulo}</p>
                    {item.duracion && <p className="text-[10px] text-muted-foreground">{item.duracion}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Acuerdos */}
          {meeting.acuerdos.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Acuerdos · {meeting.acuerdos.filter(a => !a.completado).length} pendientes
                </p>
                <div className="flex flex-col gap-1.5">
                  {meeting.acuerdos.map((a, i) => (
                    <div
                      key={i}
                      className={cn("flex items-start gap-2 rounded-md px-2 py-1.5", a.completado ? "bg-muted/40" : "bg-muted")}
                    >
                      <div className={cn(
                        "mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-sm border",
                        a.completado ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 bg-background"
                      )}>
                        {a.completado && <CheckIcon className="size-2.5" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-xs leading-snug", a.completado && "text-muted-foreground line-through")}>
                          {a.descripcion}
                        </p>
                        <div className="mt-0.5 flex flex-wrap gap-x-1.5 text-[10px] text-muted-foreground">
                          {a.responsable && <span>{a.responsable}</span>}
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
  )
}

// ─── Create Event ─────────────────────────────────────────────────────────────

function CreateEventPopover({ creating, weekDays, onSave, onCancel }: {
  creating:  Creating
  weekDays:  Date[]
  onSave:    (m: Omit<Meeting, "id">) => void
  onCancel:  () => void
}) {
  const [titulo,        setTitulo]        = React.useState("")
  const [lugar,         setLugar]         = React.useState("")
  const [color,         setColor]         = React.useState<MeetingColor>(1)
  const [selAsistentes, setSelAsistentes] = React.useState<string[]>([])
  const [inicio,        setInicio]        = React.useState(creating.inicio)
  const [fin,           setFin]           = React.useState(creating.fin)

  const day = weekDays[creating.dayIdx]

  function adjustTime(field: "inicio" | "fin", delta: number) {
    if (field === "inicio") {
      const next = Math.max(HOUR_START * 60, Math.min(fin - 15, inicio + delta))
      setInicio(next)
    } else {
      const next = Math.min(HOUR_END * 60, Math.max(inicio + 15, fin + delta))
      setFin(next)
    }
  }

  function handleSave() {
    if (!titulo.trim()) return
    onSave({
      titulo:     titulo.trim(),
      diaSemana:  creating.dayIdx,
      inicio,
      fin,
      lugar:      lugar || undefined,
      color,
      asistentes: TEAM.filter(a => selAsistentes.includes(a.id)),
      agenda:     [],
      acuerdos:   [],
    })
  }

  function toggleAttendee(id: string) {
    setSelAsistentes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const c = COLOR[color]

  return (
    <Popover
      open
      onOpenChange={(open) => { if (!open) onCancel() }}
    >
      <PopoverTrigger
        nativeButton={false}
        render={
          <div
            className="absolute z-10"
            style={{ top: mtTop(creating.inicio), left: "2px", width: 0, height: 0 }}
          />
        }
      />

      {/* Ghost event block */}
      <div
        className="pointer-events-none absolute left-1 right-1 z-10 rounded border-l-2 border-dashed"
        style={{
          top:             mtTop(inicio),
          height:          mtHeight(inicio, fin),
          backgroundColor: c.bg,
          borderLeftColor: c.border,
        }}
      >
        <p className="truncate px-1.5 py-0.5 text-[11px] font-semibold" style={{ color: c.text }}>
          {titulo || "Nueva reunión"}
        </p>
        <p className="px-1.5 text-[10px] text-muted-foreground">
          {fmtTime(inicio)}–{fmtTime(fin)}
        </p>
      </div>

      <PopoverContent side="right" align="start" sideOffset={12} className="w-80 p-0">
        {/* Color stripe */}
        <div className="h-1.5 rounded-t-[inherit]" style={{ backgroundColor: c.border }} />

        <div className="flex flex-col gap-3 p-4">
          {/* Title */}
          <Input
            autoFocus
            placeholder="Título de la reunión"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSave()}
          />

          {/* Date + time */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ClockIcon className="size-3 shrink-0" />
            <span className="shrink-0">
              {DAYS_SHORT[creating.dayIdx]}, {day?.getDate()} {MONTHS_SHORT[day?.getMonth()]}
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => adjustTime("inicio", -15)}
                className="rounded px-1 hover:bg-muted tabular-nums"
              >
                {fmtTime(inicio)}
              </button>
              <span>–</span>
              <button
                onClick={() => adjustTime("fin", 15)}
                className="rounded px-1 hover:bg-muted tabular-nums"
              >
                {fmtTime(fin)}
              </button>
            </div>
          </div>

          {/* Location */}
          <Input
            placeholder="Ubicación o enlace"
            value={lugar}
            onChange={e => setLugar(e.target.value)}
          />

          <Separator />

          {/* Attendees */}
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Asistentes
            </p>
            <div className="flex flex-col gap-0.5">
              {TEAM.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleAttendee(a.id)}
                  className="flex items-center gap-2 rounded-md px-1.5 py-1 text-left text-xs hover:bg-muted"
                >
                  <Checkbox checked={selAsistentes.includes(a.id)} className="pointer-events-none size-3.5" />
                  <Avatar className="size-5 shrink-0">
                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${a.nombre}`} />
                    <AvatarFallback className="text-[8px]">{a.initials}</AvatarFallback>
                  </Avatar>
                  <span>{a.nombre}</span>
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Color */}
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Color</p>
            <div className="flex gap-1.5">
              {([1,2,3,4,5,6,7,8] as MeetingColor[]).map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "size-5 rounded-full transition-transform hover:scale-110",
                    color === c && "ring-2 ring-offset-1 ring-foreground/40"
                  )}
                  style={{ backgroundColor: COLOR[c].border }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button>
            <Button size="sm" onClick={handleSave} disabled={!titulo.trim()}>Guardar</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CalendarioPage() {
  const workspace  = useWorkspace()
  const scrollRef  = React.useRef<HTMLDivElement>(null)
  const [view,      setView]      = React.useState<"week" | "day">("week")
  const [weekStart, setWeekStart] = React.useState(() => getMonday(new Date()))
  const [meetings,  setMeetings]  = React.useState<Meeting[]>(MEETINGS)
  const [creating,  setCreating]  = React.useState<Creating | null>(null)
  const [selected,  setSelected]  = React.useState<Meeting | null>(null)
  const [activeDay, setActiveDay] = React.useState<number>(() => {
    const d = new Date().getDay()
    return d === 0 ? 6 : d - 1  // 0=Mon
  })

  const today    = React.useMemo(() => { const d = new Date(); d.setHours(0,0,0,0); return d }, [])
  const weekDays = React.useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart])

  const now     = new Date()
  const nowMin  = now.getHours() * 60 + now.getMinutes()
  const showNow = nowMin >= HOUR_START * 60 && nowMin <= HOUR_END * 60

  // Scroll to current time on mount
  React.useEffect(() => {
    if (scrollRef.current) {
      const target = Math.max(0, mtTop(nowMin) - 120)
      scrollRef.current.scrollTop = target
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const hours     = Array.from({ length: HOUR_END - HOUR_START }, (_, i) => HOUR_START + i)
  const halfHours = Array.from({ length: (HOUR_END - HOUR_START) * 2 }, (_, i) => HOUR_START * 60 + i * 30)

  const visibleDays = view === "week" ? 7 : 1
  const dayIndices  = view === "week" ? Array.from({ length: 7 }, (_, i) => i) : [activeDay]

  const weekLabel = React.useMemo(() => {
    if (view === "day") {
      const d = weekDays[activeDay]
      return `${DAYS_SHORT[activeDay]}, ${d.getDate()} de ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`
    }
    const from = weekDays[0], to = weekDays[6]
    return from.getMonth() === to.getMonth()
      ? `${from.getDate()}–${to.getDate()} ${MONTHS_SHORT[from.getMonth()]} ${from.getFullYear()}`
      : `${from.getDate()} ${MONTHS_SHORT[from.getMonth()]} – ${to.getDate()} ${MONTHS_SHORT[to.getMonth()]} ${from.getFullYear()}`
  }, [weekDays, view, activeDay])

  function prevPeriod() {
    if (view === "week") setWeekStart(d => addDays(d, -7))
    else {
      if (activeDay === 0) { setWeekStart(d => addDays(d, -7)); setActiveDay(6) }
      else setActiveDay(d => d - 1)
    }
  }

  function nextPeriod() {
    if (view === "week") setWeekStart(d => addDays(d, 7))
    else {
      if (activeDay === 6) { setWeekStart(d => addDays(d, 7)); setActiveDay(0) }
      else setActiveDay(d => d + 1)
    }
  }

  function goToday() {
    setWeekStart(getMonday(new Date()))
    setActiveDay(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1)
  }

  return (
    <>
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Calendario</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{weekLabel} · {workspace.name}</p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex rounded-md border text-sm">
            {(["week", "day"] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 text-sm transition-colors first:rounded-l-md last:rounded-r-md",
                  v !== "week" && "border-l",
                  view === v
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {v === "week" ? "Semana" : "Día"}
              </button>
            ))}
          </div>

          {/* Nav */}
          <Button variant="outline" size="sm" onClick={goToday}>Hoy</Button>
          <div className="flex rounded-md border">
            <Button variant="ghost" size="icon" className="size-8 rounded-r-none border-r" onClick={prevPeriod}>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 rounded-l-none" onClick={nextPeriod}>
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar + Detail panel */}
      <div className="flex items-start gap-4">

      {/* Calendar */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border bg-card">

        {/* Sticky day headers */}
        <div className="flex shrink-0 border-b bg-card">
          <div className="w-14 shrink-0" />
          {dayIndices.map(i => {
            const day     = weekDays[i]
            const isToday = isSameDay(day, today)
            return (
              <button
                key={i}
                className={cn(
                  "flex flex-1 flex-col items-center border-l py-2 transition-colors hover:bg-muted/50",
                  view === "week" && "cursor-pointer"
                )}
                onClick={() => { if (view === "week") { setActiveDay(i); setView("day") } }}
              >
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {DAYS_SHORT[i]}
                </span>
                <span className={cn(
                  "mt-1 flex size-8 items-center justify-center rounded-full text-sm font-medium",
                  isToday
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground"
                )}>
                  {day.getDate()}
                </span>
              </button>
            )
          })}
        </div>

        {/* Scrollable time grid */}
        <div ref={scrollRef} className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 14rem)" }}>
          <div className="flex" style={{ height: TOTAL_H }}>

            {/* Time axis */}
            <div className="relative w-14 shrink-0" style={{ height: TOTAL_H }}>
              {hours.map(h => (
                <div
                  key={h}
                  className="absolute w-full"
                  style={{ top: (h - HOUR_START) * ROW_H - 8 }}
                >
                  <span className="block pr-2 text-right text-[10px] tabular-nums text-muted-foreground">
                    {h}:00
                  </span>
                </div>
              ))}
            </div>

            {/* Day columns */}
            {dayIndices.map(dayIdx => {
              const day         = weekDays[dayIdx]
              const isToday     = isSameDay(day, today)
              const dayMeetings = layoutDay(meetings.filter(m => m.diaSemana === dayIdx))

              function handleColumnClick(e: React.MouseEvent<HTMLDivElement>) {
                if ((e.target as HTMLElement).closest("button, [data-slot='popover-trigger']")) return
                const rect = e.currentTarget.getBoundingClientRect()
                const y    = e.clientY - rect.top
                const raw  = HOUR_START * 60 + (y / ROW_H) * 60
                const snap = Math.round(raw / 15) * 15
                const ini  = Math.max(HOUR_START * 60, Math.min(snap, (HOUR_END - 1) * 60))
                setCreating({ dayIdx, inicio: ini, fin: Math.min(ini + 60, HOUR_END * 60) })
              }

              return (
                <div
                  key={dayIdx}
                  className={cn(
                    "relative flex-1 cursor-default border-l",
                    isToday && "bg-primary/[0.025]"
                  )}
                  style={{ height: TOTAL_H }}
                  onClick={handleColumnClick}
                >
                  {/* Hour + half-hour lines */}
                  {halfHours.map(min => {
                    const isHour = min % 60 === 0
                    return (
                      <div
                        key={min}
                        className={cn(
                          "pointer-events-none absolute left-0 right-0",
                          isHour ? "border-t border-border/60" : "border-t border-border/25"
                        )}
                        style={{ top: mtTop(min) }}
                      />
                    )
                  })}

                  {/* Create event ghost + popover */}
                  {creating?.dayIdx === dayIdx && (
                    <CreateEventPopover
                      creating={creating}
                      weekDays={weekDays}
                      onSave={(m) => {
                        setMeetings(prev => [...prev, { ...m, id: String(Date.now()) }])
                        setCreating(null)
                      }}
                      onCancel={() => setCreating(null)}
                    />
                  )}

                  {/* Now indicator */}
                  {isToday && showNow && (
                    <div
                      className="pointer-events-none absolute left-0 right-0 z-20 flex items-center"
                      style={{ top: mtTop(nowMin) }}
                    >
                      <div className="size-2.5 shrink-0 rounded-full bg-destructive -ml-1.5" />
                      <div className="h-px flex-1 bg-destructive" />
                    </div>
                  )}

                  {/* Meetings */}
                  {dayMeetings.map(m => {
                    const slotW = 100 / m.totalCols
                    return (
                      <MeetingBlock
                        key={m.id}
                        meeting={m}
                        selected={selected?.id === m.id}
                        onSelect={m => { setSelected(prev => prev?.id === m.id ? null : m); setCreating(null) }}
                        style={{
                          top:    mtTop(m.inicio),
                          height: mtHeight(m.inicio, m.fin),
                          left:   `${m.col * slotW + 1}%`,
                          right:  `${100 - (m.col + 1) * slotW + 1}%`,
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <DetailPanel meeting={selected} onClose={() => setSelected(null)} />
      )}

      </div>
    </>
  )
}
