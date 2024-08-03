import express from "express";
import jsonwebtoken from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";
import { User } from "../modals/Schemas.js";
import isUserLoggedIn from "../middlewares/isUserLoggedIn.js";

const auth = express.Router();
auth.post(
  "/google",
  [
    body(
      "username",
      "Name must be valid and greater than 3 character"
    ).isLength({
      min: 4,
      max: 15,
    }),
    body("useremail", "Enter a valid email").isEmail(),
    body("image", "Enter a valid image url").default("avatar.png"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    try {
      const { username, useremail, image } = req.body;
      const user = await User.findOne({ useremail });
      if (user) {
        const data = {
          id: user.id,
        };
        const authtoken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
        const { password, isAdmin, ...rest } = user._doc;
        res
          .cookie("authtoken", authtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            domain: 'https://farhan-blog.vercel.app',
            sameSite: 'None' 
          })
          .json({ success: true, user: rest });
      } else {
        const generatedPassword =
          Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8);
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(generatedPassword, salt);
        const newUser = await User.create({
          username,
          useremail,
          password: hashedPassword,
          image,
        });
        const data = {
          id: newUser.id,
        };
        const authtoken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
        const { password, isAdmin, ...rest } = newUser._doc;
        res
          .cookie("authtoken", authtoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
            domain: 'https://farhan-blog.vercel.app',
            sameSite: 'None' // or 'Lax'/'Strict' depending on your needs
          })
          .json({ success: true, user: rest });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);
auth.post(
  "/signup",
  [
    body(
      "username",
      "Name must be valid and greater than 3 character"
    ).isLength({
      min: 4,
      max: 15,
    }),
    body("useremail", "Enter a valid email").isEmail(),
    body("isAdmin", "Admin must be boolean ie true or false").default(false),
    body("password", "password must be greater than 4 character").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "BKL use valid credentials," });
    }

    try {
      const { username, useremail, password, image, isAdmin } = req.body;
      const user = await User.findOne({ useremail });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exist",
        });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = await User.create({
        username,
        useremail,
        password: hashedPassword,
        image,
        isAdmin,
      });
      const data = {
        id: newUser.id,
      };
      const {
        isAdmin: isUserAdmin,
        password: userPassword,
        ...sendUser
      } = newUser;
      const authtoken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
      res
        .cookie("authtoken", authtoken,{
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: '/',
          domain: 'https://farhan-blog.vercel.app',
          sameSite: 'None' // or 'Lax'/'Strict' depending on your needs
        })
        .json({ success: true, user: sendUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

auth.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be greater than 4 character").isLength({
      min: 4,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ success: false, message: errors.array() });
    }
    try {
      const { useremail, password } = req.body;
      const user = await User.findOne({ useremail });
      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "There's no user with this email. Please Go to the signup page.",
        });
      }

      const comparePassword = await bcryptjs.compare(password, user.password);
      if (!comparePassword) {
        return res
          .status(400)
          .json({ success: false, message: "Password doesn't mach" });
      }
      const data = {
        id: user.id,
      };
      const authtoken = jsonwebtoken.sign(data, process.env.JWT_SECRET);
      const { isAdmin, password: userPassword, ...sendUser } = user;
      res
        .cookie("authtoken", authtoken,{
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: '/',
          domain: 'https://farhan-blog.vercel.app',
          sameSite: 'None' // or 'Lax'/'Strict' depending on your needs
        })
        .json({ success: true, user: sendUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);
auth.put(
  "/update-user/:id",
  isUserLoggedIn,
  [
    body(
      "username",
      "Name must be valid and greater than 3 character"
    ).isLength({
      min: 4,
      max: 30,
    }),
    body("useremail", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: "BKL use valid credentials," });
    }
    try {
      const { username, useremail, image } = req.body;
      if (req.user !== req.params.id) {
        return res.status(400).json({
          success: false,
          message: "You're not allowed to update this user",
        });
      }
      const user = await User.findById(req.params.id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User does'nt exists" });
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { username, useremail, image },
        { new: true }
      );
      const { isAdmin, password, ...sendUser } = updatedUser._doc;
      res.status(200).json({ success: true, user: sendUser });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);
auth.get("/getall", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Sorry! Unexpected error occured." });
  }
});

auth.post("/getone", isUserLoggedIn, async (req, res) => {
  const userid = req.user;
  try {
    const user = await User.findById(userid).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Cannot find the user" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

auth.post("/logout", isUserLoggedIn, async (req, res) => {
  try {
    res.clearCookie("authtoken").json({success:true})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
})
export default auth;
