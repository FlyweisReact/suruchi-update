/** @format */

import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HOC from "../../Layout/HOC";
import { ValueChecker } from "../../utils/utils";
import img from "../../assests/Images/product/4.png";
import img3 from "../../assests/Images/product/3.png";

const ViewInventory = () => {
  const navigate = useNavigate();
  return (
    <section className="sectionCont">
      <div className="img-cont">
        <img src={img} alt="" className="centerImage" />
        <img src={img3} alt="" className="centerImage" />
      </div>
      <Row className="mt-3">
        <Col xs={12} md={6}>
          {ValueChecker("DNSUE1", "Product Id")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker("Men Black raglan jacket", "Product Name")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker("Men", "Product Category")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker(12, "Required quantity")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker(1000, "Current stock ")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker("Denim", "Jacket")}
        </Col>
        <Col xs={12} md={12}>
          {ValueChecker(
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia",
            "Specification"
          )}
        </Col>
        <Col xs={12} md={12}>
          {ValueChecker(
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia",
            "Product Description"
          )}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker("Clothes", "Type")}
        </Col>
        <Col xs={12} md={6}>
          {ValueChecker("5%", "Discount")}
        </Col>
        <Col xs={12} md={12}>
          {ValueChecker(
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia",
            "Material Information"
          )}
        </Col>
        <Col xs={12} md={12}>
          {ValueChecker(
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia",
            "Brand  Information"
          )}
        </Col>
        <Col xs={12} md={4}>
          {ValueChecker(
            "1 Year",
            "Warranty"
          )}
        </Col>
        <Col xs={12} md={4}>
          {ValueChecker(
            100,
            "Product quantity (for inventory management) "
          )}
        </Col>
        <Col xs={12} md={4}>
          {ValueChecker(
            200,
            " Product quantity limit for purchase"
          )}
        </Col>
      </Row>

      <Button variant="dark" onClick={() => navigate(-1)}>
        Back
      </Button>
    </section>
  );
};

export default HOC(ViewInventory);
