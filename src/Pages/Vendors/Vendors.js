/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import Pagination from "../../Component/Pagination";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getApi } from "../../Repository/Repository";
import Loader from "../../Component/Loader";
import NoData from "../../Component/NoData";
import { userImg } from "../../assests";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {" "}
          Update Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select>
              <option></option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Rejected</option>
              <option>Block</option>
              <option>Unblock</option>
            </Form.Select>
          </Form.Group>

          <Button
            style={{
              backgroundColor: "#459948",
              borderRadius: "0",
              border: "1px solid #459948",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const Vendors = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: "api/v1/admin/getAllVendor",
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      <MyVerticallyCenteredModal show={open} onHide={() => setOpen(false)} />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Vendors/Stores ( Total : {response?.data?.length} )
          </span>
          <div className="d-flex gap-2">
            <Link to="/create-vendors">
              <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
                Create New
              </button>
            </Link>
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Export
            </button>
          </div>
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
        ) : response === null ? (
          <NoData />
        ) : (
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Logo</th>
                  <th>Grocery Name</th>
                  <th>Email ID</th>
                  <th>Phone Number</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {response?.data?.map((i, index) => (
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
                    <td> {i.userName} </td>
                    <td> {i.email} </td>
                    <td> {i.phone} </td>
                    <th>
                      <Link to="/customer-order">View Order</Link>
                    </th>

                    <th>
                      Pending{" "}
                      <i
                        onClick={() => setOpen(true)}
                        className="fa-solid fa-rotate-right cursor-pointer"
                      ></i>
                    </th>

                    <td>
                      <span className="flexCont">
                        <Link to={`/create-vendors`}>
                          <i className="fa-solid fa-eye"></i>
                        </Link>
                        <Link to={`/create-vendors`}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        <Pagination />
      </section>
    </>
  );
};

export default HOC(Vendors);
