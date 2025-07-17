// /app/api/movies/index.ts

import { updateSearchCount } from "@/services/appwrite";
import { TMDB_CONFIG } from "./tmdbConfig";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) return Response.json([], { status: 400 });

    const data = await response.json();
    if (data?.results?.length && query?.length) {
      updateSearchCount({ query, movie: data[0] });
    }
    return Response.json(data.results ?? []);
  } catch (e) {
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}
