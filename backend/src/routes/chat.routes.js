import express from "express";
import { protectRoute } from "../middlewares/auth.middlewares";

const router = express.Router();

router.get("/token",protectRoute, )

export default router;