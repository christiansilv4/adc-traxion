"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  TrendingUpIcon,
  TagIcon,
  UsersIcon,
  TargetIcon,
  BarChart2Icon,
  SearchIcon,
  FileTextIcon,
  CarIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"

export function SearchCommand() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-muted-foreground gap-2 w-48 justify-between"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2">
          <SearchIcon data-icon="inline-start" />
          Buscar…
        </span>
        <span className="flex items-center gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen} className="max-w-5xl">
        <Command className="[&_[cmdk-group-heading]]:py-3 [&_[cmdk-item]]:py-3 [&_[cmdk-item]]:px-4 [&_[cmdk-input-wrapper]]:p-3">
        <CommandInput placeholder="Buscar ventas, marcas, vendedores…" />
        <CommandList className="max-h-96 p-2">
          <CommandEmpty>Sin resultados.</CommandEmpty>

          <CommandGroup heading="Ventas recientes">
            <CommandItem onSelect={() => setOpen(false)}>
              <CarIcon />
              <span>VNT-1041 — Nissan Sentra</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <CarIcon />
              <span>VNT-1042 — Toyota RAV4</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <CarIcon />
              <span>VNT-1043 — Honda CR-V</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <FileTextIcon />
              <span>VNT-1044 — VW Tiguan</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Navegación">
            <CommandItem onSelect={() => setOpen(false)}>
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <TrendingUpIcon />
              <span>Ventas</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <TagIcon />
              <span>Marcas</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <UsersIcon />
              <span>Vendedores</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <TargetIcon />
              <span>Leads</span>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              <BarChart2Icon />
              <span>Reportes</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
