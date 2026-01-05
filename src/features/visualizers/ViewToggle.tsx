import { ChevronRight } from "lucide-react";
import type { VisualizerType } from "../../state/uiStore";

type Props = {
  supported: readonly VisualizerType[];
  value: VisualizerType;
  onChange: (t: VisualizerType) => void;
};

const LABEL: Record<VisualizerType, string> = {
  array: "Array",
  bars: "Bars",
};

export default function ViewToggle({ supported, value, onChange }: Props) {
  if (supported.length <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <ChevronRight size={14} className="shrink-0 text-white/70" />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as VisualizerType)}
        className={[
          "bg-transparent",
          "text-xs text-white/80",
          "border-b border-white/20",
          "h-6 w-24",                  // 밑줄 길이(원하면 w-32 같은 걸로)
          "focus:outline-none focus:border-white/50",
          "appearance-none",           // 기본 화살표 제거
          "cursor-pointer",
        ].join(" ")}
      >
        {supported.map((t) => (
          <option key={t} value={t} className="text-black">
            {LABEL[t]}
          </option>
        ))}
      </select>
    </div>
  );
}