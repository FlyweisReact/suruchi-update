/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumb";
import { Row, Col } from "react-bootstrap";
import Select from "react-select";

const CreateBanner = () => {
  const statusOptions = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
    },
  ];
  return (
    <section className="sectionCont">
      <BreadCrumb title={"Create Banner"} />
      <Form>
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Select options={statusOptions} placeholder="Select..." />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>
                Date and time up to which it should be valid
              </Form.Label>
              <Form.Control type="datetime-local" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product</Form.Label>
              <Select options={[]} placeholder="Select..." />
            </Form.Group>
          </Col>
        </Row>
        <div className="w-100 d-flex justify-between">
          <Button variant="success" type="submit">
            Submit
          </Button>

          <Link to={-1}>
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(CreateBanner);
