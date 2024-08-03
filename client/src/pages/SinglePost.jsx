import { Link } from "react-router-dom";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import CommentsSection from "./Home/Components/Posts/CommentSecttion/CommentsSection";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
function SinglePost() {
  const { post, likes, comments } = useLoaderData();
  const [numberOfLikes, setNumberOfLikes] = useState(likes);
  const [isUserLiked, setisUserLiked] = useState(false);
  const [commentInputValue, setcommentInputValue] = useState("");
  const [postComments, setPostComments] = useState(comments);
  const { currentUser } = useSelector((state) => state.user);

  const likePost = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/like/${post._id}`,
        { method: "POST", credentials: "include" }
      );
      const data = await response.json();
      setNumberOfLikes(data.likes);
      if (data.liked) {
        setisUserLiked(true);
      } else {
        setisUserLiked(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (post.likes.includes(currentUser._id)) {
      setisUserLiked(true);
    }
  }, [post.likes, currentUser._id]);

  const handleCommentInputValue = async (e) => {
    setcommentInputValue(e.target.value);
  };
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
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
      if (!data.success) {
        console.log(data.message);
      }
      setPostComments([...postComments, data.comment]);
    } catch (error) {
      console.log(error.message);
    }
    setcommentInputValue("");
  };

  return (
    <div className="w-1/2 mx-auto">
      <h1 className="text-4xl font-bold text-center my-5">{post.title}</h1>
      <div className="h-[400px] overflow-hidden my-5">
        <img
          src={post.image || "https://tailwindcss.com/img/card-left.jpg"}
          width={700}
          height={100}
          className="object-cover rounded "
          alt="An Image related to this post"
        />
      </div>
      <div className="px-2" id="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />{" "}
      <div className="font-semibold opacity-50">Muhammad Farhan</div>
      {currentUser ? (
        <>
          <div className="border-t my-5 flex items-center ">
            <div className="flex gap-1 items-center p-2  py-1 my-2 rounded-full border">
              {" "}
              <div>{numberOfLikes}</div>
              {isUserLiked ? (
                <AiFillLike
                  className="cursor-pointer"
                  onClick={likePost}
                  size={24}
                />
              ) : (
                <AiOutlineLike
                  className="cursor-pointer"
                  onClick={likePost}
                  size={24}
                />
              )}
            </div>
          </div>
          <div className="flex items-center">
            <div>
              <img
                src={currentUser.image || "../../noavatar.png"}
                className="rounded-full border"
                width={40}
                alt="Default User image"
              />
            </div>
            <form onSubmit={handleCommentSubmit} className="w-1/2">
              <input
                type="text"
                placeholder="Comment..."
                className=" mx-2 bg-transparent border-b w-full outline-none"
                value={commentInputValue}
                onChange={handleCommentInputValue}
              />
            </form>
          </div>
        </>
      ) : (
        <div>
          <Link to={"/login"} className="text-blue-700 underline">
            Login to comment or like post
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
