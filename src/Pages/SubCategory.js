/** @format */

import React, { useState } from "react";
import { CreateSubCategory } from "../Component/Modals/Modals";
import TableLayout from "../Component/TableLayout";
import HOC from "../Layout/HOC";

const SubCategory = () => {
  const [modalShow, setModalShow] = useState(false);

  const thead = ["Sno.", "Images", "Title", "Category", ""];
  const tbody = [
    [
      "#1",
      <img
        className="profile-pic"
        src={"http://localhost:3000/Images/jeans.png"}
        alt=""
      />,
      "Kid Jeans ",
      "Jeans",
      <span className="flexCont">
        <i className="fa-solid fa-pen-to-square"></i>
        <i className="fa-sharp fa-solid fa-trash"></i>
      </span>,
    ],
  ];

  return (
    <>
      <CreateSubCategory
        show={modalShow}
        handleClose={() => setModalShow(false)}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Sub Cateogries (5)
          </span>

          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Create New
          </button>
        </div>

        <TableLayout thead={thead} tbody={tbody} />
      </section>
    </>
  );
};

export default HOC(SubCategory);
