import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  originalTasks: [],
  DropdownTask: [],
};

export const TaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.value = action.payload;
      state.originalTasks = action.payload;
      state.DropdownTask = action.payload;
    },
    removeTask: (state, action) => {
      state.value = state.value.filter((task) => task.id !== action.payload);
    },

    addNewTask: (state, action) => {
      state.value.push({
        ...action.payload,
        id: Date.now(),
        status: action.payload.status || "Pending",
      });
    },

    editTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;

      const taskIndex = state.value.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.value[taskIndex] = {
          ...state.value[taskIndex],
          title,
          description,
          dueDate,
        };
      }
    },

    MarkAsCompleted: (state, action) => {
      console.log(action.payload);

      const { id } = action.payload;
      const task = state.value.find((task) => task.id === id);
      if (task) {
        task.status = "Completed";
      }
    },

    SearchTask: (state, action) => {
      const value = action.payload;

      if (value === "") {
        state.value = state.originalTasks;
        return;
      }

      state.value = state.originalTasks.filter((task) =>
        task.title.toLowerCase().includes(value.toLowerCase())
      );
    },

    FilterTask: (state, action) => {
      const value = action.payload;
      console.log("Dropdown Value:", value);

      if (value === "") {
        state.value = state.DropdownTask;
        return;
      }

      state.value = state.DropdownTask.filter((task) =>
        task.status.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
});

export const {
  addTask,
  removeTask,
  editTask,
  MarkAsCompleted,
  FilterTask,
  addNewTask,
  SearchTask,
} = TaskSlice.actions;
export default TaskSlice.reducer;
