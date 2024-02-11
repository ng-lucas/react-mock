import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FEED } from "../../saga/actionTypes";
import { useDispatch } from "react-redux";
import { article } from "../../types";
import { useEffect, useState } from "react";
import style from './FormArticle.module.css'

type Props = {
  initialValuesForm: {
    title: string;
    description: string;
    body: string;
    tagList?: string;
  };
  newArt: boolean;
  slug?: string;
};

const FormArticle = ({ initialValuesForm, newArt, slug }: Props) => {
  const [tags, setTags] = useState<string[] | undefined>([]);
  const [tagInput, setTagInput] = useState("");
  const dispatch = useDispatch();
  const validateForm = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    body: Yup.string().required("Required"),
    tagList: Yup.string().required("Required"),
  });

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTagInput(value);
    const newTags = value.split(/[\s,]+/).filter((tag) => tag);
    setTags(newTags);
  };

  const removeTag = (index: number) => {
    const newTags = tags?.filter((_, i) => i !== index);
    setTags(newTags);
    if (newTags) setTagInput(newTags.join(", "));
  };

  const handlePublishArticle = (
    values: article,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof values.tagList === "string")
      values.tagList = values.tagList.split(/[\s,]+/).filter((tag) => tag);
    setSubmitting(false);
    dispatch({
      type: FEED.SETARTICLE,
      payload: { data: { article: values } },
    });
  };

  const handleUpdateArticle = (
    values: article,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    if (typeof values.tagList === "string")
      values.tagList = values.tagList.split(/[\s,]+/).filter((tag) => tag);
    setSubmitting(false);
    dispatch({
      type: FEED.EDITARTICLE,
      payload: {
        slug: slug,
        data: {
          article: {
            title: values.title,
            description: values.description,
            body: values.body,
            tagList: values.tagList,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (!newArt) {
      const newTags = initialValuesForm?.tagList
        ?.split(/[\s,]+/)
        .filter((tag) => tag);
      setTags(newTags);
    }
  }, []);

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={validateForm}
      onSubmit={newArt ? handlePublishArticle : handleUpdateArticle}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <Form className="mb-100px">
          <div className="row mb-3">
            <div className="form-group mb-20px col-md-12">
              <label htmlFor="title">Article title</label>
              <Field className="form-control" id="title" name="title" />
              {errors.title && touched.title ? (
                <div className="text-danger">{errors.title}</div>
              ) : null}
            </div>

            <div className="form-group mb-20px col-md-12">
              <label htmlFor="description">What's this article about?</label>
              <Field
                className="form-control"
                id="description"
                name="description"
                as="textarea"
                rows={6}
              />
              {errors.description && touched.description ? (
                <div className="text-danger">{errors.description}</div>
              ) : null}
            </div>

            <div className="form-group mb-20px col-md-12">
              <label htmlFor="body">Article content</label>
              <div className="form-group mb-0">
                <Field
                  className="form-control"
                  id="body"
                  type="text"
                  name="body"
                  as="textarea"
                  rows={6}
                />
                {errors.body && touched.body ? (
                  <div className="text-danger">{errors.body}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group mb-20px col-md-12">
              <label htmlFor="tagList">Tags</label>
              {newArt ? <Field
                as="input"
                className="form-control"
                id="tagList"
                type="text"
                name="tagList"
                value={newArt ? tagInput : initialValuesForm.tagList}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleTagInput(e);
                  setFieldValue("tagList", e.target.value);
                }}
                /> : <></>}
              {errors.tagList && touched.tagList ? (
                <div className="text-danger">{errors.tagList}</div>
              ) : null}
              <div className="entry-meta-bottom mt-10px">
                <div className={`${style['tags']} text-lg-left`}>
                  <ul className="d-flex entry-tags mb-25px p-0">
                    {tags?.map((tag, index) => (
                      <span key={index} className={`${style['tag']} tag mr-3 d-flex align-items-center justify-content-center`}>
                        {tag}
                        <button type="button" className={`${style['delete-tag']}`} disabled={!newArt} onClick={() => removeTag(index)}>
                          &times;
                        </button>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
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
                disabled={isSubmitting}
              >
                {newArt ? "Publish" : "Update"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormArticle;
