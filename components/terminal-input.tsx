"use client"
import React, { useState, useRef, useEffect } from "react"

export function TerminalInput({ onCommand }: { onCommand?: (cmd: string) => void }) {
  const [input, setInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onCommand?.(input)
      setInput("")
    }
  }

  return (
    <div className="font-mono flex items-center px-1 py-1">
      <span className="text-green-400 mr-2">user@gusadev:~$</span>
      <input
        ref={inputRef}
        className="bg-transparent outline-none text-green-300 flex-1 placeholder:italic placeholder:text-green-300/50"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoFocus={false}
        placeholder="Ingrese aquí comando..."
        style={{ minWidth: 40 }}
      />
    </div>
  )
}

// Animación blink en Tailwind:
// .animate-blink { animation: blink 1s steps(2, start) infinite; }
// @keyframes blink { to { visibility: hidden; } }
