// FILE: /Users/home2/Documents/adc-traxion/app/styleguide/_sections/data-section.tsx

"use client"

import { useState } from "react"
import {
  ArrowUpDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  TruckIcon,
  RouteIcon,
} from "lucide-react"

import { Section, ComponentDemo } from "./shared"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

type FleetRow = {
  id: string
  conductor: string
  ruta: string
  km: number
  estado: "En ruta" | "Detenido" | "En base"
  eta: string
}

const fleetData: FleetRow[] = [
  { id: "TR-4821", conductor: "Carlos Méndez", ruta: "CDMX → Monterrey", km: 940, estado: "En ruta", eta: "18:30" },
  { id: "TR-3310", conductor: "Ana López", ruta: "Guadalajara → CDMX", km: 580, estado: "Detenido", eta: "20:15" },
  { id: "TR-5502", conductor: "Juan Ramírez", ruta: "Monterrey → Saltillo", km: 210, estado: "En base", eta: "—" },
  { id: "TR-1890", conductor: "María Torres", ruta: "CDMX → Puebla", km: 135, estado: "En ruta", eta: "16:45" },
  { id: "TR-2201", conductor: "Pedro Ruiz", ruta: "Tijuana → Mexicali", km: 190, estado: "En ruta", eta: "17:00" },
  { id: "TR-7743", conductor: "Laura Vega", ruta: "Veracruz → CDMX", km: 450, estado: "En base", eta: "—" },
  { id: "TR-9902", conductor: "Ernesto Gil", ruta: "León → Querétaro", km: 170, estado: "En ruta", eta: "15:30" },
  { id: "TR-6615", conductor: "Sofía Mora", ruta: "Cancún → Mérida", km: 320, estado: "Detenido", eta: "22:00" },
  { id: "TR-4430", conductor: "Diego Castro", ruta: "Culiacán → Mazatlán", km: 210, estado: "En ruta", eta: "19:15" },
  { id: "TR-8817", conductor: "Fabiola Nieto", ruta: "Chihuahua → Juárez", km: 370, estado: "En base", eta: "—" },
  { id: "TR-3321", conductor: "Héctor Reyes", ruta: "Torreón → Durango", km: 290, estado: "En ruta", eta: "21:00" },
  { id: "TR-5510", conductor: "Patricia Luna", ruta: "Oaxaca → Pochutla", km: 250, estado: "En ruta", eta: "14:45" },
  { id: "TR-2280", conductor: "Roberto Flores", ruta: "Tampico → Matamoros", km: 490, estado: "Detenido", eta: "23:30" },
  { id: "TR-6699", conductor: "Claudia Salas", ruta: "Morelia → Colima", km: 220, estado: "En ruta", eta: "17:30" },
  { id: "TR-1102", conductor: "Andrés Rojas", ruta: "Hermosillo → Nogales", km: 265, estado: "En base", eta: "—" },
]

type SortField = "id" | "conductor" | "km" | "estado"
type SortDir = "asc" | "desc"

const statusVariant = (s: string) =>
  s === "En ruta" ? "default" : s === "Detenido" ? "destructive" : "secondary"

const PAGE_SIZE = 5

