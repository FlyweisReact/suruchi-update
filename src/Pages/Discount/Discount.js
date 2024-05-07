/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table } from "react-bootstrap";
import Pagination from "../../Component/Pagination";
import { Link } from "react-router-dom";

const Discount = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Discount and Coupon Management (Total : 1)
          </span>
          <Link to="/create-discount">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Create New
            </button>
          </Link>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>SNo.</th>
                <th>Discount name</th>
                <th>Discount type</th>
                <th>Discount</th>
                <th>Activation date</th>
                <th>Exiration Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <th>FestiveCode</th>
                <td>Percentage</td>
                <td>10</td>
                <td>04/22/2024</td>
                <td>04/26/2024</td>
                <td>
                  <span className="flexCont">
                    <Link to="/view-discount">
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                    <i className="fa-sharp fa-solid fa-trash"></i>
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

export default HOC(Discount);
