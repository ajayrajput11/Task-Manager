

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { resetPassword } from "../features/authSlice";

import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.auth.users);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    const userExists = users.find((u) => u.email === email);

    if (!userExists) {
      setModalMessage("Email not registered. Please check your email and try again.");
      setShowModal(true);
      return;
    }

    dispatch(resetPassword({ email, newPassword }));
    setModalMessage("Password reset successfully! You can now log in with your new password.");
    setShowModal(true);
  };

  const handleGoBackToLogin = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-gray-700 text-sm font-medium">Registered Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label htmlFor="newPassword" className="text-gray-700 text-sm font-medium">New Password:</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out"
          >
            Reset Password
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-300 text-gray-800 font-bold py-2 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out mt-4"
        >
          Go Back
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Notification</h3>
            <p className="text-gray-700">{modalMessage}</p>
            <button
              onClick={handleGoBackToLogin}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Go Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
