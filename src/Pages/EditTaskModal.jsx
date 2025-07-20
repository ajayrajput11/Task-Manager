import  { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../features/taskSlice";

const EditTaskModal = ({ task, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [showFormErrorModal, setShowFormErrorModal] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrorMessage("");

    if (!title || !description || !dueDate || !priority) {
      setFormErrorMessage("All fields are required to update the task.");
      setShowFormErrorModal(true);
      return;
    }

    dispatch(
      updateTask({
        id: task.id.toString(),
        title,
        description,
        dueDate,
        priority,
      })
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-1">
            <label htmlFor="edit-title" className="font-bold text-gray-700 text-sm">Title:</label>
            <input
              id="edit-title"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="edit-description" className="font-bold text-gray-700 text-sm">Description:</label>
            <input id="edit-description"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"

              required />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="edit-dueDate" className="font-bold text-gray-700 text-sm">Due Date:</label>
            <input
              id="edit-dueDate"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="edit-priority" className="font-bold text-gray-700 text-sm">Priority:</label>
            <select
              id="edit-priority"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

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

export default EditTaskModal;
