import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";
import { signupFormData } from "../../types";
import { useDispatch } from "react-redux";
import { USER } from "../../saga/actionTypes";
import Toast from "../Other/Toast";

export default function Signup() {
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    username: Yup.string()
      .required("Required")
      .matches(/^[A-Za-z0-9._-\s]*$/, "Invalid username")
      .min(6)
      .max(20),
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Invalid email"
      )
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()_+\-=[\]{}|\\:;"'<,>.?/])[A-Za-z\d~`!@#$%^&*()_+\-=[\]{}|\\:;"'<,>.?/]{8,30}$/,
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      )
      .min(8)
      .max(30),
    confirm: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = (
    values: signupFormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const input = {
      email: values.email,
      password: values.password,
      username: values.username,
    };
    dispatch({ type: USER.REGISTER, payload: input });
    setSubmitting(false);
  };

  return (
    <div className={`container register-wrapper`}>
      <div className={`row align-items-center ${styles.row}`}>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="mb-3 text-center">SIGN UP</h2>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirm: "",
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mb-3">
                <div className="row mb-4">
                  <div className="form-group mb-30px col-md-12">
                    <label htmlFor="username">Username:</label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-danger">{errors.username}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="form-group mb-30px col-md-12">
                    <label htmlFor="email">Email:</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="form-group mb-30px col-md-12">
                    <label htmlFor="password">Password:</label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                    />
                    {errors.password && touched.password ? (
                      <div className="text-danger">{errors.password}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="form-group mb-30px col-md-12">
                    <label htmlFor="confirm">Confirm Password:</label>
                    <Field
                      type="password"
                      name="confirm"
                      id="confirm"
                      className="form-control"
                    />
                    {errors.confirm && touched.confirm ? (
                      <div className="text-danger">{errors.confirm}</div>
                    ) : null}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-xs-12 text-center">
                    <button
                      className="btn btn-shadow"
                      type="submit"
                      style={{
                        pointerEvents: "all",
                        cursor: "pointer",
                        width: "100%",
                      }}
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <form />
          <p className="text-center">
            Have an account?{" "}
            <Link to="/login" className="text-warning">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Toast />
    </div>
  );
}
