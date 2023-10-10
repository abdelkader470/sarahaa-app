import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState("");

  function register(values) {
    setIsLoading(true);
    axios
      .post(`https://sara7aiti.onrender.com/api/v1/user`, values)
      .then((data) => {
        console.log(data);
        if (data.data.message === "Added") {
          setIsLoading(false);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setIsApiError(err.response.data.error);
        setIsLoading(false);
      });
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "name must be less than 15 letters")
      .min(3, "name must be more than 3 letters")
      .required("name is required"),

    email: Yup.string().email("email not valid").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "start a password with captial")
      .required("password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "rePassword not match")
      .required("rePassword is required"),

    age: Yup.number().required("age is required").positive(),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      age: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });
  return (
    <div className="w-50 mx-auto my-5 border pt-4 px-5 bg-white">
      <div>
        <i
          className="far fa-edit text-center d-block"
          style={{ fontSize: "60px", color: "#C0C0C0" }}
        ></i>
      </div>
      <h3 className="text-center mt-2">Register</h3>
      {isApiError ? <div className="alert alert-danger">{isApiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger py-0 px-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger py-0 px-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger py-0 px-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Password Confirmation"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger py-0 px-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="form-group  mb-2 mx-2">
          <input
            className="form-control"
            placeholder="Enter your Age"
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.age && formik.touched.age ? (
            <div className="alert alert-danger py-0 px-2">
              {formik.errors.age}
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <button className="btn btn-default-outline my-4 w-50 m-auto d-block rounded">
            {isLoading ? (
              <i className=" fa fa-spin fa-spinner"></i>
            ) : (
              <>
                <i className="far fa-edit text-center me-2 "></i> Register
              </>
            )}
          </button>
          {/* <button className="btn btn-default-outline d-block m-auto">
            Login
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Register;
