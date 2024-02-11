import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { loginFormData } from "../../types";
import { useDispatch } from "react-redux";
import { USER } from "../../saga/actionTypes";
import Toast from "../Other/Toast";

export default function Login() {
  const dispatch = useDispatch();

  const validation = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Invalid email"
      )
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = (
    values: loginFormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    dispatch({ type: USER.LOGIN, payload: values });
    setSubmitting(false);
  };

  return (
    <div className={`container ${styles["login-wrapper"]}`}>
      <div className={`row align-items-center ${styles.row}`}>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="mb-3 text-center">Login</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validation}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mb-3">
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
                      Login
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <form />
          <p className="text-center">
            Not a member?{" "}
            <Link to="/signup" className="text-warning">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
      <Toast />
    </div>
  );
}
