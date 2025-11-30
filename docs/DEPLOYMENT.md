# 🚀 Guía de Despliegue: Code History Day Web 2.0

Esta guía detalla los pasos necesarios para desplegar la aplicación en un entorno de producción, específicamente optimizado para Vercel, aunque aplicable a otros proveedores de hosting de Next.js.

## 📋 Prerrequisitos

1.  **Cuenta de GitHub**: El código debe estar en un repositorio remoto.
2.  **Cuenta de Vercel** (o proveedor similar): Para el hosting.
3.  **API Key de Google Gemini**: Necesaria para la generación de efemérides.

## ⚙️ Configuración de Variables de Entorno

En tu entorno de producción, debes configurar la siguiente variable de entorno. **NO** subas el archivo `.env.local` al repositorio.

| Variable | Descripción | Ejemplo |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Tu clave de API de Google AI Studio | `AIzaSy...` |

> [!IMPORTANT]
> Asegúrate de que tu API Key tenga permisos para usar el modelo `gemini-2.5-flash`.

## 📦 Pasos de Despliegue en Vercel

1.  **Importar Proyecto**:
    *   Ve a tu dashboard de Vercel.
    *   Haz clic en "Add New..." > "Project".
    *   Selecciona tu repositorio de GitHub `code-history-day-web-2.0`.

2.  **Configurar Proyecto**:
    *   **Framework Preset**: Next.js (se detectará automáticamente).
    *   **Root Directory**: `./` (por defecto).
    *   **Environment Variables**:
        *   Añade `GEMINI_API_KEY` con tu clave real.

3.  **Desplegar**:
    *   Haz clic en "Deploy".
    *   Vercel construirá tu proyecto. Si todo es correcto, verás la pantalla de "Congratulations!".

## 🛠️ Verificación Post-Despliegue

Una vez desplegado, verifica lo siguiente:

1.  **Carga Inicial**: La página debe cargar y mostrar la fecha actual correctamente.
2.  **Generación de Efeméride**:
    *   Deberías ver el mensaje "Conectando con Gemini AI...".
    *   Luego, debe aparecer la efeméride con la etiqueta `AI POWERED`.
3.  **Fallback (Prueba de Robustez)**:
    *   Si la API falla (puedes simularlo invalidando la variable de entorno temporalmente), la aplicación debe mostrar una efeméride con la etiqueta `[ARCHIVE]`.

## 🔄 Mantenimiento

*   **Logs**: Revisa los logs de Vercel (Runtime Logs) si encuentras errores 500 o 503.
*   **Actualización de Dependencias**: Ejecuta `npm update` periódicamente y prueba en local antes de subir cambios.
*   **Caché**: Actualmente la aplicación genera contenido en cada visita (SSR). Considera implementar caché si el tráfico aumenta significativamente.

---
**Estado del Build Local:**
Para asegurar que el código está listo, ejecuta siempre antes de un push:
```bash
npm run build
```
Si este comando termina con `✓ Compiled successfully`, tu código es seguro para desplegar.
