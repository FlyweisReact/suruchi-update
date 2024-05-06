/** @format */

import React, { useEffect } from "react";
import HOC from "../../layout/HOC";
import { View_description } from "../../../Helper/Helper";

const Faq = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="sectionCont">
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

export default HOC(Faq);
