import express from "express";
import isUserLoggedIn from "../middlewares/isUserLoggedIn.js";
import { body, validationResult } from "express-validator";
import { Comment, Post, User } from "../modals/Schemas.js";
import mongoose from "mongoose";
const post = express.Router();
post.post(
  "/create",
  isUserLoggedIn,
  [
    body("title", "Title must be greater than 5 characters").isLength({
      min: 3,
    }),
    body("content", "Content must be greater than 15 characters").isLength({
      min: 15,
    }),
    body("description", "Description must be greater than 15 characters").isLength({
      min:15
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    try {
      const { title, image, content, description } = req.body;
      const userid = req.user;
      const slug = title
        .replaceAll(" ", "-")
        .toLowerCase()
        .replaceAll("?", "-");
      const post = await Post.findOne({ title: title });
      if (post) {
        return res.status(400).json({
          success: false,
          message:
            "Post with the same title already exist, Title must be unique",
        });
      }

      const newPost = await Post.create({
        title,
        image,
        slug,
        content,
        user:userid,
        description,
      });

      
      
      res.status(200).json({ success: true, post: newPost });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Unexpected error occured" });
    }
  }
);

post.put(
  "/update/:id",
  isUserLoggedIn,
  [
    body("title", "Title must be greater than 5 characters").isLength({
      min: 3,
    }),
    body("content", "Content must be greater than 15 characters").isLength({
      min: 15,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    try {
      const { title, image, content } = req.body;
      const user = req.user;
      const id = req.params.id;
      const slug = title
        .replaceAll(" ", "-")
        .toLowerCase()
        .replaceAll("?", "-");
      const post = await Post.findById(id);
      if (!post) {
        return res
          .status(404)
          .json({ success: false, message: "Post not found" });
      }

      const newPost = await Post.findByIdAndUpdate(
        id,
        {
          title,
          image,
          content,
          slug,
        },
        { new: true }
      );
      res.status(200).json({ success: true, post: newPost });
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: "Unexpected error occured" });
    }
  }
);

post.delete("/delete/:id", isUserLoggedIn, async (req, res) => {
  try {
    const postId = req.params.id;
    const userid = req.user;
    const isUserAdmin = req.isAdmin;
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (!isUserAdmin && userid != post.user) {
      return res.status(401).json({
        success: false,
        message: "You have no permission to delete this post",
      });
    }
    const deletepost = await Post.findByIdAndDelete(post.id);
    res.status(200).json({ success: true, post: deletepost });
  } catch (error) {}
});

post.get("/getall", async (req, res) => {
  try {
    
    
    const author = req.query.author; 


    const filter = {};
    if (author) {
      filter.user = author;
    }

    

    
    const posts = await Post.find(filter)
      .sort({ createdAt: -1 }).populate({
      path: 'user', 
      select: 'username useremail description image', 
    })

    posts.reverse(); 

    res.json({ success: true, posts});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Unexpected error occurred" });
  }
});


post.get("/getone/:slug", async (req, res) => {
  try {
    const postslug = req.params.slug;
    const post = await Post.findOne({ slug: postslug }).populate({
      path: 'user', 
      select: 'username useremail description image', 
    }).populate({
      path:"comments",
      select:"comment",
      populate:{
        path:"user",
        select:"username image useremail",
      }
    })
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    const likes = post.likes.length;
    const comments = await Comment.find({ postid: post.id });

    res.status(200).json({ success: true, post, likes, comments });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
});

post.post("/like/:id", isUserLoggedIn, async (req, res) => {
  try {
    const postid = req.params.id;
    const userid = req.user;
    if (!mongoose.Types.ObjectId.isValid(postid)) {
      return res.status(400).send("Invalid post ID");
    }

    const post = await Post.findById(postid);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Can't find this post" });
    }

    const userIndex = post.likes.indexOf(userid);
    if (userIndex == -1) {
      post.likes.push(userid);
      await post.save();
      return res.status(200).json({
        success: true,
        likes: post.likes.length,
        liked: true,
      });
    }
    post.likes.splice(userid, 1);
    await post.save();
    res.status(200).json({
      success: true,
      likes: post.likes.length,
      message: "Post unliked successfully",
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Unexpected error occured" });
  }
});

export default post;
