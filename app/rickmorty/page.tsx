/** @format */

import RickAndMortyList from "@/components/RickAndMortyList";
import getCharacters from "@/lib/queries/getCharacters";
import { Characters } from "@/lib/types/characters";

export default async function RickAndMortyPage() {
  const data: Characters | string = await getCharacters(1);
  if (!data || typeof data === "string") {
    return <div>Error: {data}</div>;
  }

  const { results, info } = data;
  return <RickAndMortyList allCharacters={results} infos={info} />;
}
