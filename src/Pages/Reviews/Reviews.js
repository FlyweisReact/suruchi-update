/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table } from "react-bootstrap";
import Pagination from "../../Component/Pagination";

const Reviews = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Manage Reviews
          </span>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>User</th>
                <th>Review</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>John Dow</td>
                <td> Lorem Ipsum is simply dummy text of the printing</td>
              </tr>
            </tbody>
          </Table>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default HOC(Reviews);
