import "../assets/styles/transaction.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Registration = () => {
  const navigate = useNavigate();
  let [regData, setRegData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [issubmit, setIsSubmit] = useState(false);

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    name: yup.string().required("Your name is required!!"),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password is not matched!!")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  // ......

  const onSubmit = (e) => {
     regData = { ...e };
    delete regData.cpassword;
    setRegData(regData);
    setIsSubmit(true);
    if (Object.values(e).length && issubmit===true) {
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
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <label className="label">Name:</label>
          <input
            type="text"
            name="name"
            className="inputFields"
            {...register("name")}
          ></input>
          <span>{errors.name?.message}</span>
          <br></br>
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            className="inputFields"
            {...register("email")}
          ></input>
          <span>{errors.email?.message}</span>
          <br></br>
          <label className="label">Password:</label>
          <input
            type="password"
            name="password"
            className="pswFields"
            {...register("password")}
          ></input>
          <span>{errors.password?.message}</span>
          <br></br>
          <label className="label">CPassword:</label>
          <input
            type="password"
            name="cpassword"
            className="pswFields"
            {...register("cpassword")}
          ></input>
          <span>{errors.cpassword?.message}</span>
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
