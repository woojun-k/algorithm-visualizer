import type { AlgorithmId, AlgorithmSection } from "./types";

export function findSectionByAlgoId(algoId: AlgorithmId) {
  return ALGORITHM_SECTIONS.find((s) =>
    s.items.some((item) => item.id === algoId)
  );
}

export const ALGORITHM_SECTIONS: AlgorithmSection[] = [
  {
    id: "sorting",
    title: "Sorting",
    visualizerType: ["bars", "array"],
    defaultVisualizerType: "array",
    items: [
      { id: "sorting/bubble-sort", label: "Bubble Sort" },
      { id: "sorting/selection-sort", label: "Selection Sort" },
      { id: "sorting/quick-sort", label: "Quick Sort" },
    ],
  },
  {
    id: "graph",
    title: "Graph Traversal",
    visualizerType: ["bars", "array"],
    defaultVisualizerType: "array",
    items: [
      { id: "graph/bfs", label: "BFS" },
      { id: "graph/dfs", label: "DFS" },
    ],
  },
];