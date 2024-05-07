    /** @format */

    import React from "react";
    import HOC from "../../Layout/HOC";
    import { Form, Button } from "react-bootstrap";
    import { Link } from "react-router-dom";
    import BreadCrumb from "../../Component/BreadCrumb";
    import { Row, Col } from "react-bootstrap";
    import Select from "react-select";

    const CreateDiscount = () => {
    return (
        <section className="sectionCont">
        <BreadCrumb title={"Create Coupon"} />
        <Form>
            <Row>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Discount Name</Form.Label>
                <Form.Control type="text" required />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Discount Type</Form.Label>
                <Form.Select>
                    <option>select dicount type</option>
                    <option>Percentage</option>
                    <option>Flat</option>
                    <option>Both- XX% or up to YY Flat amount</option>
                </Form.Select>
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Discount percentage</Form.Label>
                <Form.Control type="number" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Discount amount</Form.Label>
                <Form.Control type="number" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Applicable Time of the day</Form.Label>
                <Form.Control type="time" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Occasion</Form.Label>
                <Form.Control type="text" placeholder="festivals , seasons" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>
                    Min. number of sales as per the booked orders
                </Form.Label>
                <Form.Control type="number" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Valid date</Form.Label>
                <Form.Control type="date" />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Valid Cateogry</Form.Label>
                <Select isMulti options={[]} placeholder="Select..." />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Valid Products</Form.Label>
                <Select isMulti options={[]} placeholder="Select..." />
                </Form.Group>
            </Col>
            <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                <Form.Label>Applicable merchants/vendors</Form.Label>
                <Select isMulti options={[]} placeholder="Select..." />
                </Form.Group>
            </Col>
            </Row>

            <div className="w-100 d-flex justify-content-between">
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

    export default HOC(CreateDiscount);
