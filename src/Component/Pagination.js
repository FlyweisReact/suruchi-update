/** @format */

import React from "react";

const Pagination = () => {
  return (
    <div className="pagination mt-2">
      <button className="prevBtn">
        <i className="fa-solid fa-backward"></i>
      </button>

      <button className="activePage">1</button>

      <button className="nextBtn">
        {" "}
        <i className="fa-sharp fa-solid fa-forward"></i>
      </button>
      <select>
        <option value={5}> 5/Page </option>
        <option value={10}> 10/page </option>
        <option value={10}> 20/page </option>
        <option value={10}> 50/page </option>
        <option value={10}> 100/page </option>
      </select>
    </div>
  );
};

export default Pagination;
