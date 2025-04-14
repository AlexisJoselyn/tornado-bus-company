import { create } from 'zustand';
import { DepartureTravel } from '../types/travels';
import { SeatLevel } from '../types/seats';
import { getAvailableSeats } from '../api/passenger';

interface TravelStore {
  selectedTravel: DepartureTravel | null;
  seats: SeatLevel[];
  loadingSeats: boolean;
  setSelectedTravel: (travel: DepartureTravel) => void;
  fetchSeats: (travelId: number, cityInitId: number, cityEndId: number) => Promise<void>;
}

export const useTicketStore = create<TravelStore>((set) => ({
  selectedTravel: null,
  seats: [],
  loadingSeats: false,

  setSelectedTravel: (travel) => set({ selectedTravel: travel }),

  fetchSeats: async (travelId, cityInitId, cityEndId) => {
    set({ loadingSeats: true });
    try {
      const response = await getAvailableSeats(travelId, cityInitId, cityEndId);
      set({ seats: response.data });
    } catch (err) {
      console.error('Error cargando asientos:', err);
    } finally {
      set({ loadingSeats: false });
    }
  }
}));
