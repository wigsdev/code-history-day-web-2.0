import { NextResponse } from 'next/server';
import { generateEphemeris } from '@/lib/gemini';
import { getEphemerisForDate, saveEphemeris } from '@/lib/supabase';
import { z } from 'zod';

// Esquema de validación
const EphemerisSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    year: z.number().int().min(1900).max(2030),
    title: z.string().min(5).max(100),
    description: z.string().min(20).max(500),
    category: z.enum(["OS", "Language", "Hardware", "Company", "Web", "AI", "Innovation", "Other"]),
    impact: z.enum(["high", "medium", "low"]),
});

export async function GET() {
    try {
        console.log("API /api/ephemeris called");

        const today = new Date();
        const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD

        // PASO 1: Verificar si existe en Supabase (caché)
        console.log("Checking Supabase for existing ephemeris...");
        const cachedEphemeris = await getEphemerisForDate(today);

        if (cachedEphemeris) {
            console.log("✅ Found in cache (Supabase)");
            return NextResponse.json({
                ...cachedEphemeris,
                source: 'cache'
            });
        }

        // PASO 2: No existe en caché, generar con Gemini
        console.log("Not in cache, generating with Gemini...");
        console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);

        const aiData = await generateEphemeris(today);
        console.log("generateEphemeris result:", aiData);

        if (aiData) {
            // Validar con Zod
            const validation = EphemerisSchema.safeParse(aiData);

            if (validation.success) {
                console.log("✅ Validation success");

                // PASO 3: Guardar en Supabase para futuras consultas
                const ephemerisToSave = {
                    date: dateStr,
                    year: validation.data.year,
                    title: validation.data.title,
                    description: validation.data.description,
                    category: validation.data.category,
                    impact: validation.data.impact,
                    source: 'ai' as const
                };

                const saved = await saveEphemeris(ephemerisToSave);

                if (saved) {
                    console.log("✅ Saved to Supabase");
                } else {
                    console.warn("⚠️ Failed to save to Supabase, but continuing...");
                }

                return NextResponse.json({
                    ...validation.data,
                    source: 'ai'
                });
            } else {
                console.error("❌ Validation error:", validation.error);
            }
        } else {
            console.error("❌ generateEphemeris returned null");
        }

        // PASO 4: Fallback - si todo falla, devolver 503 para que el frontend use su fallback local
        console.log("⚠️ Using fallback (returning 503)");
        return NextResponse.json(
            { error: "Failed to generate ephemeris" },
            { status: 503 }
        );

    } catch (error) {
        console.error("❌ API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

