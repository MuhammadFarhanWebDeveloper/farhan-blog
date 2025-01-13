import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaSpinner } from "react-icons/fa";
import CommentsSection from "./Home/Components/Posts/CommentSecttion/CommentsSection";
import StreamingImage from "../components/StreamingImage";

function SinglePost() {
  const { post, likes } = useLoaderData();
  const [numberOfLikes, setNumberOfLikes] = useState(likes);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");
  const [postComments, setPostComments] = useState(post?.comments);
  const { currentUser } = useSelector((state) => state.user);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [likingPost, setLikingPost] = useState(false);

  useEffect(() => {
    if (currentUser && post.likes.includes(currentUser._id)) {
      setIsUserLiked(true);
    }
  }, [post.likes, currentUser]);

  const likePost = async () => {
    setLikingPost(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/like/${post._id}`,
        { method: "POST", credentials: "include" }
      );
      const data = await response.json();
      setNumberOfLikes(data.likes);
      setIsUserLiked(data.liked);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLikingPost(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmittingComment(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/create/${post._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: commentInputValue }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setPostComments([...postComments, data.comment]);
        setCommentInputValue("");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">{post.title}</h1>
      <div className="aspect-w-16 aspect-h-9 min-h-[400px] border mb-8 rounded-lg overflow-hidden">
        <StreamingImage
          src={post.image}
          alt="An image related to this post"
          className="object-cover w-full h-full"
        />
      </div>
      <div id="blog-content">
        <div
          id=""
          className=" max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={post.user.image || "/noavatar.png"}
            alt="Author avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <Link
              to={`/author/${post.user._id}`}
              className="font-semibold underline text-blue-700 "
            >
              {post.user.username}
            </Link>
            <p className="text-sm text-gray-500">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={likePost}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
              isUserLiked
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            } transition-colors duration-200`}
            disabled={!currentUser}
          >
           {!likingPost ? <>
              {isUserLiked ? (
                <AiFillLike className="w-5 h-5" />
              ) : (
                <AiOutlineLike className="w-5 h-5" />
              )}
            </>:<FaSpinner className="w-5 h-5 animate-spin" />}
            <span>{numberOfLikes}</span>
          </button>
          <div className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full">
            <FaRegComment className="w-5 h-5" />
            <span>{postComments.length}</span>
          </div>
        </div>
      </div>
      {currentUser ? (
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={currentUser.image || "../../noavatar.png"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-grow px-4 py-2 border border-gray-300 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              value={commentInputValue}
              onChange={(e) => setCommentInputValue(e.target.value)}
              disabled={submittingComment}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
            >
              Post
            </button>
          </div>
          {submittingComment && (
            <p className="text-sm text-gray-500 mt-2">Submitting comment...</p>
          )}
        </form>
      ) : (
        <div className="text-center mb-8">
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in to like or comment on this post
          </Link>
        </div>
      )}
      <CommentsSection
        postComments={postComments}
        setPostComments={setPostComments}
      />
    </div>
  );
}

export default SinglePost;
