/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import TableLayout from "../../Component/TableLayout";
import data from "../../Constant/constant.json";
import { CreateBanner } from "../../Component/Modals/Modals";

const thead = ["Sno.", "Image", "Type", ""];

const AdBanner = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const tbody = data.Banners.map((i, index) => [
    `#${index + 1}`,
    <img src={i.src} alt="" className="adBannerImg" />,
    i.type,
    <span className="flexCont">
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setEdit(true);
          setShow(true);
        }}
      />
      <i className="fa-sharp fa-solid fa-trash"></i>
    </span>,
  ]);
  return (
    <>
      <CreateBanner
        show={show}
        handleClose={() => setShow(false)}
        edit={edit}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold "
            style={{ fontSize: "1.5rem" }}
          >
            All Banner(2)
          </span>

          <button
            className="submitBtn"
            onClick={() => {
              setEdit(false);
              setShow(true);
            }}
          >
            Create New
          </button>
        </div>

        <TableLayout thead={thead} tbody={tbody} />
      </section>
    </>
  );
};

export default HOC(AdBanner);
