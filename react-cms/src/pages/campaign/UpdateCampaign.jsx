import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CampaignService from "../../services/CampaignService";
import ReactQuill from "react-quill"; // Import React-Quill
import "react-quill/dist/quill.snow.css"; // Import CSS untuk Quill

const UpdateCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    CampaignService.getCampaignById(id)
      .then((response) => {
        setInitialValues({
          name: response.data.name,
          title: response.data.title,
          description: response.data.description,
        });
        console.log(response);
      })
      .catch((error) => {
        console.error("There was an error fetching the campaign!", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .max(50, "Name must be less than 50 characters")
        .min(5, "Name must be at least 5 characters"),
      title: Yup.string()
        .required("Title is required")
        .max(100, "Title must be less than 100 characters")
        .min(5, "Title must be at least 5 characters"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      values.description = formik.values.description;

      CampaignService.updateCampaign(id, values)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error updating the campaign!", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-md mobile:mt-24 laptop:mt-14 md:w-1/2 lg:w-1/3">
        <h1 className="mb-4 font-bold text-center">Update Campaign</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="name">
              Name:
            </strong>
            <input
              id="name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-sm text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="title">
              Title:
            </strong>
            <input
              id="title"
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-sm text-red-500">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="description">
              Description:
            </strong>
            <ReactQuill
              id="description"
              name="description"
              value={formik.values.description}
              onChange={(content, delta, source, editor) => {
                formik.setFieldValue("description", content);
              }}
              className={`h-96 ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-sm text-red-500">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-green-500 rounded-lg laptop:mt-10 mobile:mt-14 hover:bg-green-700 mobile:text-sm laptop:text-base"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Updating..." : "Update Campaign"}
          </button>
          <button
            to="/"
            className="w-full p-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 mobile:text-sm laptop:text-base"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCampaign;
