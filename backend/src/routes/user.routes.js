import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares.js";
import { getMyFriends, getRecommendedUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends" , getMyFriends);

export default router;