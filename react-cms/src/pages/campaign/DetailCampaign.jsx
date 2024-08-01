import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CampaignService from "../../services/CampaignService";
import ReactHtmlParser from "html-react-parser";

const DetailCampaign = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modifiedDescription, setModifiedDescription] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await CampaignService.getCampaignById(id);
        setCampaign(response.data);

        const parser = new DOMParser();
        const doc = parser.parseFromString(
          response.data.description,
          "text/html"
        );
        doc
          .querySelectorAll("ul")
          .forEach((ul) => ul.classList.add("list-disc"));
        doc.querySelectorAll("li").forEach((li) => li.classList.add("ml-6"));
        doc
          .querySelectorAll("ol")
          .forEach((ol) => ol.classList.add("list-decimal"));
        doc
          .querySelectorAll("ol > li")
          .forEach((li) => li.classList.add("ml-6"));
        setModifiedDescription(doc.body.innerHTML);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 mt-20 mb-6 bg-white rounded-lg shadow-md mobile:w-10/12 tablet:w-2/4 lg:w-1/3">
        <h1 className="mb-4 font-bold text-center">Campaign Details</h1>

        {campaign && (
          <div className="mobile:text-sm laptop:text-base">
            <p>
              <strong>Name: </strong>
              {campaign.name}
            </p>
            <p>
              <strong>Title: </strong>
              {campaign.title}
            </p>
            <p>
              <strong>Description: </strong>
            </p>
            <div
              className="mt-4 text-gray-900 break-words"
              style={{ fontFamily: "'Poppins', Arial, sans-serif" }}
            >
              {ReactHtmlParser(modifiedDescription)}
            </div>

            <div className="flex text-white">
              <Link
                to="/"
                className="block p-2 mx-1 mt-4 text-center bg-blue-500 rounded-lg hover:bg-blue-700"
              >
                Back
              </Link>
              <Link
                to={`/update-campaign/${id}`}
                className="block p-2 mx-1 mt-4 text-center bg-green-500 rounded-lg hover:bg-green-700"
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

export default DetailCampaign;
