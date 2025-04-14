import { DepartureTravel } from '@/app/@types/travels'
import { MapPinIcon } from '@heroicons/react/24/outline'

interface TravelCardProps {
  travel: DepartureTravel
}

export default function TravelCard({ travel }: TravelCardProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-base font-semibold text-gray-800">{travel.cityInit}</h3>
          <p className="text-sm text-gray-600">{travel.HourInitFormat}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 justify-center sm:justify-start">
            <MapPinIcon className="text-orange-500 w-4 h-4" />
            <span className="truncate">{travel.addressInit}</span>
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500">{travel.travelTime}</p>
          <div className="h-px w-16 bg-gray-300 my-2 sm:h-16 sm:w-px sm:my-0" />
        </div>
        
        <div className="flex-1 text-center sm:text-right">
          <h3 className="text-base font-semibold text-gray-800">{travel.cityEnd}</h3>
          <p className="text-sm text-gray-600">{travel.HourEndFormat}</p>
          <p className="text-xs text-gray-400 flex items-center gap-1 justify-center sm:justify-end">
            <MapPinIcon className="text-orange-500 w-4 h-4" />
            <span className="truncate">{travel.addressEnd}</span>
          </p>
        </div>
      </div>
      
      <hr className="my-4 border-gray-200" />
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="text-sm text-gray-700">Rutas:</p>
          <p className="text-xs text-gray-500">{travel.routesNames}</p>
        </div>
        
        <div className="text-center">
          <p className="text-2xl font-semibold text-blue-600">
            {travel.amount} <span className="text-sm">{travel.currency}</span>
          </p>
        </div>
        
        <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition w-full sm:w-auto">
          SELECCIONAR
        </button>
      </div>
    </div>
  )
}