import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { Vehicle } from "@/lib/types"

interface ComparisonState {
  comparisonList: Vehicle[]
  addVehicle: (vehicle: Vehicle) => void
  removeVehicle: (id: string) => void
  clearComparison: () => void
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set) => ({
      comparisonList: [],

      addVehicle: (vehicle) =>
        set((state) => {
          // Don't add if already in list or if list is full
          if (state.comparisonList.some((v) => v.id === vehicle.id) || state.comparisonList.length >= 3) {
            return state
          }
          return { comparisonList: [...state.comparisonList, vehicle] }
        }),

      removeVehicle: (id) =>
        set((state) => ({
          comparisonList: state.comparisonList.filter((vehicle) => vehicle.id !== id),
        })),

      clearComparison: () => set({ comparisonList: [] }),
    }),
    {
      name: "ultimate-continental-comparison-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true, // Add this to prevent hydration issues
    },
  ),
)
