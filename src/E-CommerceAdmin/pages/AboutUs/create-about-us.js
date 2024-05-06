/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { TextEditor } from "../../../utils/utils";

const CreateAboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <section>
      <p className="headP">Dashboard / Create About-Us</p>
      <section className="sectionCont">
        <Form>
          <TextEditor label={"Description"} />

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              Submit
            </Button>

            <Link to="/about-us">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateAboutUs);
