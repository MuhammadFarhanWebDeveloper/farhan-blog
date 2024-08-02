import React from "react";
import Card from "./Card"
import ShowPosts from "./ShowPosts";
import ShowUsers from "./ShowUsers";
function MainLeft() {
  return (
    <div className="w-full flex flex-col gap-2 m-2">
      <div className="card-container flex gap-2 p-2">
        <Card />
        <Card />
        <Card />
      </div>
      <div className="flex gap-2 flex-wrap">
        <ShowPosts />
        <ShowUsers />
      </div>
    </div>
  );
}

export default MainLeft;
