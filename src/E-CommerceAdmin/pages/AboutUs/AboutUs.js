/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { View_description } from "../../../Helper/Helper";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="sectionCont">
        <div className="d-flex gap-1" style={{ justifyContent: "flex-end" }}>
          <Link to="/create-about-us">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Create About-Us
            </button>
          </Link>
          <Link to={`/create-about-us`}>
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider">
              Edit About-Us
            </button>
          </Link>
          <Button
            variant="danger"
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            style={{ borderRadius: 0 }}
          >
            Delete
          </Button>
        </div>

        <div className="Desc-Container">
          <p className="title"> Description </p>

          <p className="desc">
            <View_description
              description={
                "Lorem ipsum dolor sit amet consectetur. Justo a nec diam eget mattis. Risus nunc habitant nibh leo habitant nulla. Tortor facilisi commodo platea id viverra lectus. Enim congue nullam est varius pellentesque rhoncus ultrices lacus ullamcorper. Diam lobortis at augue vestibulum vestibulum sit sit mauris. Id mi nec enim in etiam diam risus congue. At pharetra purus semper  Lorem ipsum dolor sit amet consectetur. Justo a nec diam eget mattis. Risus nunc habitant nibh leo habitant nulla. Tortor facilisi commodo platea id viverra lectus. Enim congue nullam est varius pellentesque rhoncus ultrices lacus ullamcorper. Diam lobortis at augue vestibulum vestibulum sit sit mauris. Id mi nec enim in etiam diam risus congue. At pharetra purus semper  Lorem ipsum dolor sit amet consectetur. Justo a nec diam eget mattis. Risus nunc habitant nibh leo habitant nulla. Tortor facilisi commodo platea id viverra lectus. Enim congue nullam est varius pellentesque rhoncus ultrices lacus ullamcorper. Diam lobortis at augue vestibulum vestibulum sit sit mauris. Id mi nec enim in etiam diam risus congue. At pharetra purus semper "
              }
            />
          </p>
        </div>
      </section>
    </>
  );
};

export default HOC(AboutUs);
