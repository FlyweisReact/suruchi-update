/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Table, Modal, Form, FloatingLabel } from "react-bootstrap";
import {
  createApi,
  getApi,
  removeApi,
  updateApi,
} from "../../Repository/Repository";
import Loader from "../../Component/Loader";
import NoData from "../../Component/NoData";
import { ClipLoader } from "react-spinners";

const Privacy = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: "api/v1/static/getPrivacy",
      setLoading,
      setResponse: setData,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [privacy, setPrivacy] = useState("");
    const [loading, setLoading] = useState(false);
    const payload = { privacy };

    const additionalFunctions = [() => props.onHide(), fetchHandler];

    const submitHandler = (e) => {
      e.preventDefault();
      createApi({
        url: "api/v1/static/createPrivacy",
        payload,
        successMsg: "Created !",
        additionalFunctions,
        setLoading,
      });
    };
    const updateHandler = (e) => {
      e.preventDefault();
      updateApi({
        url: `api/v1/static/privacy/${id}`,
        payload,
        successMsg: "Updated !",
        additionalFunctions,
        setLoading,
      });
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Privacy Policy " : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? updateHandler : submitHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <FloatingLabel>
                <Form.Control
                  as="textarea"
                  onChange={(e) => setPrivacy(e.target.value)}
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Form.Group>

            <button className="submitBtn" type="submit">
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/static/privacy/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

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
            Privacy policy
          </span>
          <div className="d-flex gap-1">
            <button
              className="submitBtn"
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
            >
              Create New
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : data ? (
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>SNo.</th>
                  <th>Description</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.privacy} </td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(i._id);
                            setEdit(true);
                            setModalShow(true);
                          }}
                        />

                        <i
                          className="fa-sharp fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <NoData />
        )}
      </section>
    </>
  );
};

export default HOC(Privacy);
