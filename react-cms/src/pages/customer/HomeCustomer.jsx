import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from "../../services/CustomerService";

const HomeCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null);
  const [customerNameToDelete, setCustomerNameToDelete] = useState("");

  useEffect(() => {
    CustomerService.getAllCustomers()
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers!", error);
      });
  }, []);

  const handleDelete = (id, companyName) => {
    setShowModal(true);
    setCustomerIdToDelete(id);
    setCustomerNameToDelete(companyName);
  };

  const confirmDelete = () => {
    CustomerService.deleteCustomer(customerIdToDelete)
      .then(() => {
        setCustomers(
          customers.filter(
            (customer) => customer.customerId !== customerIdToDelete
          )
        );
        setShowModal(false);
        setCustomerIdToDelete(null);
        setCustomerNameToDelete("");
      })
      .catch((error) => {
        console.error("There was an error deleting the customer!", error);
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
    setCustomerIdToDelete(null);
    setCustomerNameToDelete("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-center">Home Customer</h1>
        </div>
        <div className="p-5 mt-8 mb-6 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:w-7/12 tablet:w-9/12 lg:w-full">
          <table className="w-full my-4 border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Code</th>
                <th className="p-2 border-b">Company Name</th>
                <th className="p-2 border-b">Email</th>

                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td className="p-2 text-center border-b">
                    {customer.customerId}
                  </td>
                  <td className="p-2 text-center border-b">{customer.code}</td>
                  <td className="p-2 text-center border-b min-w-56">
                    {customer.companyName}
                  </td>
                  <td className="p-2 text-center border-b">{customer.email}</td>

                  <td className="p-2 border-b">
                    <div className="flex items-center justify-center h-full space-x-2 text-white">
                      <Link
                        to={`/detail-customer/${customer.customerId}`}
                        className="flex items-center justify-center h-full p-1 bg-blue-500 rounded-lg hover:bg-blue-700"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/update-customer/${customer.customerId}`}
                        className="flex items-center justify-center h-full p-1 bg-green-500 rounded-lg hover:bg-green-700"
                      >
                        Edit
                      </Link>

                      <button
                        className="flex items-center justify-center h-full p-1 bg-red-500 rounded-lg hover:bg-red-700"
                        onClick={() =>
                          handleDelete(
                            customer.customerId,
                            customer.companyName
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link
            to="/add-customer"
            className="p-1 mt-4 text-center text-white bg-green-500 rounded-lg text-md hover:p-1 hover:bg-green-700"
          >
            Add +
          </Link>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-lg font-bold text-center">
              Confirm Delete
            </h2>
            <p className="mb-4 text-center">
              Are you sure you want to delete this customer{" "}
              <strong>"{customerNameToDelete}"</strong>?
            </p>
            <div className="flex justify-center">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeCustomer;
