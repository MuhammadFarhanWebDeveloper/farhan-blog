import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [loginForm, setLoginForm] = useState({
    useremail: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispetch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.user);
  const changeInput = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const controlForm = async (e) => {
    e.preventDefault();
    if (!loginForm.useremail || !loginForm.password) {
      return dispetch(
        signInFail(
          "Fill the form with a valid credentials,BSDK! chotia samja hain kia?"
        )
      );
    }
    try {
      dispetch(signInStart());
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginForm),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        dispetch(signInFail(data.message || "Can't logged in."));
      } else {
        dispetch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (error) {
      dispetch(signInFail(error.message));
    } finally {
      setLoginForm({
        useremail: "",
        password: "",
      });
    }
  };
  return (
    <div className="w-full h-screen flex justify-center flex-col items-start md:items-center ">
      <div className="bg-gray-900 rounded md:w-1/4 w-full h-fit p-5 py-10 flex flex-col gap-5">
        <form onSubmit={controlForm} className="flex flex-col gap-5">
          <h1 className="text-center text-3xl font-bold">Login</h1>
          <input
            type="email"
            name="useremail"
            className="bg-gray-700 p-2 rounded w-full"
            id="useremail"
            value={loginForm.useremail}
            onChange={changeInput}
            placeholder="username@email.com"
          />
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={changeInput}
            className="bg-gray-700 p-2 rounded w-full"
            id="password"
            placeholder="Password"
          />

          <button
            className="rounded w-full bg-blue-700 p-2 "
            type="submit"
            disabled={isLoading}
          >
            Login
          </button>

          {error && (
            <div className="p-3 bg-cyan-200 text-red-600 text-center">
              {error}
            </div>
          )}
        </form>
        <OAuth />
      </div>
    </div>
  );
}

export default Login;
