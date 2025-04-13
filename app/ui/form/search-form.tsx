import { ArrowsRightLeftIcon, ArrowRightIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Destination from "./destination";
import Origin from "./origin";
import PassengerSelector from "./passenger";
import { useState } from "react";
import { PassengerType } from "@/app/@types/passengers";

export default function SearchForm() {
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const [passengerInputValue, setPassengerInputValue] = useState("")

    const handlePassengerChange = (counts: { [key: number]: number }, types: PassengerType[]) => {
        const formatted = formatPassengerCounts(counts, types)
        setPassengerInputValue(formatted)
    }

    const formatPassengerCounts = (counts: { [key: number]: number }, types: PassengerType[]): string => {
        return types
            .map((type) => {
                const count = counts[type.id] || 0
                return count > 0 ? `${count} ${type.name}` : null
            })
            .filter(Boolean)
            .join(", ")
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)

        const data = {
            tripType: formData.get('status'),
            origin: formData.get('origen'),
            destination: formData.get('destino'),
            passengers: passengerInputValue,
            date: formData.get('fecha')
        }

        console.log('Datos a enviar:', data)
        // Aquí harías la llamada a tu API
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 w-full max-w-3xl p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-800">Encuentra el viaje ideal para ti</h1>
            {/* Departure and return options */}
            <div className="flex gap-4">
                <div className="flex items-center">
                    <input
                        id="ida"
                        name="status"
                        type="radio"
                        value="ida"
                        className="h-4 w-4 cursor-pointer focus:ring-2"
                        aria-describedby="customer-error"
                    />
                    <label
                        htmlFor="ida"
                        className="ml-1 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 text-s font-semibold"
                    >
                        Solo ida <ArrowRightIcon className="h-4 w-4" />
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="idavuelta"
                        name="status"
                        type="radio"
                        value="idavuelta"
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                        htmlFor="idavuelta"
                        className="ml-1 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 text-s font-semibold"
                    >
                        Ida y vuelta <ArrowsRightLeftIcon className="h-4 w-4" />
                    </label>
                </div>
            </div>
            {/* Origin */}
            <Origin />
            {/* Destination */}
            <Destination />
            {/* Passengers */}
            <div className="mb-4">
                <label htmlFor="pasajeros" className="mb-2 block text-sm font-semibold">
                    Pasajeros:
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            type="text"
                            id="pasajeros"
                            name="pasajeros"
                            value={passengerInputValue}
                            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${false ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ width: '240px' }}
                            disabled={false}
                            placeholder="Número de pasajeros"
                            readOnly
                            onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                        />
                        <UserGroupIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                {showPassengerDropdown && (
                    <PassengerSelector onPassengerChange={handlePassengerChange} />
                )}

            </div>
            {/* Departure date */}
            <div className="mb-4">
                <label htmlFor="fecha" className="mb-2 block text-sm font-semibold">
                    Fecha de salida:
                </label>
                <div className="relative mt-2 rounded-md">
                    <div className="relative">
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${false ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ width: '240px' }}
                            disabled={false}
                            placeholder="Selecciona una fecha"
                        />
                        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Buscar
            </button>
        </form>
    )
}