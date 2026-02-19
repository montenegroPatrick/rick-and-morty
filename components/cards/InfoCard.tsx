/** @format */

export default function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col gap-1 bg-gray-400/30 shadow-xl  rounded-xl p-4 border border-gray-400/20">
      <span className="text-xs uppercase tracking-widest text-gray-300 font-semibold">
        {label}
      </span>
      <span className="text-sm font-medium truncate">{value}</span>
    </div>
  );
}
