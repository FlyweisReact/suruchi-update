/** @format */

import React, { useEffect } from "react";
import HOC from "../../Layout/HOC";
import { Table, Alert } from "react-bootstrap";
import data from "../../Constant/constant.json";

const ProductReviews = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Product Reviews ( Total : {data?.length} )
          </span>
        </div>

        <div className="overFlowCont">
          {data?.reviews?.length === 0 || !data ? (
            <Alert>No Review Found</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>User</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {data?.reviews?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.star} </td>
                    <td> {i.description} </td>
                    <td> {i.user} </td>
                    <td>
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </section>
    </>
  );
};

export default HOC(ProductReviews);
