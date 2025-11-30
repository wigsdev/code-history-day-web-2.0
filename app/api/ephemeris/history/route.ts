import { NextResponse } from 'next/server';
import { getEphemerisHistory } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // Parámetros de paginación
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const category = searchParams.get('category') || undefined;

        // Validar parámetros
        if (page < 1 || limit < 1 || limit > 50) {
            return NextResponse.json(
                { error: 'Invalid pagination parameters' },
                { status: 400 }
            );
        }

        const offset = (page - 1) * limit;

        // Obtener historial
        const { data, count } = await getEphemerisHistory(limit, offset, category);

        // Calcular metadatos de paginación
        const totalPages = Math.ceil(count / limit);

        return NextResponse.json({
            data,
            pagination: {
                page,
                limit,
                total: count,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            },
            category: category || 'all'
        });

    } catch (error) {
        console.error('Error en /api/ephemeris/history:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
