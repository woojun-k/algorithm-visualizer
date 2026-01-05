import type { SortingEvent } from "../types";
import { swapInPlace } from "../utils/swap";

function partitionLomuto(
  arr: number[],
  lo: number,
  hi: number,
  events: SortingEvent[]
): number {
  const pivotIndex = hi;
  const pivot = arr[pivotIndex];

  let i = lo;

  for (let j = lo; j < hi; j++) {
    // j 와 pivot 비교
    events.push({ type: "compare", i: j, j: pivotIndex });

    if (arr[j] < pivot) {
      if (i !== j) {
        swapInPlace(arr, i, j);
        events.push({ type: "swap", i, j });
      }
      i++;
    }
  }

  // pivot을 제자리로
  if (i !== pivotIndex) {
    swapInPlace(arr, i, pivotIndex);
    events.push({ type: "swap", i, j: pivotIndex });
  }

  // pivot 위치 확정
  events.push({ type: "markSorted", i });

  return i;
}

export function quickSortEvents(input: number[]): SortingEvent[] {
  const arr = input.slice();
  const events: SortingEvent[] = [];

  const n = arr.length;
  if (n <= 1) {
    if (n === 1) events.push({ type: "markSorted", i: 0 });
    events.push({ type: "done" });
    return events;
  }

  const stack: Array<[number, number]> = [[0, n - 1]];

  while (stack.length > 0) {
    const [lo, hi] = stack.pop()!;

    if (lo > hi) continue;

    // 길이 1 구간은 그 인덱스 확정(UX 개선)
    if (lo === hi) {
      events.push({ type: "markSorted", i: lo });
      continue;
    }

    const p = partitionLomuto(arr, lo, hi, events);

    // p는 확정이라 제외하고 좌/우만 스택에 넣음
    const left: [number, number] = [lo, p - 1];
    const right: [number, number] = [p + 1, hi];

    // 스택 깊이 줄이기: 큰 구간 먼저 push
    const leftLen = left[1] - left[0];
    const rightLen = right[1] - right[0];

    if (leftLen > rightLen) {
      stack.push(left);
      stack.push(right);
    } else {
      stack.push(right);
      stack.push(left);
    }
  }

  events.push({ type: "done" });
  return events;
}
