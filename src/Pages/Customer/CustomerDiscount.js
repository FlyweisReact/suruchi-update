/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import data from "../../Constant/constant.json";
import { Alert, Table, Modal, Form, Button } from "react-bootstrap";
import Pagination from "../../Component/Pagination";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Discount
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Discount</Form.Label>
            <Form.Control type="number" min={0} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Min. Order</Form.Label>
            <Form.Control type="number" min={0} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Activation Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control type="date" />
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

const CustomerDiscount = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold"
            style={{ fontSize: "1.5rem" }}
          >
            All Customer Discount (Total : {data?.orders?.length})
          </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Create New
          </button>
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
                    <th>Discount</th>
                    <th>Min order</th>
                    <th>Activation Date</th>
                    <th>Exiration Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> 30%</td>
                    <td> ₹300 </td>
                    <td>04/22/2024</td>
                    <td>04/22/2024</td>
                    <td>
                      <span className="flexCont">
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </>
        )}

        <Pagination />
      </section>
    </>
  );
};

export default HOC(CustomerDiscount);
