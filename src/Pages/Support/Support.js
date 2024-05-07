/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table } from "react-bootstrap";

const Support = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold "
            style={{ fontSize: "1.5rem" }}
          >
            Manage Customer Support
          </span>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>User</th>
                <th>Email address</th>
                <th>Mobile number</th>
                <th>Query</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>John Doe</td>
                <th>Johndoe@123</th>
                <th>+1 (555) 123-4567</th>
                <td>Product not delivered yet!</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
export default HOC(Support);
