import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StreamingImage from "../../../../components/StreamingImage";

function Post({ post, deletePost }) {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="relative md:w-[90%] w-[100%] flex border  flex-col md:flex-row p-1 rounded">
      {post.user._id == currentUser?._id && (
        <span
          onClick={() => {
            deletePost(post._id);
          }}
          className="absolute right-2 top-2 cursor-pointer rounded p-1 hover:bg-gray-600"
        >
          <AiOutlineDelete size={24} />
        </span>
      )}
      <div className="flex justify-center h-[240px] w-full md:w-[300px] items-start">
        <StreamingImage
          src={post.image}
          width={165}
          className=" w-full h-full rounded object-contain"
          alt="Image about the post"
        />
      </div>
      <div className="w-full md:w-[75%] rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between ">
        <div className="mb-5  p-2">
          <div className=" font-bold text-xl mb-2">{post.title}</div>
          <div className="w-full break-words text-sm overflow-hidden">
            {post.description?.length > 150
              ? post.description.slice(0, 160) + " ..."
              : post.description}
          </div>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={post.user.image || "noavatar.png"}
            alt="User avatar"
          />
          <div className="text-sm">
            <Link className="leading-none hover:font-semibold text-blue-700 underline cursor-pointer hover:opacity-1 opacity-50" to={`/author/${post.user._id}`}>{post.user.username || ""}</Link>
            <p className="opacity-50 py-1">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>{" "}
          </div>
        </div>
        <div className="mt-3 w-full flex rounded border border-pink-600">
          <Link
            to={`/posts/${post.slug}`}
            className="w-full font-semibold text-center"
            preventScrollReset={false}
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Post;
