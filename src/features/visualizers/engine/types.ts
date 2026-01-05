export type EngineAdapter<E, S> = {
  /** state를 "event 1개" 적용해서 다음 상태로 만든다. (mutate 방식 권장) */
  applyEvent: (state: S, event: E) => void;

  /** 체크포인트 저장/복원을 위해 state를 깊게 복사한다. */
  cloneState: (state: S) => S;
};

export type EngineConfig<E, S> = {
  events: readonly E[];
  initialState: S;
  checkpointEvery: number; // K
  adapter: EngineAdapter<E, S>;
};

export type Engine<E, S> = {
  readonly eventsLength: number;
  readonly checkpointEvery: number;
  getStateAtStep: (step: number) => S; // step in [0..N]
};