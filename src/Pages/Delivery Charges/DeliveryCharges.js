/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import { Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Pagination";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create New</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Radius</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zone</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Flat Charges</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>MOV</Form.Label>
            <Form.Control type="number" />
          </Form.Group>

          <button className="submitBtn" type="submit">
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const DeliveryCharges = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <MyVerticallyCenteredModal show={show} onHide={() => setShow(false)} />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            Manage Delivery Charges
          </span>
          <button
            className="submitBtn"
            type="button"
            onClick={() => setShow(true)}
          >
            Create New
          </button>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="Search by zone" />
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Radius</th>
                <th>Zone</th>
                <th>Flat Charges</th>
                <th>MOV</th>
                <th>Created At</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>5km</td>
                <td>West Delhi</td>
                <td>
                  {" "}
                  <i className="fa-solid fa-indian-rupee-sign"></i>300{" "}
                </td>
                <td>
                  {" "}
                  <i className="fa-solid fa-indian-rupee-sign"></i>1500
                </td>
                <td> 14/25/2002 </td>
                <td>
                  <span className="flexCont">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => setShow(true)}
                    />
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

export default HOC(DeliveryCharges);
