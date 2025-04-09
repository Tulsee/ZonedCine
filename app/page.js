import MovieSlider from "@/components/movieSlider/MovieSlider";
import styles from "./page.module.css";
import HeroSlider from "@/components/heroSlider/HeroSlider";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <MovieSlider title="Upcoming Movies" listType="upcoming" />
      <MovieSlider title="Top Rated Movies" listType="top_rated" />
      <MovieSlider title="Popular Movies" listType="popular" />
    </div>
  );
}
