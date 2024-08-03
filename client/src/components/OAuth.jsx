import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {signInFail, signInStart, signInSuccess} from "../redux/user/userSlice"
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function OAuth() {
  const dispetch = useDispatch()
  const navigate = useNavigate() 
  const auth = getAuth(app)
  const handleGoogleClicked = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt:"select_account"})
    try {
      dispetch(signInStart())
      const resultFromGoogle = await signInWithPopup(auth, provider)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:resultFromGoogle.user.displayName,
          useremail:resultFromGoogle.user.email,
          image:resultFromGoogle.user.photoURL,
        }),
        credentials:"include",
      })

      const data = await response.json()
      if (!data.success) {
        dispetch(signInFail("Can't Logged In "))
      }else {
        dispetch(signInSuccess(data.user))
        navigate("/")
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <button
      className="rounded w-full hover:bg-green-900 hover:border-transparent border-2 border-red-600 p-2"
      onClick={handleGoogleClicked}
    >
      <div className="w-full flex justify-center gap-2">
        <AiOutlineGoogle size={25} />
        <p>Continue with Google</p>
      </div>
    </button>
  );
}

export default OAuth;
