/** @format */

import React, { useEffect, useState } from "react";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);
  const [inputpass, setInputpass] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);
  return (
    <>
      <section className="LoginSection">
        <form>
          <h2>Admin Panel</h2>
          <div className="input_container">
            <input type="email" placeholder="admin@gmail.com" required />
            <AiOutlineMail className="text-xl " />
          </div>
          <div className="input_container">
            <input
              type={inputpass ? "text" : "password"}
              placeholder="password"
              required
            />
            <span
              onClick={() => {
                setPass(!pass);
                setInputpass(!inputpass);
              }}
              className="text-xl cursor-pointer hover:scale-90 "
            >
              {pass ? <VscEyeClosed /> : <VscEye />}
            </span>
          </div>

          <button
            type="button"
            className="EcommerceAdminLogin"
            onClick={() => navigate("/dashboard")}
          >
            Log In
          </button>
          <button
            type="button"
            className="EcommerceVendorLogin"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password?
          </button>
        </form>
      </section>
    </>
  );
};

export default Login;