import type { SortingEvent, SortingState } from "./types";
import { swapInPlace } from "./utils/swap";

export function applySortingEvent(state: SortingState, event: SortingEvent): void {
  switch (event.type) {
    case "compare": {
      state.active = [event.i, event.j];
      return;
    }
    case "swap": {
      swapInPlace(state.values, event.i, event.j);
      state.active = [event.i, event.j];
      return;
    }
    case "markSorted": {
      state.sorted[event.i] = true;
      state.active = [];
      return;
    }
    case "done": {
      state.active = [];
      return;
    }
    default: {
      // exhaustive check
      const exhaustiveCheck: never = event;
      throw new Error(`Unhandled event type: ${(exhaustiveCheck as any).type}`);
    }
  }
}
