import type { SortingEvent } from "../types";

export function bubbleSortEvents(input: number[]): SortingEvent[] {
  const arr = input.slice();
  const events: SortingEvent[] = [];

  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      events.push({ type: "compare", i: j, j: j + 1 });

      if (arr[j] > arr[j + 1]) {
        const tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
        swapped = true;

        events.push({ type: "swap", i: j, j: j + 1 });
      }

      if (j == n - 2 - i) events.push({ type: "markSorted", i: n - 1 - i });
    }

    if (!swapped) {
      // The rest of the elements are already sorted
      for (let k = n - 1 - i; k >= 0; k--) {
        events.push({ type: "markSorted", i: k });
      }
      break;
    }
  }

  events.push({ type: "done" });
  return events;
}