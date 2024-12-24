import React from "react";
import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Access error details
  console.error(error); // Log error for debugging (optional)

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-red-500">Oops!</h1>
      <p className="text-lg mt-4 text-gray-600">Something went wrong.</p>
      <p className="mt-2 text-gray-500">
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
