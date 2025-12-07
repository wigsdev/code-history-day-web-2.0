import { TerminalHeader } from "@/components/terminal-header"
import { EphemerisDisplay } from "@/components/ephemeris-display"
import { TerminalFooter } from "@/components/terminal-footer"
import { TerminalInput } from "@/components/terminal-input"
import { CurrentDateDisplay } from "@/components/current-date-display"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
      {/* Main content with glass morphism */}
      <div className="max-w-4xl mx-auto">
        <TerminalHeader />
        <div className="font-mono text-lg text-foreground mb-4">
          user@gusadev:~$ ./code-history-day-web-2.0 --day
        </div>
        <div className="system-messages space-y-2 font-mono mb-8 border border-green-300/50 rounded p-3">
          <div className="flex items-start">
            <span className="text-green-500 mr-2">-</span>
            <span className="text-green-300">Iniciando sistema de efemérides de programación...</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">-</span>
            <span className="text-green-300">Conectando con la base de datos... [OK]</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">-</span>
            <span className="text-green-300">Cargando datos históricos... [OK]</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2">-</span>
            <span className="text-green-300">Sistema listo. Descubre la historia de la programación día a día.</span>
          </div>
        </div>
        <CurrentDateDisplay />
        <EphemerisDisplay />
        <div className="mt-6">
          <TerminalInput />
        </div>
        <TerminalFooter />
      </div>
    </main>
  )
}
