# Plan de Implementación v1.1.0: Database & Caching

## 🎯 Objetivo

Implementar un sistema de persistencia con Supabase que optimice el uso de la API de Gemini mediante caché inteligente, permita consultar el historial de efemérides y proteja la aplicación con rate limiting.

## 📊 Arquitectura de Datos

### Tabla: `ephemerides`

```sql
CREATE TABLE ephemerides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  year INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  impact VARCHAR(10) NOT NULL,
  source VARCHAR(10) DEFAULT 'ai',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para optimizar consultas
CREATE INDEX idx_ephemerides_date ON ephemerides(date DESC);
CREATE INDEX idx_ephemerides_category ON ephemerides(category);
CREATE INDEX idx_ephemerides_created_at ON ephemerides(created_at DESC);
```

## 🔄 Flujo de Caché (24h TTL)

```
Usuario solicita efeméride
    ↓
¿Existe en Supabase para hoy?
    ↓ NO                    ↓ SÍ
Generar con Gemini    Devolver desde DB
    ↓                       ↓
Guardar en Supabase   (sin llamada a Gemini)
    ↓                       ↓
Devolver al usuario ←-------┘
```

**Beneficios:**
- Reduce llamadas a Gemini (ahorro de costos)
- Mejora velocidad de respuesta
- Todos los usuarios ven la misma efeméride del día
- Construye historial automáticamente

## 🗂️ Cambios en Archivos

### 1. Variables de Entorno (`.env.local`)

```env
# Gemini AI
GEMINI_API_KEY=AIzaSy...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xuegqnvsbeulialiaggt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Nuevo: `lib/supabase.ts`

Cliente de Supabase con funciones:
- `getEphemerisForDate(date: Date)` - Consultar efeméride por fecha
- `saveEphemeris(data)` - Guardar nueva efeméride
- `getEphemerisHistory(limit, offset, category?)` - Obtener historial

### 3. Modificar: `app/api/ephemeris/route.ts`

**Lógica actualizada:**
```typescript
1. Verificar si existe efeméride para hoy en Supabase
2. Si existe: devolver desde DB
3. Si no existe:
   a. Generar con Gemini
   b. Guardar en Supabase
   c. Devolver al usuario
4. Fallback: si todo falla, usar ephemerisDatabase local
```

### 4. Nuevo: `app/api/ephemeris/history/route.ts`

Endpoint para consultar historial:
- `GET /api/ephemeris/history?page=1&limit=10&category=OS`
- Respuesta paginada con metadatos

### 5. Nuevo: `components/ephemeris-history.tsx`

Componente de UI para mostrar historial con:
- Paginación
- Filtros por categoría
- Búsqueda por fecha

## 🛡️ Rate Limiting (Fase 2)

**Herramienta:** Upstash Redis  
**Límite:** 10 requests/minuto por IP  
**Implementación:** Middleware de Next.js

## 📦 Dependencias Nuevas

```json
{
  "@supabase/supabase-js": "^2.39.0"
}
```

## 🧪 Plan de Pruebas

1. **Caché:**
   - Primera visita del día → genera con Gemini
   - Segunda visita del día → devuelve desde Supabase
   - Verificar que `source` cambia de `'ai'` a `'cache'`

2. **Historial:**
   - Consultar historial vacío
   - Generar varias efemérides
   - Verificar paginación y filtros

3. **Fallback:**
   - Desconectar Supabase temporalmente
   - Verificar que usa `ephemerisDatabase` local

## 🚀 Orden de Implementación

1. ✅ Configurar variables de entorno
2. ✅ Instalar dependencias de Supabase
3. ✅ Crear tabla en Supabase
4. ✅ Implementar `lib/supabase.ts`
5. ✅ Actualizar `/api/ephemeris` con lógica de caché
6. ✅ Crear endpoint `/api/ephemeris/history`
7. ✅ Crear componente de historial
8. ✅ Probar integración completa
9. ✅ Desplegar en Vercel
10. ✅ Crear tag v1.1.0

## ⚠️ Consideraciones

- **Migración de datos:** No hay datos previos que migrar (v1.0.0 no guardaba nada)
- **Compatibilidad:** El frontend actual seguirá funcionando sin cambios
- **Rollback:** Si falla, simplemente revertir a v1.0.0 (tag disponible)
