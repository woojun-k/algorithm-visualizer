import { EngineInitializationError } from "./errors";
import type { Engine, EngineConfig } from "./types";
import { clampStep, getBaseStep, shouldCheckpoint } from "./checkpoint";

export function createEngine<E, S>(config: EngineConfig<E, S>): Engine<E, S> {
  const { events, initialState, checkpointEvery, adapter } = config;
  const N = events.length;
  const K = Math.max(1, Math.floor(checkpointEvery));

  // checkpoints: step -> state snapshot
  const checkpoints = new Map<number, S>();

  // step=0 저장(초기 상태)
  {
    const s0 = adapter.cloneState(initialState);
    checkpoints.set(0, s0);
  }

  // 체크포인트 미리 구축 (0, K, 2K, ...)
  // state는 누적 적용하며 진행하고, K마다 clone해서 저장
  {
    let working = adapter.cloneState(initialState);

    for (let i = 0; i < N; i++) {
      adapter.applyEvent(working, events[i]);
      const step = i + 1;

      if (shouldCheckpoint(step, K)) {
        checkpoints.set(step, adapter.cloneState(working));
      }
    }

    // 마지막 step=N이 K 배수가 아니면, 점프 성능을 위해 마지막도 저장
    if (!checkpoints.has(N)) {
      checkpoints.set(N, adapter.cloneState(working));
    }
  }

  function getStateAtStep(stepInput: number): S {
    const step = clampStep(stepInput, N);
    const baseStep = getBaseStep(step, K);

    const baseSnapshot = checkpoints.get(baseStep);
    if (!baseSnapshot) {
      const s0 = checkpoints.get(0);
      if (!s0) throw new EngineInitializationError("missing checkpoint at step 0");
      return adapter.cloneState(s0);
    }

    // base snapshot에서 출발해 step까지 이벤트 적용
    const state = adapter.cloneState(baseSnapshot);
    for (let i = baseStep; i < step; i++) {
      adapter.applyEvent(state, events[i]);
    }
    return state;
  }

  return {
    eventsLength: N,
    checkpointEvery: K,
    getStateAtStep,
  };
}
