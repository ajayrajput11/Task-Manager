import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Maincomp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showFormErrorModal, setShowFormErrorModal] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    priority: "",
  });

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, createdDate, dueDate, priority } = formData;

    if (!title || !description || !createdDate || !dueDate || !priority) {
      setFormErrorMessage("All fields are required to add a task.");
      setShowFormErrorModal(true);
      return;
    }

    dispatch(
      addTask({ ...formData, id: Date.now(), status: "todo" })
    );

    setFormData({
      title: "",
      description: "",
      createdDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      priority: "",
    });
    setShowModal(false);
    navigate("dashboard");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen((prev) => !prev)} />

        <div className="p-4 flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-colors duration-200"
          >
            Add Task
          </button>
        </div>

        <main className="flex-1 overflow-y-auto px-4 pb-4">
          <Outlet />
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-sm w-full bg-white shadow-lg rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-xl text-gray-800">Add New Task</h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
           <div className="flex flex-col space-y-1">
  <label className="font-semibold capitalize text-gray-700 text-sm">Title:</label>
  <input
    type="text"
    name="title"
    placeholder="Enter title"
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    value={formData.title}
    onChange={handleInputChange}
    required
  />
</div>

<div className="flex flex-col space-y-1">
  <label className="font-semibold capitalize text-gray-700 text-sm">Description:</label>
  <input
    type="text"
    name="description"
    placeholder="Enter description"
    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    value={formData.description}
    onChange={handleInputChange}
    required
  />
</div>

<div className="flex flex-col space-y-1">
  <label className="font-semibold text-gray-700 text-sm">Created Date:</label>
  <input
    type="date"
    name="createdDate"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    value={formData.createdDate}
    onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
    required
  />
</div>

<div className="flex flex-col space-y-1">
  <label className="font-semibold text-gray-700 text-sm">Due Date:</label>
  <input
    type="date"
    name="dueDate"
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
    value={formData.dueDate}
    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
    min={new Date().toISOString().split("T")[0]}
    required
  />
</div>

              <div className="flex flex-col space-y-1">
                <label className="font-semibold text-gray-700 text-sm">Priority:</label>
                <select
                  name="priority"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFormErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Error</h3>
            <p className="text-gray-700">{formErrorMessage}</p>
            <button
              onClick={() => setShowFormErrorModal(false)}
              className="w-full bg-red-600 text-white font-bold py-2 rounded-full hover:bg-red-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maincomp;
