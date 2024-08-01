import React, { useEffect, useState } from "react";
import TrialMassService from "../../services/TrialMassService";
import CampaignService from "../../services/CampaignService";
import ReactHtmlParser from "html-react-parser";

const HomeTrialMessage = () => {
  const [trialMessage, setTrialMessage] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modifiedDescription, setModifiedDescription] = useState("");

  useEffect(() => {
    TrialMassService.getAllTrialMessage()
      .then((response) => {
        setTrialMessage(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(
          "Terjadi kesalahan saat mengambil pesan percobaan!",
          error
        );
      });

    CampaignService.getAllCampaigns()
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil kampanye!", error);
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
    } catch (error) {
      console.error("Terjadi kesalahan saat mengambil detail kampanye!", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailClick = (campaignId) => {
    fetchCampaignDetails(campaignId);
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center">
        <div className="p-5 mt-3 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:max-h-96 mobile:w-2/3">
          <div className="mb-4">
            <h1 className="text-lg font-bold text-center">
              Home Trial Massage
            </h1>
            <select
              onChange={(e) => handleDetailClick(e.target.value)}
              className="w-full p-2 mb-2 border rounded-lg"
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
              onClick={() => {
                TrialMassService.startTrialMass(
                  selectedCampaign?.campaignInfoId
                )
                  .then(() => {
                    window.alert("Berhasil!");
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Terjadi kesalahan saat memulai!", error);
                    window.alert("Terjadi kesalahan!");
                  });
              }}
              className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-800"
            >
              Start
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
            >
              Detail
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="mt-4 text-lg font-bold text-center">Status</h1>
        </div>
        <div className="p-5 overflow-auto bg-white rounded-lg shadow-md mobile:text-xs laptop:text-base mobile:max-h-96 mobile:w-2/3">
          <table className="w-full my-4 border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">ID</th>
                <th className="p-2 border-b">Subjek Kampanye</th>
                <th className="p-2 border-b">Status</th>
                <th className="p-2 border-b">Email Perusahaan</th>
                <th className="p-2 border-b">Nama Perusahaan</th>
              </tr>
            </thead>
            <tbody>
              {trialMessage.map((trialMessages) => (
                <tr key={trialMessages.emailMassLogId}>
                  <td className="p-2 text-center border-b">
                    {trialMessages.emailMassLogId}
                  </td>
                  <td className="p-2 text-center border-b mobile:min-w-56">
                    {trialMessages.campaign.title}
                  </td>
                  <td className="p-2 font-semibold text-center text-green-500 border-b ">
                    {trialMessages.status}
                  </td>
                  <td className="p-2 text-center border-b">
                    {trialMessages.email}
                  </td>
                  <td className="p-2 text-center border-b">
                    {trialMessages.customer.companyName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && selectedCampaign && (
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
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-700 mobile:text-sm laptop:text-base"
                >
                  Tutup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeTrialMessage;
