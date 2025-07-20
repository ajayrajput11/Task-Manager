import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, deleteTask, toggleArchiveTask, } from "../features/taskSlice";
import EditTaskModal from "./EditTaskModal";
import {
  PencilIcon,
  TrashIcon,
  ArchiveIcon,
} from "lucide-react";

const TaskCard = ({ task, setEditTask, setDeleteConfirm, setArchiveConfirm, }) => {


  const priorityColorClass =
    task.priority === "High"
      ? "bg-red-500"
      : task.priority === "Medium"
      ? "bg-yellow-500"
      : task.priority === "Low" 
      ? "bg-green-500"
      : "bg-gray-500"; 

  const statusColorClass =
    task.status === "todo"
      ? "border-blue-400"
      : task.status === "inprogress"
      ? "border-yellow-400"
      : task.status === "completed" 
      ? "border-green-400"
      : "border-gray-400"; 
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${statusColorClass} mb-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg
      `}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("taskId", task.id.toString())
        e.dataTransfer.setData("currentStatus", task.status)
      }}
      
    >
      <h3 className={`font-semibold text-black text-lg mb-1`}>{task.title}</h3>
      <p className={`text-sm text-gray-600  mb-2 line-clamp-2`}>{task.description}</p>
      <div className={`flex justify-between text-xs text-gray-500 mb-2`}>
        <span>Created: {task.createdDate}</span>
        <span>Due: {task.dueDate}</span>
      </div>
      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${priorityColorClass}`}>
        {task.priority}
      </span>

      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => setEditTask(task)}
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
          title="Edit Task"
        >
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setDeleteConfirm(task.id.toString())}
          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
          title="Delete Task"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => setArchiveConfirm(task.id.toString())

          }
          className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors duration-200"
          title="Archive Task"
        >
          <ArchiveIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Tasks = () => {
   const navigate = useNavigate()
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const query = useSelector((state) => state.search.query || "");

  const [editTask, setEditTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [archiveConfirm, setArchiveConfirm] = useState(null);

  const activeTasks = tasks.filter((task) => !task.archived && task.title.toLowerCase().includes(query.toLowerCase()));

  const todoTasks = activeTasks.filter((task) => task.status === "todo")

  const inProgressTasks = activeTasks.filter((task) => task.status === "inprogress");
  const completedTasks = activeTasks.filter((task) => task.status === "completed");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const currentStatus = e.dataTransfer.getData("currentStatus");

    if (taskId && currentStatus !== newStatus) {
      dispatch(updateTaskStatus({ id: taskId, newStatus }));
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full bg-neutral-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-orange-500">
        My Tasks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-gray-50 p-4 rounded-lg shadow-inner border-t-4 border-blue-500 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "todo")}
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center justify-between">
            To Do ({todoTasks.length})
          </h2>
          {todoTasks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No tasks to do.</p>
          ) : (
            todoTasks.map((task) => (
              <TaskCard

              
                key={task.id.toString()}
                task={task}
                setEditTask={setEditTask}
                setDeleteConfirm={setDeleteConfirm}
                setArchiveConfirm={setArchiveConfirm}
                dispatch={dispatch}
              />
            ))
          )}
        </div>

        <div
          className="bg-gray-50 p-4 rounded-lg shadow-inner border-t-4 border-yellow-500 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "inprogress")}
        >
          <h2 className="text-xl font-semibold text-yellow-700 mb-4 flex items-center justify-between">
            In Progress ({inProgressTasks.length})
          </h2>
          {inProgressTasks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No tasks in progress.</p>
          ) : (
            inProgressTasks.map((task) => (
              <TaskCard
                key={task.id.toString()}
                task={task}
                setEditTask={setEditTask}
                setDeleteConfirm={setDeleteConfirm}
                setArchiveConfirm={setArchiveConfirm}
                dispatch={dispatch}
              />
            ))
          )}
        </div>

        <div
          className="bg-gray-50 p-4 rounded-lg shadow-inner border-t-4 border-green-500 min-h-[300px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "completed")}
        >
          <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center justify-between">
            Completed ({completedTasks.length})
          </h2>
          {completedTasks.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-4">No tasks completed.</p>
          ) : (
            completedTasks.map((task) => (
              <TaskCard
                key={task.id.toString()}
                task={task}
                setEditTask={setEditTask}
                setDeleteConfirm={setDeleteConfirm}
                setArchiveConfirm={setArchiveConfirm}
                dispatch={dispatch}
              />
            ))
          )}
        </div>
      </div>

      {editTask && <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow w-80">
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-4">
              <button onClick={() => setDeleteConfirm(null)} className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100">Cancel</button>
              <button onClick={() => {
                dispatch(deleteTask(deleteConfirm.toString()));
                setDeleteConfirm(null);
              }} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {archiveConfirm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow w-80">
            <p className="mb-4">Are you sure you want to archive this task?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setArchiveConfirm(null)}
                className="text-gray-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(toggleArchiveTask(archiveConfirm.toString()));
                  setArchiveConfirm(null);
                  navigate("/maincomp/archived");
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
