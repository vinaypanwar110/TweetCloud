import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserProfile , followUnfollowUser , getSuggestedUsers , updateUserProfile ,searchUsers} from "../controllers/userController.js";
const router = express.Router();

router.get("/profile/:username",protectRoute,getUserProfile);
router.get("/suggested",protectRoute,getSuggestedUsers);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.post("/update",protectRoute,updateUserProfile); // want to update profile
router.get("/search",protectRoute,searchUsers);
export default router;