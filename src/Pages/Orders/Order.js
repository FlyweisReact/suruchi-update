/** @format */
import React, { useState } from "react";
import { Badge, Table, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../../Component/Pagination";
import HOC from "../../Layout/HOC";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Status
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select>
              <option>Open to select status</option>
              <option>Approve</option>
              <option>Canceled</option>
              <option>Pending</option>
              <option>Pickup</option>
              <option>Approved</option>
              <option>Shipped</option>
              <option>Rejected</option>
              <option>Delivered</option>
            </Form.Select>
          </Form.Group>

          <button
            className="submitBtn"
            type="button"
            onClick={() => props?.onHide()}
          >
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const Order = () => {
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
            Products Order Management (Total : 2)
          </span>
          <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
            Export data
          </button>
        </div>
        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input type="search" placeholder="Search by OrderId" />
        </div>
        <div className="searchByDate">
          <div>
            <label>Starting Date </label>
            <input type="date" />
          </div>

          <div>
            <label>Ending Date </label>
            <input type="date" />
          </div>
        </div>
        <div className="searchByDate">
          <div>
            <label>Status : </label>
            <select>
              <option> Select order status </option>
              <option value="10">Approve </option>
              <option value="10"> Past orders </option>
              <option value="20"> Pending orders </option>
              <option value="50"> Ongoing orders </option>
              <option value="100"> Canceled orders </option>
            </select>
          </div>
        </div>

      
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>SNo.</th>
                    <th>Order Id</th>
                    <th>Customer</th>
                    <th>Deliver Person</th>
                    <th>Total Amount </th>
                    <th>Order Status</th>
                    <th>Payment Status</th>
                    <th>Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> EOV7IM7Z3</td>
                    <td>John Doe</td>
                    <th>David Beckham</th>
                    <td>
                      <i className="fa-solid fa-indian-rupee-sign"></i>1000
                    </td>
                    <td>
                      <Badge>Pending </Badge>{" "}
                    </td>
                    <td>
                      {" "}
                      <Badge>Paid</Badge>{" "}
                    </td>
                    <td>01/22/2024</td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => setOpen(true)}
                        ></i>
                        <Link to={`/order/John Doe`}>
                          <i className="fa-solid fa-eye" />
                        </Link>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>EOM3IM7Z3</td>
                    <td>Alice Smith</td>
                    <th>Emma Brown</th>
                    <td>
                      <i className="fa-solid fa-indian-rupee-sign"></i>1000
                    </td>
                    <td>
                      <Badge>Shipped</Badge>{" "}
                    </td>
                    <td>
                      {" "}
                      <Badge>Paid</Badge>{" "}
                    </td>
                    <td>05/12/2024</td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => setOpen(true)}
                        ></i>
                        <Link to={`/order/John Doe`}>
                          <i className="fa-solid fa-eye" />
                        </Link>
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

export default HOC(Order);
