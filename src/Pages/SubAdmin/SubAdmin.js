/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import data from "../../Constant/constant.json";
import Pagination from "../../Component/Pagination";
import { Form, Table, Modal } from "react-bootstrap";
import Select from "react-select";

function MyVerticallyCenteredModal(props) {
  const arr = [
    {
      value: "Customer",
      label: "Customer",
    },
    {
      value: "Vendors/Stores",
      label: "Vendors/Stores",
    },
    {
      value: "Category",
      label: "Category",
    },
    {
      value: "Sub Cateogries",
      label: "Sub Cateogries",
    },
    {
      value: "Product",
      label: "Product",
    },
  ];
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Profile Pic</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone number</Form.Label>
            <Form.Control type="tel" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Permissions</Form.Label>
            <Select isMulti options={arr} placeholder="Select Permissions" />
          </Form.Group>
          <button className="submitBtn">Submit</button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const SubAdmin = () => {
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
            Manage Sub-Admin ( Total : 2 )
          </span>
          <button
            className="submitBtn"
            onClick={() => {
              setOpen(true);
            }}
          >
            Create New
          </button>
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
                <th>Profile</th>
                <th>Username</th>
                <th>Email ID</th>
                <th>Phone Number</th>
                <th>Permissions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((i, index) => (
                <tr key={index}>
                  <td> #{index + 1} </td>
                  <td>
                    {" "}
                    <img
                      className="profile-pic"
                      src={i.profilepicture}
                      alt=""
                    />{" "}
                  </td>
                  <td> {i.username} </td>
                  <td> {i.email} </td>
                  <td> {i.mobilenumber} </td>
                  <td>
                    <ul>
                      <li>Customer</li>
                      <li>Vendor/Store</li>
                      <li>Category</li>
                    </ul>
                  </td>
                  <td>
                    <span className="flexCont">
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => {
                          setOpen(true);
                        }}
                      ></i>
                      <i className="fa-sharp fa-solid fa-trash"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default HOC(SubAdmin);
