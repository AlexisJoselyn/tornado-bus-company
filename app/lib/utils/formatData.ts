import { PassengerType } from "@/app/lib/types/passengers";
import { DepartureTravelFilters, FormDataParams } from "@/app/lib/types/travels";

export const prepareTravelFilters = (
  formData: FormDataParams,
  totalPassengers: number
): DepartureTravelFilters => {
  return {
    date: formData.date,
    city: [Number(formData.origin), Number(formData.destination)] as [number, number],
    passengerNumber: totalPassengers,
    passengerDisabilityNumber: 0,
    orderTravel: 1060,          
    orderMaxMinTravel: 1,        
    isPoint: false,
    currencyID: 567,             
    externalInitId: 0,
    externalEndId: 0,
    routeID: null,
    _rowId: null
  };
};

export const formatPassengerCounts = (counts: { [key: number]: number }, types: PassengerType[]): string => {
    return types
        .map((type) => {
            const count = counts[type.id] || 0
            return count > 0 ? `${count} ${type.name}` : null
        })
        .filter(Boolean)
        .join(", ")
}