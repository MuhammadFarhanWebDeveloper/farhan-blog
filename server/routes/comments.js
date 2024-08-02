import express from "express";
import { Comment, Post, User } from "../modals/Schemas.js";
import isUserLoggedIn from "../middlewares/isUserLoggedIn.js";
const comment = express.Router();
// The :id is the id of the post
comment.post("/create/:id", isUserLoggedIn, async (req, res) => {
  try {
    const { comment } = req.body;
    const postid = req.params.id;
    const userid = req.user;

    const user = await User.findById(userid);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!comment || !comment.replaceAll(" ", "")) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid comment" });
    }

    const post = await Post.findById(postid);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, messaga: "Post not found" });
    }

    const { username, image } = user;
    const addComment = await Comment.create({
      postid,
      userid,
      comment,
      username,
      image,
    });
    res
      .status(200)
      .json({ success: true, comment: addComment});
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
});

// The :id is the id of the comment
comment.delete("/delete/:id", isUserLoggedIn, async (req, res) => {
  try {
    const id = req.params.id;
    const userid = req.user;
    const isAdmin = req.isAdmin;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found " });
    }
    if (!isAdmin && comment.userid != userid) {
      return res.status(401).json({
        success: false,
        message: "You've no permission to delete this comment",
      });
    }
    const deletedComment = await Comment.findByIdAndDelete(id);

    res.status(200).json({ success: true, comment: deletedComment });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
});
// The :id is the id of the post
comment.get("/getpostcomments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const comments = await Comment.find({ postid: id });

    res.status(200).json({ success: true, comments, number: comments.length });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
  
});

export default comment;
