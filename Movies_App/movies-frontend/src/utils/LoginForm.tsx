import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAdminAuthContext } from "../Admin/AuthContext";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const context = useAdminAuthContext();
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values: any) => {
    if (values.email.includes("admin@")) {
      if (values.password === "administrator") {
        context?.setAdminAuth(true);
      }
    }
    navigate("/");
    console.log(values);
  };

  return (
    <div className="container mt-5 card" style={{ width: "28rem" }}>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group mb-3">
              <label htmlFor="email" className="mt-3">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="mt-3">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <button
              type="submit"
              className="btn btn-success mt-3 mb-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
