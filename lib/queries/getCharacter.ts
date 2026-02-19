/** @format */
"use server";
import { API_URL } from "../constants";
import { Character } from "../types/characters";

export default async function getCharacter(
  id: number,
): Promise<Character | string> {
  try {
    const response = await fetch(`${API_URL}/character/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch character ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error fetching character ${id}:`, error.message);
      return error.message;
    }
    return "Error fetching character";
  }
}
