import axios from "axios";

const API_URL = "http://localhost:8080/campaigns";

class CampaignService {
  getAllCampaigns() {
    return axios.get(API_URL);
  }

  getCampaignById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  createCampaign(campaign) {
    return axios.post(API_URL, campaign);
  }

  updateCampaign(id, campaign) {
    return axios.put(`${API_URL}/${id}`, campaign);
  }

  deleteCampaign(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new CampaignService();
