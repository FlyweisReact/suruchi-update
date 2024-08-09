/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApi, removeApi, updateApi } from "../../Repository/Repository";
import TableLayout from "../../Component/TableLayout";

const Customers = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: "api/v1/admin/getAllUser",
      setLoading,
      setResponse: setUsers,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const updateStatus = (id) => {
    const additionalFunctions = [fetchHandler];
    updateApi({
      url: `api/v1/admin/blockUnblockUser/${id}`,
      successMsg: "Status updated !",
      additionalFunctions,
    });
  };

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/admin/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

  const thead = [
    "Sno.",
    "Profile",
    "Username",
    "Email address",
    "Mobile Number",
    "Status",
    "",
  ];

  const tbody = users?.data?.map((i, index) => [
    `#${index + 1}`,
    <img className="profile-pic" src={i.image} alt="" />,
    i?.userName,
    i?.email,
    i?.phone,
    <span className="cursor-pointer">
      <Form.Check
        type="switch"
        onClick={() => updateStatus(i._id)}
        className="cursor-pointer"
        checked={i.status === "Active" ? true : false}
      />
    </span>,
    <span className="flexCont">
      <Link to={`/user-data/${i._id}`}>
        <i className="fa-solid fa-eye"></i>
      </Link>
      <i
        className="fa-sharp fa-solid fa-trash"
        onClick={() => deleteHandler(i._id)}
      ></i>
    </span>,
  ]);

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Customer's List ({users?.data?.length})
          </span>
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
      </section>
    </>
  );
};

export default HOC(Customers);
