import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  signInFail,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
function UpdateUser() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [ProfileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [succeeded, setsucceeded] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    username: currentUser.username,
    image: currentUser.image,
    description:currentUser.description
  });
  const [progress, setProgress] = useState(0);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [formError, setformError] = useState(null);
  const imageInputRef = useRef();
  const dispetch = useDispatch();
  const changeInputValue = async (e) => {
    setsucceeded(null);
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setsucceeded(null);
      dispetch(signInStart());

      setformError(null);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-user/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(updateForm),
        }
      );
      const data = await response.json();
      if (!data.success) {
        dispetch(signInFail("Could'nt update User"));
        setformError(data.message);
      } else {
        dispetch(signInSuccess(data.user));
        setsucceeded(true);
      }
    } catch (error) {
      setformError(error.message || "Could'nt update your information");
    }
  };

  const UploadImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // setImageUrl(URL.createObjectURL(file));
      setUpdateForm({ ...updateForm, image: URL.createObjectURL(file) });
    }
  };
  useEffect(() => {
    if (ProfileImage) {
      uploadImageToFireBase();
    }
  }, [ProfileImage]);
  const uploadImageToFireBase = async () => {
    setimageUploadError(null);
    const storage = getStorage(app);
    const filename = new Date().getTime() + ProfileImage.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, ProfileImage);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed(0));
      },
      (error) => {
        // Error function
        setimageUploadError("Could not upload your profile picture");
        console.log(error);
        setProgress(0);
      },
      () => {
        // Complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdateForm({ ...updateForm, image: downloadURL });
          setProgress(0)
        });
      }
    );
  };
  return (
    <div className="m-2 md:w-1/2 w-full mx-auto rounded  min-h-1.5 ">
      <h1 className="text-center text-2xl font-bold">Update User</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-around p-2 flex-wrap items-center"
      >
        <div
          className="relative cursor-pointer rounded-full mx-auto  w-32 h-32 overflow-hidden border border-white"
          onClick={() => imageInputRef.current.click()}
        >
          {progress && (
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  fontWeight: "bold",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${progress / 100})`,
                },
              }}
            />
          )}
          <img
            src={updateForm.image || "novatar.png"}
            width={100}
            alt="user profile image"
            className="rounded-full absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div>{imageUploadError && imageUploadError}</div>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/*"
          onChange={UploadImageFile}
          ref={imageInputRef}
          hidden
        />

        <div className="w-full  p-3">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={updateForm.username}
            onChange={changeInputValue}
            className="bg-gray-700 w-full p-2 rounded"
          />
        </div>
        <div className="w-full  p-3">
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="About You"
            value={updateForm.description}
            onChange={changeInputValue}
            className="bg-gray-700 w-full p-2 rounded"
          />
        </div>
     
        <div className="w-full p-3 my-3">
          <button className="bg-blue-900 w-full p-2 rounded">Update</button>
        </div>
      </form>
      {error && (
        <div className="p-3 bg-cyan-200 text-red-600 font-semibold text-center">
          {error}
        </div>
      )}
      {succeeded && (
        <div className="p-3 bg-white font-semibold rounded m-2 text-green-900 text-center">
          User Updated Successfully
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
