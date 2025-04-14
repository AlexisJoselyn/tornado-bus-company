import { CitiesResponse, DestinationsResponse } from "@/app/lib/types/cities";
import { DepartureTravelFilters, DepartureTravelsResponse } from "@/app/lib/types/travels";

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

export const searchDestinations = async (
    cityInitId: number | null,
    value: string
  ): Promise<DestinationsResponse> => {
    const response = await fetch(`${BASE_URL}/select/destiny/${cityInitId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
  
    if (!response.ok) {
      throw new Error('Error al buscar destinos');
    }
  
    return response.json();
  };

  export const listDepartureTravels = async (
    filters: DepartureTravelFilters,
    limit: number = 25,
    page: number = 1
  ): Promise<DepartureTravelsResponse> => {
    const response = await fetch(
      `${BASE_URL}/list/departure-travels?isMultiRoute=true&isReturn=false`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          limit,
          page,
          filters,
        }),
      }
    );
    if (!response.ok) {
      throw new Error('Error al listar los viajes de salida');
    }
    
    const responseData = await response.json();
  
    return responseData;
  };