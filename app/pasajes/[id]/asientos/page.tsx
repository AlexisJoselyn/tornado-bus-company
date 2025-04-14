'use client';

import { useSearchStore } from '@/app/lib/store/store';
import { useTicketStore } from '@/app/lib/store/ticketStore';
import { Seat, SeatLevel } from '@/app/lib/types/seats';
import { BusLevel } from '@/app/ui/bus/bus-level';
import { useEffect, useState } from 'react';

export default function Page() {
  const selectedTravel = useTicketStore((state) => state.selectedTravel);
  const fetchSeats = useTicketStore((state) => state.fetchSeats);
  const seats = useTicketStore((state) => state.seats);
  const loadingSeats = useTicketStore((state) => state.loadingSeats);
  const searchData = useSearchStore((state) => state.searchData)

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const passengerCount = searchData?.passengers || 1;

  useEffect(() => {
    if (selectedTravel) {
      fetchSeats(selectedTravel.id, selectedTravel.cityInitID, selectedTravel.cityEndID);
    }
  }, [selectedTravel]);

  const handleSeatSelect = (seat: Seat) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats((prev) => [...prev, seat]);
      // call API to reserve the seat
    } else {
        alert('Ya has seleccionado el máximo de asientos permitidos.');
    }
  };

  if (!selectedTravel) return <p>No hay viaje seleccionado.</p>;
  if (loadingSeats) return <p>Cargando asientos...</p>;

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Selecciona tus asientos</h2>
      {seats.map((level: SeatLevel) => (
        <BusLevel
          key={level.nivel}
          level={level}
          selectedSeatIds={selectedSeats.map((s) => s.id)}
          onSeatSelect={handleSeatSelect}
        />
      ))}
    </div>
  );
}
