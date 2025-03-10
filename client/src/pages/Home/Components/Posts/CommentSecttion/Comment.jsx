import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Comment({ comment, setPostComments, postComments }) {
  const { currentUser } = useSelector((state) => state.user);
  const [deletingComment, setDeletingComment] = useState(false);
  const deleteComment = async (e) => {
    e.preventDefault();
    setDeletingComment(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/delete/${comment._id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const { comment: deletedComment } = await response.json();
      setPostComments(postComments.filter((c) => c._id !== deletedComment._id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingComment(false);
    }
  };
  return (
    <div className="flex gap-2 items-start">
      <div>
        <img
          src={comment.user.image || "/noavatar.png"}
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px] border"
          alt="Default User image"
        />
      </div>
      <div className="w-1/2 rounded bg-gray-600 px-4">
        <div className="flex justify-between ">
          <Link
            to={`/author/${comment.user._id}`}
            className="font-semibold underline text-blue-400"
          >
            {comment.user.username}
          </Link>
          {comment.user._id === currentUser?._id && (
            <form className="font-semibold pt-1" onSubmit={deleteComment}>
              {!deletingComment ? (
                <button>
                  <AiOutlineDelete size={20} />
                </button>
              ) : (
                <div className="animate-spin inline-block">
                  <FaSpinner size={14} />
                </div>
              )}
            </form>
          )}
        </div>
        <div>{comment.comment}</div>
      </div>
    </div>
  );
}

export default Comment;
