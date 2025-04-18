'use client'

import { ArrowsRightLeftIcon, ArrowRightIcon, UserGroupIcon, CalendarIcon } from "@heroicons/react/24/outline";
import Destination from "./destination";
import Origin from "./origin";
import PassengerSelector from "./passenger";
import { useRef, useState } from "react";
import { PassengerType } from "@/app/lib/types/passengers";
import { formatPassengerCounts } from "@/app/lib/utils/formatData";
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchStore } from "@/app/lib/store/store";
import { getMidDate } from "@/app/lib/utils/formatDates";

export default function SearchForm() {
    const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);
    const [passengerInputValue, setPassengerInputValue] = useState("");
    const [passengerCounts, setPassengerCounts] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams();
    const setSearchData = useSearchStore((state) => state.setSearchData)
    const [tripType, setTripType] = useState('one-way');
    const dateInputRef = useRef<HTMLInputElement>(null);

    

    const handleTripTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTripType(event.target.value);
    };

    const handlePassengerChange = (counts: { [key: number]: number }, types: PassengerType[]) => {
        const formatted = formatPassengerCounts(counts, types)
        setPassengerInputValue(formatted)
        setPassengerCounts(counts);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const formData = Object.fromEntries(
                new FormData(e.currentTarget as HTMLFormElement)
            ) as {
                status: string
                origin: string
                destination: string
                date: string
                'return-date'?: string
            }

            const totalPassengers = Object.values(passengerCounts).reduce((sum, count) => sum + count, 0)

            const params = new URLSearchParams(searchParams.toString())
            params.set('date', formData.date)
            params.set('origin', formData.origin)
            params.set('destination', formData.destination)
            params.set('passengers', totalPassengers.toString())
            params.set('tripType', formData.status)
            if (formData.status === 'round-trip') {
                if (!formData['return-date']) {
                    alert('La fecha de regreso es obligatoria para un viaje de ida y vuelta')
                    return
                }
                params.set('return-date', formData['return-date'] || '')
            }

            setSearchData({
                date: formData.date,
                origin: formData.origin,
                destination: formData.destination,
                passengers: totalPassengers,
                tripType: formData.status
            })

            router.push(`/pasajes?${params.toString()}`)

        } catch (error) {
            console.error('Error al redirigir:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDateInputClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 w-full max-w-xl p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-800">Encuentra el viaje ideal para ti</h1>
            {/* Departure and return options */}
            <div className="flex gap-4">
                <div className="flex items-center">
                    <input
                        id="one-way"
                        name="status"
                        type="radio"
                        value="one-way"
                        checked={tripType === 'one-way'}
                        onChange={handleTripTypeChange}
                        className="h-4 w-4 cursor-pointer focus:ring-2"
                        aria-describedby="customer-error"
                    />
                    <label
                        htmlFor="one-way"
                        className="ml-1 flex cursor-pointer items-center gap-1.5 rounded-full py-1.5 text-s font-semibold"
                    >
                        Solo ida <ArrowRightIcon className="h-4 w-4" />
                    </label>
                </div>
                <div className="flex items-center">
                    <input
                        id="round-trip"
                        name="status"
                        type="radio"
                        value="round-trip"
                        checked={tripType === 'round-trip'}
                        onChange={handleTripTypeChange}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                    />
                    <label
                        htmlFor="round-trip"
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
                <label htmlFor="date" className="mb-2 block text-sm font-semibold">
                    Fecha de salida:
                </label>
                <div className="relative mt-2 rounded-md" onClick={handleDateInputClick}>
                    <div className="relative">
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${false ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ width: '240px' }}
                            disabled={false}
                            placeholder="Selecciona una fecha"
                            ref={dateInputRef}
                            min={getMidDate()}
                        />
                        <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            {/* Return date (only if round-trip) */}
            {tripType === 'round-trip' && (
                <div className="mb-4">
                    <label htmlFor="return-date" className="mb-2 block text-sm font-semibold">
                        Fecha de regreso:
                    </label>
                    <div className="relative mt-2 rounded-md" onClick={handleDateInputClick}>
                        <div className="relative">
                            <input
                                type="date"
                                id="return-date"
                                name="return-date"
                                className={`peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] ${false ? 'opacity-50 cursor-not-allowed' : ''}`}
                                style={{ width: '240px' }}
                                disabled={false}
                                placeholder="Selecciona una fecha"
                                ref={dateInputRef}
                                min={getMidDate()}
                            />
                            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                    </div>
                </div>
            )}
            {/* Submit button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ width: '240px' }}
            >
                Buscar
            </button>
        </form>
    )
}