/** @format */

import { Character } from "@/lib/types/characters";
import CharacterStatusBadge from "./CharacterStatusBadge";
import Image from "next/image";

export interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, image, status, species, gender, origin, location } = character;

  return (
    <div className="w-full flex h-70 shadow-xl bg-gray-700/50 rounded-lg cursor-pointer">
      <div className="w-100 h-full relative">
        <Image
          fill
          className="object-cover rounded-l-xl"
          src={image}
          alt={name}
        />
      </div>
      <div className="flex flex-col w-full p-2">
        <h2 className="text-start w-full font-extrabold text-2xl">{name}</h2>
        <div className="flex w-fit items-center gap-2">
          <CharacterStatusBadge status={status} />
          <span>{"-"}</span>
          <p className="text-start w-fit text-ellipsis">{species}</p>
          <span>{"-"}</span>
          <p className="text-start w-fit text-ellipsis">{gender}</p>
        </div>
        <div className="flex flex-col items-start py-2">
          <p className="text-gray-300">Last known location :</p>
          <p className="text-start w-fit text-ellipsis">{location.name}</p>
        </div>
        <div className="flex flex-col items-start py-2">
          <p className="text-gray-300">First seen in :</p>
          <p className="text-start w-fit text-ellipsis">{origin.name}</p>
        </div>
      </div>
    </div>
  );
}
