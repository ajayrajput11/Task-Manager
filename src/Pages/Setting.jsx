import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile, resetPassword } from "../features/authSlice";
import { resetAllTasks } from "../features/taskSlice";
import {
  User,
  Lock,
  Trash2,
  CheckCircle,
  XCircle,
  KeyRound,
} from "lucide-react";

const Setting = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const allUsers = useSelector((state) => state.auth.users);

  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState({ type: "", text: "" });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleProfileInputChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!profileForm.name || !profileForm.email) {
      setMessageContent({
        type: "error",
        text: "Name and email cannot be empty.",
      });
      setShowMessageModal(true);
      return;
    }
    dispatch(updateProfile(profileForm));
    setMessageContent({
      type: "success",
      text: "Profile updated successfully!",
    });
    setShowMessageModal(true);
  };

  const handlePasswordInputChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmNewPassword } = passwordForm;

    const user = allUsers.find((u) => u.email === currentUser?.email);

    if (currentUser?.provider === "google") {
      setMessageContent({
        type: "error",
        text: "Google-signed-in users cannot change password here. Please manage your Google account password.",
      });
      setShowMessageModal(true);
      return;
    }

    if (!user || user.password !== currentPassword) {
      setMessageContent({ type: "error", text: "Incorrect current password." });
      setShowMessageModal(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessageContent({
        type: "error",
        text: "New password and confirm password do not match.",
      });
      setShowMessageModal(true);
      return;
    }

    if (newPassword.length < 6) {
      setMessageContent({
        type: "error",
        text: "New password must be at least 6 characters long.",
      });
      setShowMessageModal(true);
      return;
    }

    dispatch(resetPassword({ email: currentUser.email, newPassword }));
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowChangePasswordModal(false);
    setMessageContent({
      type: "success",
      text: "Password changed successfully!",
    });
    setShowMessageModal(true);
  };

  const handleResetAllTasks = () => {
    setShowResetConfirmModal(true);
  };

  const confirmResetAllTasks = () => {
    dispatch(resetAllTasks());
    setShowResetConfirmModal(false);
    setMessageContent({ type: "success", text: "All tasks have been reset!" });
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
    setMessageContent({ type: "", text: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-neutral-100">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-center text-orange-500">
          SETTINGS
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Edit Profile
            </h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="name"
                  className="text-gray-700 text-sm font-medium"
                >
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={profileForm.name}
                  onChange={handleProfileInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="email"
                  className="text-gray-700 text-sm font-medium"
                >
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white font-bold py-2 rounded-full hover:bg-orange-500 transition duration-300 ease-in-out"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          <div className="flex-1 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-red-600" /> Account Actions
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="w-full bg-gray-950 text-white font-bold py-2 rounded-full hover:bg-gray-500 transition duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                <KeyRound className="w-5 h-5" /> Change Password
              </button>
              <button
                onClick={handleResetAllTasks}
                className="w-full bg-red-500 text-white font-bold py-2 rounded-full hover:bg-orange-700 transition duration-300 ease-in-out flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" /> Reset All Tasks
              </button>
            </div>
          </div>
        </div>
      </div>

      {showChangePasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Change Password
            </h3>
            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="currentPassword"
                  className="text-gray-700 text-sm font-medium"
                >
                  Current Password:
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="newPassword"
                  className="text-gray-700 text-sm font-medium"
                >
                  New Password:
                </label>
                <input
                  id="newPassword"
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="confirmNewPassword"
                  className="text-gray-700 text-sm font-medium"
                >
                  Confirm New Password:
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  name="confirmNewPassword"
                  value={passwordForm.confirmNewPassword}
                  onChange={handlePasswordInputChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showResetConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-800">
              Confirm Reset
            </h3>
            <p className="text-gray-700">
              Are you sure you want to delete ALL your tasks?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmResetAllTasks}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Reset All Tasks
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6 max-h-[90vh] overflow-y-auto">
            {messageContent.type === "success" ? (
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            )}
            <h3 className="text-xl font-semibold text-gray-800">
              {messageContent.type === "success" ? "Success!" : "Error!"}
            </h3>
            <p className="text-gray-700">{messageContent.text}</p>
            <button
              onClick={closeMessageModal}
              className={`w-full font-bold py-2 rounded-full transition duration-300 ease-in-out ${
                messageContent.type === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
