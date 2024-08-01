import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CustomerService from "../../services/CustomerService";

const DetailCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await CustomerService.getCustomerById(id);
        setCustomer(response.data);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 mt-20 mb-6 bg-white rounded-lg shadow-md md:w-1/2 lg:w-1/3">
        <h1 className="mb-6 text-lg font-bold text-center text-gray-700">
          Customer Details
        </h1>

        {customer && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-600">Company Name:</p>
              <p className="text-gray-800">{customer.companyName}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Code:</p>
              <p className="text-gray-800">{customer.code}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Address:</p>
              <p className="text-gray-800">{customer.alamatKantor}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Telephone:</p>
              <p className="text-gray-800">{customer.telephone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Email:</p>
              <p className="text-gray-800">{customer.email}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">FAX:</p>
              <p className="text-gray-800">{customer.fax}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">NPWP:</p>
              <p className="text-gray-800">{customer.npwp}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Bidang Usaha:</p>
              <p className="text-gray-800">{customer.bidangUsaha}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Industries:</p>
              <p className="text-gray-800">{customer.industri}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Sector:</p>
              <p className="text-gray-800">{customer.sektor}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-600">Website:</p>
              <a
                href={`http://${customer.situs}`}
                className="text-blue-500 hover:underline"
              >
                {customer.situs}
              </a>
            </div>

            <div className="flex justify-start mt-6 space-x-4">
              <Link
                to="/customer"
                className="px-4 py-2 font-semibold text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700"
              >
                Back
              </Link>
              <Link
                to={`/update-customer/${id}`}
                className="px-4 py-2 font-semibold text-center text-white bg-green-500 rounded-lg hover:bg-green-700"
              >
                Edit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCustomer;
