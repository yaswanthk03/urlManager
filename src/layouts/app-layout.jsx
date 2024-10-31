import Header from "@/components/header";
import { Outlet } from "react-router-dom";
import React from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <ToastContainer />
      <div className="p-10 text-center bg-gray-800 mt-10">
        {new Date().getFullYear()} © Yaswanth Kumar
      </div>
    </div>
  );
};

export default AppLayout;
