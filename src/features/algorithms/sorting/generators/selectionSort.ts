import type { SortingEvent } from "../types";

export function selectionSortEvents(input: number[]): SortingEvent[] {
  const arr = input.slice();
  const events: SortingEvent[] = [];

  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      events.push({ type: "compare", i: minIdx, j });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      const tmp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = tmp;

      events.push({ type: "swap", i, j: minIdx });
    }

    events.push({ type: "markSorted", i });
  }

  events.push({ type: "done" });
  return events;
}