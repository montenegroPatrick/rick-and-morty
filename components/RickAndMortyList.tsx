/** @format */

"use client";
import useDebounce from "@/hooks/useDebounce";
import { Character } from "@/lib/types/characters";
import { useEffect, useMemo, useState } from "react";
import CharacterCard from "./cards/CharacterCard";
import { useRouter } from "next/navigation";
import { CharactersInfo } from "@/lib/types/characters";

import getCharacters from "@/lib/queries/getCharacters";

export interface RickAndMortyListProps {
  allCharacters: Character[];
  infos: CharactersInfo;
}
export default function RickAndMortyList({
  allCharacters,
  infos,
}: RickAndMortyListProps) {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [info, setInfo] = useState<CharactersInfo>(infos);
  const [characters, setCharacters] = useState<Character[]>(allCharacters);
  const debounceQuery = useDebounce<string>(query, 300);
  const router = useRouter();
  const filteredCharacters = useMemo(() => {
    if (!debounceQuery.trim()) {
      return characters;
    }

    return characters.filter((character) =>
      character.name.toLowerCase().includes(debounceQuery.toLowerCase()),
    );
  }, [characters, debounceQuery]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const characters = await getCharacters(currentPage);
      if (!characters || typeof characters === "string") {
        return;
      }
      setCharacters(characters.results);
      setInfo(characters.info);
    };
    fetchCharacters();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleCard = (character: Character) => {
    router.push(`/rickmorty/${character.id}`);
  };
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const handlePreviousPage = async () => {
    if (!info.prev) return;
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleNextPage = async () => {
    if (!info.next) return;
    if (currentPage < info.pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <h1 className="text-7xl font-extrabold">Rick and Morty</h1>
      <div className="w-full text-center p-4">
        <input
          className="border rounded-xl min-w-120 p-2"
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search ..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        {filteredCharacters.map((character) => (
          <button
            className="cursor-pointer"
            key={character.id}
            onClick={() => handleCard(character)}
          >
            <CharacterCard character={character} />
          </button>
        ))}
      </div>
      <div className="w-full flex justify-around px-8 py-4 gap-6">
        <button
          className="bg-gray-800/10 cursor-pointer border border-gray-400/20 rounded-xl p-2 disabled:opacity-50"
          disabled={!info.prev}
          onClick={handlePreviousPage}
        >
          Previous
        </button>

        {info.next && (
          <button
            className="bg-gray-800/10 cursor-pointer border border-gray-400/20 rounded-xl p-2 "
            onClick={handleNextPage}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
