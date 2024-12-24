import React, { useEffect, useState } from "react";
import Post from "./Post";

function PostsContainer({userid=null}) {
  const [Loading, setLoading] = useState(false);
  const [posts, setposts] = useState([]);
  const [error, seterror] = useState(null)
  const getPosts = async () => {
    setLoading(true);
    try {
      
    
    const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/post/getall`)
    if(userid){
      url.searchParams.append("author", userid)
    }
    const response = await fetch(url);
    const data = await response.json();
    if (!data.success) {
      seterror(data.message || "Could not fetch posts");
    } else {
      seterror(null);
      setposts(data.posts);
    }
  } catch (error) {
      seterror("Oops! Something went wrong")
  } finally {
    setLoading(false)
  }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const deletePost = async (postid) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/delete/${postid}`, {
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
          <div className="text-2xl text-center font-bold">
            <img src="/loading.gif" alt="Loading..." width={25} />
          </div>
        ) : (
          posts.map((post, index) => {
            return <Post key={index} deletePost={deletePost} post={post} />;
          })
        )}
        {error && <div className="text-2xl text-center w-full h-full text-red-600 fond-bold">Oops! Something went wrong</div>}
      </div>
      
    </div>
  );
}

export default PostsContainer;
