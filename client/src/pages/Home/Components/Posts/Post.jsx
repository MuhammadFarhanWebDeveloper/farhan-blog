import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Post({ post, deletePost }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="relative lg:flex">
      {post.userid == currentUser?._id && (
        <span
          onClick={() => {
            deletePost(post._id);
          }}
          className="absolute right-2 top-2 cursor-pointer rounded p-1 hover:bg-gray-600"
        >
          <AiOutlineDelete size={24} />
        </span>
      )}
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-card-lft"
        style={{
          backgroundImage: `url(${
            post.image || "https://tailwindcss.com/img/card-left.jpg"
          })`,
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r w-[500px] border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-5  p-2">
          <div className=" font-bold text-xl mb-2">{post.title}</div>
          <div>
            {post.description?.length > 150
              ? post.description.slice(0, 160) + " ..."
              : post.description}
          </div>

        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={post.userimage || "noavatar.png"}
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="leading-none opacity-50">{post.username || ""}</p>
            <p className="opacity-50">
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
