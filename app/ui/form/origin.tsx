'use client'

import { searchOriginCities } from '@/app/lib/api/cities'
import { MapIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import Dropdown from './dropdown'

export default function Origin() {
    const [query, setQuery] = useState('')
    const [cities, setCities] = useState<{ id: number; name: string }[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    // Buscar ciudades con debounce
    useEffect(() => {
        if (query.length < 3) {
            setCities([])
            return
        }

        const timer = setTimeout(async () => {
            setIsLoading(true)
            try {
                const response = await searchOriginCities(query)
                setCities(response.data)
                setShowDropdown(true)
            } catch (error) {
                console.error('Error buscando ciudades:', error)
                setCities([])
            } finally {
                setIsLoading(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    return (
        <div className="mb-4 relative">
            <label htmlFor="origin" className="mb-2 block text-sm font-semibold">
                Origen:
            </label>
            <div className="relative">
                <input
                    id="origin"
                    name="origin"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 0 && setShowDropdown(true)}
                    placeholder="¿De dónde sales?"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
                <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                {showDropdown && (
                    <Dropdown
                        items={cities}
                        isLoading={isLoading}
                        onSelect={(name) => {
                            setQuery(name)
                            setShowDropdown(false)
                        }}
                        onClose={() => setShowDropdown(false)}
                    />
                )}
            </div>
        </div>
    )
}