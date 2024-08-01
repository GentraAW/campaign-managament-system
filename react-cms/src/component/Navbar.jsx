import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-10 w-full p-4 bg-gray-800">
      <div className="container flex items-center justify-between mx-auto e">
        <div className="text-xl font-bold text-white tablet:text-base laptop:text-lg mobile:hidden tablet:block">
          Campaign Management System
        </div>
        <div className="flex items-center justify-center space-x-4 text-center mobile:text-sm laptop:text-base">
          <Link
            to="/"
            className="ml-2 text-white hover:text-gray-400 hover:text-lg"
          >
            Campaign
          </Link>
          <Link
            to="/customer"
            className="text-white hover:text-gray-400 hover:text-lg"
          >
            Customer
          </Link>
          <Link
            to="/trial-message"
            className="text-white hover:text-gray-400 hover:text-lg"
          >
            Trial Massage
          </Link>
          <Link
            to="/smtp-broadcast"
            className="text-white hover:text-gray-400 hover:text-lg"
          >
            SMTP Gmail
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
