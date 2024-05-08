/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import data from "../../Constant/constant.json";
import Pagination from "../../Component/Pagination";
import { Alert, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApi, removeApi, updateApi } from "../../Repository/Repository";
import Loader from "../../Component/Loader";
import NoData from "../../Component/NoData";
import { userImg } from "../../assests";

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

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Customer's List ( Total : {users?.data?.length} )
          </span>
          <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
            Export data
          </button>
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

        {loading ? (
          <Loader />
        ) : (
          <div className="overFlowCont">
            {users === null ? (
              <NoData />
            ) : (
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Profile</th>
                    <th>Username</th>
                    <th>Email ID</th>
                    <th>Phone Number</th>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Discount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users?.data?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td>
                        {" "}
                        <img
                          className="profile-pic"
                          src={i.image ? i.image : userImg}
                          alt=""
                        />{" "}
                      </td>
                      <td> {i.username} </td>
                      <td> {i.email} </td>
                      <td> {i.phone} </td>
                      <th>
                        <Link to="/customer-order">View Order</Link>
                      </th>

                      <th>
                        <span className="cursor-pointer">
                          <Form.Check
                            type="switch"
                            onClick={() => updateStatus(i._id)}
                            className="cursor-pointer"
                            checked={i.status === "Active" ? true : false}
                          />
                        </span>
                      </th>
                      <th>
                        <Link to="/customer-discount">Discount</Link>
                      </th>
                      <td>
                        <span className="flexCont">
                          <Link to={`/user-data/${i._id}`}>
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                          <Link to={`/edit-customer/${i.username}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                          </Link>
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        )}

        {users && <Pagination />}
      </section>
    </>
  );
};

export default HOC(Customers);
