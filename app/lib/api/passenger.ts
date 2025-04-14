import { PassengerType } from "@/app/lib/types/passengers";

const BASE_URL = 'https://api.local.onroadts.com/v1/web';

export const getPassengerTypes = async (): Promise<PassengerType[]> => {
    const response = await fetch(`${BASE_URL}/select/type`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'es',
            'Origin': 'https://web.local.onroadts.com',
            'Referer': 'https://web.local.onroadts.com/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
        },
    });

    if (!response.ok) {
        throw new Error('Error al obtener los tipos de pasajero');
    }

    const data = await response.json();
    return data.data;
};