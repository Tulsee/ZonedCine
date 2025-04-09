"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay, EffectFade } from "swiper/modules";
import Link from "next/link";

import { useGetMoviesQuery } from "@/store/api/tmdbApi";
import styles from "./HeroSlider.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  const { data, error, isLoading } = useGetMoviesQuery({ listType: "now_playing", page: 1 });

  if (isLoading) return <div className={styles.loading}>Loading Hero...</div>;
  if (error) return <div className={styles.error}>Error loading hero movies.</div>;

  const heroMovies = data?.results?.slice(0, 8) || [];

  if (heroMovies.length === 0) return null;

  return (
    <section className={styles.heroSection}>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        className={styles.heroSwiperContainer}
      >
        {heroMovies.map((movie) => (
          <SwiperSlide key={movie.id} className={styles.heroSlide}>
            <div className={styles.slideContent}>
              <img
                src={`${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}original${movie.backdrop_path}`}
                alt={movie.title}
                className={styles.backdropImage}
              />
              <div className={styles.overlay}></div>
              <div className={styles.textContent}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.movieOverview}>{movie.overview}</p>
                <Link href={`/movie/${movie.id}`} className={styles.detailsButton}>
                  View Details
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
