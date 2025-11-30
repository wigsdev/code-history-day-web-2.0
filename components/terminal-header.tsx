"use client"

import { useEffect, useState } from "react"
import { AlarmClock } from "lucide-react"

export function TerminalHeader() {
  const [time, setTime] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString("es-ES", { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="glass-terminal rounded-lg p-4 mb-8 border-b border-primary/30">
      <div className="flex justify-between items-center modern-terminal-glow text-xl">
        <div className="flex items-center gap-2">
          <span className="animate-[blink_1s_step-end_infinite] text-accent font-bold">{'>_'}</span>
          <span>code history day 2.0 v0.1.0</span>
        </div>
        <div className="flex items-center gap-2">
          <AlarmClock className="h-5 w-5" />
          {isClient && <span>{time}</span>}
        </div>
      </div>
    </header>
  )
}
