/** @format */

import React, { useState } from "react";
import HOC from "../../Layout/HOC";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumb";
import { TextEditor } from "../../utils/utils";
import { Row, Col } from "react-bootstrap";
import { createApi } from "../../Repository/Repository";
import { ClipLoader } from "react-spinners";

const CreateVendor = () => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const userType = "VENDOR";

  const payload = {
    phone,
    fullName,
    email,
    password,
    userType,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createApi({
      url: "api/v1/vendor/registration",
      payload,
      successMsg: "Created",
      setLoading,
    });
  };

  return (
    <section className="sectionCont">
      <BreadCrumb title={"Create Vendor Store"} />
      <Form onSubmit={submitHandler}>
        <h3>Basic Details</h3>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Owner Full Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Store Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Store Logo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <TextEditor label={"Add Bio of the Restaurant"} />
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Working Days</Form.Label>
              <div className="d-flex gap-2 flex-wrap">
                <Form.Check type={"checkbox"} label={`Monday`} />
                <Form.Check type={"checkbox"} label={`Tuesday`} />
                <Form.Check type={"checkbox"} label={`Wednesday`} />
                <Form.Check type={"checkbox"} label={`Thrusday`} />
                <Form.Check type={"checkbox"} label={`Friday`} />
                <Form.Check type={"checkbox"} label={`Saturday`} />
                <Form.Check type={"checkbox"} label={`Sunday`} />
              </div>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Open Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Close Time</Form.Label>
              <Form.Control type="time" />
            </Form.Group>
          </Col>
        </Row>
        <hr />

        <h3>Address Details</h3>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Shop/Plot Number</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Floor</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Building/Mail/Complex Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <h3>Bank Account Details</h3>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Account Holder's Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Branch Name</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <h3>Personal Documents</h3>
        <hr />

        <Row>
          <Col xs={12} md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Document</Form.Label>
              <Form.Select>
                <option>Select Document</option>
                <option>Aadhar Card</option>
                <option>PAN Card</option>
                <option>Driving license</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Front Side</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Back Side</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
        </Row>

        <hr />

        <Row>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password </Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
          </Col>
        </Row>

        <div className="w-100 d-flex justify-content-between">
          <Button variant="success" type="submit">
            {loading ? <ClipLoader color="#fff" /> : "Submit"}
          </Button>

          <Link to="/user">
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(CreateVendor);
