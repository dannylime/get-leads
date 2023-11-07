import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function Pagination({ currentPage, perPage, totalRecords, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / perPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination justify-content-center">
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={`page-item ${currentPage === number ? "active" : ""}`}
        >
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
