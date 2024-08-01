import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomerService from "../../services/CustomerService";

const AddCustomer = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      code: "",
      alamatKantor: "",
      telephone: "",
      fax: "",
      npwp: "",
      situs: "",
      bidangUsaha: "",
      sektor: "",
      industri: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string()
        .required("Company Name is required")
        .max(50, "Company Name must be less than 50 characters")
        .min(5, "Company Name must be at least 5 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required")
        .max(50, "Email must be less than 50 characters"),
      code: Yup.string()
        .required("Code is required")
        .max(20, "Code must be less than 20 characters"),
      alamatKantor: Yup.string().required("Office Address is required"),
      telephone: Yup.string().required("Telephone is required"),
      fax: Yup.string().required("Fax is required"),
      npwp: Yup.string().required("NPWP is required"),
      situs: Yup.string().required("Site is required "),
      bidangUsaha: Yup.string().required("Business Field is required"),
      sektor: Yup.string().required("Sector is required"),
      industri: Yup.string().required("Industry is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      CustomerService.createCustomer(values)
        .then(() => {
          navigate("/customer");
        })
        .catch((error) => {
          console.error("There was an error creating the customer!", error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-3/4 p-6 mt-20 mb-6 bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3">
        <h1 className="mb-4 font-bold text-center">Add Customer</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 mobile:text-sm laptop:text-base">
            <label className="block mb-2" htmlFor="companyName">
              Company Name:
            </label>
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
            <label className="block mb-2" htmlFor="code">
              Code:
            </label>
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
            <label className="block mb-2" htmlFor="alamatKantor">
              Alamat Kantor:
            </label>
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
            <label className="block mb-2" htmlFor="telephone">
              Telephone:
            </label>
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
            <label className="block mb-2" htmlFor="email">
              Email:
            </label>
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
            <label className="block mb-2" htmlFor="fax">
              Fax:
            </label>
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
            <label className="block mb-2" htmlFor="npwp">
              NPWP:
            </label>
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
            <label className="block mb-2" htmlFor="bidangUsaha">
              Bidang Usaha:
            </label>
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
            <label className="block mb-2" htmlFor="sektor">
              Sektor:
            </label>
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
            <label className="block mb-2" htmlFor="industri">
              Industri:
            </label>
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
            <label className="block mb-2" htmlFor="situs">
              Situs:
            </label>
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
            className="w-full p-2 mt-4 text-white bg-green-500 rounded-lg mobile:text-sm laptop:text-base hover:bg-green-700"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Adding..." : "Add Customer"}
          </button>
          <Link
            to="/customer"
            className="block w-full p-2 mt-2 text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 mobile:text-sm laptop:text-base"
          >
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
