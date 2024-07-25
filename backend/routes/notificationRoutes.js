import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getNotifications,
  deleteNotifications,
  deleteOneNotifications,
} from "../controllers/notificationController.js";

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteOneNotifications);

export default router;
