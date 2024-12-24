import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max: 15,
      min: 4,
    },
    description: {
      type: String,
      default: "",
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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts", default:[]}],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments", default:[] }],
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments",default:[] }],
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const User =
  mongoose.models.users || mongoose.model("users", UserSchema);
export const Post =
  mongoose.models.posts || mongoose.model("posts", PostSchema);
export const Comment =
  mongoose.models.comments || mongoose.model("comments", CommentSchema);
