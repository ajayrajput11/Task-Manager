import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({ ...action.payload, id: uuidv4().toString(), archived: false });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    updateTaskStatus: (state, action) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = newStatus;
        if (newStatus === "todo" || newStatus === "inprogress" || newStatus === "completed") {
          task.archived = false;
        }
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    archiveTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks[index].archived = true;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    toggleArchiveTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.archived = !task.archived;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
     resetAllTasks: (state) => {
      state.tasks = []
      localStorage.removeItem("tasks")
    },
  },
});

export const {
  resetAllTasks,
  archiveTask,
  addTask,
  updateTaskStatus,
  updateTask,
  deleteTask,
  toggleArchiveTask,
} = taskSlice.actions;
export default taskSlice.reducer;
