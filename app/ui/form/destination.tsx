'use client'

import { MapIcon } from "@heroicons/react/24/outline";
import AsyncSelectComponent from "./async-select";
import { searchDestinations } from "@/app/lib/api/cities";
import { useTravelStore } from "@/app/store";

interface Option {
    value: string;
    label: string;
}

interface City {
    id: number;
    name: string;
}

export default function Destination() {
    const originId = useTravelStore((state) => state.originId)
    
    const loadOptions = async (inputValue: string, callback: (options: Option[]) => void) => {
    
        if (originId && inputValue.length >= 3) {
            try {
                const response = await searchDestinations(originId, inputValue);
                const options: Option[] = response.data.map((city: City) => ({
                    value: city.id.toString(),
                    label: city.name,
                }));
                callback(options);
                return options;
            } catch (error) {
                console.error("Error fetching destinations:", error);
                callback([]);
                return [];
            }
        } else {
            callback([]);
            return [];
        }
    };

    return (
        <div className="mb-4">
            <label htmlFor="destino" className="mb-2 block text-sm font-semibold">
                Destino:
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <AsyncSelectComponent
                        name={'destino'}
                        id={'destino'}
                        placeholder={'¿A dónde vas?'}
                        loadOptions={loadOptions}
                    />
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
    )
}