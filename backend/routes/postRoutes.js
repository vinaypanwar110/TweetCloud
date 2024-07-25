import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getAllPosts,
  getAllLikes,
  getFollowingPosts,
  getUserPosts
} from "../controllers/postController.js";
const router = express.Router();

router.get("/all", protectRoute, getAllPosts);// get all the posts 
router.get("/following", protectRoute, getFollowingPosts);// get all the  posts  of following
router.get("/likes/:id", protectRoute, getAllLikes);  // get all the posts like by the user == id
router.get("/user/:username", protectRoute, getUserPosts); // get all the posts of the user
router.post("/create", protectRoute, createPost); // to create the post
router.post("/like/:id", protectRoute, likeUnlikePost); // to like or unlike the post
router.post("/comment/:id", protectRoute, commentOnPost); // add the comment on the post whose post id is id
router.delete("/:id", protectRoute, deletePost); // delete the post whose id is id

export default router;
