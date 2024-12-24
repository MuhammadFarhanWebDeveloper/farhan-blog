import React from "react";
import PostsTable from "./pages/UserProfile/components/PostsTable.jsx";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import SinglePost from "./pages/SinglePost.jsx";

import { store,  } from "./redux/store.js";
import { Provider } from "react-redux";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import UpdateUser from "./components/UpdateUser.jsx";
import Author from "./pages/Author.jsx";
import NotFound from "./pages/NotFound.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

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
const fetchUser = async ({params}) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/getuserbyid/${params.userid}`,
    
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();

  
  return data?.user;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, 
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
        children:[
          {path:"", element:<div className=""><PostsTable /></div>},
          {path:"update-user-info", element:<div><UpdateUser /></div>}
        
        ],
        
      },
      {path:"author/:userid", element:<Author />, loader:fetchUser},
      {path:"*", element:<NotFound />}
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="bg-[rgb(16,23,42)] text-gray-200"> 
      <RouterProvider router={router} />
    </div>
  </Provider>
);
