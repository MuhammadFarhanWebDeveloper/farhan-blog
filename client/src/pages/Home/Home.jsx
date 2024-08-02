import React from "react";
import Hero from "./Components/Hero";
import PostsContainer from "./Components/Posts/PostsContainer";
function Home() {
  return (
    <>
      <Hero />
      <div className="w-full rounded mt-5 flex flex-col ">
        <div className="flex justify-center gap-x-5">
          <PostsContainer />
        </div>
      </div>{" "}
    </>
  );
}

export default Home;
