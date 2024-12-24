import React from "react";
import PostsContainer from "./Home/Components/Posts/PostsContainer";
import { useLoaderData, useParams } from "react-router-dom";

function Author() {
    const user= useLoaderData()
  return (
    <div className="md:w-[90%] w-full  mx-auto">
      <div className="md:w-[90%] w-full mx-auto bg-gray-600 text-white shadow-md rounded-lg p-6 mb-8">
        <div className="flex items-center">
          <img
            src={user.image ||"/noavatar.png"}
            alt={"muhammad farhan"}
            width={100}
            height={100}
            className="rounded-full border mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold ">{user.username}</h1>
            <p className=" mt-2">
           {user.description}
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <PostsContainer userid={user._id}/>
      </div>
      </div>
  );
}

export default Author;
