import { Seat, SeatLevel } from '@/app/lib/types/seats';
import React from 'react';
import { SeatComponent } from './seat';


interface Props {
  level: SeatLevel;
  onSeatSelect: (seat: Seat) => void;
  selectedSeatIds: number[];
}

export const BusLevel: React.FC<Props> = ({ level, onSeatSelect, selectedSeatIds }) => {
  const { rows, columns, seats } = level;

  const getSeatAt = (row: number, column: number): Seat | undefined =>
    seats.find((seat) => seat.row === row && seat.column === column);

  return (
    <div className="mb-8 bg-blue-50 rounded-lg p-4 shadow-md border-orange-600 border-2">
      <h3 className="text-lg font-semibold mb-2">Nivel {level.nivel}</h3>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: rows }).map((_, rowIdx) =>
          Array.from({ length: columns }).map((_, colIdx) => {
            const seat = getSeatAt(rowIdx + 1, colIdx + 1);
            return (
              <SeatComponent
                key={`${rowIdx}-${colIdx}`}
                seat={seat}
                onClick={onSeatSelect}
                isSelected={seat ? selectedSeatIds.includes(seat.id) : false}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
