import { PassengerType } from '@/app/lib/types/passengers';
import { getPassengerTypes } from '@/app/lib/api/passenger';
import { useEffect, useState } from 'react';

interface PassengerSelectorProps {
    onPassengerChange: (counts: { [key: number]: number }, types: PassengerType[]) => void
  }

export default function PassengerSelector({ onPassengerChange }: PassengerSelectorProps) {
    const [passengerCounts, setPassengerCounts] = useState<{ [key: number]: number }>({});
    const [passengerTypes, setPassengerTypes] = useState<PassengerType[]>([]);

    useEffect(() => {
        const fetchPassengerTypes = async () => {
    
            try {
                const types = await getPassengerTypes();
                setPassengerTypes(types);
            } catch (err) {
                console.error("Error fetching cities:", err);
            }
        };

        fetchPassengerTypes();
    }, []);

    const handleCountChange = (typeId: number, newCount: number) => {
        const newCounts = { ...passengerCounts, [typeId]: newCount }
        setPassengerCounts(newCounts)
        onPassengerChange(newCounts, passengerTypes)
      }

    const handleIncrement = (typeId: number, e: React.MouseEvent) => {
        e.preventDefault()
        const newCount = (passengerCounts[typeId] || 0) + 1;
        setPassengerCounts({ ...passengerCounts, [typeId]: newCount });
        handleCountChange(typeId, newCount)
    };

    const handleDecrement = (typeId: number, e: React.MouseEvent) => {
        e.preventDefault()
        const newCount = Math.max((passengerCounts[typeId] || 0) - 1, 0);
        setPassengerCounts({ ...passengerCounts, [typeId]: newCount });
        handleCountChange(typeId, newCount)
    };

    return (
        <div className="space-y-4">
            {passengerTypes.map((type) => (
                <div key={type.id} className="flex justify-between items-center p-4 mb-0 border-b-1 border-x text-color-blue-800 bg-white">
                    <div>
                        <h3 className="font-semibold">{type.name}</h3>
                        <p className="text-sm text-gray-500">
                            De {type.ageMin} a {type.ageMax} años
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => handleDecrement(type.id, e)}
                            className="bg-gray-200 text-gray-700 p-2 rounded-full"
                        >
                            -
                        </button>
                        <span>{passengerCounts[type.id] || 0}</span>
                        <button
                            onClick={(e) => handleIncrement(type.id, e)}
                            className="bg-gray-200 text-gray-700 p-2 rounded-full"
                        >
                            +
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
