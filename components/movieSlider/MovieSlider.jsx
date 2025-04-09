"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

import MovieCard from "../movieCard/MovieCard";
import { useGetMoviesQuery } from "@/store/api/tmdbApi";
import styles from "./MovieSlider.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const MovieSlider = ({ title, listType }) => {
  const { data, error, isLoading } = useGetMoviesQuery({ listType: listType, page: 1 });

  if (isLoading) return <div className={styles.loading}>Loading {title}...</div>;
  if (error) return <div className={styles.error}>Error loading movies.</div>;
  if (!data || !data.results || data.results.length === 0) return null;

  const movies = data.results;

  return (
    <section className={styles.sliderSection}>
      <h2 className={styles.sliderTitle}>{title}</h2>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={2}
        navigation
        // pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
          1536: { slidesPerView: 7 },
        }}
        className={styles.swiperContainer}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} className={styles.swiperSlide}>
            <MovieCard movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MovieSlider;
