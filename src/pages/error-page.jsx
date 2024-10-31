// src/components/ErrorPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-9xl font-bold text-blue-500">404</h1>
      <p className="text-2xl text-gray-700 mt-4">Oops! Page not found</p>
      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
