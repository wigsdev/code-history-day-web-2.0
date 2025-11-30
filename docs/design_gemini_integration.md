# 📐 SDLC Fase 3: Diseño Técnico (Integración Gemini)

Este documento detalla el diseño técnico para integrar la API de Google Gemini en Code History Day Web 2.0.

## 1. Arquitectura del Sistema

### Flujo de Datos
1. **Frontend (`EphemerisDisplay`)**:
   - Realiza `GET /api/ephemeris` al cargar.
   - Muestra estado de carga ("Conectando con Gemini AI...").
   - Recibe JSON y renderiza con efecto typewriter.

2. **Backend (`app/api/ephemeris/route.ts`)**:
   - Verifica variable de entorno `GEMINI_API_KEY`.
   - Instancia `GoogleGenerativeAI` client.
   - Construye el prompt con la fecha actual.
   - Envía solicitud a modelo `gemini-1.5-flash` (optimizado para velocidad/costo).
   - Parsea y valida la respuesta JSON.
   - Retorna datos al frontend.

## 2. Diseño del Prompt (Prompt Engineering)

Para garantizar respuestas JSON consistentes, usaremos la funcionalidad de "JSON mode" o instrucciones estrictas.

**Prompt Template:**
```text
Eres un historiador experto en computación y programación.
Tu tarea es identificar UN evento histórico significativo ocurrido el día {FECHA_ACTUAL} (mes y día).
Si no hay un evento exacto para hoy, busca uno de la misma semana que sea muy relevante.

Requisitos:
1. El evento debe ser real y verificable.
2. Prioriza: Lanzamientos de lenguajes, sistemas operativos, hitos de empresas tech, o patentes clave.
3. Idioma: Español neutro.
4. Tono: Informativo y técnico pero accesible.

Formato de Salida (JSON estricto):
{
  "date": "YYYY-MM-DD", (Fecha del evento histórico)
  "year": number, (Año del evento)
  "title": "Título del evento (máx 60 caracteres)",
  "description": "Descripción del evento (máx 250 caracteres)",
  "category": "OS" | "Language" | "Hardware" | "Company" | "Web" | "AI",
  "impact": "high" | "medium"
}
```

## 3. Esquema de Validación (Zod)

Para asegurar que la API no rompa el frontend, validaremos la respuesta de Gemini antes de enviarla.

```typescript
import { z } from "zod";

export const EphemerisSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  year: z.number().int().min(1900).max(2030),
  title: z.string().min(5).max(100),
  description: z.string().min(20).max(500),
  category: z.enum(["OS", "Language", "Hardware", "Company", "Web", "AI", "Innovation", "Other"]),
  impact: z.enum(["high", "medium", "low"]),
});

export type Ephemeris = z.infer<typeof EphemerisSchema>;
```

## 4. Dependencias Nuevas

- `@google/generative-ai`: SDK oficial de Google.
- `zod`: Ya instalado en el proyecto (ver package.json).

## 5. Plan de Implementación (Pasos)

1. **Instalación:** `npm install @google/generative-ai`
2. **Configuración:** Crear `.env.local` con `GEMINI_API_KEY`.
3. **Servicio:** Crear `lib/gemini.ts` para encapsular la lógica de llamada.
4. **API:** Crear `app/api/ephemeris/route.ts`.
5. **Frontend:** Actualizar `components/ephemeris-display.tsx` para usar `fetch`.

## 6. Estrategia de Fallos (Fallback)

Si la API de Gemini falla (quota exceeded, error 500), el sistema debe:
1. Capturar el error silenciosamente en el backend.
2. Retornar una efeméride estática de respaldo (de nuestra base de datos local `efemerides_sugeridas.md`) con un flag `source: "fallback"`.
3. El usuario NO debe ver un error 500, siempre debe ver contenido.
