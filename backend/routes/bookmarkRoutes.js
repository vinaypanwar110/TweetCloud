import express from "express";

import {
  addBookmark,
  removeBookmark,
  getBookmarks,
} from "../controllers/bookmarkController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/add/:postId", protectRoute, addBookmark);
router.post("/remove/:postId", protectRoute, removeBookmark);
router.get("/", protectRoute, getBookmarks);

export default router;
