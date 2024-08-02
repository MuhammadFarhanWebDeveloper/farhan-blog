import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInFail,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
function SignIn() {
  const navigate = useNavigate();
  const dispetch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [signupForm, setSignupForm] = useState({
    username: "",
    useremail: "",
    password: "",
  });

  const changeInput = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };
  const controlForm = async (e) => {
    e.preventDefault();
    if (!signupForm.username || !signupForm.username || !signupForm.password) {
      return dispetch(
        signInFail("Fill the form with a valid credentials,BSDK! chotia samja hain kia?")
      );
    }
    try {
      dispetch(signInStart());
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
        credentials: "include",
      });
      const data = await response.json();
      if (!data.success) {
        console.log(data.message);
        dispetch(signInFail(data.message || "Can't signed in"));
      } else {
        dispetch(signInSuccess(data.user));
        navigate("/");
      }
    } catch (error) {
      dispetch(signInFail(error.message));
    } finally {
      setSignupForm({
        username: "",
        useremail: "",
        password: "",
      });
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div className="bg-gray-900 rounded w-1/4 h-fit p-5 py-10 flex flex-col gap-2">
        <form onSubmit={controlForm} className="flex flex-col gap-5">
          <h1 className="text-center text-3xl font-bold">Sign up</h1>
          <input
            type="text"
            name="username"
            className="bg-gray-700 p-2 rounded w-full"
            id="username"
            placeholder="Username"
            value={signupForm.username}
            onChange={changeInput}
          />
          <input
            type="email"
            name="useremail"
            className="bg-gray-700 p-2 rounded w-full"
            id="useremail"
            value={signupForm.useremail}
            onChange={changeInput}
            placeholder="username@email.com"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-700 p-2 rounded w-full"
            id="password"
            value={signupForm.password}
            onChange={changeInput}
            placeholder="Password"
          />
          <button
            className="rounded w-full bg-blue-700 p-2"
            type="submit"
            disabled={loading}
          >
            Sign up
          </button>
        </form>
        <OAuth />
        {error && (
          <div className="p-3 bg-cyan-200 text-red-600 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default SignIn;
