"use client"

import * as React from "react"
import {
  AlignJustifyIcon,
  ChevronDownIcon,
  LayoutListIcon,
  ListIcon,
  XIcon,
} from "lucide-react"

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"


import { useWorkspace } from "@/contexts/workspace-context"
import {
  workspaceActivityData,
  estadoConfig,
  estadosOrden,
  type Activity,
  type ActivityEstado,
} from "@/lib/workspaces"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })
}

function groupByDate(items: Activity[]) {
  const now  = new Date()
  const hoy  = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const ayer = new Date(hoy.getTime() - 86_400_000)

  const map = new Map<string, Activity[]>()
  for (const item of items) {
    const day = new Date(item.timestamp.getFullYear(), item.timestamp.getMonth(), item.timestamp.getDate())
    let key: string
    if (day.getTime() === hoy.getTime())       key = "Hoy"
    else if (day.getTime() === ayer.getTime()) key = "Ayer"
    else key = item.timestamp.toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return Array.from(map, ([label, items]) => ({ label, items }))
}

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set)
  next.has(value) ? next.delete(value) : next.add(value)
  return next
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterDropdown<T extends string>({
  label,
  options,
  selected,
  onToggle,
  onClear,
  renderLabel,
}: {
  label: string
  options: T[]
  selected: Set<T>
  onToggle: (v: T) => void
  onClear: () => void
  renderLabel: (v: T) => React.ReactNode
}) {
  const count = selected.size
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-8 gap-1.5 text-sm font-normal")}>
        {label}
        {count > 0 && (
          <Badge className="rounded-full px-1.5 text-[10px]">{count}</Badge>
        )}
        <ChevronDownIcon className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{label}</div>
        <DropdownMenuSeparator />
        {options.map(v => (
          <DropdownMenuCheckboxItem
            key={v}
            checked={selected.has(v)}
            onCheckedChange={() => onToggle(v)}
          >
            {renderLabel(v)}
          </DropdownMenuCheckboxItem>
        ))}
        {count > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onClear} className="text-xs text-muted-foreground">
              Limpiar selección
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActividadPage() {
  const workspace = useWorkspace()
  const wsData = workspaceActivityData[workspace.id]
  const { activityTypes, activityTypesOrder, responsables } = wsData

  const [actividades, setActividades]   = React.useState<Activity[]>(wsData.activities)
  const [selResp,     setSelResp]       = React.useState<Set<string>>(new Set())
  const [selTipo,     setSelTipo]       = React.useState<Set<string>>(new Set())
  const [selEstado,   setSelEstado]     = React.useState<Set<ActivityEstado>>(new Set())
  const [density,     setDensity]       = React.useState<"compact" | "default" | "comfortable">("default")

  // Reset state when workspace changes
  React.useEffect(() => {
    setActividades(wsData.activities)
    setSelResp(new Set())
    setSelTipo(new Set())
    setSelEstado(new Set())
  }, [workspace.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasFilters = selResp.size > 0 || selTipo.size > 0 || selEstado.size > 0

  function clearAll() {
    setSelResp(new Set())
    setSelTipo(new Set())
    setSelEstado(new Set())
  }

  function setEstado(id: string, estado: ActivityEstado) {
    setActividades(prev => prev.map(a => a.id === id ? { ...a, estado } : a))
  }

  const filtered = React.useMemo(() =>
    actividades.filter(a =>
      (selResp.size   === 0 || selResp.has(a.responsableId)) &&
      (selTipo.size   === 0 || selTipo.has(a.tipo))          &&
      (selEstado.size === 0 || selEstado.has(a.estado))
    ),
    [actividades, selResp, selTipo, selEstado]
  )

  const estadoKpis = React.useMemo(() => {
    const counts = Object.fromEntries(estadosOrden.map(e => [e, 0])) as Record<string, number>
    for (const a of actividades) counts[a.estado] = (counts[a.estado] ?? 0) + 1
    return counts
  }, [actividades])

  const grouped = groupByDate(filtered)

  // Active filter chips
  const activeChips: { label: string; onRemove: () => void }[] = [
    ...Array.from(selResp).map(id => ({
      label: responsables.find(r => r.id === id)?.nombre ?? id,
      onRemove: () => setSelResp(s => toggle(s, id)),
    })),
    ...Array.from(selTipo).map(t => ({
      label: activityTypes[t]?.label ?? t,
      onRemove: () => setSelTipo(s => toggle(s, t)),
    })),
    ...Array.from(selEstado).map(e => ({
      label: estadoConfig[e].label,
      onRemove: () => setSelEstado(s => toggle(s, e)),
    })),
  ]

  return (
    <>
      {/* Page header */}
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Feed de actividades</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {filtered.length} de {actividades.length} actividades · {workspace.name}
            </p>
          </div>

          {/* KPIs */}
          <div className="*:data-[slot=card]:from-muted *:data-[slot=card]:to-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">
            <Card className="@container/card">
              <CardHeader>
                <CardDescription className="text-xs uppercase tracking-wider">Total</CardDescription>
                <CardTitle className="text-3xl font-bold tabular-nums">{actividades.length}</CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">Actividades registradas</div>
              </CardFooter>
            </Card>
            {estadosOrden.map(estado => {
              const cfg   = estadoConfig[estado]
              const total = actividades.length
              const count = estadoKpis[estado] ?? 0
              const pct   = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <Card key={estado} className="@container/card">
                  <CardHeader>
                    <CardDescription className="text-xs uppercase tracking-wider">
                      {cfg.label}
                    </CardDescription>
                    <CardTitle className="text-3xl font-bold tabular-nums">
                      {count}
                    </CardTitle>
                    <CardAction>
                      <Badge variant={cfg.variant} className="text-[10px]">
                        {pct}%
                      </Badge>
                    </CardAction>
                  </CardHeader>
                  <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      {pct}% del total de actividades
                    </div>
                  </CardFooter>
                </Card>
              )
            })}
          </div>

          {/* Filter bar */}
          <div className="flex flex-wrap items-center gap-2 justify-between">
            <FilterDropdown
              label="Responsable"
              options={responsables.map(r => r.id)}
              selected={selResp}
              onToggle={id => setSelResp(s => toggle(s, id))}
              onClear={() => setSelResp(new Set())}
              renderLabel={id => {
                const r = responsables.find(x => x.id === id)!
                return (
                  <span className="flex items-center gap-2">
                    <Avatar className="size-5">
                      <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${r.nombre}`} />
                      <AvatarFallback className="text-[9px]">{r.initials}</AvatarFallback>
                    </Avatar>
                    {r.nombre}
                  </span>
                )
              }}
            />
            <FilterDropdown
              label="Tipo"
              options={activityTypesOrder}
              selected={selTipo}
              onToggle={t => setSelTipo(s => toggle(s, t))}
              onClear={() => setSelTipo(new Set())}
              renderLabel={t => {
                const cfg  = activityTypes[t]
                if (!cfg) return t
                const Icon = cfg.icon
                return (
                  <span className="flex items-center gap-2">
                    <Icon className={cn("size-3.5", cfg.color)} />
                    {cfg.label}
                  </span>
                )
              }}
            />
            <FilterDropdown
              label="Estado"
              options={estadosOrden}
              selected={selEstado}
              onToggle={e => setSelEstado(s => toggle(s, e))}
              onClear={() => setSelEstado(new Set())}
              renderLabel={e => estadoConfig[e].label}
            />

            {/* Active chips */}
            {activeChips.length > 0 && (
              <>
                <Separator orientation="vertical" className="h-5" />
                {activeChips.map(chip => (
                  <Badge key={chip.label} variant="secondary" className="gap-1 pl-2 pr-1">
                    {chip.label}
                    <button
                      onClick={chip.onRemove}
                      className="ml-0.5 rounded-sm opacity-60 hover:opacity-100"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={clearAll}>
                  Limpiar todo
                </Button>
              </>
            )}

            {/* Density toggle */}
            <div className="ml-auto flex items-center rounded-md border p-0.5 gap-0.5">
              {([
                { value: "compact",     Icon: ListIcon,        title: "Compacto"   },
                { value: "default",     Icon: LayoutListIcon,  title: "Normal"     },
                { value: "comfortable", Icon: AlignJustifyIcon, title: "Cómodo"    },
              ] as const).map(({ value, Icon, title }) => (
                <button
                  key={value}
                  title={title}
                  onClick={() => setDensity(value)}
                  className={cn(
                    "rounded-sm p-1 transition-colors",
                    density === value
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="flex flex-col gap-8">
            {grouped.length === 0 && (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No hay actividades para los filtros seleccionados.
              </p>
            )}

            {grouped.map(group => (
              <section key={group.label}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {group.label}
                  </span>
                  <Separator className="flex-1" />
                  <span className="text-xs tabular-nums text-muted-foreground">{group.items.length}</span>
                </div>

                <div className="flex flex-col">
                  {group.items.map((act, i) => {
                    const cfg  = activityTypes[act.tipo]
                    if (!cfg) return null
                    const Icon = cfg.icon
                    const resp = responsables.find(r => r.id === act.responsableId)!
                    const last = i === group.items.length - 1

                    const estadoDropdown = (
                      <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                          <Badge
                            variant={estadoConfig[act.estado].variant}
                            className="gap-1 text-[10px] pointer-events-none"
                          >
                            {estadoConfig[act.estado].label}
                            <ChevronDownIcon className="size-2.5" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          {estadosOrden.map(e => (
                            <DropdownMenuItem
                              key={e}
                              onClick={() => setEstado(act.id, e)}
                              className={cn(act.estado === e && "font-medium")}
                            >
                              <Badge variant={estadoConfig[e].variant} className="text-[10px]">
                                {estadoConfig[e].label}
                              </Badge>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )

                    return (
                      <div key={act.id} className="flex gap-3">
                        <div className="flex flex-col items-center pt-1.5">
                          <div className={cn("size-2.5 shrink-0 rounded-full ring-2 ring-background", cfg.dot)} />
                          {!last && <div className="mt-1 w-px flex-1 bg-border" />}
                        </div>

                        {/* ── Compact ── */}
                        {density === "compact" && (
                          <Card className={cn("mb-1 flex-1 py-2", last && "mb-0")}>
                            <CardContent className="flex items-center gap-2 px-3 py-0">
                              <Icon className={cn("size-3.5 shrink-0", cfg.color)} />
                              <p className="min-w-0 flex-1 truncate text-sm">{act.titulo}</p>
                              <div className="flex shrink-0 items-center gap-2">
                                {estadoDropdown}
                                <span className="text-xs tabular-nums text-muted-foreground">{formatTime(act.timestamp)}</span>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* ── Default ── */}
                        {density === "default" && (
                          <Card className={cn("mb-2 flex-1 py-3", last && "mb-0")}>
                            <CardContent className="flex items-start gap-3 px-4 py-0">
                              <Icon className={cn("mt-0.5 size-4 shrink-0", cfg.color)} />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                                  <p className="text-sm font-medium leading-snug">{act.titulo}</p>
                                  <div className="flex shrink-0 items-center gap-2">
                                    {estadoDropdown}
                                    <span className="text-xs tabular-nums text-muted-foreground">{formatTime(act.timestamp)}</span>
                                  </div>
                                </div>
                                <p className="mt-0.5 text-xs text-muted-foreground">{act.detalle}</p>
                                <div className="mt-2 flex items-center gap-1.5">
                                  <Avatar className="size-5">
                                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${resp?.nombre ?? ""}`} />
                                    <AvatarFallback className="text-[9px]">{resp?.initials ?? "?"}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs text-muted-foreground">{resp?.nombre}</span>
                                  <Badge variant="outline" className="ml-1 px-1.5 py-0 text-[10px]">{cfg.label}</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        {/* ── Comfortable ── */}
                        {density === "comfortable" && (
                          <Card className={cn("mb-3 flex-1 py-4", last && "mb-0")}>
                            <CardContent className="flex items-start gap-4 px-5 py-0">
                              <div className={cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted", cfg.color)}>
                                <Icon className="size-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                                  <p className="text-sm font-semibold leading-snug">{act.titulo}</p>
                                  <div className="flex shrink-0 items-center gap-2">
                                    {estadoDropdown}
                                    <span className="text-xs tabular-nums text-muted-foreground">{formatTime(act.timestamp)}</span>
                                  </div>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{act.detalle}</p>
                                <div className="mt-3 flex items-center gap-2">
                                  <Avatar className="size-6">
                                    <AvatarImage src={`https://api.dicebear.com/9.x/initials/svg?seed=${resp?.nombre ?? ""}`} />
                                    <AvatarFallback className="text-[9px]">{resp?.initials ?? "?"}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-xs font-medium text-muted-foreground">{resp?.nombre}</span>
                                  <Badge variant="outline" className="ml-1 px-1.5 py-0 text-[10px]">{cfg.label}</Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

    </>
  )
}
