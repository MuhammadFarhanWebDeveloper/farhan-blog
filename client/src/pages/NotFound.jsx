import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen md:h-[80vh]   text-center ">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-lg ">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
          Go to Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
