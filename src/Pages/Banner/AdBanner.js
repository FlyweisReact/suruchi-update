/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdBanner = () => {
  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold "
            style={{ fontSize: "1.5rem" }}
          >
            Ad Banner Management ( Total : 2)
          </span>
          <Link to="/create-banner">
            <button className="submitBtn">Create New</button>
          </Link>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>
                  <img
                    src={
                      "https://img.freepik.com/free-vector/sale-offers-banner-yellow-blue-color-theme_1017-31301.jpg?w=1380&t=st=1714046446~exp=1714047046~hmac=46f31d172df8cc6763a80304bd3e32af132b2fedfdd04f17cebd0856f01b5d38"
                    }
                    alt=""
                    className="adBannerImg"
                  />
                </td>
                <td>Ad Banner</td>
                <th>Active</th>

                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-pen-to-square" />

                    <i className="fa-sharp fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
              <tr>
                <td> #2</td>
                <td>
                  <img
                    src={
                      "https://img.freepik.com/free-vector/mega-sale-banner-origami-style_23-2148403392.jpg"
                    }
                    alt=""
                    className="adBannerImg"
                  />
                </td>
                <td>Ad Banner</td>
                <th>Inactive</th>
                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-pen-to-square" />

                    <i className="fa-sharp fa-solid fa-trash"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(AdBanner);
