# 📅 Code History Day Web 2.0

> Aplicación web interactiva que muestra efemérides históricas de la programación y tecnología, generadas dinámicamente con IA y almacenadas en base de datos con sistema de caché inteligente.

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat&logo=vercel)](https://code-history-day-web-2-0.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?style=flat&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Características

### v1.1.0 (Actual)
- ✨ **Generación dinámica con IA**: Efemérides generadas por Google Gemini 2.5 Flash
- 🗄️ **Base de datos Supabase**: Persistencia de datos con PostgreSQL
- ⚡ **Sistema de caché inteligente**: Reducción del 92% en tiempo de respuesta
- 📚 **Historial completo**: Navegación por efemérides pasadas con paginación
- 🔍 **Filtros por categoría**: OS, Language, Hardware, Company, Web, AI, Innovation, Other
- 🎨 **Tema terminal retro**: Diseño inspirado en terminales clásicas con glassmorphism
- 🌐 **Multiidioma**: Contenido en español con formato de fechas localizado
- 🛡️ **Fallback robusto**: 50+ efemérides locales si falla la IA
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos

### v1.0.0
- 🤖 **Integración inicial con Gemini AI**
- ✅ **Validación con Zod**: Schema validation para respuestas de IA
- 🔒 **API segura**: Llamadas server-side, sin exposición de credenciales
- 📊 **Metadatos completos**: Fecha, año, título, descripción, categoría, impacto

---

## 🏗️ Arquitectura

```
┌─────────────┐
│   Usuario   │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────┐
│     Frontend (Next.js)          │
│  - EphemerisDisplay Component   │
│  - EphemerisHistory Component   │
└──────────┬──────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│   API Routes (Server-side)      │
│  - /api/ephemeris               │
│  - /api/ephemeris/history       │
└──────┬────────────┬─────────────┘
       │            │
       ▼            ▼
┌──────────┐   ┌──────────────┐
│ Supabase │   │  Gemini AI   │
│   Cache  │   │  Generator   │
└──────────┘   └──────────────┘
```

### Flujo de Caché
```
Request → Verificar Supabase → ¿Existe?
                                  │
                    ┌─────────────┴─────────────┐
                    ▼ SÍ                        ▼ NO
            Devolver cache              Generar con Gemini
            (source: 'cache')                   │
                                                ▼
                                        Guardar en Supabase
                                                │
                                                ▼
                                        Devolver respuesta
                                        (source: 'ai')
```

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 14.2.16 (App Router)
- **Lenguaje**: TypeScript 5.x
- **Estilos**: Tailwind CSS 3.4.1
- **UI**: React 18, Lucide Icons

### Backend
- **Runtime**: Node.js (Vercel Serverless)
- **API**: Next.js API Routes
- **Validación**: Zod 3.23.8

### Servicios Externos
- **IA**: Google Gemini 2.5 Flash (`@google/generative-ai`)
- **Base de Datos**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Autenticación DB**: Row Level Security (RLS)

### Herramientas de Desarrollo
- **Linter**: ESLint
- **Formatter**: Prettier (implícito)
- **Control de versiones**: Git + GitHub
- **Conventional Commits**: Mensajes en español

---

## 📦 Instalación

### Prerrequisitos
- Node.js 18.x o superior
- npm o pnpm
- Cuenta de Google AI Studio (para Gemini API)
- Cuenta de Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/wigsdev/code-history-day-web-2.0.git
cd code-history-day-web-2.0
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Gemini AI
GEMINI_API_KEY=tu_api_key_de_gemini

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 4. Configurar base de datos
Ejecuta el script SQL en Supabase SQL Editor:
```bash
# El archivo está en: supabase/schema.sql
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔧 Configuración

### Obtener API Keys

#### Google Gemini API
1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crea un nuevo API Key
3. Copia la key a tu `.env.local`

#### Supabase
1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a **Settings → API**
3. Copia:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 📁 Estructura del Proyecto

```
code-history-day-web-2.0/
├── app/
│   ├── api/
│   │   └── ephemeris/
│   │       ├── route.ts          # Endpoint principal con caché
│   │       └── history/
│   │           └── route.ts      # Endpoint de historial
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Página de inicio
├── components/
│   ├── ephemeris-display.tsx    # Componente de efeméride del día
│   ├── ephemeris-history.tsx    # Componente de historial
│   ├── terminal-header.tsx      # Header estilo terminal
│   ├── terminal-footer.tsx      # Footer con créditos
│   └── terminal-input.tsx       # Input decorativo
├── lib/
│   ├── gemini.ts                # Cliente de Gemini AI
│   └── supabase.ts              # Cliente y servicios de Supabase
├── supabase/
│   └── schema.sql               # Schema de base de datos
├── docs/
│   ├── SDLC_Plan.md             # Plan de desarrollo SDLC
│   ├── implementation_plan_v1.1.0.md
│   ├── walkthrough_v1.1.0.md    # Documentación de v1.1.0
│   ├── task.md                  # Lista de tareas
│   └── DEPLOYMENT.md            # Guía de despliegue
├── .env.example                 # Plantilla de variables de entorno
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🚢 Deployment en Vercel

### Opción 1: Deploy con GitHub (Recomendado)
1. Haz push de tu código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com)
3. Configura las variables de entorno en Vercel Dashboard
4. Deploy automático en cada push a `main`

