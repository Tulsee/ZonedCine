"use client";
import React from "react";
import styles from "./Pagination.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { generatePageRange } from "@/utils/pageRangeGenerator";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page) => {
    if (typeof page === "number" && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageRange = generatePageRange(currentPage, totalPages, 1);

  return (
    <nav className={styles.pagination} aria-label="Movie list pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`${styles.pageButton} ${styles.prevNextButton}`}
        aria-label="Previous Page"
      >
        <FaChevronLeft />
        <span>Previous</span>
      </button>

      <ul className={styles.pageList}>
        {pageRange.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <button
                onClick={() => handlePageClick(page)}
                className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ) : (
              <span className={styles.ellipsis} aria-hidden="true">
                {page}
              </span>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`${styles.pageButton} ${styles.prevNextButton}`}
        aria-label="Next Page"
      >
        <span>Next</span>
        <FaChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
