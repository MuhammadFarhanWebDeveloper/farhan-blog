import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import AddUser from "./pages/Dashboard/AddUser/AddUser.jsx";
import MainLeft from "./pages/Dashboard/New folder/MainLeft.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";

const fetchSinglePost = async ({ params }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/post/getone/${params.slug}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const { success, ...rest } = data;

  return rest;
};
const fetchUserPosts = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/post/get-user-posts`,
    { method: "POST", credentials: "include" }
    
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  const { success, ...rest } = data;

  return rest;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "posts/:slug",
        element: <SinglePost />,
        loader: fetchSinglePost,
      },
      {
        path: "create-post",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
      },
      {
        path: "update-post/:slug",
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        ),
        loader: fetchSinglePost,
      },
      {
        path: "user/dashboard",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
        loader: fetchUserPosts,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
        children: [
          { path: "", element: <MainLeft /> },
          { path: "create-user", element: <AddUser /> },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div>
      <RouterProvider router={router} />
    </div>
  </Provider>
);
