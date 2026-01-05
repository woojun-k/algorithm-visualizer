import { useUIStore } from "../../state/uiStore";

export default function Header() {
  const { selectedAlgoId } = useUIStore();

  return (
    <header className="h-full border-b border-white/10 px-4 flex items-center justify-between bg-white/2">
      <div className="flex items-center gap-3">
        <div className="font-semibold tracking-tight">Algorithm Visualizer</div>
        <div className="text-xs text-slate-400">{selectedAlgoId}</div>
      </div>
    </header>
  );
}
