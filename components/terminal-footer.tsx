"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function TerminalFooter() {
  return (
    <footer className="border-t border-primary/30 pt-4 glass-terminal rounded-lg p-6 mt-8">
      <div className="modern-terminal-glow text-center text-sm space-y-2">
        <p>&gt; Pulsa Ctrl+W para salir</p>
        <p className="text-xs text-muted-foreground">
          © 2025 <a href="https://github.com/mysterio-wil" target="_blank" rel="noopener noreferrer" className="text-accent-foreground hover:underline">mysterio-wil</a> by Wilmer Gulcochía
        </p>
        <p className="text-xs text-muted-foreground">
          <a href="https://github.com/mysterio-wil/code-history-day-web-2.0" target="_blank" rel="noopener noreferrer" className="hover:underline">Desarrollado con ❤️ desde Uchiza para el mundo</a>
        </p>
      </div>
    </footer>
  )
}

