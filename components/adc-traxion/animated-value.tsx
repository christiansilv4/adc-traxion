"use client"

import * as React from "react"

function parseFormattedValue(str: string): { numeric: number; format: (n: number) => string } | null {
  // "$56.8 M" — currency + M suffix
  const currencyM = str.match(/^\$(\d+\.?\d*)\s*M$/)
  if (currencyM) {
    const decimals = currencyM[1].includes(".") ? currencyM[1].split(".")[1].length : 0
    const numeric = parseFloat(currencyM[1])
    return { numeric, format: (n) => `$${n.toFixed(decimals)} M` }
  }

  // "106%" — percentage
  const pct = str.match(/^(\d+)%$/)
  if (pct) {
    return { numeric: parseInt(pct[1]), format: (n) => `${Math.round(n)}%` }
  }

  // "3,812" — integer with thousands separator
  if (str.includes(",")) {
    const numeric = parseInt(str.replace(/,/g, ""))
    return { numeric, format: (n) => Math.round(n).toLocaleString("es-MX") }
  }

  // "318" — plain integer
  const plain = str.match(/^(\d+)$/)
  if (plain) {
    return { numeric: parseInt(plain[1]), format: (n) => Math.round(n).toString() }
  }

  return null
}

interface AnimatedValueProps {
  value: string
  duration?: number
}

export function AnimatedValue({ value, duration = 900 }: AnimatedValueProps) {
  const [display, setDisplay] = React.useState("0")

  React.useEffect(() => {
    const parsed = parseFormattedValue(value)
    if (!parsed) {
      setDisplay(value)
      return
    }

    const start = Date.now()
    let raf: number

    const animate = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(parsed.format(parsed.numeric * eased))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, []) // runs once on mount — key prop forces remount on value change

  return <>{display}</>
}
