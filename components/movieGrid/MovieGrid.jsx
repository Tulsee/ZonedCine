import React from "react";

import MovieCard from "@/components/movieCard/MovieCard";
import styles from "./MovieGrid.module.css";

const MovieGrid = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div className={`${styles.grid} ${styles.loading}`}>
        {[...Array(12)].map((_, index) => (
          <div key={index} className={styles.placeholderCard}></div>
        ))}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return <p className={styles.noResults}>No movies found matching your criteria.</p>;
  }

  return (
    <div className={styles.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
