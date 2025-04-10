"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import FilterSidebar from "@/components/filterSidebar/FilterSidebar";
import MovieGrid from "@/components/movieGrid/MovieGrid";
import Pagination from "@/components/pagination/Pagination";

import styles from "./page.module.css";

import { useGetGenresQuery, useGetMoviesQuery } from "@/store/api/tmdbApi";

const MoviesPageContent = () => {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [selectedGenre, setSelectedGenre] = useState(searchParams.get("genre") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "popularity.desc");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery();

  const queryArgs = {
    listType: searchQuery ? undefined : "discover",
    page: currentPage,
    genreId: selectedGenre || undefined,
    sortBy: sortBy || undefined,
    searchQuery: searchQuery || undefined,
  };

  const { data: moviesData, error, isLoading, isFetching } = useGetMoviesQuery(queryArgs);

  useEffect(() => {
    setCurrentPage(parseInt(searchParams.get("page") || "1"));
    setSelectedGenre(searchParams.get("genre") || "");
    setSortBy(searchParams.get("sort_by") || "popularity.desc");
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    window.history.pushState(null, "", `?${params.toString()}`);
    setCurrentPage(page);
  };

  const handleFilterChange = (genreId) => {
    const params = new URLSearchParams(searchParams);
    if (genreId) {
      params.set("genre", genreId);
    } else {
      params.delete("genre");
    }
    params.set("page", "1");
    params.delete("search");
    window.history.pushState(null, "", `?${params.toString()}`);
    setSelectedGenre(genreId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort_by", sortValue);
    params.set("page", "1");
    window.history.pushState(null, "", `?${params.toString()}`);
    setSortBy(sortValue);
    setCurrentPage(1);
  };

  const totalPages = moviesData?.total_pages || 1;
  const maxPages = Math.min(totalPages, 500);

  return (
    <div className={styles.moviesPage}>
      <FilterSidebar
        genres={genresData?.genres || []}
        selectedGenre={selectedGenre}
        onGenreChange={handleFilterChange}
        isLoading={genresLoading}
      />
      <div className={styles.mainContent}>
        {searchQuery && <h1 className={styles.pageTitle}>Search Results for: "{searchQuery}"</h1>}
        {!searchQuery && !selectedGenre && <h1 className={styles.pageTitle}>Discover Movies</h1>}
        {!searchQuery && selectedGenre && <h1 className={styles.pageTitle}>Movies</h1>}{" "}
        <div className={styles.controls}>
          <label htmlFor="sort-select" className={styles.sortLabel}>
            Sort By:{" "}
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className={styles.sortSelect}
            disabled={!!searchQuery}
          >
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
          </select>
        </div>
        <MovieGrid movies={moviesData?.results || []} isLoading={isLoading || isFetching} />
        <Pagination currentPage={currentPage} totalPages={maxPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

const MoviesPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviesPageContent />
    </Suspense>
  );
};

export default MoviesPage;
