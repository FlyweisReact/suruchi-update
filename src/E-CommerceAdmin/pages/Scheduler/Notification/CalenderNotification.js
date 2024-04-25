/** @format */

import HOC from "../../../layout/HOC";
import React, { useEffect, useState } from "react";
import { Table, Alert, Form, Button, Modal } from "react-bootstrap";
import data from "../../../../Constant/constant.json";
import Pagination from "../../../../Component/Pagination";

const CalenderNotification = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [edit, setEdit] = useState(false);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(data?.users?.length / itemsPerPage);

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const Prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const Next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const users = query
    ? data?.notifications?.filter((i) =>
        i?.title?.toLowerCase().includes(query?.toLowerCase())
      )
    : data?.notifications;

  const debouncedSetQuery = (term) => {
    clearTimeout(debouncedSetQuery.timeoutId);
    debouncedSetQuery.timeoutId = setTimeout(() => {
      setQuery(term);
    }, 500);
  };

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Edit Notification" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>

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
      <MyVerticallyCenteredModal show={open} onHide={() => setOpen(false)} />
      <section className="sectionCont">
        <p className="headP">Dashboard / Notification's </p>

        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Notification's List ( Total : {data?.users?.length} )
          </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#459948] text-white tracking-wider"
            onClick={() => setOpen(true)}
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
            placeholder="seach by title"
            onChange={(e) => debouncedSetQuery(e.target.value)}
          />
        </div>

        <div className="overFlowCont">
          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Created at</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.slice(startIndex, endIndex)?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.title} </td>
                    <td> {i.message} </td>
                    <td> {i.created_date?.slice(0, 10)} </td>

                    <td>
                      <span className="flexCont">
                        <i className="fa-solid fa-eye"></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => setOpen(true)}
                        ></i>
                        <i className="fa-sharp fa-solid fa-trash"></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          <Pagination
            Prev={Prev}
            Next={Next}
            page={page}
            pages={pages}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </section>
    </>
  );
};

export default HOC(CalenderNotification);
