import React from "react";
import {  AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
function Comment({ comment, setPostComments, postComments }) {
  const { currentUser } = useSelector((state) => state.user);

  const deleteComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/comment/delete/${comment._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const { comment: deletedComment } = await response.json();
      setPostComments(postComments.filter((c) => c._id !== deletedComment._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2 items-start">
      <div>
        <img
          src={comment.image || "../../../noavatar.png"}
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px] border"
          alt="Default User image"
        />
      </div>
      <div className="w-1/2 rounded bg-gray-600 px-4">
        <div className="flex justify-between ">
          <div className="font-semibold opacity-50">{comment.username}</div>
          {comment.userid === currentUser?._id && (
            <form className="font-semibold pt-1" onSubmit={deleteComment}>
              <button>
                <AiOutlineDelete size={20} />
              </button>
            </form>
          )}
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
}

export default Comment;
