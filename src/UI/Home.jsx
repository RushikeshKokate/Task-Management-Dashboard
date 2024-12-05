import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Input,
  Paper,
  Table,
  TableContainer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Card1 from "./Card1";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TaskForm from "./TaskForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import rows from "./data";
import {
  addNewTask,
  addTask,
  editTask,
  FilterTask,
  removeTask,
  SearchTask,
} from "../Redux/TaskSlice";
import { FiTrash, FiEdit, FiCheckCircle } from "react-icons/fi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { MarkAsCompleted } from "../Redux/TaskSlice";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const list = useSelector((state) => state.NewTask);
  const [filteredList, setFilteredList] = useState([]);
  const [edit, setEdit] = useState(null);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setLoading(true);
    setOpen(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const handleClose = () => setOpen(false);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "status", headerName: "Status", flex: 0.6 },
    { field: "dueDate", headerName: "Due Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div className="flex items-center h-full w-full gap-2">
          <button
            onClick={() => handleDelete(params.row.id)}
            className="  text-white font-bold py-1 px-2 rounded flex items-center justify-center"
          >
            <FiTrash size={20} />
          </button>
          <button
            onClick={() => handleEdit(params.row)}
            className="  text-white font-bold py-1 px-2 rounded flex items-center justify-center"
          >
            <FiEdit size={20} />
          </button>
          <button
            onClick={() => handleMarkAsCompleted(params.row)}
            className="  text-white font-bold py-1 px-2 rounded flex items-center justify-center"
          >
            <FiCheckCircle size={20} />
          </button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  ChartJS.register(ArcElement, Tooltip, Legend);

  const pending = useSelector((state) =>
    state.NewTask.value.filter((task) => task.status === "Pending")
  );
  const completed = useSelector((state) =>
    state.NewTask.value.filter((task) => task.status === "Completed")
  );
  const overdue = useSelector((state) =>
    state.NewTask.value.filter((task) => task.status === "Overdue")
  );

  const data = {
    labels: ["Pending", "Completed", "Overdue"],
    datasets: [
      {
        label: "Task Status",
        data: [pending.length, completed.length, overdue.length],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    dispatch(addTask(rows));
  }, []);

  const handleDelete = (id) => {
    confirm("Are you sure you want to delete this task?");
    dispatch(removeTask(id));
    console.log(id);
  };

  const handleEdit = (myrow) => {
    setEdit(myrow);
    setOpen(true);
  };

  const handleMarkAsCompleted = (row) => {
    dispatch(MarkAsCompleted(row));
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    dispatch(SearchTask(searchValue));
  };

  const handleFilter = (e) => {
    const searchValue = e.target.value;
    console.log("Selected Status:", searchValue);

    dispatch(FilterTask(searchValue));
  };

  return (
    <div className="bg-black bg-opacity-75 rounded-sm text-white max-lg:mr-2 max-lg:ml-2 mr-4 ml-4 ">
      <Card1 className=" max-lg:mr-2 max-lg:ml-2 " />

      <div className="flex max-lg:flex-col lg:h-[70vh] max-lg:mt-48  ">
        <div className="w-[70%] bg-gray-900 rounded-sm mt-4 border max-lg:w-full max-lg:h-auto border-gray-700">
          <div className="flex max-lg:flex-col">
            <button
              onClick={handleOpen}
              variant="outlined"
              className="m-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ADD Task
            </button>
            <input
              className="m-2 mb-2 border border-gray-300 rounded bg-primaryMain text-white  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />

            <select
              onChange={handleFilter}
              class="m-2 mb-2 border border-gray-300 rounded px-4 bg-primaryMain py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500   text-white"
            >
              <option value="" className="">
                Select Status
              </option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <Paper
            sx={{
              height: 400,
              width: "100%",
              bgcolor: "rgba(17, 24, 39, 0.8)",
            }}
          >
            <Box
              sx={{
                overflowX: "auto",
              }}
            >
              <DataGrid
                sx={{
                  boxShadow: 2,
                  border: 2,
                  borderColor: "black",
                  minWidth: 650,
                  "& .MuiDataGrid-cell": {
                    backgroundColor: "primaryMain",
                    color: "rgb(255, 255, 255)",
                  },
                  "& .MuiDataGrid-cell:hover": {
                    backgroundColor: " ",
                    color: "rgb(255, 165, 0)",
                  },
                  "& .MuiDataGrid-main": {
                    backgroundColor:
                      "rgba(17, 24, 39, var(--tw-bg-opacity, 1))",
                    color: "primaryMain",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "black",
                    color: "black",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    backgroundColor: "white",
                    color: "rgb(255, 255, 255)",
                  },
                }}
                rows={filteredList.length > 0 ? filteredList : list.value}
                columns={columns}
                pageSizeOptions={[5, 10]}
                disableSelectionOnClick
              />
            </Box>
          </Paper>
        </div>
        <div className="p-4 border w-[30%]  lg:h-[68.5vh] border-gray-700 flex flex-col justify-center items-center gap-4 bg-gray-900 rounded-sm mt-4 ml-4 max-lg:w-full max-lg:ml-0 max-lg:p-[20%]">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            Task Status
          </h2>
          <Doughnut data={data} />
        </div>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <TaskForm handleClose={handleClose} edit={edit} setEdit={setEdit} />
          </>
        )}
      </Backdrop>
    </div>
  );
};

export default Home;
