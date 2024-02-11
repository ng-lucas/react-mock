import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Setting/Setting.module.css";
import { USER } from "../../saga/actionTypes";
import * as Yup from "yup";
import Toast from "../Other/Toast";
import { settingFormData } from "../../types";
import { useCallback, useState } from "react";
import { RootState } from "../../redux/store";

export default function Setting() {
  const currentPwd = useSelector((state: RootState) => state.user.correct);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [changePsw, setChangePsw] = useState<boolean>(false);

  const settingValid = Yup.object().shape({
    email: Yup.string()
      .matches(
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        "Invalid email"
      )
      .required("Required"),
    username: Yup.string()
      .min(6, "Username must be at least 6 characters!")
      .max(20, "Username must be less than 12 characters!")
      .required("Required"),
    bio: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    image: Yup.string().url("Must be a valid URL").required("Required"),
    current: Yup.string(),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9~`!@#$%^&*()_+\-=[\]{}|\\:;"'<,>.?/]*$/,
        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      )
      .min(8)
      .max(30),
    confirm: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const checkCurrentPassword = useCallback(
    (email: string, password: string) => {
      dispatch({ type: USER.CHECK, payload: { email, password } });
      console.log("checked");
    },
    [dispatch]
  );

  const handleSubmit = (
    values: settingFormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const input = {
      email: values.email,
      password: values.password,
      username: values.username,
      bio: values.bio,
      image: values.image,
    };

    const notChangePwd = {
      email: values.email,
      username: values.username,
      bio: values.bio,
      image: values.image,
    };

    if (changePsw) {
      checkCurrentPassword(values.email, values.current);

      if (currentPwd === true) {
        dispatch({ type: USER.UPDATE, payload: input });
        setSubmitting(false);
      }
    } else {
      dispatch({ type: USER.UPDATE, payload: notChangePwd });
      setSubmitting(false);
    }
  };

  return (
    <div className={`container ${styles["setting-wrapper"]}`}>
      <div className={`row align-items-center ${styles.row}`}>
        <div className="col-lg-6 offset-lg-3">
          <h2 className="mb-3 text-center">SETTING</h2>
          <Formik
            initialValues={{
              email: user.user.email,
              image: user.user.image,
              username: user.user.username,
              bio: user.user.bio,
              password: "",
              current: "",
              confirm: "",
            }}
            validationSchema={settingValid}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form id="contact-form" data-toggle="validator" className="mb-3">
                <div className="row mb-4">
                  <div className="form-group mb-20px col-md-12">
                    <label htmlFor="image">Avatar link</label>
                    <Field
                      type="text"
                      id="image"
                      name="image"
                      className="form-control"
                    />
                    {errors.image && touched.image ? (
                      <div className="text-danger">{errors.image}</div>
                    ) : null}
                  </div>

                  <div className="form-group mb-20px col-md-12">
                    <label htmlFor="username">Username</label>
                    <Field
                      type="text"
                      id="username"
                      name="username"
                      className="form-control"
                      autoComplete="off"
                    />
                    {errors.username && touched.username ? (
                      <div className="text-danger">{errors.username}</div>
                    ) : null}
                  </div>

                  <div className="form-group mb-20px col-md-12">
                    <label htmlFor="bio">Bio</label>
                    <Field
                      type="text"
                      name="bio"
                      id="bio"
                      as="textarea"
                      rows={6}
                      className="form-control"
                    />
                    {errors.bio && touched.bio ? (
                      <div className="text-danger">{errors.bio}</div>
                    ) : null}
                  </div>

                  <div className="form-group mb-20px col-md-12">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      autoComplete="off"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger">{errors.email}</div>
                    ) : null}
                  </div>

                  <div className="form-group form-check my-20px col-md-12">
                    <Field
                      className="form-check-input"
                      type="checkbox"
                      id="changePwd"
                      checked={changePsw}
                      onChange={() => setChangePsw((current) => !current)}
                    />
                    <label className="form-check-label" htmlFor="changePwd">
                      Change Password
                    </label>
                  </div>

                  {changePsw ? (
                    <>
                      <div className="form-group mb-20px col-md-12">
                        <label htmlFor="current">Current password:</label>
                        <Field
                          className="form-control"
                          id="current"
                          type="password"
                          name="current"
                        />
                        {errors.current && touched.current ? (
                          <div className="text-danger">{errors.current}</div>
                        ) : null}
                      </div>

                      <div className="form-group mb-20px col-md-12">
                        <label htmlFor="password">New password:</label>
                        <Field
                          className="form-control"
                          id="password"
                          type="password"
                          name="password"
                        />
                        {errors.password && touched.password ? (
                          <div className="text-danger">{errors.password}</div>
                        ) : null}
                      </div>

                      <div className="form-group mb-20px col-md-12">
                        <label htmlFor="confirm">Confirm password:</label>
                        <Field
                          className="form-control"
                          id="confirm"
                          type="password"
                          name="confirm"
                        />
                        {errors.confirm && touched.confirm ? (
                          <div className="text-danger">{errors.confirm}</div>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <div className="row my-20px m-auto">
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
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Toast />
    </div>
  );
}
