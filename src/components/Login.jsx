import "../assets/styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, React } from "react";
import { result } from "../utils/helper";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const Login = () => {
  const registrationData = JSON.parse(localStorage.getItem("registration"));

  const navigate = useNavigate();
  let [loginData, setRegData] = useState({});
  let [error, setError] = useState({});

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmit = async (e) => {
     loginData = { ...e };
    setRegData(loginData);

    // useeffect

    if (Object.values(loginData).length) {
      let flag = false;
      for (const key in registrationData) {
        if (
          registrationData[key].email === loginData.email &&
          registrationData[key].password === loginData.password
        ) {
          flag = true;
          setError((prev) => {
            return {
              ...prev,
              login: "",
            };
          });
          break;
        } else {
          flag = false;

          setError((prev) => {
            return {
              ...prev,
              login: "email & psw not matched!!!",
            };
          });
        }
      }

      if (flag === true) {
        loginData["token"] = result;
        localStorage.setItem("logindata", JSON.stringify(loginData));
        navigate("/transaction");
      }
    }

    // ....................................
  };

  return (
    <>
      <div className="form">
        <h2>Login Form</h2>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
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
          <span>{error.login}</span>
          <br></br>
          <button type="submit" id="submit" className="ViewBtn">
            Submit
          </button>
          <br></br>
        </form>
        <Link to={"/public/registration"} className="loginBtn">
          Registration
        </Link>
      </div>
    </>
  );
};

export default Login;
