import { Movie } from "@/interfaces/interfaces";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};
export const getMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
    if (response.ok) {
      const data = await response.json();
      return data.results ?? [];
    } else {
      return [];
    }
  } catch {
    return [];
  }
};
