/** @format */

import BackButton from "@/components/buttons/backButton";
import CharacterStatusBadge from "@/components/cards/CharacterStatusBadge";

import InfoCard from "@/components/cards/InfoCard";
import getCharacter from "@/lib/queries/getCharacter";

export interface params {
  id: string;
}

export default async function CharacterDetail({
  params,
}: {
  params: Promise<params>;
}) {
  const { id } = await params;
  const data = await getCharacter(Number(id));

  if (!data || typeof data === "string") {
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 text-center max-w-sm">
          <p className="text-red-400 font-semibold text-lg">Erreur</p>
          <p className="text-gray-500 text-sm mt-2">
            {data ?? "Personnage introuvable"}
          </p>
        </div>
      </div>
    );
  }

  const episodeCount = data.episode.length;

  return (
    <div className="min-h-screen ">
      <div className="w-full  flex h-full gap-6 text-white">
        <div className="relative w-1/2 h-full ">
          <div className="relative">
            <img
              className="w-full object-cover "
              src={data.image}
              alt={data.name}
            />
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-gray-900/60" />
            <div className="absolute top-2 left-2 text-white">
              <BackButton />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <CharacterStatusBadge status={data.status} />
              <h1 className="text-3xl font-extrabold text-white leading-tight">
                {data.name}
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                {data.species}
                {data.type ? ` · ${data.type}` : ""}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-8 p-3 gap-3">
          <InfoCard label="Genre" value={data.gender} />
          <InfoCard label="Espèce" value={data.species} />
          <InfoCard label="Origine" value={data.origin.name} />
          <InfoCard label="Dernière localisation" value={data.location.name} />
          <InfoCard label="Épisodes" value={episodeCount} />
        </div>
      </div>
    </div>
  );
}
