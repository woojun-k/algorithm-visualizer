type Props = {
  values: number[];
  active?: number[];
  sorted?: boolean[];
};

export default function ArrayView({ values, active = [], sorted = [] }: Props) {
  const activeSet = new Set(active);

  if (values.length === 0) {
    return <div className="h-full grid place-items-center text-white/50">No data</div>;
  }

  return (
    <div className="h-full w-full grid place-items-center">
      <div className="flex flex-wrap justify-center gap-2">
        {values.map((v, idx) => {
          const isActive = activeSet.has(idx);
          const isSorted = sorted?.[idx] === true;

          return (
            <div
              key={idx}
              className={[
                "border border-white/10 bg-white/[0.03]",
                "w-20 h-16 px-3 py-2",          // 카드 크기
                "flex flex-col",                // 인덱스 위, 값 아래
                isSorted ? "bg-white/[0.08]" : "bg-white/[0.03]",
                isActive ? "outline outline-2 outline-white/60" : "",
              ].join(" ")}
            >
              {/* index: box 상단에 붙음 */}
              <div className="text-xs text-white/50 leading-none self-start">
                #{idx}
              </div>

              {/* value: box 내부 중앙 */}
              <div className="flex-1 grid place-items-center">
                <div className="text-sm text-white/90 font-semibold">{v}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
