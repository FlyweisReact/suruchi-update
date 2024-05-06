/** @format */
import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import data from "../../Constant/constant.json";
import { TextEditor } from "../../utils/utils";
import BreadCrumb from "../../Component/BreadCrumb";

const EditProduct = () => {
  const [isMultipleSize, setIsMultipleSize] = useState("false");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section className="sectionCont">

    <BreadCrumb title={"Edit Product"} />
      <Form>
        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Select
                isMulti
                options={data?.category?.map((i) => ({
                  value: i.title,
                  label: i.title,
                }))}
                placeholder="Select Category"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control type="text" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <TextEditor label={"Specifications"} />
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="number" required />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <TextEditor label={"Product Description"} />
          </Col>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Occasion</Form.Label>
              <Select
                isMulti
                options={data?.category?.map((i) => ({
                  value: i.title,
                  label: i.title,
                }))}
                placeholder="Select Occasion"
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <TextEditor label={"Material Information"} />
          </Col>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Multiple Sizes</Form.Label>
              <Form.Select
                value={isMultipleSize}
                onChange={(e) => setIsMultipleSize(e.target.value)}
              >
                <option value={""}>Selete Your Prefrence</option>
                <option value={"true"}>Activate</option>
                <option value={"false"}> Deactivate</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {isMultipleSize === "false" ? (
            <>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Product quantity (for inventory management){" "}
                  </Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Product Cost (Tax + Delivery charges - If applicable){" "}
                  </Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Col>
            </>
          ) : (
            <>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Cost</Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" required />
                </Form.Group>
              </Col>
            </>
          )}
        </Row>

        <div className="w-100 d-flex justify-content-between">
          <Button variant="success" type="submit">
            Submit
          </Button>

          <Link to="/Product">
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(EditProduct);