### Opción 2: Deploy con CLI
```bash
npm install -g vercel
vercel
```

### Variables de Entorno en Vercel
Asegúrate de configurar todas las variables en:
**Project Settings → Environment Variables**

- `GEMINI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Marca las 3 opciones: **Production**, **Preview**, **Development**

---

## 📊 API Endpoints

### `GET /api/ephemeris`
Obtiene la efeméride del día (con caché).

**Respuesta exitosa (200):**
```json
{
  "id": "uuid",
  "date": "2025-11-30",
  "year": 2007,
  "title": "Lanzamiento de Amazon EBS",
  "description": "Amazon Web Services lanzó...",
  "category": "Innovation",
  "impact": "high",
  "source": "cache",
  "created_at": "2025-11-30T23:22:27+00:00",
  "updated_at": "2025-11-30T23:22:27+00:00"
}
```

### `GET /api/ephemeris/history?page=1&limit=10&category=OS`
Obtiene el historial de efemérides con paginación.

**Parámetros:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Resultados por página (default: 10, max: 50)
- `category` (opcional): Filtrar por categoría

**Respuesta exitosa (200):**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "category": "OS"
}
```

---

## 🎯 Roadmap

### ✅ v1.0.0 - AI Integration (Completado)
- Integración con Google Gemini
- Validación con Zod
- Fallback local

### ✅ v1.1.0 - Database & Caching (Completado)
- Supabase integration
- Sistema de caché inteligente
- Historial con paginación

### 🔜 v1.2.0 - Rate Limiting (Planeado)
- Rate limiting con Upstash Redis
- Límites por IP
- Headers de rate limit
- Página de error 429

### 💡 Futuro
- Dashboard de analytics
- Exportar historial (CSV/JSON)
- Búsqueda avanzada por texto
- Notificaciones de nuevas efemérides
- Modo oscuro/claro
- Internacionalización (i18n)

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Conventional Commits
Este proyecto sigue Conventional Commits en **español**:
```
feat(scope): descripción corta
fix(scope): corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: agregar tests
chore: tareas de mantenimiento
```

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👨‍💻 Autor

**Wilmer Gulcochía** ([@mysterio-wil](https://github.com/mysterio-wil))

Desarrollado con ❤️ desde Uchiza para el mundo

---

## 🙏 Agradecimientos

- [Google Gemini](https://ai.google.dev/) - IA generativa
- [Supabase](https://supabase.com/) - Backend as a Service
- [Vercel](https://vercel.com/) - Hosting y deployment
- [Next.js](https://nextjs.org/) - Framework de React
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS

---

## 📞 Soporte

Si encuentras algún problema o tienes sugerencias:
- 🐛 [Reportar un bug](https://github.com/wigsdev/code-history-day-web-2.0/issues)
- 💡 [Solicitar una feature](https://github.com/wigsdev/code-history-day-web-2.0/issues)
- 📧 Contacto: [GitHub Profile](https://github.com/mysterio-wil)

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**
