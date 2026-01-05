import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { AlgorithmId } from "../features/algorithms/types";

export type VisualizerType = "array" | "bars";

type UIState = {
  sidebarOpen: boolean;
  selectedAlgoId: AlgorithmId;
  visualizerType: VisualizerType;

  toggleSidebar: () => void;
  setSelectedAlgo: (id: AlgorithmId) => void;
  setVisualizerType: (t: VisualizerType) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      selectedAlgoId: "sorting/bubble-sort",
      visualizerType: "array",

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSelectedAlgo: (id) => set({ selectedAlgoId: id }),
      setVisualizerType: (t) => set({ visualizerType: t }),
    }),
    {
      name: "algo-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        sidebarOpen: s.sidebarOpen,
        selectedAlgoId: s.selectedAlgoId,
        visualizerType: s.visualizerType,
      }),
    }
  )
);