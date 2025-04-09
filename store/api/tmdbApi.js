import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}&language=en-US`,
    }),

    getMovies: builder.query({
      query: ({ listType = "popular", page = 1, genreId, sortBy, searchQuery }) => {
        let url = "";
        if (searchQuery) {
          url = `search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(
            searchQuery
          )}&page=${page}&language=en-US`;
        } else if (listType === "discover") {
          url = `discover/movie?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
          if (genreId) url += `&with_genres=${genreId}`;
          if (sortBy) url += `&sort_by=${sortBy}`;
        } else {
          url = `movie/${listType}?api_key=${tmdbApiKey}&language=en-US&page=${page}`;
        }
        return url;
      },
    }),

    getMovieDetails: builder.query({
      query: (id) => `movie/${id}?api_key=${tmdbApiKey}&language=en-US&append_to_response=credits`,
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery, useGetMovieDetailsQuery } = tmdbApi;
