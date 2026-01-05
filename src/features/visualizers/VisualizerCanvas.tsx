import { useUIStore } from "../../state/uiStore";
import ArrayView from "./views/ArrayView";
import BarsView from "./views/BarsView";

type Props = {
  values: number[];
  active?: number[];
  sorted?: boolean[];
};

export default function VisualizerCanvas({ values, active = [], sorted = [] }: Props) {
  const visualizerType = useUIStore((s) => s.visualizerType);

  return (
    <div className="h-full w-full">
      {visualizerType === "bars" ? (
        <BarsView values={values} active={active} sorted={sorted} />
      ) : (
        <ArrayView values={values} active={active} sorted={sorted} />
      )}
    </div>
  );
}