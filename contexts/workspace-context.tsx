"use client"

import * as React from "react"
import { workspaces, getWorkspace, type Workspace } from "@/lib/workspaces"

// ─── Context ──────────────────────────────────────────────────────────────────

type WorkspaceContextValue = {
  workspace: Workspace
}

const WorkspaceContext = React.createContext<WorkspaceContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WorkspaceProvider({
  workspace,
  children,
}: {
  workspace: Workspace
  children: React.ReactNode
}) {
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lastWorkspace", workspace.id)
    }
  }, [workspace.id])

  return (
    <WorkspaceContext.Provider value={{ workspace }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useWorkspace(): Workspace {
  const ctx = React.useContext(WorkspaceContext)
  if (!ctx) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return ctx.workspace
}
