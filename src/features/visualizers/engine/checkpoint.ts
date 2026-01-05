export function clampStep(step: number, max: number): number {
  if (!Number.isFinite(step)) return 0;
  const s = Math.floor(step);
  if (s < 0) return 0;
  if (s > max) return max;
  return s;
}

export function getBaseStep(step: number, K: number): number {
  const k = Math.max(1, Math.floor(K));
  return step - (step % k);
}

export function shouldCheckpoint(step: number, K: number): boolean {
  const k = Math.max(1, Math.floor(K));
  return step % k === 0;
}
