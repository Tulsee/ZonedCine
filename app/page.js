import MovieSlider from "@/components/movieSlider/MovieSlider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <MovieSlider title="Upcoming Movies" listType="upcoming" />
      <MovieSlider title="Top Rated Movies" listType="top_rated" />
      <MovieSlider title="Popular Movies" listType="popular" />
    </div>
  );
}
