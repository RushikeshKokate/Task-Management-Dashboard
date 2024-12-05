import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./UI/Navbar";
import SideBar from "./UI/SideBar";
import Home from "./UI/Home";
import "./App.css";
import Card from "./UI/Card1";

function App() {
  return (
    <div className="dashboard">
      <div className="flex">
        <SideBar />
        <div className="w-full ">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
