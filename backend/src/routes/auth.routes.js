import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/login",login)

router.post("/signup",signup)

router.post("/logout",logout)

router.get("/home", protectRoute, (req, res) => {
  res.status(200).json({ message: "Welcome to the home page!" });
});

export default router;