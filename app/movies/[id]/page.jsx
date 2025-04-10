"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useGetMovieDetailsQuery } from "@/store/api/tmdbApi";
import styles from "./page.module.css";

import { FaStar, FaRegClock, FaCalendarAlt } from "react-icons/fa";

const MovieDetailsPage = () => {
  const params = useParams();
  const { id } = params;

  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(id);

  if (isLoading) return <div className={styles.loading}>Loading movie details...</div>;
  if (error) return <div className={styles.error}>Error loading movie details. Please try again.</div>;
  if (!movie) return <div className={styles.error}>Movie not found.</div>;

  const posterUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}w500${movie.poster_path}`
    : "/placeholder.jpg";
  const backdropUrl = movie.backdrop_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}original${movie.backdrop_path}`
    : "/placeholder.jpg";

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const genres = movie.genres?.map((genre) => genre.name).join(", ") || "N/A";
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const cast = movie.credits?.cast?.slice(0, 12) || [];

  return (
    <div className={styles.detailsPage}>
      {backdropUrl && (
        <div className={styles.backdropContainer}>
          <img src={backdropUrl} alt={`${movie.title} backdrop`} className={styles.backdropImage} />
          <div className={styles.backdropOverlay}></div>
        </div>
      )}

      <div className={styles.mainContent}>
        <div className={styles.posterContainer}>
          <img src={posterUrl} alt={`${movie.title} poster`} className={styles.posterImage} />
        </div>

        <div className={styles.infoContainer}>
          <h1 className={styles.title}>
            {movie.title} <span className={styles.releaseYear}>({releaseYear})</span>
          </h1>
          <p className={styles.tagline}>{movie.tagline}</p>

          <div className={styles.metaInfo}>
            <span title="Rating">
              <FaStar /> {rating} / 10
            </span>
            <span title="Runtime">
              <FaRegClock /> {runtime}
            </span>
            <span title="Release Date">
              <FaCalendarAlt /> {movie.release_date}
            </span>
          </div>

          <div className={styles.genres}>
            <strong>Genres:</strong> {genres}
          </div>

          <div className={styles.overview}>
            <h2>Overview</h2>
            <p>{movie.overview || "No overview available."}</p>
          </div>

          {cast.length > 0 && (
            <div className={styles.castSection}>
              <h2>Top Cast</h2>
              <div className={styles.castGrid}>
                {cast.map((actor) => (
                  <div key={actor.cast_id || actor.id} className={styles.castMember}>
                    <img
                      src={
                        actor.profile_path
                          ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}w185${actor.profile_path}`
                          : "/placeholder.jpg"
                      }
                      alt={actor.name}
                      className={styles.castImage}
                      loading="lazy"
                    />
                    <p className={styles.castName}>{actor.name}</p>
                    <p className={styles.castCharacter}>{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
