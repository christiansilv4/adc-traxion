"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PaletteIcon,
  TypeIcon,
  CircleIcon,
  PuzzleIcon,
  LayoutIcon,
  Grid3x3Icon,
  NavigationIcon,
  ClipboardListIcon,
  BellIcon,
  LayersIcon,
  DatabaseIcon,
  BarChart3Icon,
  BookOpenIcon,
  PanelLeftIcon,
  LayoutDashboardIcon,
  UserCircleIcon,
} from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import { ColorsSection }     from "./_sections/colors"
import { TypographySection } from "./_sections/typography"
import { AtomsSection }      from "./_sections/atoms"
import { ComponentsSection } from "./_sections/components"
import { LayoutSection }     from "./_sections/layout-section"
import { GridSection }       from "./_sections/grid-section"
import { NavigationSection } from "./_sections/navigation-section"
import { FormsSection }      from "./_sections/forms"
import { FeedbackSection }   from "./_sections/feedback"
import { OverlaySection }    from "./_sections/overlay"
import { DataSection }       from "./_sections/data-section"
import { ChartsSection }     from "./_sections/charts"
import { SidebarSection }    from "./_sections/sidebar-section"
import { MainLayoutSection } from "./_sections/main-layout-section"
import { AvatarSection }     from "./_sections/avatar-section"

// ─── Nav config ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "colors",      label: "Colores",      icon: PaletteIcon },
  { id: "typography",  label: "Tipografía",   icon: TypeIcon },
  { id: "atoms",       label: "Átomos",       icon: CircleIcon },
  { id: "avatars",     label: "Avatars",      icon: UserCircleIcon },
  { id: "components",  label: "Componentes",  icon: PuzzleIcon },
  { id: "layout",      label: "Layout",       icon: LayoutIcon },
  { id: "grid",        label: "Grid",         icon: Grid3x3Icon },
  { id: "navigation",  label: "Navegación",   icon: NavigationIcon },
  { id: "forms",       label: "Formularios",  icon: ClipboardListIcon },
  { id: "feedback",    label: "Feedback",     icon: BellIcon },
  { id: "overlay",     label: "Overlay",      icon: LayersIcon },
  { id: "data",        label: "Data",         icon: DatabaseIcon },
  { id: "charts",      label: "Gráficas",     icon: BarChart3Icon },
  { id: "sidebar",     label: "Sidebar",      icon: PanelLeftIcon },
  { id: "main-layout", label: "Main Layout",  icon: LayoutDashboardIcon },
] as const

type NavId = (typeof NAV_ITEMS)[number]["id"]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function StyleguidePage() {
  const [active, setActive] = React.useState<NavId>("colors")

  // Track active section via IntersectionObserver (viewport as root)
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const s = entry.target.getAttribute("data-section")
            if (s) setActive(s as NavId)
          }
        }
      },
      { rootMargin: "-10% 0px -82% 0px", threshold: 0 }
    )
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // scrollIntoView respects scroll-margin-top set on the target element
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="bg-background">

      {/* ── Fixed header — h-14 (56 px) ── */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center gap-4 border-b bg-card/95 px-4 backdrop-blur-sm md:px-6">
        <Image
          src="https://adcgrupo.com/wp-content/uploads/2026/04/ADC-TRAXION-mno-1.png"
          alt="ADC Traxión"
          width={140}
          height={40}
          className="h-9 w-auto object-contain"
          unoptimized
        />
        <Separator orientation="vertical" className="h-7" />
        <div className="hidden sm:block">
          <p className="text-sm font-semibold leading-none tracking-tight">
            Motor de Tracción
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">Design System</p>
        </div>

        {/* Mobile nav select */}
        <div className="ml-auto md:hidden">
          <Select
            value={active}
            onValueChange={(v) => {
              if (!v) return
              setActive(v as NavId)
              scrollTo(v)
            }}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sección…" />
            </SelectTrigger>
            <SelectContent>
              {NAV_ITEMS.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* ── Fixed sidebar — starts below header ── */}
      <aside className="fixed top-14 bottom-0 left-0 z-40 hidden w-52 flex-col border-r bg-background md:flex">
        <ScrollArea className="flex-1 py-3">
          <nav className="flex flex-col gap-0.5 px-2">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors",
                  active === id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </button>
            ))}
            <Separator className="my-2" />
            <Link
              href="/how-to"
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <BookOpenIcon className="size-4 shrink-0" />
              Guía para developers
            </Link>
          </nav>
        </ScrollArea>
      </aside>

      {/* ── Main — offset for fixed header + sidebar ── */}
      <main className="pt-14 md:pl-52">
        <div className="mx-auto max-w-4xl space-y-20 px-5 py-12 md:px-8">
          <ColorsSection />
          <TypographySection />
          <AtomsSection />
          <AvatarSection />
          <ComponentsSection />
          <LayoutSection />
          <GridSection />
          <NavigationSection />
          <FormsSection />
          <FeedbackSection />
          <OverlaySection />
          <DataSection />
          <ChartsSection />
          <SidebarSection />
          <MainLayoutSection />
        </div>

        <footer className="border-t">
          <div className="mx-auto max-w-4xl px-5 py-6 md:px-8">
            <p className="text-xs text-muted-foreground">
              ADC Traxión · Motor de Tracción · Design System · 2026
            </p>
          </div>
        </footer>
      </main>

    </div>
  )
}
