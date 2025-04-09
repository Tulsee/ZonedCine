const { default: Link } = require("next/link");

import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}w342${movie.poster_path}`
    : "/placeholder-image.png";

  return (
    <Link href={`/movie/${movie.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageUrl} alt={movie.title} className={styles.image} loading="lazy" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</p>
        <p className={styles.date}>{movie.release_date}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
