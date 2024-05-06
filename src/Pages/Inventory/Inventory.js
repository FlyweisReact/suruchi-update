/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Pagination";

const Inventory = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Inventory Management
          </span>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for inventory"
          />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Product Image </th>
                <th>Product Id</th>
                <th>Product Name</th>
                <th> Product Category</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>
                  <img
                    src={"http://localhost:3000/Images/4.png"}
                    alt=""
                    style={{ maxWidth: "80px" }}
                  />
                </td>
                <td>DDNSGS</td>
                <td> Men Black raglan jacket </td>
                <td>Men Jacket</td>
                <td> 14/25/2002 </td>
                <td>
                  <span className="flexCont">
                    <Link to={`/view-inventory`}>
                      <i className="fa-solid fa-eye" />
                    </Link>
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

        <Pagination />
      </section>
    </>
  );
};

export default HOC(Inventory);
