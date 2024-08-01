import axios from "axios";

const API_URL = "http://localhost:8080/api/email-broadcast";

class SmtpService {
  deleteEntriesEmail() {
    return axios.delete(`${API_URL}/delete-entries`);
  }

  startBroadcast(id) {
    return axios.post(`${API_URL}/send/${id}`);
  }

  getAllStatusSent() {
    return axios.get(`${API_URL}/emailStatus`);
  }
}

export default new SmtpService();
