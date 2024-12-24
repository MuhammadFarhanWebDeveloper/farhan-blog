import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const PostCards = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const userid = useSelector((state)=> state.user.currentUser?._id)
useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/getall?author=${userid}`,
      );
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      setPosts(data.posts || []);
    } catch (error) {
      setError(error.message);
    } 
  };

  fetchPosts();
}, [])

  
  const handleDelete = async (postId) => {
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/delete/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        return setError(data.message);
      }
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="text-center text-lg font-semibold text-red-400 mb-4">{error}</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <div key={post._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
              <div className="relative h-48 w-full">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-white">{post.title}</h2>
                <p className="text-sm text-gray-300 mb-2">
                  {post.description.length > 100
                    ? post.description.slice(0, 100) + "..."
                    : post.description}
                </p>
                <p className="text-xs text-gray-400">{formatDate(post.updatedAt)}</p>
              </div>
              <div className="flex justify-between p-4 border-t border-gray-700">
                <button
                  onClick={() => handleDelete(post._id)}
                  className="text-red-400 hover:text-red-300 transition-colors duration-200"
                  aria-label="Delete post"
                >
                  <AiOutlineDelete size={20} />
                </button>
                <Link
                  to={`/update-post/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  aria-label="Edit post"
                >
                  <AiOutlineEdit size={20} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCards;

