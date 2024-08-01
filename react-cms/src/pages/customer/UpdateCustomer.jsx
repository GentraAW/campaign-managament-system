import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomerService from "../../services/CustomerService";

const UpdateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    companyName: "",
    email: "",
    code: "",
    alamatKantor: "",
    telephone: "",
    situs: "",
    bidangUsaha: "",
    sektor: "",
    industri: "",
    fax: "",
    npwp: "",
  });

  useEffect(() => {
    CustomerService.getCustomerById(id)
      .then((response) => {
        setInitialValues({
          companyName: response.data.companyName,
          email: response.data.email,
          code: response.data.code,
          alamatKantor: response.data.alamatKantor,
          telephone: response.data.telephone,
          situs: response.data.situs,
          bidangUsaha: response.data.bidangUsaha,
          sektor: response.data.sektor,
          industri: response.data.industri,
          fax: response.data.fax,
          npwp: response.data.npwp,
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the customer!", error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: Yup.object({
      companyName: Yup.string()
        .required("Company Name is required")
        .max(50, "Company Name must be less than 50 characters")
        .min(5, "Company Name must be at least 5 characters"),
      email: Yup.string()
        .required("Email is required")
        .max(50, "Email must be less than 50 characters")
        .matches(
          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          "Invalid email address"
        ),
      code: Yup.string().max(10, "Code must be less than 10 characters"),
      alamatKantor: Yup.string().max(
        100,
        "Address must be less than 100 characters"
      ),
      telephone: Yup.string().max(
        15,
        "Telephone must be less than 15 characters"
      ),
      situs: Yup.string().max(100, "Situs must be less than 100 characters"),
      bidangUsaha: Yup.string().max(
        100,
        "Business must be less than 100 characters"
      ),
      sektor: Yup.string().max(100, "Sector must be less than 100 characters"),
      industri: Yup.string().max(
        100,
        "Industries must be less than 100 characters"
      ),
      fax: Yup.string().max(15, "Fax must be less than 15 characters"),
      npwp: Yup.string().max(16, "NPWP must be less than 16 characters"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      CustomerService.updateCustomer(id, values)
        .then(() => {
          navigate("/customer");
        })
        .catch((error) => {
          console.error("There was an error updating the customer!", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-md mobile:mt-24 laptop:mt-14 md:w-1/2 lg:w-1/3">
        <h1 className="mb-4 font-bold text-center">Update Customer</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="companyName">
              Company Name:
            </strong>
            <input
              id="companyName"
              type="text"
              name="companyName"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.companyName && formik.errors.companyName
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-sm text-red-500">
                {formik.errors.companyName}
              </div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="email">
              Email:
            </strong>
            <input
              id="email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="email">
              Code:
            </strong>
            <input
              id="code"
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.code && formik.errors.code
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.code && formik.errors.code ? (
              <div className="text-sm text-red-500">{formik.errors.code}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="alamatKantor">
              Address:
            </strong>
            <input
              id="alamatKantor"
              type="text"
              name="alamatKantor"
              value={formik.values.alamatKantor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.alamatKantor && formik.errors.alamatKantor
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.alamatKantor && formik.errors.alamatKantor ? (
              <div className="text-sm text-red-500">
                {formik.errors.alamatKantor}
              </div>
            ) : null}
          </div>

          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="telephone">
              Telephone:
            </strong>
            <input
              id="telephone"
              type="text"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.telephone && formik.errors.telephone
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className="text-sm text-red-500">
                {formik.errors.telephone}
              </div>
            ) : null}
          </div>

          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="fax">
              FAX:
            </strong>
            <input
              id="fax"
              type="text"
              name="fax"
              value={formik.values.fax}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.fax && formik.errors.fax ? "border-red-500" : ""
              }`}
            />
            {formik.touched.fax && formik.errors.fax ? (
              <div className="text-sm text-red-500">{formik.errors.fax}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="npwp">
              NPWP:
            </strong>
            <input
              id="npwp"
              type="text"
              name="npwp"
              value={formik.values.npwp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.npwp && formik.errors.npwp
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.npwp && formik.errors.npwp ? (
              <div className="text-sm text-red-500">{formik.errors.npwp}</div>
            ) : null}
          </div>

          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="bidangUsaha">
              Business:
            </strong>
            <input
              id="bidangUsaha"
              type="text"
              name="bidangUsaha"
              value={formik.values.bidangUsaha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.bidangUsaha && formik.errors.bidangUsaha
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.bidangUsaha && formik.errors.bidangUsaha ? (
              <div className="text-sm text-red-500">
                {formik.errors.bidangUsaha}
              </div>
            ) : null}
          </div>

          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="industri">
              Industri:
            </strong>
            <input
              id="industri"
              type="text"
              name="industri"
              value={formik.values.industri}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.industri && formik.errors.industri
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.industri && formik.errors.industri ? (
              <div className="text-sm text-red-500">
                {formik.errors.industri}
              </div>
            ) : null}
          </div>

          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="sektor">
              Sektor:
            </strong>
            <input
              id="sektor"
              type="text"
              name="sektor"
              value={formik.values.sektor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.sektor && formik.errors.sektor
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.sektor && formik.errors.sektor ? (
              <div className="text-sm text-red-500">{formik.errors.sektor}</div>
            ) : null}
          </div>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <strong className="block mb-2" htmlFor="situs">
              Situs:
            </strong>
            <input
              id="situs"
              type="text"
              name="situs"
              value={formik.values.situs}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-2 border rounded-lg ${
                formik.touched.situs && formik.errors.situs
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.situs && formik.errors.situs ? (
              <div className="text-sm text-red-500">{formik.errors.situs}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 text-white bg-green-500 rounded-lg hover:bg-green-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Updating..." : "Update Customer"}
          </button>
          <button
            to="/customer"
            className="w-full p-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
