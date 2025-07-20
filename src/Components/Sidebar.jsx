import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaArchive,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../features/authSlice";

const SideBar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: <FaTachometerAlt />, route: "dashboard" },
    { id: "tasks", name: "Tasks", icon: <FaTasks />, route: "tasks" },
    { id: "archived", name: "Archived", icon: <FaArchive />, route: "archived" },
    { id: "settings", name: "Settings", icon: <FaCog />, route: "setting" },
  ];

  const currentRoute = location.pathname.split("/").pop();

  const handleLogout = () => {
    dispatch(logOut());
    setShowLogoutConfirm(false);
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-white border-r flex flex-col justify-between transition-all duration-300 overflow-hidden ${
        isOpen ? "w-36" : "w-20"
      }`}
    >
      <div className="mt-4 ml-10 z-50 right-0 p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:text-orange-500 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {isOpen ? <FaChevronLeft className="w-4 h-4" /> : <FaChevronRight className="w-4 h-4" />}
        </button>
      </div>

      <div
        className={`bg-white h-full gap-3 transition-all duration-300 ease-in-out flex flex-col pt-20`}
      >
        <div className="flex flex-col p-2 gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(`/maincomp/${item.route}`);
                if (isOpen) setIsOpen(false);
              }}
              className={`flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentRoute === item.route
                  ? "bg-orange-400 text-white shadow"
                  : "text-gray-500 hover:bg-orange-100 hover:text-orange-500"
              } ${isOpen ? "justify-start gap-3" : "justify-center"}`}
            >
              <span className="flex-shrink-0 text-lg">{item.icon}</span>
              <span
                className={`whitespace-nowrap transition-all duration-300 origin-left ${
                  isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowLogoutConfirm(true)}
        className={`flex items-center gap-2 text-sm text-red-500 hover:text-red-700 py-3 px-4 rounded-lg transition-colors duration-200 mb-4 ${
          isOpen ? "justify-start" : "justify-center"
        }`}
      >
        <FaSignOutAlt className="flex-shrink-0" />
        {isOpen && <span>Log out</span>}
      </button>

      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Confirm Logout</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
