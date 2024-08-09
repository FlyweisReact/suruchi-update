/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";
import { EditVendorStatus } from "../../Component/Modals/Modals";

const Vendors = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: "api/v1/admin/getAllVendor",
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const thead = [
    "Sno.",
    "Name",
    "Mobile Number",
    "Product",
    "Status",
    "",
  ];

  const tbody = response.data.map((i, index) => [
    `#${index + 1}`,
    i?.fullName,
    i?.phone,
    <Link to={`/vendor-products/${i.fullName}`}>View</Link>,
    <span>
      Pending{" "}
      <i
        onClick={() => setOpen(true)}
        className="fa-solid fa-rotate-right cursor-pointer"
      ></i>
    </span>,
    <span className="flexCont">
      <Link to={`/view-vendor/${i._id}`}>
        <i className="fa-solid fa-eye"></i>
      </Link>
      <i className="fa-sharp fa-solid fa-trash"></i>
    </span>,
  ]);

  return (
    <>
      <EditVendorStatus show={open} handleClose={() => setOpen(false)} />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Vendors ({response?.data?.length})
          </span>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="seach by first name , last name , email address , phone number..."
          />
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(Vendors);
