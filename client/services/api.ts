import axios, { axiosRecommender } from "@/config/axios";
import { axiosPrivate } from "@/config/axios";
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch wishlist movies");
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) throw new Error("Failed to fetch movie details");

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// add movie to watch list

export const addMovie = async (
  movieId: string | null,
  userId: string | null,
  setFav: (value: boolean) => void
): Promise<void> => {
  try {
    if (!movieId || !userId) {
      throw new Error("MovieId or userId is null");
    }
    const response = await axios.patch("/addmovie", {
      userId,
      movieId,
    });
    if (!response.data.success) throw new Error("Failed to add movie");
    setFav(true);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// remove movie from watch list
export const removMovie = async (
  movieId: null | string,
  userId: null | string,
  setWatchList: React.Dispatch<React.SetStateAction<string[]>>,
  watchList: string[]
) => {
  if (!movieId || !userId) {
    throw new Error("MovieId or userId is null");
  }

  const res = await axios.delete("/removemovie", {
    params: {
      userId,
      movieId,
    },
  });

  if (res.data.success) {
    const updatedWatchList = watchList.filter((item) => item != movieId);
    setWatchList(updatedWatchList);
  }
};
export const getFavMovies = async (
  userId: string | null,
  setWatchList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  try {
    if (!userId) {
      throw new Error("userId is null");
    }
    const response = (
      await axiosPrivate.get("/getallsavedmovies", {
        params: {
          userId,
        },
      })
    ).data;

    const savedMoviesIds = response.data.savedMoviesIds;
    setWatchList(savedMoviesIds);
    // Wait for all movie details to fetch
    const data = await Promise.all(
      savedMoviesIds.map((id: string) => fetchMovieDetails(id))
    );

    return data;
  } catch (error) {
    console.error("Error in getFavMovies:", error);
    throw error;
  }

};

// this function return array of recommended movies id based on user's watchList movies. 
export const getReccMovies = async (
  userId: string | null,
  watchList: string[]
): Promise<string[] | null> => {
  try {
    if (!userId) {
      console.log("userId is null");
      return null;
    }
    if (watchList.length === 0) {
      console.log("no movies in watchList");
      return [];
    }


    const reccMoviesIds = await Promise.all(
      watchList.map(async (movie_id: string) => {
        const { data } = await axiosRecommender.get("/recommend", {
          params: { movie_id },
        });

        // Extract only movie_id values
        return (data.recommendations || []).map(
          (rec: { movie_id: string }) => rec.movie_id
        );
      })
    );

    const flattened = reccMoviesIds.flat();

    return flattened;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return null;
  }
};


export const getReccMoviesDetails = async (
  recc_movies_ids: string[]
): Promise<MovieDetails[]> => {
  try {
    // Fetch all movie details in parallel
    const moviesDetails = await Promise.all(
      recc_movies_ids.map((id) => fetchMovieDetails(id))
    );

    return moviesDetails;
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    throw error;
  }
};
