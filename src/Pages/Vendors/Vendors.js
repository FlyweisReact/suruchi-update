/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import Pagination from "../../Component/Pagination";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
  return (
    <>
      <MyVerticallyCenteredModal show={open} onHide={() => setOpen(false)} />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Vendors/Stores ( Total : 5 )
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
              <tr>
                <td> 1 </td>
                <td>
                  {" "}
                  <img
                    className="profile-pic"
                    src={
                      "https://img.freepik.com/free-photo/3d-cartoon-shop-keeper-character_1048-16763.jpg?t=st=1714997891~exp=1715001491~hmac=74b28cc644d04761f5a6012d977d81905723f01a78e9179841eaabe2074654d1&w=1380"
                    }
                    alt=""
                  />{" "}
                </td>
                <td> ABC Store </td>
                <td> abc@gmail.com </td>
                <td> +1 (555) 123-4567 </td>
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
            </tbody>
          </Table>

          <Pagination />
        </div>
      </section>
    </>
  );
};

export default HOC(Vendors);
