"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Badge }    from "@/components/ui/badge"
import { Button }   from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

const MARCAS = ["Nissan", "Toyota", "Honda", "VW", "Kia", "Mazda"]
const UBICACIONES = [
  "CDMX Norte",
  "CDMX Sur",
  "Monterrey",
  "Guadalajara",
  "Puebla",
  "Querétaro",
]

export interface KpiFiltersValue {
  dateRange: DateRange | undefined
  marcas: string[]
  ubicaciones: string[]
}

export const defaultKpiFilters: KpiFiltersValue = {
  dateRange: undefined,
  marcas: [],
  ubicaciones: [],
}

interface KpiFiltersProps {
  value: KpiFiltersValue
  onChange: (next: KpiFiltersValue) => void
}

export function KpiFilters({ value, onChange }: KpiFiltersProps) {
  const hasFilters =
    value.dateRange !== undefined ||
    value.marcas.length > 0 ||
    value.ubicaciones.length > 0

  function toggleItem(key: "marcas" | "ubicaciones", item: string) {
    const list = value[key]
    const next = list.includes(item)
      ? list.filter((x) => x !== item)
      : [...list, item]
    onChange({ ...value, [key]: next })
  }

  const dateLabel = value.dateRange?.from
    ? value.dateRange.to
      ? `${fmtDate(value.dateRange.from)} – ${fmtDate(value.dateRange.to)}`
      : fmtDate(value.dateRange.from)
    : "Fecha"

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* Rango de fecha */}
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 text-sm font-normal"
            />
          }
        >
          <CalendarIcon className="size-3.5 text-muted-foreground" />
          <span>{dateLabel}</span>
          <ChevronDownIcon className="size-3.5 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-fit p-0">
          <Calendar
            mode="range"
            selected={value.dateRange}
            onSelect={(range) => onChange({ ...value, dateRange: range })}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {/* Marcas */}
      <MultiFilter
        label="Marcas"
        options={MARCAS}
        selected={value.marcas}
        onToggle={(item) => toggleItem("marcas", item)}
      />

      {/* Ubicaciones */}
      <MultiFilter
        label="Ubicaciones"
        options={UBICACIONES}
        selected={value.ubicaciones}
        onToggle={(item) => toggleItem("ubicaciones", item)}
      />

      {/* Limpiar */}
      {hasFilters && (
        <>
          <Separator orientation="vertical" className="h-5" />
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1 text-sm"
            onClick={() => onChange(defaultKpiFilters)}
          >
            <XIcon className="size-3.5" />
            Limpiar
          </Button>
        </>
      )}
    </div>
  )
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function fmtDate(date: Date) {
  return date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" })
}

function MultiFilter({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (item: string) => void
}) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1.5 text-sm font-normal"
          />
        }
      >
        <span>{label}</span>
        {selected.length > 0 && (
          <Badge variant="secondary" className="rounded-sm px-1 font-normal">
            {selected.length}
          </Badge>
        )}
        <ChevronDownIcon className="size-3.5 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="start" className="w-48 p-1">
        <div className="flex flex-col">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted text-left"
            >
              <Checkbox
                checked={selected.includes(opt)}
                className="pointer-events-none"
              />
              {opt}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
