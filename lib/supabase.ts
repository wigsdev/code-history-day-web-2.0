import { createClient } from '@supabase/supabase-js';

// Configuración del cliente de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Cliente con service_role para operaciones del servidor
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

// Tipos
export interface Ephemeris {
    id?: string;
    date: string; // formato YYYY-MM-DD
    year: number;
    title: string;
    description: string;
    category: 'OS' | 'Language' | 'Hardware' | 'Company' | 'Web' | 'AI' | 'Innovation' | 'Other';
    impact: 'high' | 'medium' | 'low';
    source?: 'ai' | 'cache' | 'manual';
    created_at?: string;
    updated_at?: string;
}

/**
 * Obtener efeméride por fecha
 */
export async function getEphemerisForDate(date: Date): Promise<Ephemeris | null> {
    try {
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD

        const { data, error } = await supabaseAdmin
            .from('ephemerides')
            .select('*')
            .eq('date', dateStr)
            .single();

        if (error) {
            if (error.code === 'PGRST116') {
                // No se encontró registro, esto es normal
                return null;
            }
            console.error('Error al consultar efeméride:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error en getEphemerisForDate:', error);
        return null;
    }
}

/**
 * Guardar nueva efeméride
 */
export async function saveEphemeris(ephemeris: Ephemeris): Promise<Ephemeris | null> {
    try {
        const { data, error } = await supabaseAdmin
            .from('ephemerides')
            .insert([{
                date: ephemeris.date,
                year: ephemeris.year,
                title: ephemeris.title,
                description: ephemeris.description,
                category: ephemeris.category,
                impact: ephemeris.impact,
                source: ephemeris.source || 'ai'
            }])
            .select()
            .single();

        if (error) {
            console.error('Error al guardar efeméride:', error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error en saveEphemeris:', error);
        return null;
    }
}

/**
 * Obtener historial de efemérides con paginación
 */
export async function getEphemerisHistory(
    limit: number = 10,
    offset: number = 0,
    category?: string
): Promise<{ data: Ephemeris[]; count: number }> {
    try {
        let query = supabaseAdmin
            .from('ephemerides')
            .select('*', { count: 'exact' })
            .order('date', { ascending: false })
            .range(offset, offset + limit - 1);

        if (category) {
            query = query.eq('category', category);
        }

        const { data, error, count } = await query;

        if (error) {
            console.error('Error al obtener historial:', error);
            return { data: [], count: 0 };
        }

        return { data: data || [], count: count || 0 };
    } catch (error) {
        console.error('Error en getEphemerisHistory:', error);
        return { data: [], count: 0 };
    }
}

/**
 * Eliminar efemérides antiguas (opcional, para limpieza)
 */
export async function deleteOldEphemerides(daysToKeep: number = 365): Promise<number> {
    try {
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
        const cutoffDateStr = cutoffDate.toISOString().split('T')[0];

        const { data, error } = await supabaseAdmin
            .from('ephemerides')
            .delete()
            .lt('date', cutoffDateStr)
            .select();

        if (error) {
            console.error('Error al eliminar efemérides antiguas:', error);
            return 0;
        }

        return data?.length || 0;
    } catch (error) {
        console.error('Error en deleteOldEphemerides:', error);
        return 0;
    }
}
