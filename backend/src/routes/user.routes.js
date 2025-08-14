import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { acceptFriendRequest, getFriendRequests, getMyFriends, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js";
import { get } from "mongoose";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friends" , getMyFriends);

router.post("/friend-request/:id", sendFriendRequest)
router.post("/friend-request/:id/accept", acceptFriendRequest);

router.get("get-friend-requests", getFriendRequests);

export default router;