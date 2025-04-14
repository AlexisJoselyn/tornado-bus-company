import { create } from 'zustand';
import { DepartureTravel } from '../types/travels';
import { SeatLevel } from '../types/seats';
import { getAvailableSeats, putMarkSeat } from '../api/passenger';
import { MarkSeatPayload, TotalDetail } from '../types/mark';

interface TravelStore {
  selectedTravel: DepartureTravel;
  seats: SeatLevel[];
  loadingSeats: boolean;
  setSelectedTravel: (travel: DepartureTravel) => void;
  fetchSeats: (travelId: number, cityInitId: number, cityEndId: number) => Promise<void>;
  ticketSessionId: number | null;
  totalDetail: TotalDetail | null;
  markSeats: (payload: MarkSeatPayload) => Promise<void>;
  cartDetail: null,
  isCartOpen: boolean;
  toggleCart: () => void;
  totalSeats: number;
  setTotalSeats: (total: number) => void
}

export const useTicketStore = create<TravelStore>((set) => ({

  selectedTravel: {} as DepartureTravel,
  seats: [],
  loadingSeats: false,
  ticketSessionId: null,
  totalDetail: null,
  cartDetail: null,
  isCartOpen: false,
  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),
  totalSeats: 0,

  setSelectedTravel: (travel) => set({ selectedTravel: travel }),
  setTotalSeats: (total) => set({totalSeats: total}),
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
  },
  markSeats: async (payload) => {
    try {
      const response = await putMarkSeat(payload);
      set({
        ticketSessionId: response.data.ticketSessionId,
        totalDetail: response.data.totalDetail,
        seats: response.data.busSketch,
      });
    } catch (err) {
      console.error("Error al marcar asiento:", err);
    }
  }

}));
