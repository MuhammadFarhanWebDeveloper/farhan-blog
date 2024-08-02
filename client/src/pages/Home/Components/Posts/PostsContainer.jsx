import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostsContainer() {
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState(null);
  const [error, seterror] = useState(null);
  const [numberOfPosts, setnumberOfPosts] = useState(0);
  const POSTS_PER_PAGE = 4;

  const next = (e) => {
    // e.preventDefault()

    setPage(page + 1);
  };
  const prev = (e) => {
    // e.preventDefault()
    setPage(page && page - 1);
  };
  const hasPrev = POSTS_PER_PAGE * (page - 1) > 0;
  const hasNext = POSTS_PER_PAGE * (page - 1) + POSTS_PER_PAGE < numberOfPosts;
  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(
      `/api/post/getall?page=${page}`
    );
    const data = await response.json();
    setLoading(false);
    if (!data.success) {
      seterror(data.message || "Could not fetch posts");
    } else {
      seterror(null);
      setposts(data.posts);
      setnumberOfPosts(data.count);
      setuser(data.user);
    }
  };
  useEffect(() => {
    getPosts();
  }, [page]);
  const deletePost = async (postid) => {
  try {
    const response = await fetch(`http://localhost:5000/api/post/delete/${postid}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json()
    if (!data.success) {
      return console.log(data.message)
    }
    setposts((prevPosts) => prevPosts.filter(post => post._id !== postid));
  } catch (error) {
    console.log(error)
  }
  };
  return (
    <div className="w-[70%]">
      <h1 className="text-2xl my-5 text-center font-bold">Posts</h1>
      <div className="w-full flex flex-col items-center p-2 gap-5">
        {/* Components */}

        {Loading ? (
          <p className="text-2xl text-center font-bold">Loading...</p>
        ) : (
          posts.map((post, index) => {
            return <Post key={index} deletePost={deletePost} post={post} />;
          })
        )}
      </div>
      <div className="w-full ">
        <button
          className={`p-1 rounded border w-[75px] font-semibold border-red-500 float-left ${
            !hasPrev && "hidden"
          }`}
          onClick={prev}
        >
          Previous
        </button>

        <button
          className={`p-1 rounded border w-[75px] font-semibold border-red-500 float-right ${
            !hasNext && "hidden"
          }`}
          onClick={next}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PostsContainer;
