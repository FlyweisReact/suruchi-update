/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";
import Select from "react-select";
import ReactQuill from "react-quill";
import { View_description } from "../../../Helper/Helper";
import { getApi, postApi } from "../../../Respo/Api";
import data from "../../../Constant/constant.json";
import { TextEditor } from "../../../utils/utils";

const CreateProduct = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [nutritionArray, setNutritionArray] = useState([]);
  const [skinTypeArray, setSkinTypeArray] = useState([]);
  const [productTypeArr, setProductTypeArr] = useState([]);
  const [skinConditionArr, SkinConditionArr] = useState([]);
  const [brandArr, setBrandArr] = useState([]);
  const [stock, setStock] = useState(0);
  const [step, setStep] = useState("");
  const [stepDescription, setStepDescription] = useState("");
  const [howToUse, setHowToUse] = useState([]);
  const [ingredients, setIngredeints] = useState("");
  const [price, setPrice] = useState(0);
  const [benfit, setBenefit] = useState("");
  const [multipleSize, setMultipleSize] = useState("false");
  const [sizes, setSizes] = useState("");
  const [multiplePrice, setMultiplePrice] = useState(0);
  const [multipleStock, setMultipleStock] = useState(0);
  const [multipleArr, setMultipleArr] = useState([]);

  const [nutritionId, setNutritionId] = useState([]);
  const [skinTypeId, seteSkinTypeId] = useState([]);
  const [productTypeId, setProductTypeId] = useState([]);
  const [skinConditionId, setSkinConditionId] = useState([]);
  const [brandId, setBrandId] = useState([]);

  // New Field
  const [keyIngredients, setKeyIngredients] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [acneType, setAcneType] = useState("");
  const [considerAcne, setConsiderAcne] = useState("");

  const descObject = {
    step,
    stepDescription,
  };

  const multipleObj = {
    sizes,
    multiplePrice,
    multipleStock,
  };

  const multiple_adder = () => {
    setMultipleArr((prev) => [...prev, multipleObj]);
    setSizes("");
    setMultiplePrice(0);
    setMultipleStock(0);
  };

  const multiple_remover = (index) => {
    setMultipleArr((prev) => prev.filter((_, i) => i !== index));
  };

  const use_adder = () => {
    setHowToUse((prev) => [...prev, descObject]);
    setStep("");
    setStepDescription("");
  };

  const use_remover = (index) => {
    setHowToUse((prev) => prev.filter((_, i) => i !== index));
  };

  const fetchAll = () => {
    getApi({
      url: "api/v1/admin/Nutrition/allNutrition",
      setResponse: setNutritionArray,
    });
    getApi({
      url: "api/v1/admin/SkinType/allSkinType",
      setResponse: setSkinTypeArray,
    });
    getApi({
      url: "api/v1/admin/ProductType/allProductType",
      setResponse: setProductTypeArr,
    });
    getApi({
      url: "api/v1/admin/SkinCondition/allSkinCondition",
      setResponse: SkinConditionArr,
    });
    getApi({
      url: "api/v1/admin/Brand/allBrand",
      setResponse: setBrandArr,
    });
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Create New Product</p>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required />
          </Form.Group>

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

          <TextEditor label={"Description"} />

          <Form.Group className="mb-3">
            <Form.Label>Multiple Sizes</Form.Label>
            <Form.Select onChange={(e) => setMultipleSize(e.target.value)}>
              <option>Selete Your Prefrence</option>
              <option value={"true"}>Activate</option>
              <option value={"false"}> Deactivate</option>
            </Form.Select>
          </Form.Group>

          {multipleSize === "false" ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  step={0.01}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
            </>
          ) : (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Multiple Sizes Detail</Form.Label>
                <Form.Control
                  type="text"
                  value={sizes}
                  placeholder="Size"
                  onChange={(e) => setSizes(e.target.value)}
                  className="mb-3"
                />

                <Form.Control
                  type="number"
                  min={0}
                  value={multiplePrice}
                  placeholder="Price"
                  step={0.01}
                  onChange={(e) => setMultiplePrice(e.target.value)}
                  className="mb-3"
                />

                <Form.Control
                  type="number"
                  value={multipleStock}
                  placeholder="Stock"
                  min={0}
                  onChange={(e) => setMultipleStock(e.target.value)}
                  className="mb-3"
                />

                <Button variant="dark" onClick={() => multiple_adder()}>
                  Add
                </Button>
              </Form.Group>

              {multipleArr?.map((i, index) => (
                <ul
                  className="mt-2"
                  style={{
                    border: "1px solid #000",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                  }}
                >
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.sizes}
                  </li>
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.multiplePrice}
                  </li>
                  <li style={{ listStyle: "disc" }} className="mt-1">
                    {i.multipleStock}
                  </li>
                  <li className="mt-3" style={{ listStyle: "none" }}>
                    <Button onClick={() => multiple_remover(index)}>
                      Remove This One
                    </Button>
                  </li>
                </ul>
              ))}
            </>
          )}

      
          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);
