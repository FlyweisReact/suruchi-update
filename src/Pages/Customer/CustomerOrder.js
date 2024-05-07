/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import data from "../../Constant/constant.json";
import { Alert, Table ,Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Pagination";

const CustomerOrder = () => {
  return (
    <section className="sectionCont">
      <div className="pb-4  w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Customer Order (Total : {data?.orders?.length})
        </span>
      </div>

     

      {data?.orders?.length === 0 || !data ? (
        <Alert>No Data Found</Alert>
      ) : (
        <>
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Order Id</th>
                  <th>Total Amount </th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.orders?.map((i, index) => (
                  <tr key={index}>
                    <td> {index + 1} </td>
                    <td> {i.orderId} </td>
                    <td> ₹{i?.total} </td>
                    <td>
                      {" "}
                      <Badge>{i.OrderStatus}</Badge>{" "}
                    </td>
                    <td>
                      {" "}
                      <Badge>{i.paymentStatus}</Badge>{" "}
                    </td>
                    <td>{i.date}</td>

                    <td>
                      <span className="flexCont">
                        <span>
                          <Link to={`/order/${i._id}`}>
                            <i className="fa-solid fa-eye" />
                          </Link>
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}

      <Pagination />
    </section>
  );
};

export default HOC(CustomerOrder);
