import { create } from "zustand";

export type AlgoLogLevel = "info" | "warn" | "error";

export type AlgoLog = {
  id: string;
  at: number;
  level: AlgoLogLevel;
  message: string;
};

type AlgoLogState = {
  logs: AlgoLog[];
  emit: (level: AlgoLogLevel, message: string) => void;
  clear: () => void;
};

function makeId() {
  // 브라우저 지원되는 경우가 대부분이지만, fallback도 둠
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export const useAlgoLogStore = create<AlgoLogState>((set) => ({
  logs: [
    { id: makeId(), at: Date.now(), level: "info", message: "Ready. (algo logs)" },
  ],
  emit: (level, message) =>
    set((s) => ({
      logs: [{ id: makeId(), at: Date.now(), level, message }, ...s.logs],
    })),
  clear: () => set({ logs: [] }),
}));
