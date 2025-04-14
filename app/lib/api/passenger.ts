import { PassengerType } from "@/app/lib/types/passengers";
import { SeatResponse } from "../types/seats";
import { MarkSeatPayload } from "../types/mark";

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

export const getAvailableSeats = async (
  travelId: number,
  cityInitId: number,
  cityEndId: number
): Promise<SeatResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/list/seats/${travelId}/${cityInitId}/${cityEndId}`, {
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
      throw new Error('Error al obtener los asientos disponibles');
    }
    
    return await response.json();
  } catch (error) {
     
    console.error('Error fetching available seats:', error);
    throw error;
  }
};

export const putMarkSeat = async (payload: MarkSeatPayload) => {
  const res = await fetch(`${BASE_URL}/list/seats/mark`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al marcar el asiento");
  }
  return data;
};