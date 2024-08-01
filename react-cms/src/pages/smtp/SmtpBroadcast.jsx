import React, { useEffect, useState } from "react";
import SmtpService from "../../services/SmtpService";
import CampaignService from "../../services/CampaignService";
import ReactHtmlParser from "html-react-parser";

const SmtpBroadcast = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [statusSent, setStatusSent] = useState([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [modifiedDescription, setModifiedDescription] = useState("");

  useEffect(() => {
    CampaignService.getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil kampanye!", error);
      });

    SmtpService.getAllStatusSent()
      .then((response) => {
        setStatusSent(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil status kirim!", error);
      });
  }, []);

  const fetchCampaignDetails = async (campaignId) => {
    setLoading(true);
    try {
      const response = await CampaignService.getCampaignById(campaignId);
      setSelectedCampaign(response.data);
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        response.data.description,
        "text/html"
      );
      doc.querySelectorAll("ul").forEach((ul) => ul.classList.add("list-disc"));
      doc.querySelectorAll("li").forEach((li) => li.classList.add("ml-6"));
      doc
        .querySelectorAll("ol")
        .forEach((ol) => ol.classList.add("list-decimal"));
      doc.querySelectorAll("ol > li").forEach((li) => li.classList.add("ml-6"));
      setModifiedDescription(doc.body.innerHTML);
      setShowModalDetail(false);
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil detail kampanye!", error);
    } finally {
      setLoading(false);
    }
  };

  const startBroadcast = () => {
    setLoading(true);
    setShowConfirmationModal(false);
    SmtpService.startBroadcast(selectedCampaignId)
      .then((response) => {
        console.log("Broadcast started successfully:", response.data);
        setLoading(false);
        setModalMessage("Email broadcast telah dikirim");
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat memulai broadcast!", error);
        setLoading(false);
        setModalMessage("Terjadi kesalahan saat memulai broadcast");
        setShowModal(true);
      });
  };

  const handleStartBroadcast = () => {
    if (selectedCampaignId) {
      setShowConfirmationModal(true);
    } else {
      alert("Pilih kampanye terlebih dahulu.");
    }
  };

  const handleDeleteEntries = () => {
    SmtpService.deleteEntriesEmail()
      .then((response) => {
        console.log("Entries deleted successfully:", response.data);
        alert("Entri email berhasil dihapus!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus entri email!", error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage("");
    window.location.reload();
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleDetailClick = (campaignId) => {
    fetchCampaignDetails(campaignId);
    setShowModalDetail(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="p-5 mt-3 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:max-h-96 mobile:w-2/3">
          <div className="mb-4">
            <h1 className="mb-4 text-lg font-bold text-center">
              SMTP Broadcast
            </h1>
            <select
              onChange={(e) => {
                setSelectedCampaignId(e.target.value);
                handleDetailClick(e.target.value);
              }}
              className="w-full p-2 mb-2 border rounded-lg"
              value={selectedCampaignId}
            >
              <option value="">Pilih Kampanye</option>
              {campaigns.map((campaign) => (
                <option
                  key={campaign.campaignInfoId}
                  value={campaign.campaignInfoId}
                >
                  {campaign.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleStartBroadcast}
              className="px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-800"
            >
              Start
            </button>
            <button
              onClick={() => setShowModalDetail(true)}
              className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
            >
              Detail
            </button>
          </div>
        </div>
        <div className="p-5 mt-4 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:max-h-96">
          <table className="w-full my-4 border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Email Target</th>
                <th className="p-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {statusSent.map((statusSents) => (
                <tr key={statusSents.email}>
                  <td className="p-2 text-center border-b">
                    {statusSents.email}
                  </td>
                  <td className="p-2 font-semibold text-center text-green-500 border-b ">
                    {statusSents.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleDeleteEntries}
            className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-800"
          >
            Delete Entries
          </button>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
            <p className="font-semibold text-center">Loading...</p>
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
            <p className="font-semibold text-center text-green-500">
              {modalMessage}!
            </p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalDetail && selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-3/4 p-6 overflow-y-auto bg-white rounded-lg shadow-lg laptop:max-h-[50rem] mobile:max-h-[40rem] mt-16 ">
            <h2 className="mb-4 text-lg font-bold text-center">
              Detail Kampanye
            </h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <p className="mobile:text-sm laptop:text-base">
                  <strong>Nama: </strong>
                  {selectedCampaign.name}
                </p>
                <p className="mobile:text-sm laptop:text-base">
                  <strong>Subject: </strong>
                  {selectedCampaign.title}
                </p>

                <div
                  className="mt-4 text-gray-900 break-words mobile:text-sm laptop:text-base"
                  style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
                >
                  <strong>Deskripsi: </strong>
                  {ReactHtmlParser(modifiedDescription)}
                </div>
                <button
                  onClick={() => setShowModalDetail(false)}
                  className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-700 mobile:text-sm laptop:text-base"
                >
                  Tutup
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showConfirmationModal && selectedCampaign && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 max-h-screen p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
            <p className="text-center">Apakah yakin broadcast akan dikirim?</p>

            <p className="text-center mobile:text-sm laptop:text-base">
              <strong>Subject: </strong>
              {selectedCampaign.title}
            </p>

            <div className="flex justify-center mt-4">
              <button
                onClick={startBroadcast}
                className="px-4 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-800"
              >
                Ya
              </button>
              <button
                onClick={closeConfirmationModal}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-700"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmtpBroadcast;
