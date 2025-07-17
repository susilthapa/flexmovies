// /app/api/movies/index.ts

import { TMDB_CONFIG } from "./tmdbConfig";

export async function GET(_: Request, { id }: { id: string }) {
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}`, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    console.log({ xxx: response });
    if (!response.ok) {
      return Response.json(
        { error: "Failed to fetch the movie details" },
        { status: 400 }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.log({ rrrr: error });
    return Response.json(
      { error: "Failed to fetch the movie details" },
      { status: 400 }
    );
  }
}
