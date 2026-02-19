/** @format */

export interface Characters {
  info: CharactersInfo;
  results: Character[];
}

export interface CharactersInfo {
  count: number;
  pages: number;
  next: string;
  prev: null;
}
export type status = "Alive" | "Dead" | "Unknown";
export interface Character {
  id: number;
  name: string;
  status: status;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Location {
  name: string;
  url: string;
}
