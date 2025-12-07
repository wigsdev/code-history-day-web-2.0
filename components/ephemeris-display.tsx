
"use client"

import { useEffect, useState, useRef } from "react"
import { useToast } from "../hooks/use-toast"
import { Button } from "./ui/button"
import { CheckIcon, CopyIcon } from "lucide-react"
import { LinkedinIcon } from "lucide-react"

interface Ephemeris {
  date: string
  year: number
  title: string
  description: string
  category: string
  impact: "low" | "medium" | "high"
  source?: 'ai' | 'local'
}

// Base de datos de efemérides de respaldo (Fallback)
const ephemerisDatabase: Ephemeris[] = [
  // SEPTIEMBRE
  {
    date: "1969-09-02",
    year: 1969,
    title: "Primera conexión de ARPANET",
    description: "El 2 de septiembre de 1969 se estableció la primera conexión de ARPANET entre UCLA y el Stanford Research Institute, marcando el nacimiento de lo que eventualmente se convertiría en Internet.",
    category: "Network",
    impact: "high"
  },
  {
    date: "1991-09-17",
    year: 1991,
    title: "Lanzamiento de Linux 0.01",
    description: "Linus Torvalds lanzó la primera versión oficial de Linux (0.01) el 17 de septiembre de 1991, iniciando una revolución en el software de código abierto que transformaría la industria tecnológica.",
    category: "OS",
    impact: "high"
  },
  {
    date: "1998-09-04",
    year: 1998,
    title: "Fundación de Google Inc.",
    description: "Larry Page y Sergey Brin fundaron Google Inc. el 4 de septiembre de 1998 en un garaje de Menlo Park, California. La empresa revolucionaría la forma en que buscamos información en Internet.",
    category: "Company",
    impact: "high"
  },
  {
    date: "2008-09-23",
    year: 2008,
    title: "Lanzamiento de Android 1.0",
    description: "Google lanzó Android 1.0 (Apple Pie) el 23 de septiembre de 2008 en el HTC Dream, iniciando la era de los smartphones Android que dominarían el mercado móvil.",
    category: "OS",
    impact: "high"
  },
  {
    date: "1983-09-27",
    year: 1983,
    title: "Richard Stallman anuncia el proyecto GNU",
    description: "El 27 de septiembre de 1983, Richard Stallman anunció públicamente el inicio del proyecto GNU en el grupo de noticias net.unix-wizards, sentando las bases del movimiento de software libre y del ecosistema que culminaría en GNU/Linux.",
    category: "OS",
    impact: "high"
  },
  // ... (Se pueden agregar más aquí)
]

