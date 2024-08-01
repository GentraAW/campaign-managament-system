import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeCustomer from "./pages/customer/HomeCustomer";
import DetailCustomer from "./pages/customer/DetailCustomer";
import AddCustomer from "./pages/customer/AddCustomer";
import UpdateCustomer from "./pages/customer/UpdateCustomer";
import Navbar from "./component/Navbar";
import HomeCampaign from "./pages/campaign/HomeCampaign";
import DetailCampaign from "./pages/campaign/DetailCampaign";
import UpdateCampaign from "./pages/campaign/UpdateCampaign";
import AddCampaign from "./pages/campaign/AddCampaign";
import HomeTrialMessage from "./pages/trial-massage/HomeTrialMessage";
import SmtpBroadcast from "./pages/smtp/SmtpBroadcast";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeCampaign />} />
        <Route path="/detail-campaign/:id" element={<DetailCampaign />} />
        <Route path="/add-campaign" element={<AddCampaign />} />
        <Route path="/update-campaign/:id" element={<UpdateCampaign />} />
        <Route path="/customer" element={<HomeCustomer />} />
        <Route path="/detail-customer/:id" element={<DetailCustomer />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="/update-customer/:id" element={<UpdateCustomer />} />
        <Route path="/trial-message" element={<HomeTrialMessage />} />
        <Route path="/smtp-broadcast" element={<SmtpBroadcast />} />
      </Routes>
    </Router>
  );
};

export default App;
