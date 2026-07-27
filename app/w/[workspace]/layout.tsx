import { notFound } from "next/navigation"
import { getWorkspace } from "@/lib/workspaces"
import { WorkspaceProvider } from "@/contexts/workspace-context"
import { WorkspaceShell }   from "@/components/adc-traxion/workspace-shell"

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ workspace: string }>
}) {
  const { workspace: workspaceId } = await params
  const workspace = getWorkspace(workspaceId)

  if (!workspace) notFound()

  return (
    <WorkspaceProvider workspace={workspace}>
      <WorkspaceShell>
        {children}
      </WorkspaceShell>
    </WorkspaceProvider>
  )
}
