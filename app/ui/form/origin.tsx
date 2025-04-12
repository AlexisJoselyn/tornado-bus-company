'use client'

import { MapIcon } from "@heroicons/react/24/outline";
import AsyncSelectComponent from "./async-select";
import { useState } from "react";

interface Option {
    value: string;
    label: string;
}

export default function Origin() {
    const [options, setOptions] = useState<Option[]>([]);

    const loadOptions = async (inputValue: string, callback: (options: Option[]) => void) => {
        return new Promise<Option[]>((resolve) => {
            setTimeout(() => {
                const results = [
                    { value: 'chicago', label: 'Chicago' },
                    { value: 'los-angeles', label: 'Los Angeles' },
                    { value: 'new-york', label: 'New York' },
                    { value: 'san-francisco', label: 'San Francisco' },
                ].filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));

                callback(results);
                resolve(results);
            }, 1000);
        });
    };
   
    return (
        <div className="mb-4">
            <label htmlFor="origen" className="mb-2 block text-sm font-semibold">
                Origen:
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                    <AsyncSelectComponent name={'origen'} id={'origen'} placeholder={'¿De dónde sales?'} loadOptions={loadOptions} />
                    <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </div>
            </div>
        </div>
    )
}