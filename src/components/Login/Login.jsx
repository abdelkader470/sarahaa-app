import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { tokenContext } from "../../context/tokenContext";

function Login() {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isApiError, setIsApiError] = useState("");
  let { setToken } = useContext(tokenContext);
  function login(values) {
    setIsLoading(true);
    axios
      .post(`https://sara7aiti.onrender.com/api/v1/user/signin`, values)
      .then((data) => {
        console.log(data);
        if (data.data.message === "welcome") {
          setIsLoading(false);
          localStorage.setItem("userToken", data.data.token);
          setToken(data.data.token);
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setIsApiError(err.response.data.error);
        setIsLoading(false);
      });
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("email not valid").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "start a password with captial")
      .required("password is required"),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
    },
  });
  return (
    <div className="w-50 mx-auto my-5 border p-5 bg-white">
      <div>
        <i
          class="fas fa-user-secret user-icon text-center d-block"
          style={{ fontSize: "60px", color: "#C0C0C0" }}
        ></i>
      </div>
      <h3 className="text-center mt-2">Login</h3>
      {isApiError ? <div className="alert alert-danger">{isApiError}</div> : ""}
      <form onSubmit={formik.handleSubmit}>
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

        <div>
          <button className="btn btn-default-outline my-4  m-auto d-block rounded">
            {isLoading ? (
              <i className=" fa fa-spin fa-spinner"></i>
            ) : (
              <>
                <i className="far fa-edit text-center me-2"></i> Login
              </>
            )}
          </button>
          {/* <button className="btn btn-default-outline d-block m-auto">
            Register
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Login;
