/** @format */
import React from "react";
import HOC from "../../Layout/HOC";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BreadCrumb from "../../Component/BreadCrumb";
import { ValueChecker } from "../../utils/utils";
import { Row, Col } from "react-bootstrap";

const SingleOrder = () => {
  return (
    <>
      <section className="sectionCont">
        <BreadCrumb title={"EOV7IM7Z3"} />
        <h4>Ordered Item Detail</h4>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            {ValueChecker("DDNSGS", "Product Id")}
          </Col>
          <Col xs={12} md={6}>
            {ValueChecker(
              <Link to={"/product/Men%20Black%20raglan%20jacket"}>
                Men Black raglan jacket
              </Link>,
              "Product Name"
            )}
          </Col>
        </Row>
        <hr />
        <h4>Customer details</h4>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            {ValueChecker(
              <Link to={"/user-data/johndoe23"}>John Doe</Link>,
              "Full name"
            )}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("johndoe@example.com", "Email Address")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("+1 (555) 123-4567", "Phone number")}
          </Col>
        </Row>
        <hr />
        <h4>Notes</h4>
        <hr />
        <Row>
          <Col xs={12} md={12}>
            {ValueChecker(
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              ""
            )}
          </Col>
        </Row>
        <hr />
        <h4>Assigned Delivery Person </h4>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            {ValueChecker("Alice Smoith", "Full name")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("alice.smith@example.com", "Email Address")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("+1 (555) 123-4567", "Phone number")}
          </Col>
        </Row>
        <hr />
        <h4>Seller details</h4>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            {ValueChecker(<Link to={"/vendors"}>ABC Store</Link>, "Full name")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("abc@gmail.com", "Email Address")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("+1 (555) 123-4567", "Phone number")}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12} md={4}>
            {ValueChecker("Pending", "Order Status")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("Pending", "Delivery Status")}
          </Col>
          <Col xs={12} md={4}>
            {ValueChecker("Pending", "Peymnet Status")}
          </Col>
        </Row>
        <hr />
        <h4>Refunds</h4>
        <hr />
        <Row>
          <Col xs={12} md={12}>
            {ValueChecker(
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              "Reason"
            )}
          </Col>
          <Col xs={12} md={2}>
            <button className="accept">Accept</button>
          </Col>
          <Col xs={12} md={4}>
            <button className="reject">Reject</button>
          </Col>
        </Row>
        <hr />

        <div className="w-100 d-flex justify-end">
          <Link to="/user">
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HOC(SingleOrder);
