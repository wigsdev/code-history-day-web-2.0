"use client"

import { useEffect, useState } from 'react'

export function CurrentDateDisplay() {
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        setCurrentDate(
            new Date().toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        )
    }, [])

    return (
        <div className="border border-green-300/50 rounded p-3 mb-8 font-mono flex items-center">
            <svg
                className="w-5 h-5 text-green-300 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
            <span className="text-green-300">Fecha actual: {currentDate}</span>
        </div>
    )
}
