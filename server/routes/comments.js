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

    const addComment = await Comment.create({
      post: postid,
      user: userid,
      comment,
    });

    post.comments.push(addComment._id);
    await post.save();

    const populatedComment = await addComment.populate({
      path: "user",
      select: "username image useremail",
    }).execPopulate();
    res.status(200).json({ success: true, comment: populatedComment });
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
    const post = await Post.findById(comment.post);

    if (!isAdmin && comment.user != userid) {
      return res.status(401).json({
        success: false,
        message: "You've no permission to delete this comment",
      });
    }
    post.comments = post.comments.filter(
      (commentId) => commentId.toString() !== id
    );

    // Save the updated Post document
    await post.save();

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
    const comments = await Comment.find({ post: id });

    res.status(200).json({ success: true, comments, number: comments.length });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
});

export default comment;
