/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import data from "../../../Constant/constant.json";
import Pagination from "../../../Component/Pagination";

const User = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(data?.users?.length / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const Prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const Next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const users = query
    ? data?.users?.filter(
        (i) =>
          i?.firstname?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.lastname?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.username?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.email?.toLowerCase().includes(query?.toLowerCase()) ||
          i?.mobilenumber
            ?.toString()
            ?.toLowerCase()
            .includes(query?.toLowerCase())
      )
    : data?.users;

  const debouncedSetQuery = (term) => {
    clearTimeout(debouncedSetQuery.timeoutId);
    debouncedSetQuery.timeoutId = setTimeout(() => {
      setQuery(term);
    }, 500);
  };

  return (
    <>
      <section className="sectionCont">
        <p className="headP">Dashboard / Customer's </p>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Customer's List ( Total : {data?.users?.length} )
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
            onChange={(e) => debouncedSetQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          {data?.length === 0 || !data ? (
            <Alert>No User Found</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Profile</th>
                  <th>Username</th>
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.slice(startIndex, endIndex)?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>
                      {" "}
                      <img
                        className="profile-pic"
                        src={i.profilepicture}
                        alt=""
                      />{" "}
                    </td>
                    <td> {i.username} </td>
                    <td> {i.email} </td>
                    <td> {i.mobilenumber} </td>

                    <td>
                      <span className="flexCont">
                        <Link to={`/user-data/${i.username}`}>
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Pagination
            Prev={Prev}
            Next={Next}
            page={page}
            pages={pages}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default HOC(User);
