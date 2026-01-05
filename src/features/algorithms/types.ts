import type { VisualizerType } from "../../state/uiStore";

export type AlgorithmId = string;

export type AlgorithmItem = {
  id: AlgorithmId;
  label: string;
};

export type AlgorithmSection = {
  id: string;
  title: string;
  visualizerType: VisualizerType[];
  defaultVisualizerType: VisualizerType;
  items: AlgorithmItem[];
};