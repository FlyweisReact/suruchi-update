/** @format */

import React, { useState, useEffect } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import HOC from "../../layout/HOC";
import Modal from "react-bootstrap/Modal";
import {
  DateInMMDDYY,
  Editor_desciption,
  View_description,
} from "../../../Helper/Helper";
import { showMsg } from "../../../Respo/Api";

const Reviews = () => {
  const [subCat, setSubcat] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.React_App_Baseurl}api/v1/clientReview`
      );
      setSubcat(data?.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.React_App_Baseurl}api/v1/clientReview/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        showMsg("", "Deleted !", "success");
      }
      getSubCategory();
    } catch (e) {
      console.log(e);
    }
  };

  // Create Review
  function MyVerticallyCenteredModal(props) {
    const [userName, setUserName] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");

    const payload = { userName, description, title };

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.React_App_Baseurl}api/v1/clientReview/addclientReview`,
          payload,
          Auth
        );

        if (res.status === 201) {
          showMsg("", "Created !", "success");
        }

        props.onHide();
        getSubCategory();
      } catch {}
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.put(
          `${process.env.React_App_Baseurl}api/v1/clientReview/put/${id}`,
          payload,
          Auth
        );
        if (res.status === 200) {
          showMsg("", "Edited !", "success");
        }
        props.onHide();
        getSubCategory();
      } catch {}
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {edit ? "Update" : "Create"} Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Form.Group>

            <Editor_desciption
              setDescription={setDescription}
              description={description}
              label={"Description"}
            />
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              Submit
            </Button>
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
        <div className="pb-4   w-full flex justify-between items-center">
          <span
            className=" text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Review's
          </span>
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Create
          </button>
        </div>

        {subCat?.length === 0 ? (
          <Alert> No reviews have been added yet!</Alert>
        ) : (
          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>User Name</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Created At</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subCat?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{ele?.userName}</td>
                    <td>{ele?.title}</td>
                    <td>
                      <View_description description={ele?.description} />
                    </td>
                    <td>{ele?.createdAt && DateInMMDDYY(ele?.createdAt)}</td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(ele._id)}
                        />
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setEdit(true);
                            setId(ele._id);
                            setModalShow(true);
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(Reviews);
