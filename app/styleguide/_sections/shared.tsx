"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

// ─── Section ─────────────────────────────────────────────────────────────────

export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      data-section={id}
      // scroll-mt-16 = 4 rem = 64 px — compensates for the 56 px fixed header
      className={cn("scroll-mt-16 space-y-8", className)}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <Separator />
      </div>
      {children}
    </section>
  )
}

// ─── SubSection ───────────────────────────────────────────────────────────────

export function SubSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      {children}
    </div>
  )
}

// ─── CodeBlock ────────────────────────────────────────────────────────────────

export function CodeBlock({
  code,
  className,
}: {
  code: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim()).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-muted px-4 py-3.5 text-xs leading-relaxed font-mono text-foreground">
        <code>{code.trim()}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copiar código"
        className={cn(
          "absolute top-2 right-2 flex items-center gap-1 rounded-md border px-1.5 py-1",
          "text-xs text-muted-foreground transition-colors",
          "bg-background/80 hover:bg-background hover:text-foreground",
          "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
        )}
      >
        {copied ? (
          <CheckIcon className="size-3 text-primary" />
        ) : (
          <CopyIcon className="size-3" />
        )}
        {copied ? "Copiado" : "Copiar"}
      </button>
    </div>
  )
}

// ─── ComponentDemo ────────────────────────────────────────────────────────────
// Wraps a live preview + a collapsed code block.

export function ComponentDemo({
  title,
  code,
  children,
  previewClassName,
}: {
  title: string
  code: string
  children: React.ReactNode
  previewClassName?: string
}) {
  return (
    <SubSection title={title}>
      <div
        className={cn(
          "rounded-xl border bg-card px-5 py-6",
          previewClassName
        )}
      >
        {children}
      </div>
      <CodeBlock code={code} />
    </SubSection>
  )
}
