
import React from "react";
import './PaginationLoader.css';

const PaginationLoader = () => {
  return (
    <div className="pagination-loader">
      <div className="spinner"></div>
      <p>Loading more users...</p>
    </div>
  );
};

export default PaginationLoader;