export function DataSection() {
  const [sortField, setSortField] = useState<SortField>("id")
  const [sortDir, setSortDir] = useState<SortDir>("asc")
  const [page, setPage] = useState(0)

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
    setPage(0)
  }

  const sorted = [...fleetData].sort((a, b) => {
    let cmp = 0
    if (sortField === "km") {
      cmp = a.km - b.km
    } else {
      cmp = a[sortField].localeCompare(b[sortField])
    }
    return sortDir === "asc" ? cmp : -cmp
  })

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE)
  const paginated = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDownIcon className="size-3 ml-1 text-muted-foreground" />
    return sortDir === "asc"
      ? <ArrowUpIcon className="size-3 ml-1" />
      : <ArrowDownIcon className="size-3 ml-1" />
  }

  return (
    <Section id="data" title="Datos">
      {/* Table with sorting & pagination */}
      <ComponentDemo
        title="Table — sorting y paginación"
        code={`import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

// Sortable columns: click TableHead button to toggle asc/desc
// Paginated: slice data with page * PAGE_SIZE

<Table>
  <TableCaption>Lista completa de la flota activa.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>
        <button onClick={() => handleSort("id")} className="flex items-center text-xs font-medium">
          ID <ArrowUpDownIcon className="size-3 ml-1" />
        </button>
      </TableHead>
      <TableHead>Conductor</TableHead>
      <TableHead>Estado</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {paginated.map((row) => (
      <TableRow key={row.id}>
        <TableCell className="font-mono font-medium">{row.id}</TableCell>
        <TableCell>{row.conductor}</TableCell>
        <TableCell><Badge variant="default">{row.estado}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
      >
        <Card>
          <CardHeader>
            <CardTitle>Flota de unidades</CardTitle>
            <CardDescription>
              {fleetData.length} unidades registradas · Página {page + 1} de {totalPages}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableCaption>Lista completa de la flota activa.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button
                      onClick={() => handleSort("id")}
                      className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                    >
                      ID <SortIcon field="id" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("conductor")}
                      className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                    >
                      Conductor <SortIcon field="conductor" />
                    </button>
                  </TableHead>
                  <TableHead>Ruta</TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("km")}
                      className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                    >
                      KM <SortIcon field="km" />
                    </button>
                  </TableHead>
                  <TableHead>
                    <button
                      onClick={() => handleSort("estado")}
                      className="flex items-center text-xs font-medium hover:text-foreground transition-colors"
                    >
                      Estado <SortIcon field="estado" />
                    </button>
                  </TableHead>
                  <TableHead>ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-mono font-medium">{row.id}</TableCell>
                    <TableCell>{row.conductor}</TableCell>
                    <TableCell className="text-muted-foreground">{row.ruta}</TableCell>
                    <TableCell>{row.km.toLocaleString("es-MX")}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(row.estado)}>{row.estado}</Badge>
                    </TableCell>
                    <TableCell>{row.eta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="pt-2">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.max(0, p - 1))
                    }}
                    aria-disabled={page === 0}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i === page}
                      onClick={(e) => {
                        e.preventDefault()
                        setPage(i)
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setPage((p) => Math.min(totalPages - 1, p + 1))
                    }}
                    aria-disabled={page === totalPages - 1}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </ComponentDemo>

      <Separator />

      {/* Command Palette */}
      <ComponentDemo
        title="Command Palette"
        code={`import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

<Command>
  <CommandInput placeholder="Buscar unidad o ruta..." />
  <CommandList>
    <CommandEmpty>Sin resultados.</CommandEmpty>
    <CommandGroup heading="Unidades">
      <CommandItem><TruckIcon />TR-4821 — Carlos Méndez</CommandItem>
      <CommandItem><TruckIcon />TR-3310 — Ana López</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Rutas">
      <CommandItem><RouteIcon />CDMX → Monterrey (940 km)</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      >
        <Card className="max-w-sm">
          <Command>
            <CommandInput placeholder="Buscar unidad o ruta..." />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup heading="Unidades">
                <CommandItem>
                  <TruckIcon />
                  TR-4821 — Carlos Méndez
                </CommandItem>
                <CommandItem>
                  <TruckIcon />
                  TR-3310 — Ana López
                </CommandItem>
                <CommandItem>
                  <TruckIcon />
                  TR-5502 — Juan Ramírez
                </CommandItem>
                <CommandItem>
                  <TruckIcon />
                  TR-1890 — María Torres
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Rutas">
                <CommandItem>
                  <RouteIcon />
                  CDMX → Monterrey (940 km)
                </CommandItem>
                <CommandItem>
                  <RouteIcon />
                  Guadalajara → CDMX (580 km)
                </CommandItem>
                <CommandItem>
                  <RouteIcon />
                  Monterrey → Saltillo (210 km)
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Card>
      </ComponentDemo>
    </Section>
  )
}
