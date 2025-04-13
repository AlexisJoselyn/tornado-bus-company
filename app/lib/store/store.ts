import { create } from 'zustand'

interface TravelState {
  originId: number | null
  setOriginId: (id: number | null) => void
}

export const useTravelStore = create<TravelState>()((set) => ({
  originId: null,
  setOriginId: (id) => set({ originId: id }),
}))