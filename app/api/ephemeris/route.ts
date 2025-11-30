import { NextResponse } from 'next/server';
import { generateEphemeris } from '@/lib/gemini';
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
        console.log("GEMINI_API_KEY present:", !!process.env.GEMINI_API_KEY);

        const today = new Date();

        // Intentar generar con Gemini
        console.log("Calling generateEphemeris...");
        const aiData = await generateEphemeris(today);
        console.log("generateEphemeris result:", aiData);

        if (aiData) {
            // Validar con Zod
            const validation = EphemerisSchema.safeParse(aiData);

            if (validation.success) {
                console.log("Validation success");
                return NextResponse.json({
                    ...validation.data,
                    source: 'ai'
                });
            } else {
                console.error("Validation error:", validation.error);
            }
        } else {
            console.error("generateEphemeris returned null");
        }

        // Fallback si falla la IA o la validación
        // En un caso real, aquí podríamos leer de una base de datos local o devolver un error controlado
        // Por ahora devolvemos un error 503 para que el frontend use su fallback local
        return NextResponse.json(
            { error: "Failed to generate ephemeris" },
            { status: 503 }
        );

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
