/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import { Table, Modal, Form } from "react-bootstrap";
import { TextEditor } from "../../utils/utils";
import Pagination from "../../Component/Pagination";

const Faq = () => {
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <TextEditor label={"Answer"} />

            <button className="submitBtn" type="submit">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

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
         FAǪs
          </span>
          <div className="d-flex gap-1">
            <button
              className="submitBtn"
              onClick={() => {
                setModalShow(true);
              }}
            >
              Create New
            </button>
          </div>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Question</th>
                <th>Answer</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> #1 </td>
                <td>New notification</td>
                <td> Lorem Ipsum is simply dummy text of the printing</td>

                <td>
                  <span className="flexCont">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        setModalShow(true);
                      }}
                    />

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

export default HOC(Faq);
