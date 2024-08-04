// src/components/PostTable.js
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useLoaderData } from "react-router-dom";

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

const PostTable = () => {
  const { posts:myposts } = useLoaderData();
  const [posts, setposts] = useState(myposts);
  const [error, seterror] = useState(null);
  const handleDelete = async (postid) => {
    seterror(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/delete/${postid}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!data.success) {
        return seterror(data.message);
      }
      setposts((prevPosts) => prevPosts.filter((post) => post._id !== postid));
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="max-w-full min-w-[500px] rounded border h-full mx-auto  px-4 ">
      {error && (
        <div className="text-center text-lg font-semibold">{error}</div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full  divide-gray-200  shadow-lg rounded-lg">
          <thead className="border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Created/Updated At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {posts?.map((post, index) => (
              <tr key={index} className="border-b relative">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                  {post?.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {post.description.length > 86
                    ? post?.description.slice(0, 85) + "..."
                    : post.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {formatDate(post?.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <div className="w-full flex justify-between items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleDelete(post._id);
                      }}
                    >
                      <AiOutlineDelete size={20} />
                    </div>
                    <div className="cursor-pointer">
                      <Link to={`/update-post/${post.slug}`}>
                        <AiOutlineEdit size={20} />
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PostTable;
