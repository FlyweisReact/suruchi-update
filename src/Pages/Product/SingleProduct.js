/** @format */
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ValueChecker } from "../../utils/utils";
import HOC from "../../Layout/HOC";
import img from "../../assests/Images/product/4.png";
import img1 from "../../assests/Images/product/1.png";
import img2 from "../../assests/Images/product/2.png";
import img3 from "../../assests/Images/product/3.png";

const productObject = {
  images: [img, img1, img2, img3],
  title: "Men Black raglan jacket",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
  category: "Men",
  multipleSize: "true",
  sizeArr: [
    {
      price: 550,
      stock: 1000,
      size: "L",
    },
    {
      price: 1000,
      stock: 200,
      size: "XL",
    },
    {
      price: 2000,
      stock: 100,
      size: "XXL",
    },
  ],
  price: 500,
  stock: 100,
};

const SingleProduct = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="sectionCont">
        <div className="img-cont">
          {productObject?.images?.map((i, index) => (
            <img
              src={i}
              alt=""
              key={`Images${index}`}
              className="centerImage"
            />
          ))}
        </div>

        {ValueChecker(productObject?.title, "Title")}
        {ValueChecker(productObject?.description, "Description")}
        {ValueChecker(productObject?.category, "Category")}

        {productObject?.multipleSize === "true" ? (
          productObject?.sizeArr?.length > 0 && (
            <React.Fragment>
              <p className="title"> Sizes </p>
              {productObject?.sizeArr?.map((i, index) => (
                <div className="SizeArr" key={`sizeArr${index}`}>
                  <p> Price : {i?.price} </p>
                  <p> Size : {i?.size} </p>
                  <p> stock : {i?.stock} </p>
                </div>
              ))}
            </React.Fragment>
          )
        ) : (
          <>
            {ValueChecker(productObject?.price, "Price")}
            {ValueChecker(productObject?.stock, "Stock")}
          </>
        )}

        <Link to="/Product">
          <Button variant="dark">Back</Button>
        </Link>
      </section>
    </>
  );
};

export default HOC(SingleProduct);
