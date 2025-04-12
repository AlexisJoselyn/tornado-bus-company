'use client'

import { useEffect, useRef } from 'react'

interface DropdownProps {
    items: { id: number; name: string }[]
    isLoading: boolean
    onSelect: (name: string) => void
    onClose: () => void
}

export default function Dropdown({ items, isLoading, onSelect, onClose }: DropdownProps) {
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    if (isLoading) {
        return (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm">
                <div className="px-4 py-2 text-gray-500">Buscando...</div>
            </div>
        )
    }

    if (items.length === 0) {
        return null // No mostrar nada si no hay resultados
    }

    return (
        <div
            ref={dropdownRef}
            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm max-h-60 overflow-auto"
        >
            {items.map((item) => (
                <button
                    key={item.id}
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                        onSelect(item.name)
                        onClose()
                    }}
                >
                    {item.name}
                </button>
            ))}
        </div>
    )
}