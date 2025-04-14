'use client'


import { useEffect, useState } from 'react'
import { useSearchStore } from '../lib/store/store'
import { listDepartureTravels } from '../lib/api/cities'
import { DepartureTravel, DepartureTravelFilters } from '../lib/types/travels'
import { prepareTravelFilters } from '../lib/utils/formatData'
import TravelCard from '../ui/travel/travel-card'

export default function PasajesPage() {
    const searchData = useSearchStore((state) => state.searchData)
    const [travels, setTravels] = useState<DepartureTravel[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTravels = async () => {
            if (!searchData) {
                window.location.href = '/'
                return
            }

            try {
              
                const filters: DepartureTravelFilters = prepareTravelFilters({
                    date: searchData.date,
                    origin: searchData.origin,
                    destination: searchData.destination,
                }, Number(searchData.passengers) || 1);

                const { data: response } = await listDepartureTravels(filters)

                setTravels(response)
            } catch (error) {
                console.error('Error fetching travels:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTravels()
    }, [searchData])

    if (loading) {
        return <div className="text-center py-8">Cargando resultados...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Tickets:</h1>

            {travels.length > 0 ? (
                <div className="grid gap-4">
                    {travels.map((travel, index) => (
                        <TravelCard key={index} travel={travel} />
                    ))}
                </div>
            ) : (
                <p className="text-center py-8">No se encontraron viajes</p>
            )}
        </div>
    )
}