/** @format */
"use server";
import { revalidatePath } from "next/cache";
import { API_URL } from "../constants";
import { Characters } from "../types/characters";

export default async function getCharacters(
  page: number,
): Promise<Characters | string> {
  try {
    const response = await fetch(`${API_URL}/character?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error fetching characters:", error.message);
      return error.message;
    }
    return "Error fetching characters";
  }
}
