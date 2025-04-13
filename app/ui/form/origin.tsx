'use client'

import { MapIcon } from "@heroicons/react/24/outline";
import AsyncSelectComponent from "./async-select";
import { searchOriginCities } from "@/app/lib/api/cities";
import { SingleValue } from "react-select";
import { useTravelStore } from "@/app/lib/store/store";

interface Option {
    value: string;
    label: string;
}

interface City {
    id: number;
    name: string;
}

export default function Origin() {
    const setOriginId = useTravelStore((state) => state.setOriginId)

    const loadOptions = async (inputValue: string, callback: (options: Option[]) => void) => {
        try {
            if (inputValue.length >= 3) {
                const response = await searchOriginCities(inputValue);
                const options: Option[] = response.data.map((city: City) => ({
                    value: city.id.toString(),
                    label: city.name,
                }));
                callback(options);
                return options;
            } else {
                callback([]);
                return [];
            }
        } catch (error) {
            console.error("Error fetching cities:", error);
            callback([]);
            return [];
        }
    };

    const handleOriginChange = (newValue: SingleValue<Option>) => {
        setOriginId(parseInt(newValue?.value ?? '0') || null);
    };

    return (
        <div className="mb-4">
            <label htmlFor="origen" className="mb-2 block text-sm font-semibold">
                Origen:
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <AsyncSelectComponent
                        name={'origen'}
                        id={'origen'}
                        placeholder={'¿De dónde sales?'}
                        loadOptions={loadOptions}
                        onChange={handleOriginChange}
                    />
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
    )
}