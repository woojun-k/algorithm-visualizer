import type { EngineAdapter } from "../../visualizers/engine/types";
import type { SortingEvent, SortingState } from "./types";
import { applySortingEvent } from "./apply";

export const sortingAdapter: EngineAdapter<SortingEvent, SortingState> = {
  applyEvent: applySortingEvent,

  cloneState: (s) => ({
    values: s.values.slice(),
    active: s.active.slice(),
    sorted: s.sorted.slice(),
  }),
};