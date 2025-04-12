import { CitiesResponse } from "@/app/@types/cities";

const BASE_URL = 'https://discovery.local.onroadts.com/v1/web';

export const searchOriginCities = async (query: string): Promise<CitiesResponse> => {
    const response = await fetch(`${BASE_URL}/select/origin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value: query }),
    });

    if (!response.ok) {
        throw new Error('Error al buscar ciudades de origen');
    }

    return response.json();
};