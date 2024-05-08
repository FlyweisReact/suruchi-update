/** @format */

import React, { useEffect, useState } from "react";
import { Table, Modal, Form } from "react-bootstrap";
import Pagination from "../Component/Pagination";
import HOC from "../Layout/HOC";
import { getApi } from "../Repository/Repository";

const SubCategory = () => {
  const [modalShow, setModalShow] = useState(false);
  const [ response , setResponse ] = useState(null)
  const [ loading , setLoading ] = useState(false)

  const fetchHandler = () => {
    getApi({
      url : "api/v1/SubCategory/paginate/SubCategoriesSearch",
      setResponse ,
      setLoading
    })
  }


  console.log(response?.data)

  useEffect(() => {
    fetchHandler()
  },[])







  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Create Sub Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select>
                <option></option>
                <option>Jeans</option>
              </Form.Select>
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
            Sub Cateogries ( Total : 5 )
          </span>

          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Create New
          </button>
        </div>

        <div className="overFlowCont">
          <Table>
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>

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
                    src={"http://localhost:3000/Images/jeans.png"}
                    alt=""
                  />{" "}
                </td>
                <td> Kid Jeans </td>
                <td>Jeans </td>

                <td>
                  <span className="flexCont">
                    <i className="fa-solid fa-pen-to-square"></i>
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

export default HOC(SubCategory);
