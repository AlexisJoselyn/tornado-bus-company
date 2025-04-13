export interface City {
    id: number;
    name: string;
    nameExternal: string | null;
    nameInit: string | null;
    key: string;
    isExternalCityInit: number;
    cityAbrev: string;
    baseInitId: number | null;
    baseEndId: number | null;
    abrev: string;
}

export interface CitiesResponse {
    data: City[];
    message: string;
    statusCode: number;
    success: boolean;
}

export interface OriginProps {
    onCitySelect: (city: City) => void;
    selectedCity?: City | null;
}

export interface Destination {
    id: number;
    name: string;
    nameExternal: string | null;
    key: string;
    isExternalCityEnd: number;
    baseEndId: number | null;
    nameEnd: string | null;
    isMultiroute: number;
    abrev: string;
  }
  
export interface DestinationsResponse {
    data: Destination[];
    message: string;
    statusCode: number;
    success: boolean;
  }