export function EphemerisDisplay() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [displayState, setDisplayState] = useState<'initial-loading' | 'show-button' | 'showing-content'>('initial-loading')
  const [displayedText, setDisplayedText] = useState('')
  const [ephemeris, setEphemeris] = useState<Ephemeris | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Función para copiar el texto completo
  const copyEphemerisText = async () => {
    if (!ephemeris) return
    const formattedDate = formatDate(ephemeris.date)
    const title = "Efeméride del Día en la Historia de la Programación"
    const text = `📅 ${formattedDate} \n\n${ephemeris.description} \n\n#ProgrammingHistory #Tech #Software`
    const fullText = `${title} \n\n${text} `
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      toast({
        title: "Texto copiado",
        description: "El título y la efeméride se copiaron al portapapeles."
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar automáticamente. Copia manualmente la efeméride."
      })
    }
  }

  // Formatea la fecha para mostrarla en español
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  // Efecto para la animación de escritura
  const typeText = (text: string, onComplete: () => void) => {
    let index = 0
    const chars: string[] = []

    // Resetear estado
    setDisplayedText('')
    setIsComplete(false)

    const interval = setInterval(() => {
      if (index < text.length) {
        chars.push(text[index])
        setDisplayedText(chars.join(''))

        if (contentRef.current) {
          contentRef.current.style.height = `${contentRef.current.scrollHeight} px`
        }

        index++
      } else {
        clearInterval(interval)
        onComplete()
      }
    }, 30) // Un poco más rápido

    return () => clearInterval(interval)
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = `${contentRef.current.scrollHeight} px`
    }
  }, [displayedText])

  useEffect(() => {
    const loadEphemeris = async () => {
      setDisplayedText('Conectando con Gemini AI para recuperar efeméride...')

      try {
        // Intentar obtener de la API
        const response = await fetch('/api/ephemeris')

        if (response.ok) {
          const data = await response.json()
          setEphemeris(data)
          processEphemeris(data)
        } else {
          throw new Error('API failed')
        }
      } catch (error) {
        console.warn('Falling back to local database', error)
        // Fallback a base de datos local
        const today = new Date()
        const todayMonthDay = `${String(today.getMonth() + 1).padStart(2, "0")} -${String(today.getDate()).padStart(2, "0")} `

        let todayEphemeris = ephemerisDatabase.find(
          (e) => e.date.substring(5) === todayMonthDay
        )

        if (!todayEphemeris) {
          const randomIndex = Math.floor(Math.random() * ephemerisDatabase.length)
          todayEphemeris = ephemerisDatabase[randomIndex]
        }

        setEphemeris({ ...todayEphemeris, source: 'local' })
        processEphemeris({ ...todayEphemeris, source: 'local' })
      }
    }

    const processEphemeris = async (data: Ephemeris) => {
      // Simular un pequeño delay para transición
      await new Promise(resolve => setTimeout(resolve, 1000))

      setDisplayState('show-button')
      await new Promise(resolve => setTimeout(resolve, 500))

      setDisplayState('showing-content')

      const formattedDate = formatDate(data.date)
      const sourceTag = data.source === 'ai' ? '[AI GENERATED]' : '[ARCHIVE]'
      const fullContent = `${formattedDate} ${sourceTag}: \n\n${data.description} `

      typeText(fullContent, () => setIsComplete(true))
    }

    loadEphemeris()
  }, [])

  // Función para compartir en LinkedIn
  const [isSharing, setIsSharing] = useState(false)

  const shareOnLinkedIn = async () => {
    if (!ephemeris) return

    setIsSharing(true)

    try {
      const formattedDate = formatDate(ephemeris.date)
      const title = "Efeméride del Día en la Historia de la Programación"
      const text = `📅 ${formattedDate} \n\n${ephemeris.description} \n\n#ProgrammingHistory #Tech #Software`
      const fullText = `${title} \n\n${text} `
      const url = window.location.href

      try {
        await navigator.clipboard.writeText(fullText)
        toast({
          title: "Texto copiado",
          description: "El título y la efeméride se copiaron al portapapeles. ¡Pégalos en LinkedIn!"
        })
      } catch (err) {
        toast({
          title: "Error al copiar",
          description: "No se pudo copiar automáticamente. Copia manualmente la efeméride."
        })
      }

      await new Promise(resolve => setTimeout(resolve, 800))

      const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      const width = 600
      const height = 600
      const left = Math.round(window.innerWidth / 2 - width / 2)
      const top = Math.round(window.innerHeight / 2 - height / 2)

      window.open(
        linkedInUrl,
        'LinkedInShare',
        `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,status=no,scrollbars=yes`
      )
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <div className="border border-green-300/50 rounded p-4 font-mono">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <span className="text-green-500">&lt;&gt;</span>
          <span className="text-green-300 ml-2">EFEMÉRIDE DEL DÍA</span>
        </div>
        {ephemeris?.source === 'ai' && (
          <span className="text-xs text-green-500/70 border border-green-500/30 px-2 py-0.5 rounded">
            AI POWERED
          </span>
        )}
      </div>

      <div className="relative">
        <div
          ref={contentRef}
          className="text-green-300 whitespace-pre-line mb-4 overflow-hidden transition-[height] duration-300 ease-out"
          style={{
            height: contentRef.current ? `${contentRef.current.scrollHeight}px` : 'auto',
            minHeight: displayState === 'initial-loading' ? '24px' : displayState === 'show-button' ? '48px' : 'auto'
          }}
        >
          {displayedText}
          {!isComplete && (
            <span className="animate-blink inline-block ml-1">▋</span>
          )}
        </div>

        <div
          className={`transition-all duration-300 ${displayState === 'show-button' || displayState === 'showing-content'
            ? 'opacity-100 transform translate-y-0'
            : 'opacity-0 transform -translate-y-4'
            }`}
        >
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-green-300 border-green-300 hover:bg-green-300/10 min-w-[120px] flex items-center"
              onClick={copyEphemerisText}
              disabled={copied}
            >
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4 mr-2 text-green-400" />
                  Copiado
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4 mr-2" />
                  Copiar texto
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-green-300 border-green-300 hover:bg-green-300/10 min-w-[120px] flex items-center"
              onClick={shareOnLinkedIn}
              disabled={isSharing}
            >
              {isSharing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-green-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Preparando...
                </>
              ) : (
                <>
                  <LinkedinIcon className="w-4 h-4 mr-2" />
                  Compartir
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
