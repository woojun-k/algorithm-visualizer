import type { AlgorithmId } from "../types";
import type { SortingEvent, SortingState } from "./types";
import { sortingAdapter } from "./adapter";
import { bubbleSortEvents } from "./generators/bubbleSort";
import { selectionSortEvents } from "./generators/selectionSort";
import { quickSortEvents } from "./generators/quickSort";

type SortingRuntime = {
  makeEvents: (values: number[]) => SortingEvent[];
  makeInitialState: (values: number[]) => SortingState;
  adapter: typeof sortingAdapter;
};

const RUNTIMES: Record<AlgorithmId, SortingRuntime> = {
  "sorting/bubble-sort": {
    makeEvents: bubbleSortEvents,
    makeInitialState: (values) => ({
      values: values.slice(),
      active: [],
      sorted: Array(values.length).fill(false),
    }),
    adapter: sortingAdapter,
  },
  "sorting/selection-sort": {
    makeEvents: selectionSortEvents,
    makeInitialState: (values) => ({
      values: values.slice(),
      active: [],
      sorted: Array(values.length).fill(false),
    }),
    adapter: sortingAdapter,
  },
  "sorting/quick-sort": {
    makeEvents: quickSortEvents,
    makeInitialState: (values) => ({
      values: values.slice(),
      active: [],
      sorted: Array(values.length).fill(false),
    }),
    adapter: sortingAdapter,
  },
};

export function getSortingRuntime(algoId: AlgorithmId): SortingRuntime {
  return RUNTIMES[algoId] ?? RUNTIMES["sorting/bubble-sort"];
}