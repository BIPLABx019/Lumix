import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, userName, fullName } = req.body;

  try {
    if (!email || !password || !userName || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password too short" });
    }

    const existingUserEmail = await User.findOne({ email });
    const existingUserName = await User.findOne({ userName });

    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }
    if (existingUserName) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const index = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${index}.png`;

    const newUser = await User.create({
      userName,
      fullName,
      email,
      password,
      profilePic: randomAvatar,
    });

    try {
      await upsertStreamUser({
        id: newUser._id.toString(),
        name: newUser.fullName,
        image: newUser.profilePic || "",
      });
      console.log("Stream user created for:", newUser.userName);
    } catch (error) {
      console.error("Error creating Stream user:", error);
    }

    const token = jwt.sign(
      { userID: newUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("Error in Signup", error);
    return res.status(500).json({ message: `${error}` });
  }
}

export async function login(req, res) {
  const { userNameOrEmail, password } = req.body;

  try {
    if (!userNameOrEmail || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userByUserName = await User.findOne({ userName: userNameOrEmail });
    const userByEmail = await User.findOne({ email: userNameOrEmail });

    if (!userByUserName && !userByEmail) {
      return res.status(401).json({ message: "Invalid email or username" });
    }

    let user;

    if (userByUserName) {
      user = userByUserName;
    } else {
      user = userByEmail;
    }

    const isPasswordCorrect = await user.matchPassword(password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in Login", error);
    return res.status(500).json({ message: `${error}` });
  }
}

export async function logout(req, res) {
  res.clearCookie("jwt");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
}
