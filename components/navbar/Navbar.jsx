"use client";
import { useState } from "react";
import styles from "./Navbar.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/movies?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link href="/" className={styles.logo}>
          ZonedCine
        </Link>
      </div>
      <div className={styles.navRight}>
        <Link href="/movies" className={styles.discover}>
          Discover Movies
        </Link>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="search"
            placeholder="Search Movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
