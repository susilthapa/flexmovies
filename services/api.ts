import { Movie, MovieDetails } from "@/interfaces/interfaces";
import { updateSearchCount } from "./appwrite";

export const getMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `/api/movies${query ? "?query" + encodeURIComponent(query) : ""}`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      if (data.length && query?.length) {
        updateSearchCount({ query, movie: data[0] });
      }
      return data ?? [];
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(`/api/movies/${movieId}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error(`Failed to fetch movie details: ${response.statusText}`);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
