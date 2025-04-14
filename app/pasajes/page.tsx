import { DepartureTravelFilters } from "../@types/travels"
import { listDepartureTravels } from "../lib/api/cities"
import { prepareTravelFilters } from "../lib/utils/formatData"
import TravelCard from "../ui/travel/travel-card"

export default async function Page({
    searchParams
}: {
    searchParams: {
        date: string
        origin: string
        destination: string
        passengers: string
        tripType: string
    }
}) {
    const {date, origin, destination, passengers} = await searchParams
    
    const apiFilters: DepartureTravelFilters = prepareTravelFilters({
        date: date,
        origin: origin,
        destination: destination,
    }, Number(passengers) || 1);

    const { data: travels } = await listDepartureTravels(apiFilters)

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Resultados de búsqueda</h1>

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