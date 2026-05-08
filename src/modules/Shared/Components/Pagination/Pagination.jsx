import React from "react";

export default function Pagination({ pageNumber, setPageNumber, totalPages }) {
  const generatePages = () => {
    const pages = [];

    pages.push(1);

    if (pageNumber > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, pageNumber - 1);
      i <= Math.min(totalPages - 1, pageNumber + 1);
      i++
    ) {
      pages.push(i);
    }

    if (pageNumber < totalPages - 2) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return [...new Set(pages)];
  };

  return (
    <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
      <button
        className="btn btn-light border"
        disabled={pageNumber === 1}
        onClick={() => setPageNumber((prev) => prev - 1)}
      >
        <i className="fa fa-chevron-left"></i>
      </button>

      {generatePages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setPageNumber(page)}
            className={`btn ${
              pageNumber === page
                ? "btn-success text-white"
                : "btn-light border"
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        className="btn btn-light border"
        disabled={pageNumber === totalPages}
        onClick={() => setPageNumber((prev) => prev + 1)}
      >
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
}
