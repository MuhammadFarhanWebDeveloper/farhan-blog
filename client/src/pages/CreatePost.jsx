import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import ShowError from "../components/ShowError";
import { useDispatch } from "react-redux";
import { signInFail } from "../redux/user/userSlice";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
function CreatePost() {
  const post = useLoaderData()?.post;
  const [file, setFile] = useState(null);
  const [FormError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    title: post?.title,
    description: post?.description,
    content: post?.content,
    image: post?.image,
  });
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispetch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setFormError("Please Select an image");
        return;
      }
      setFormError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
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
          setFormError("Could not upload your profile picture");
          console.log(error);
          setProgress(0);
        },
        () => {
          // Complete function
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormError(null);
            setFormData({ ...formData, image: downloadURL });
            setProgress(0);
          });
        }
      );
    } catch (error) {
      setFormError("Failed to upload image");
      setProgress(0);
      console.log(error);
    }
  };
  const isFormDataEmpty = () => {
    return Object.keys(formData).length === 0;
  };
  const handleFormCreate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setFormError("Title and Content must not be empty");
    }
    try {
      setFormError(null);
      setLoading(true);
      const response = await fetch(`/api/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        console.log(data.post);
        navigate("/");
      } else {
        setFormError(data.message);
      }
    } catch (error) {
      setFormError("Failed to publish post");
    }
  };
  const handleFormUpdate = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setFormError("Title and Content must not be empty");
    }
    try {
      setFormError(null);
      setLoading(true);
      const response = await fetch(
        `/api/post/update/${post._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      setLoading(false);
      if (data.success) {
        console.log(data.post);
        navigate("/");
      } else {
        setFormError(data.message);
      }
    } catch (error) {
      setFormError("Failed to publish post");
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/update-post/")) {
      console.log(post);
    }
  }, []);

  return (
    <div className="">
      <h1 className="font-bold text-3xl text-center ">Create Post</h1>
      <form className="flex flex-col gap-4 w-[80%] mx-auto my-4">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          id="title"
          value={formData.title || ""}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            console.log(formData);
          }}
          className="rounded p-2 bg-gray-700"
        />
        <div className="border-4 border-dotted p-2 ">
          <div className="gap-4 flex items-center justify-center">
            <input
              className="flex text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              name="image"
              id="image"
              accept="image/*"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              type="button"
              onClick={handleUploadImage}
              className="bg-gray-700 rounded cursor-pointer p-1"
              disabled={progress}
            >
              {progress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={progress} text={`${progress}%`} />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
          <div className="w-full p-2">
            {FormError && <ShowError error={FormError} />}
            {formData.image && (
              <img
                src={formData.image}
                alt="Post Image"
                className="w-full h-80 object-cover"
              />
            )}
          </div>
        </div>
        <textarea
          name="description"
          id="description"
          placeholder="Write the description of the Post"
          cols="30"
          rows="5"
          value={formData.description || ""}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            console.log(formData);
          }}
          className="p-2 bg-gray-700 resize-none rounded"
        ></textarea>{" "}
        <ReactQuill
          theme="snow"
          placeholder="Write the content of the post"
          name="content"
          className="h-72 mb-12"
          defaultValue={post?.content}
          onChange={(value) => {
            setFormData({ ...formData, content: value });
            console.log(formData);
          }}
        />
        {location.pathname.startsWith("/create-post") ? (
          <button
            className="p-2 w-full font-semibold disabled:opacity-50 rounded border border-gray-400"
            type="submit"
            disabled={isFormDataEmpty()}
            onClick={handleFormCreate}
          >
            Publish Post
          </button>
        ) : (
          <button
            className="p-2 w-full font-semibold disabled:opacity-50 rounded border border-gray-400"
            type="submit"
            disabled={isFormDataEmpty()}
            onClick={handleFormUpdate}
          >
            Update Post
          </button>
        )}
      </form>
    </div>
  );
}

export default CreatePost;
