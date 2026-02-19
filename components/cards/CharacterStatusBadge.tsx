/** @format */

export interface CharacterStatusBadgeProps {
  status: string;
}
export const statusConfig: Record<
  string,
  { color: string; text: string; label: string }
> = {
  Alive: { color: "bg-green-500", text: "text-green-400", label: "Vivant" },
  Dead: { color: "bg-red-500", text: "text-red-400", label: "Décédé" },
  unknown: { color: "bg-gray-500", text: "text-gray-400", label: "Inconnu" },
};
export default function CharacterStatusBadge({
  status,
}: CharacterStatusBadgeProps) {
  const statusCard = statusConfig[status] ?? statusConfig.unknown;
  return (
    <div
      className={`flex shadow-xl w-fit items-center gap-1 rounded-lg px-2  bg-gray-500/80`}
    >
      <div className={`w-3 h-3 rounded-full ${statusCard.color}`}></div>
      <p className="text-start w-full text-ellipsis">{statusCard.label}</p>
    </div>
  );
}
