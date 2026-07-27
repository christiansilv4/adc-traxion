"use client"

import * as React from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar }  from "@/components/adc-traxion/app-sidebar"
import { SiteHeader }  from "@/components/adc-traxion/site-header"

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6 px-3 iphone-se:px-4 iphone-pro:px-5 ipad-air:px-10 ipad-pro:px-16 xl:px-24 2xl:px-40 @container/main">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
