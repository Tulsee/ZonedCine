"use client";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ genres, selectedGenre, onGenreChange, isLoading }) => {
  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.title}>Filter by Genre</h3>
      {isLoading ? (
        <div className={styles.loading}>Loading genres...</div>
      ) : (
        <ul className={styles.genreList}>
          <li
            className={`${styles.genreItem} ${selectedGenre === "" ? styles.active : ""}`}
            onClick={() => onGenreChange("")}
          >
            All Genres
          </li>
          {genres.map((genre) => (
            <li
              key={genre.id}
              className={`${styles.genreItem} ${selectedGenre === String(genre.id) ? styles.active : ""}`}
              onClick={() => onGenreChange(String(genre.id))}
            >
              {genre.name}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default FilterSidebar;
