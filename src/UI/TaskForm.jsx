import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { addNewTask, editTask } from "../Redux/TaskSlice";

const TaskForm = ({ handleClose, edit, setEdit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (edit) {
      setFormData({
        title: edit.title || "",
        description: edit.description || "",
        dueDate: edit.dueDate || "",
      });
    } else {
      setFormData({ title: "", description: "", dueDate: "" });
    }
  }, [edit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task Data Submitted:", formData);

    if (edit) {
      dispatch(editTask({ ...formData, id: edit.id }));
      setEdit(null);
    } else {
      dispatch(addNewTask(formData));
    }

    setFormData({ title: "", description: "", dueDate: "" });
    handleClose();
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 4, maxWidth: 500, margin: "10px", width: "100%" }}
    >
      <Typography variant="h5" gutterBottom>
        {edit ? "Edit Task" : "Create New Task"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
          />

          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
          />

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {edit ? "Save Changes" : "Add Task"}
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
              color="warning"
              sx={{ mt: 2 }}
              fullWidth
            >
              Close
            </Button>
          </div>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskForm;
