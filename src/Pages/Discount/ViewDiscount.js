/** @format */

import React from "react";
import HOC from "../../Layout/HOC";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { ValueChecker } from "../../utils/utils";

const ViewDiscount = () => {
  return (
    <section className="sectionCont">
      <Form>
        <Row>
          <Col xs={12} md={6}>
            {ValueChecker("FestiveCode", "Discount Name")}
          </Col>
          <Col xs={12} md={6}>
            {ValueChecker("Percentage", "Discount Type")}
          </Col>
          <Col xs={12} md={6}>
            {ValueChecker("10%", "Discount percentage")}
          </Col>
          <Col xs={12} md={6}>
            {ValueChecker("Festival", "Occasion")}
          </Col>
          <Col xs={12} md={6}>
            {ValueChecker(
              "20",
              " Min. number of sales as per the booked orders"
            )}
          </Col>
        </Row>

        <div className="w-100 d-flex justify-end">
          <Link to={-1}>
            <Button variant="dark">Back</Button>
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default HOC(ViewDiscount);
