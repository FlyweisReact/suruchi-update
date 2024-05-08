/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ValueChecker } from "../../utils/utils";
import { getApi } from "../../Repository/Repository";
import Loader from "../../Component/Loader";

const UserData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHandler = () => {
    getApi({
      url: `api/v1/admin/viewUser/${id}`,
      setResponse,
      setLoading,
    });
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="sectionCont">
          <p className="headP">Dashboard / {id} </p>

          <div className="img-cont">
            <img
              src={
                "https://img.freepik.com/free-photo/portrait-happy-male-with-broad-smile_176532-8175.jpg?t=st=1714041244~exp=1714044844~hmac=ebd5a8df1e46b6ac862eeb6e7e75318c4d2c462f453bc3a8fcf927c81f908e5f&w=1380"
              }
              alt=""
              className="centerImage"
            />
          </div>
          {ValueChecker("johndoe23", "User name")}
          {ValueChecker("John", "First name")}
          {ValueChecker("Doe", "Last name")}
          {ValueChecker("+1 (555) 123-4567", "Phone number")}
          {ValueChecker("johndoe@example.com", "Email id")}
          <Button variant="dark" onClick={() => navigate(-1)}>
            Back
          </Button>
        </section>
      )}
    </>
  );
};

export default HOC(UserData);
