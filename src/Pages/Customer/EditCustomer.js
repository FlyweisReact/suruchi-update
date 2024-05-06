/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumb";

const EditCustomer = () => {
  return (
    <section className="sectionCont">
      <BreadCrumb title={"Edit Customer"} />
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Profile</Form.Label>
          <Form.Control type="file" multiple />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email Id</Form.Label>
          <Form.Control type="email" required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="tel" pattern="[0-9]{10}" required />
        </Form.Group>

        <div className="w-100 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Submit
          </Button>

          <Link to="/user">
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(EditCustomer);
