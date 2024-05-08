/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../Layout/HOC";
import { Table, Modal, Form } from "react-bootstrap";
import Pagination from "../Component/Pagination";
import {
  createApi,
  getApi,
  removeApi,
  updateApi,
} from "../Repository/Repository";
import NoData from "../Component/NoData";
import Loader from "../Component/Loader";
import { debouncedSetQuery } from "../utils/utils";
import { ClipLoader } from "react-spinners";

const ECategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");

  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/v1/Category/paginateCategoriesSearch?page=${page}&limit=${limit}&search=${search} `,
      setLoading,
      setResponse,
    });
  }, [limit, search, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/v1/Category/deleteCategory/${id}`,
      successMsg: "Removed !",
      additionalFunctions,
    });
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    const fd = new FormData();
    fd.append("name", name);
    fd.append("image", image);

    const additionalFunctions = [() => props.onHide(), fetchHandler];

    const createHandler = (e) => {
      e.preventDefault();

      createApi({
        url: "api/v1/Category/addCategory",
        payload: fd,
        setLoading,
        successMsg: "Created",
        additionalFunctions,
      });
    };

    const updateHandler = (e) => {
      e.preventDefault();
      updateApi({
        url: `api/v1/Category/updateCategory/${id}`,
        payload: fd,
        setLoading,
        successMsg: "Updated",
        additionalFunctions,
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
            {" "}
            {edit ? "Edit Category" : " Add Category"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? updateHandler : createHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <button className="submitBtn" type="submit">
              {loading ? <ClipLoader color="#fff" /> : "Submit"}
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

      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold"
              style={{ fontSize: "1.5rem" }}
            >
              All Category's ( Total : {response?.data?.totalDocs} )
            </span>
            <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="submitBtn"
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
              placeholder=""
              onChange={(e) =>
                debouncedSetQuery({ term: e.target.value, setSearch })
              }
            />
          </div>

          {!response ? (
            <NoData />
          ) : loading ? (
            <Loader />
          ) : (
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {response?.data?.docs?.map((i, index) => (
                    <tr key={index}>
                      <td>#{index + 1} </td>
                      <td>
                        <img
                          src={i.image}
                          alt=""
                          style={{ maxWidth: "80px" }}
                        />
                      </td>
                      <td>{i.name} </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
                          />
                          <i
                            className="fa-solid fa-pen-to-square"
                            onClick={() => {
                              setId(i._id);
                              setEdit(true);
                              setModalShow(true);
                            }}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {(!response || response !== null) && (
            <Pagination
              hasNextPage={response?.data?.hasNextPage}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
            />
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(ECategory);
