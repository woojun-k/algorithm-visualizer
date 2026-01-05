import type { ReactNode } from "react";
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Square,
  RotateCcw,
} from "lucide-react";

import type { PlaybackStatus, SpeedMultiplier } from "./types"; 

type Props = {
  status: PlaybackStatus;

  canStepBack: boolean;
  canStepForward: boolean;
  canReturn: boolean;

  speed: SpeedMultiplier;
  setSpeed: (v: SpeedMultiplier) => void;

  onStepBack: () => void;
  onTogglePlay: () => void;
  onStepForward: () => void;
  onStopReset: () => void;
  onReturn: () => void;

  extraRight?: ReactNode;
};

const SPEEDS: SpeedMultiplier[] = [0.25, 0.5, 1, 2, 4];

function IconBtn({
  disabled,
  onClick,
  children,
}: {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[
        "h-7 w-7 inline-flex items-center justify-center",
        "border border-white/10 bg-white/[0.03] hover:bg-white/[0.08]",
        "disabled:opacity-40 disabled:hover:bg-white/[0.03] disabled:cursor-not-allowed",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SpeedBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-7 px-2 text-xs",
        "border border-white/10",
        active ? "bg-white/[0.12] text-white" : "bg-white/[0.03] text-white/70 hover:bg-white/[0.08]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function VisualizerControls(props: Props) {
  const isRunning = props.status === "running";

  return(
    <div className="w-full flex items-center justify-between gap-3 p-5">
      {/* LEFT: playback controls */}
      <div className="flex items-center gap-1">
        <IconBtn
          label="Step back"
          disabled={!props.canStepBack}
          onClick={props.onStepBack}
        >
          <SkipBack size={18} />
        </IconBtn>

        <IconBtn
          label={isRunning ? "Pause" : "Play"}
          onClick={props.onTogglePlay}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </IconBtn>

        <IconBtn
          label="Step forward"
          disabled={!props.canStepForward}
          onClick={props.onStepForward}
        >
          <SkipForward size={18} />
        </IconBtn>

        <IconBtn label="Stop (Reset)" onClick={props.onStopReset}>
          <Square size={18} />
        </IconBtn>

        <IconBtn
          label="Return to start"
          disabled={!props.canReturn}
          onClick={props.onReturn}
        >
          <RotateCcw size={18} />
        </IconBtn>
      </div>

      {/* RIGHT: speed + extra options */}
      <div className="flex items-center gap-3">
        
        {/* algo-specific slot */}
        {props.extraRight ? (
          <div className="flex items-center gap-2">{props.extraRight}</div>
        ) : null}

        {/* speed */}
        <div className="flex items-center">
          <span className="mr-2 text-xs text-white/50">Speed</span>
          <div className="flex gap-1">
            {SPEEDS.map((s) => (
              <SpeedBtn
                key={s}
                active={props.speed === s}
                onClick={() => props.setSpeed(s)}
              >
                x{s}
              </SpeedBtn>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}