import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 15,
      min: 4,
    },
    useremail: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 5,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      min: 15,
    },
    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userimage: {
      type: String,
    },
    username: {
      type: String,
    },
    useremail: {
      type: String,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    postid: { type: mongoose.Schema.Types.ObjectId, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
    username: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
export const Post =
  mongoose.models.posts || mongoose.model("posts", PostSchema);
export const Comment =
  mongoose.models.comments || mongoose.model("comments", CommentSchema);
