import "../assets/styles/transaction.css";

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [issubmit, setIsSubmit] = useState(false);

  const hasChange = (e) => {
    const { name, value } = e.target;

    setRegData((prev) => {
      return { ...prev, [name]: value };
    });
    setError(validate(regData));
  };

  const validate = (regData) => {
    const error = {};
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if (regData["name"].trim().length <= 3) {
      error.name = "name is required";
    }

    if (!regex.test(regData["email"])) {
      error.email = "email is required";

      if (regData["password"].length <= 4) {
        error.password = "password is required";
      }
    }
    return error;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    hasChange(e);
    setError(validate(regData));
    setIsSubmit(true);
    if (Object.keys(error).length === 0 && issubmit === true) {
      console.log("submit");

      if (localStorage.getItem("registration")) {
        const retrivedata = JSON.parse(localStorage.getItem("registration"));
        let lastIdIndex = Object.keys(retrivedata).length - 1;
        let lastId = retrivedata[lastIdIndex].id;
        regData["id"] = lastId + 1;
        retrivedata.push(regData);
        localStorage.setItem("registration", JSON.stringify(retrivedata));
      } else {
        regData["id"] = 1;
        localStorage.setItem("registration", JSON.stringify([regData]));
      }
      navigate("/login");
    } else {
      console.log("error existed");
    }
  };
  return (
    <>
      <div className="form">
        <h2>Registration Form</h2>
        <form onSubmit={submitHandler} method="POST">
          <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            className="inputFields"
            value={regData.name}
            onChange={(e) => hasChange(e)}
          ></input>
          <span>{error.name}</span>
          <br></br>
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            className="inputFields"
            value={regData.email}
            onChange={(e) => hasChange(e)}
          ></input>{" "}
          <span>{error.email}</span>
          <br></br>
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            className="pswFields"
            value={regData.password}
            onChange={(e) => hasChange(e)}
          ></input>
          <span>{error.password}</span>
          <span>{error.regEmail}</span>
          <br></br>
          <button type="submit" className="ViewBtn">
            Submit
          </button>
          <br></br>
        </form>
        <Link to={"/public/login"} className="loginBtn">
          Login
        </Link>
      </div>
    </>
  );
};

export default Registration;
