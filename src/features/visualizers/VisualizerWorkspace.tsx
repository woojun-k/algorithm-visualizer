import { useEffect, useMemo, useState } from "react";
import VisualizerCanvas from "./VisualizerCanvas";
import VisualizerControls from "./VisualizerControls";

import type { PlaybackStatus, SpeedMultiplier } from "./types";
import type { SortingEvent, SortingState  } from "../algorithms/sorting/types";
import { createEngine } from "./engine/engine";
import { useUIStore, type VisualizerType } from "../../state/uiStore";
import { findSectionByAlgoId } from "../algorithms/registry";
import ViewToggle from "./ViewToggle";
import { makeRandomArray } from "./utils/random";
import { getSortingRuntime } from "../algorithms/sorting/runtimeRegistry";

const FALLBACK_VIEWS = ["array"] as const;

export default function VisualizerWorkspace() {
  const [initialValues, setValues] = useState<number[]>(
    () => makeRandomArray(50, 1, 999)
  );
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [speed, setSpeed] = useState<SpeedMultiplier>(1);
  const [cursor, setCursor] = useState(0);

  // view toggle
  const visualizerType = useUIStore(s => s.visualizerType);
  const setVisualizerType = useUIStore(s => s.setVisualizerType);
  const selectedAlgoId = useUIStore((s) => s.selectedAlgoId);
  const section = findSectionByAlgoId(selectedAlgoId);

  const runtime = useMemo(() => {
    if (section?.id !== "sorting") return null;
    return getSortingRuntime(selectedAlgoId);
  }, [section?.id, selectedAlgoId]);

  const events = useMemo(() => {
    if (!runtime) return [] as SortingEvent[];
    return runtime.makeEvents(initialValues);
  }, [runtime, initialValues]);

  const engine = useMemo(() => {
    if (!runtime) return null;

    return createEngine<SortingEvent, SortingState>({
      events,
      initialState: runtime.makeInitialState(initialValues),
      checkpointEvery: 25,
      adapter: runtime.adapter,
    });
  }, [runtime, initialValues, events]);

  const eventsLen = engine?.eventsLength ?? 0;
  const cursorSafe = Math.min(cursor, eventsLen);
  const viewState: SortingState = engine
    ? engine.getStateAtStep(cursorSafe)
    : { values: initialValues, active: [] as number[], sorted: Array(initialValues.length).fill(false), };

  const supportedViews: readonly VisualizerType[] = section?.visualizerType ?? FALLBACK_VIEWS;;
  const defaultView = section?.defaultVisualizerType ?? "array";

  useEffect(() => {
    if (!supportedViews.includes(visualizerType)) {
      setVisualizerType(defaultView);
    }
  }, [supportedViews, visualizerType, defaultView, setVisualizerType]);

  useEffect(() => {
    setCursor(0);
    setStatus("idle");
  }, [selectedAlgoId, initialValues]);
  
  useEffect(() => {
    if (status !== "running") return;
    if (!engine) return;
    if (eventsLen <= 0) return;

    const targetTotalMs = 9000; // 1x 기준 전체 9초 목표
    const baseMs = Math.max(16, Math.floor(targetTotalMs / Math.max(1, eventsLen)));
    const intervalMs = Math.max(16, Math.floor(baseMs / speed));

    const id = window.setInterval(() => {
      setCursor((c) => {
        if (c >= eventsLen) return c;

        const next = c + 1;
        if (next >= eventsLen) {
          setStatus("done"); // 마지막 도달하면 종료
          return eventsLen;
        }
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [status, speed, eventsLen, engine, setCursor, setStatus]);

  return(
    <div className="h-full min-h-0 grid grid-rows-[minmax(0,1fr)_auto]">
      {/* canvas */}
      <div className="min-h-0 overflow-hidden">
        <div className="h-full min-h-0 overflow-auto p-3">
          <VisualizerCanvas
            values={viewState.values}
            active={viewState?.active}
            sorted={viewState?.sorted}
          />
        </div>
      </div>

      {/* controls */}
      <div className="border-t border-white/10 h-10 flex items-center">
        <VisualizerControls
          status={status}
          speed={speed}
          setSpeed={setSpeed}
          canStepBack={cursor > 0}
          canStepForward={cursor < eventsLen}
          canReturn={cursor > 0}
          onStepBack={() => {
            setCursor((c) => Math.max(0, c - 1));
            setStatus("paused");
          }}
          onTogglePlay={() => {
            if (cursor >= eventsLen) setCursor(0);
            setStatus((s) => (s === "running" ? "paused" : "running"));
          }}
          onStepForward={() => {
            setCursor((c) => Math.min(eventsLen, c + 1));
            setStatus("paused");
          }}
          onStopReset={() => {
            setStatus("idle");
            setCursor(0);
            // 여기서 values도 초기화하고 싶으면 setValues(initialValues) 같은 걸 추가
          }}
          onReturn={() => {
            setCursor(0);
            setStatus("paused");
            // cursor 기준으로 values를 되돌리는 로직은 나중에 replay로 연결
          }}
          extraRight={
            <ViewToggle supported={supportedViews} value={visualizerType} onChange={setVisualizerType}/>
          }
        />
      </div>
    </div>
  );
}