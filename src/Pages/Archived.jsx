import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleArchiveTask, deleteTask } from "../features/taskSlice";
import { TrashIcon, ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Archived = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  const archivedTasks = tasks.filter((task) => task.archived);

  const handleDeleteClick = (taskId) => {
    setTaskToDeleteId(taskId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (taskToDeleteId) {
      dispatch(deleteTask(taskToDeleteId));
      setShowDeleteConfirmModal(false);
      setTaskToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setTaskToDeleteId(null);
  };

  return (
    <div className="p-4 md:p-6 min-h-screen bg-neutral-100">
      <h2 className="text-2xl font-bold font-serif text-orange-600 mb-6 text-center">
        Archived Tasks
      </h2>

      {archivedTasks.length === 0 ? (
        <p className="text-center text-gray-500">No archived tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {archivedTasks.map((task) => (
            <div
              key={task.id.toString()}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-4 relative transition-all duration-200 hover:shadow-lg"
            >
              <div className="absolute top-2 right-2 flex gap-3">
                <button
                  onClick={() => {dispatch(toggleArchiveTask(task.id.toString()))
                  navigate("/maincomp/tasks")
                  }
                  }
                  className="p-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
                  title="Restore Task"
                >
                  <ArrowLeftCircle className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteClick(task.id.toString())}
                  className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
                  title="Delete Task Permanently"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{task.description}</p>

              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Created: {task.createdDate}</span>
                <span>Due: {task.dueDate}</span>
              </div>

              <span
                className={`text-xs px-2.5 py-0.5 rounded-full mt-3 inline-block text-white font-medium ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      )}

      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-700">Are you sure you want to permanently delete this task?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-md text-gray-700 border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Archived;
