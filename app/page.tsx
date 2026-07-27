"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const last = typeof window !== "undefined"
      ? localStorage.getItem("lastWorkspace") ?? "motor-traccion"
      : "motor-traccion"
    router.replace(`/w/${last}/dashboard`)
  }, [router])
  return null
}
