// Import useEffect from React.
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { perPage } from "../config";

export default function Pagination({ page, count, route }) {
  const [firstPage] = useState(page <= 1);
  useEffect(() => {
    document.title = `Games Page ${page}`;
  });
  const pageCount = Math.ceil(count / perPage);

  return (
    <div className="topbar-filter">
      <div className="pagination2">
        
        <span>
          Page {page} of {pageCount}:
        </span>
        <Link
          to={`${route || ""}/${page - 1}`}
          aria-disabled={page <= 1}
          shallow
        >
          {!firstPage && <i className="ion-arrow-left-b"></i>}
        </Link>
        {new Array(pageCount).fill(0).map((_, i) => {
          if (i >= 15) return null;
          if (i + 1 === page)
            return (
              <a className="active" href={`${route || ""}/${i + 1}`}>
                {i + 1}
              </a>
            );
          return (
            <a href={`${route || ""}/${i + 1}`} key={i}>
              {i + 1}
            </a>
          );
        })}
        <a href="/" onClick={function(e) { e.preventDefault();}}>
          <Link
            to={`${route || ""}/${page + 1}`}
            aria-disabled={page * perPage >= count}
            shallow
          >
            <i className="ion-arrow-right-b"></i>
          </Link>
        </a>
      </div>
    </div>
  );
}
