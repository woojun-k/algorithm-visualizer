type Props = {
  values: number[];
  active?: number[];
  sorted?: boolean[];
};

export default function BarsView({ values, active = [], sorted = [] }: Props) {
  const activeSet = new Set(active);
  const max = values.length > 0 ? Math.max(...values) : 1;

  if (values.length === 0) {
    return <div className="h-full grid place-items-center text-white/50">No data</div>;
  }

  return (
    <div className="h-full w-full flex gap-1">
      {values.map((v, idx) => {
        const pct = (v / max) * 100;
        const isActive = activeSet.has(idx);
        const isSorted = sorted?.[idx] === true;

        const barColor = isActive
          ? "bg-white/85"
          : isSorted
          ? "bg-white/45"
          : "bg-white/25";

        return (
          <div key={idx} className="flex-1 min-w-0 h-full flex items-end">
          <div
            className={[
              "w-full rounded-sm",
              "transition-[height,background-color] duration-150 ease-out",
              barColor,
              // isActive ? "outline outline-2 outline-white/60" : "",
            ].join(" ")}
            style={{ height: `${pct}%` }}
          />
          </div>
        );
      })}
    </div>
  );
}
