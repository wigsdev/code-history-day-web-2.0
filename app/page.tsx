import { TerminalHeader } from "@/components/terminal-header"
import { EphemerisDisplay } from "@/components/ephemeris-display"
import { TerminalFooter } from "@/components/terminal-footer"
import { TerminalInput } from "@/components/terminal-input"

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
        <div className="border border-green-300/50 rounded p-3 mb-8 font-mono flex items-center">
          <svg
            className="w-5 h-5 text-green-300 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-green-300">
            Fecha actual: {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
        </div>
        <EphemerisDisplay />
        <div className="mt-6">
          <TerminalInput />
        </div>
        <TerminalFooter />
      </div>
    </main>
  )
}
