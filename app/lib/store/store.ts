import { create } from 'zustand'

interface TravelState {
  originId: number | null
  setOriginId: (id: number | null) => void
}

interface SearchParams {
  date: string
  origin: string
  destination: string
  passengers: number
  tripType?: string
}

interface SearchStore {
  searchData: SearchParams | null
  setSearchData: (data: SearchParams) => void
  clearSearchData: () => void
}

export const useTravelStore = create<TravelState>()((set) => ({
  originId: null,
  setOriginId: (id) => set({ originId: id }),
}))

export const useSearchStore = create<SearchStore>((set) => ({
  searchData: null,
  setSearchData: (data) => set({ searchData: data }),
  clearSearchData: () => set({ searchData: null })
}))