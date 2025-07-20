import  { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleArchiveTask } from "../features/taskSlice";
import EditTaskModal from "./EditTaskModal";
import { useNavigate } from "react-router-dom";
import {
  PencilIcon,
  TrashIcon,
  ArchiveIcon,
  CalendarDays,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [archiveConfirm, setArchiveConfirm] = useState(null);
  const tasks = useSelector((state) => state.tasks.tasks || []);
  const query = useSelector((state) => state.search.query || "");

  const dispatch = useDispatch();

  const [editTask, setEditTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const activeTasks = tasks.filter((task) => !task.archived);
  const archivedTasks = tasks.filter((task) => task.archived);
  const filteredTasks = activeTasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );

  const nearDeadlineTask = filteredTasks.sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,3)

  const getCounts = (status) =>
    activeTasks.filter((task) => task.status === status).length;

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full bg-neutral-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-orange-500">
        Task Overview
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Total Tasks" count={tasks.length} color="bg-gray-100" />
        <StatCard title="To Do" count={getCounts("todo")} color="bg-blue-100" />
        <StatCard title="In Progress" count={getCounts("inprogress")} color="bg-yellow-100" />
        <StatCard title="Completed" count={getCounts("completed")} color="bg-green-100" />
        <StatCard title="Archived" count={archivedTasks.length} color="bg-purple-100" />
      </div>

      <div className="bg-white p-5 rounded shadow mb-10">
        <h2 className="font-semibold text-lg flex items-center gap-2 mb-4">
          <CalendarDays className="w-5 h-5" /> Deadline Calendar
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {nearDeadlineTask.map((task) => {
            const isOverdue = new Date(task.dueDate) < new Date();
            return (
              <div
                key={task.id.toString()}
                className={`p-3 border rounded hover:bg-gray-50 ${
                  isOverdue ? "bg-red-100 border-red-300" : ""
                }`}
              >
                <p


                  className={`font-medium text-sm truncate ${
                    isOverdue ? "text-red-700" : ""
                  }`}
                >
                  {task.title}
                </p>
                <p
                  className={`text-xs ${
                    isOverdue ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  Due: {task.dueDate}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <TaskSection
        title="Active Tasks"
        tasks={filteredTasks}
        setArchiveConfirm={setArchiveConfirm}
        setEditTask={setEditTask}
        setDeleteConfirm={setDeleteConfirm}
        dispatch={dispatch}
      />

      {editTask && <EditTaskModal task={editTask} onClose={() => setEditTask(null)} />}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
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
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
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

const StatCard = ({ title, count, color }) => (
  <div className={`p-4 rounded shadow text-center ${color}`}>
    <h4 className="text-sm font-semibold text-gray-700">{title}</h4>
    <p className="text-xl font-bold text-gray-900">{count}</p>
  </div>
);

const TaskSection = ({ title, tasks, setEditTask, setDeleteConfirm, setArchiveConfirm }) => (
  <div className="mt-6 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    {tasks.length === 0 ? (
      <p className="text-gray-500 text-sm">No tasks available.</p>
    ) : (
      tasks.map((task) => (
        <div
          key={task.id.toString()}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center transition-all duration-200 hover:shadow-lg"
        >
          <div className="space-y-1 flex-grow">
            <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
            <p className="text-xs text-gray-500">Created: {task.createdDate} | Due: {task.dueDate}</p>
            <span
              className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
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
          <div className="flex gap-3 mt-4 sm:mt-0 sm:ml-4 flex-shrink-0">
            <button
              onClick={() => setEditTask(task)}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors duration-200"
              title="Edit Task"
            >
              <PencilIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDeleteConfirm(task.id.toString())}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors duration-200"
              title="Delete Task"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setArchiveConfirm(task.id.toString())}
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600 transition-colors duration-200"
              title="Archive Task"
            >
              <ArchiveIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);

export default Dashboard;
