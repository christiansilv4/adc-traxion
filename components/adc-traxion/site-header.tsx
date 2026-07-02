import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchCommand } from "@/components/adc-traxion/search-command"
import { ThemeToggle } from "@/components/adc-traxion/theme-toggle"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div>
          <p className="text-sm font-medium leading-none">Motor de Tracción</p>
          <p className="text-xs text-muted-foreground">ADC Traxión — Ventas por Marca</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <SearchCommand />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
