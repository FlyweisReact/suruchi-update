/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import data from "../../Constant/constant.json";
import Pagination from "../../Component/Pagination";

const Product = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Product's ( Total : {data?.product?.length} )
          </span>
          <div className="d-flex gap-1">
            <Link to="/create-product">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#459948] text-white tracking-wider">
                Create Product
              </button>
            </Link>
          </div>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Start typing to search for products"
          />
        </div>

        <div className="overFlowCont">
          {data?.product?.length === 0 || !data ? (
            <Alert>No Product Found</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Image</th>
                  <th>Product Id</th>
                  <th>Title</th>
                  <th>Reviews</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data?.product?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td>
                      <img src={i.img} alt="" style={{ maxWidth: "80px" }} />
                    </td>
                    <td>DDNSGS</td>
                    <td> {i.title} </td>
                    <td>
                      <Link to={`/product-review/${i.title}`}>
                        <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#000] text-white tracking-wider">
                          View
                        </button>
                      </Link>
                    </td>
                    <td> {i.created_date?.slice(0, 10)} </td>
                    <td>
                      <span className="flexCont">
                        <Link to={`/edit-product/${i.title}`}>
                          <i className="fa-solid fa-pen-to-square" />
                        </Link>
                        <Link to={`/product/${i.title}`}>
                          <i className="fa-solid fa-eye" />
                        </Link>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        <Pagination />
      </section>
    </>
  );
};

export default HOC(Product);
