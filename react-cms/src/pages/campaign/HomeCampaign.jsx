import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CampaignService from "../../services/CampaignService";

const HomeCampaign = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [campaignIdToDelete, setCampaignIdToDelete] = useState(null);
  const [campaignNameToDelete, setCampaignNameToDelete] = useState("");

  useEffect(() => {
    CampaignService.getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Campaigns!", error);
      });
  }, []);

  const handleDelete = (id, name) => {
    setShowModal(true);
    setCampaignIdToDelete(id);
    setCampaignNameToDelete(name);
  };

  const confirmDelete = () => {
    CampaignService.deleteCampaign(campaignIdToDelete)
      .then(() => {
        setCampaigns(
          campaigns.filter(
            (campaign) => campaign.campaignInfoId !== campaignIdToDelete
          )
        );
        setShowModal(false);
        setCampaignIdToDelete(null);
        setCampaignNameToDelete("");
      })
      .catch((error) => {
        console.error("There was an error deleting the campaign!", error);
      });
  };

  const cancelDelete = () => {
    setShowModal(false);
    setCampaignIdToDelete(null);
    setCampaignNameToDelete("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4">
          <h1 className="text-lg font-bold text-center">Home Campaign</h1>
        </div>
        <div className="p-5 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:w-3/4 lg:w-4/6">
          <table className="w-full my-4 border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Name</th>
                <th className="p-2 border-b">Title</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.campaignInfoId}>
                  <td className="p-2 border-b">{campaign.campaignInfoId}</td>
                  <td className="p-2 border-b">{campaign.name}</td>
                  <td className="p-2 border-b">{campaign.title}</td>
                  <td className="p-2 border-b">
                    <div className="flex items-center justify-center h-full space-x-2 text-white">
                      <Link
                        to={`/detail-campaign/${campaign.campaignInfoId}`}
                        className="flex items-center justify-center h-full p-1 bg-blue-500 rounded-lg hover:bg-blue-700"
                      >
                        Detail
                      </Link>
                      <Link
                        to={`/update-campaign/${campaign.campaignInfoId}`}
                        className="flex items-center justify-center h-full p-1 bg-green-500 rounded-lg hover:bg-green-700"
                      >
                        Edit
                      </Link>
                      <button
                        className="flex items-center justify-center h-full p-1 bg-red-500 rounded-lg hover:bg-red-700"
                        onClick={() =>
                          handleDelete(campaign.campaignInfoId, campaign.name)
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
            to="/add-campaign"
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
              Are you sure you want to delete this campaign{" "}
              <strong>"{campaignNameToDelete}"</strong>?
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

export default HomeCampaign;
