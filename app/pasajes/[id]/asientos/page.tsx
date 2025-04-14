'use client';

import { useSearchStore } from '@/app/lib/store/store';
import { useTicketStore } from '@/app/lib/store/ticketStore';
import { MarkSeatPayload } from '@/app/lib/types/mark';
import { Seat, SeatLevel } from '@/app/lib/types/seats';
import { BusLevel } from '@/app/ui/bus/bus-level';
import { useEffect, useState } from 'react';

export default function Page() {
  const selectedTravel = useTicketStore((state) => state.selectedTravel);
  const fetchSeats = useTicketStore((state) => state.fetchSeats);
  const seats = useTicketStore((state) => state.seats);
  const loadingSeats = useTicketStore((state) => state.loadingSeats);
  const searchData = useSearchStore((state) => state.searchData)
  const markSeats = useTicketStore((state) => state.markSeats);
  const totalDetail = useTicketStore((state) => state.totalDetail);
  const searchDataStore = useSearchStore((state) => state.searchData)


  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const passengerCount = searchData?.passengers || 1;

  useEffect(() => {
    if (selectedTravel) {
      fetchSeats(selectedTravel.id, Number(searchDataStore.origin), Number(searchDataStore.destination));
    }
  }, [selectedTravel]);

  const handleSeatSelect = async (seat: Seat) => {
    const isSelected = selectedSeats.some((s) => s.id === seat.id);

    let updatedSeats = [];
    if (isSelected) {
      updatedSeats = selectedSeats.filter((s) => s.id !== seat.id);
    } else if (selectedSeats.length < passengerCount) {
      updatedSeats = [...selectedSeats, seat];
    } else {
      alert('Ya has seleccionado el máximo de asientos permitidos.');
      return;
    }

    setSelectedSeats(updatedSeats);

    if (updatedSeats.length > 0) {
      const payload: MarkSeatPayload = {
        tickeTypeID: 1,
        ticketSessionId: null,
        cityInitID: selectedTravel.cityInitID,
        cityEndID: selectedTravel.cityEndID,
        itineraryID: selectedTravel.id,
        busPlaceID: updatedSeats.map((s) => s.id),
        tempTicketId: null,
        ticketRef: null,
        idMulti: null,
        isReturn: false,
        currencyID: 1,
        mDestiny: null,
        mOrigin: null,
        mRow: null,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        externalInitID: null,
        externalEndID: null,
      };

      try {
        await markSeats(payload);
      } catch (err) {
        console.error('Error al marcar asiento:', err);
      }
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
      {totalDetail && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">
            Total: {totalDetail.subtotal} + {totalDetail.tax} = {totalDetail.total}
          </p>
        </div>
      )}
    </div>
  );
}
