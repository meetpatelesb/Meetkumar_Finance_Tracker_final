import { React } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup";

const YupValidations = () => {
  
  const formSchema = yup.object().shape({
    name: yup.string().required("Your name is required!!"),
    age: yup.number().integer().min(18).label('age').typeError("age is required!!").required(),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password is not matched!!")
      .required(),
  });

  const { register, handleSubmit ,formState:{errors}} = useForm({
    resolver:yupResolver(formSchema),
  });

  const onSubmit = (e) => {
    alert("Thank you for your response!!")
    console.log(e);

  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="label">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          {...register("name")}
        />
        <p>{errors.name?.message}</p>
        <br></br>
        <label className="label">Age:</label>
        <input
          type="number"
          name="age"
          placeholder="enter age"
          {...register("age")}
        />
        <p>{errors.age?.message}</p>
        <br></br>
        <label className="label">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="enter email id"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <br></br>
        <label className="label">Password:</label>
        <input
          type="password"
          name="password"
          placeholder="enter password"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <br></br>
        <label className="label">CPassword:</label>
        <input
          type="password"
          name="cpassword"
          placeholder="enter confirm password"
          {...register("cpassword")}
        />
        <p>{errors.cpassword?.message}</p>
        <br></br>
        <button type="submit" className="submitBtn">
          Submit
        </button>
      </form>
    </>
  );
};

export default YupValidations;
