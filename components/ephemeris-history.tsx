'use client';

import { useState, useEffect } from 'react';

interface Ephemeris {
    id: string;
    date: string;
    year: number;
    title: string;
    description: string;
    category: string;
    impact: string;
    source: string;
    created_at: string;
}

interface HistoryResponse {
    data: Ephemeris[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
    category: string;
}

const CATEGORIES = ['all', 'OS', 'Language', 'Hardware', 'Company', 'Web', 'AI', 'Innovation', 'Other'];

export default function EphemerisHistory() {
    const [history, setHistory] = useState<HistoryResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        fetchHistory();
    }, [page, category]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const categoryParam = category === 'all' ? '' : `&category=${category}`;
            const response = await fetch(`/api/ephemeris/history?page=${page}&limit=10${categoryParam}`);
            const data = await response.json();
            setHistory(data);
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getCategoryColor = (cat: string) => {
        const colors: Record<string, string> = {
            OS: 'bg-blue-500/20 text-blue-300',
            Language: 'bg-purple-500/20 text-purple-300',
            Hardware: 'bg-orange-500/20 text-orange-300',
            Company: 'bg-green-500/20 text-green-300',
            Web: 'bg-cyan-500/20 text-cyan-300',
            AI: 'bg-pink-500/20 text-pink-300',
            Innovation: 'bg-yellow-500/20 text-yellow-300',
            Other: 'bg-gray-500/20 text-gray-300',
        };
        return colors[cat] || colors.Other;
    };

    if (loading && !history) {
        return (
            <div className="w-full max-w-4xl mx-auto p-6">
                <div className="text-center text-green-400">Cargando historial...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-green-400">📚 Historial de Efemérides</h2>
                <p className="text-sm text-green-300/70">
                    {history?.pagination.total || 0} efemérides guardadas
                </p>
            </div>

            {/* Filtro de categorías */}
            <div className="flex flex-wrap gap-2 justify-center">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setCategory(cat);
                            setPage(1);
                        }}
                        className={`px-3 py-1 rounded text-xs font-mono transition-all ${category === cat
                                ? 'bg-green-500 text-black'
                                : 'bg-green-900/30 text-green-400 hover:bg-green-800/40'
                            }`}
                    >
                        {cat === 'all' ? 'TODAS' : cat}
                    </button>
                ))}
            </div>

            {/* Lista de efemérides */}
            <div className="space-y-4">
                {history?.data.map((item) => (
                    <div
                        key={item.id}
                        className="border border-green-500/30 rounded-lg p-4 bg-black/40 hover:bg-black/60 transition-all"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className={`px-2 py-0.5 rounded text-xs font-mono ${getCategoryColor(item.category)}`}>
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-green-400 font-mono">{item.year}</span>
                                    <span className="text-xs text-green-300/50">{formatDate(item.date)}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-green-300">{item.title}</h3>
                                <p className="text-sm text-green-200/80">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginación */}
            {history && history.pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={!history.pagination.hasPrev}
                        className="px-4 py-2 rounded bg-green-900/30 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-800/40 transition-all font-mono text-sm"
                    >
                        ← Anterior
                    </button>
                    <span className="text-sm text-green-300 font-mono">
                        Página {history.pagination.page} de {history.pagination.totalPages}
                    </span>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={!history.pagination.hasNext}
                        className="px-4 py-2 rounded bg-green-900/30 text-green-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-800/40 transition-all font-mono text-sm"
                    >
                        Siguiente →
                    </button>
                </div>
            )}

            {/* Mensaje si no hay datos */}
            {history && history.data.length === 0 && (
                <div className="text-center text-green-400/70 py-8">
                    No hay efemérides en esta categoría aún.
                </div>
            )}
        </div>
    );
}
