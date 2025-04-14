import React from 'react';
import clsx from 'clsx';
import { Seat } from '@/app/lib/types/seats';

interface Props {
  seat?: Seat;
  onClick: (seat: Seat) => void;
  isSelected: boolean;
}

export const SeatComponent: React.FC<Props> = ({ seat, onClick, isSelected }) => {
  if (!seat || seat.seat === 0) {
    return <div className="w-8 h-8 border border-gray-300 bg-transparent" />;
  }

  const isAvailable = seat.idStatus === 663;

  return (
    <button
      className={clsx(
        'w-8 h-8 border rounded text-xs flex items-center justify-center',
        {
          'bg-gray-200 text-gray-500 cursor-not-allowed': !isAvailable,
          'bg-green-400': isAvailable && !isSelected,
          'bg-blue-500 text-white': isSelected,
        }
      )}
      disabled={!isAvailable}
      onClick={() => onClick(seat)}
      title={`Asiento ${seat.seat}`}
    >
      {seat.seat}
    </button>
  );
};
