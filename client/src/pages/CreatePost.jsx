import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
import React, { useState, useEffect } from "react";
import ReactQuill, {Quill} from "react-quill";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import ShowError from "../components/ShowError";
import { useDispatch } from "react-redux";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

// Import the quill-resize-image package
import quillResizeImage from "quill-resize-image";
import StreamingImage from "../components/StreamingImage";
Quill.register("modules/imageResize", quillResizeImage);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleUploadImage = async () => {
    if (!file) {
      setFormError("Please select an image");
      return;
    }
    try {
      setFormError(null);
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress.toFixed(0));
        },
        (error) => {
          setFormError("Could not upload your profile picture");
          console.error(error);
          setProgress(0);
        },
        () => {
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
      console.error(error);
    }
  };

  const isFormDataEmpty = () => Object.keys(formData).length === 0;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = location.pathname.startsWith("/create-post")
      ? `${import.meta.env.VITE_BACKEND_URL}/api/post/create`
      : `${import.meta.env.VITE_BACKEND_URL}/api/post/update/${post._id}`;
    const method = location.pathname.startsWith("/create-post")
      ? "POST"
      : "PUT";

    if (
      !formData.title ||
      !formData.content ||
      (!formData.image && method === "POST")
    ) {
      setFormError("Title, Image, and Content are required");
      return;
    }
    try {
      setFormError(null);
      setLoading(true);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();
      setLoading(false);
      if (data.success) {
        navigate("/");
      } else {
        setFormError(data.message);
      }
    } catch (error) {
      setFormError("Failed to submit post");
      setLoading(false);
      console.error(error);
    }
  };

  // Register the image resize module when the component mounts
  useEffect(() => {
    const Quill = ReactQuill.Quill;
    // Register the quill-resize-image module
  }, []);

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true, // Ensures pasted content retains formatting
    },
    // Use the image resize module
    imageResize: true,
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center">Create Post</h1>
      <form
        className="flex flex-col gap-4 w-full md:w-[80%] mx-auto my-4"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="rounded p-2 bg-gray-700"
        />
        <div className="border-4 border-dotted p-4 rounded-lg flex flex-col items-center gap-4">
          {/* File Selection */}
          <label
            htmlFor="imageUpload"
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            Choose Image
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />
          {/* Show Selected File Name */}
          {file && (
            <p className="text-sm text-white mt-2 truncate max-w-xs">
              <strong>Selected:</strong> {file.name}
            </p>
          )}
          {/* Upload Button */}
          <button
            type="button"
            onClick={handleUploadImage}
            className={`w-32 h-10 flex items-center justify-center text-white font-medium rounded-lg ${
              progress > 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            disabled={progress > 0}
          >
            {progress > 0 ? "Uploading..." : "Upload Image"}
          </button>
          {/* Show Upload Progress */}
          {progress > 0 && (
            <div className="w-20 h-20 mt-4">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                styles={{
                  path: { stroke: "#4caf50" },
                  text: { fill: "#4caf50", fontSize: "16px" },
                  trail: { stroke: "#d6d6d6" },
                }}
              />
            </div>
          )}
          {/* Uploaded Image */}
          {formData.image && (
            <>
              <StreamingImage
                src={formData.image}
                alt="Uploaded"
                className="w-full min-h-80 object-contain rounded-lg shadow-lg mt-4"
              />
            </>
          )}
          {/* Show Error */}
          {FormError && <ShowError error={FormError} />}
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="p-2 bg-gray-700 h-[120px] text-lg resize-none rounded"
        ></textarea>
        <ReactQuill
          theme="snow"
          value={formData.content || ""}
          onChange={(value) => setFormData({ ...formData, content: value })}
          modules={quillModules}
          className="h-72 quill-costom mb-12"
        />
        <button
          type="submit"
          className="p-2 w-full font-semibold rounded border border-gray-400"
          disabled={loading || isFormDataEmpty()}
        >
          {loading
            ? "Submitting..."
            : location.pathname.startsWith("/create-post")
            ? "Publish Post"
            : "Update Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
