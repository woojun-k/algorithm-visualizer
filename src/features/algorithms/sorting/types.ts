export type SortingEvent =
  | { type: "compare"; i: number; j: number }
  | { type: "swap"; i: number; j: number }
  | { type: "markSorted"; i: number}
  | { type: "done" };

export type SortingState = {
  values: number[];
  active: number[];
  sorted: boolean[];
};