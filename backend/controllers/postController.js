import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";
import Notification from "../models/notificationModel.js";
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    const userId = req.user._id.toString();

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!text && !img) {
      return res.status(400).json({ error: "Post must have text or image" });
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img);
      img = uploadedResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createPost controller: ", error);
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found what u want to delete" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ message: "U are not authorized to delete the post" });
    }

    if (post.img) {
      const imageId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error in deletePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;

    const userId = req.user._id;
    const postId = req.params.id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ error: "Post not found which u want comment on" });
    }

    const comment = {
      user: userId,
      text,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.log("Error in commentOnPost controller", error);
    res.status(500).json({ error: "Internal error in postcomment" });
  }
};
export const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ error: "Post not found u want like or unlike" });
    }

    const isLike = post.likes.includes(userId);

    if (isLike) {
      // unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "Post unliked successfully" });
    } else {
      // like the post

      post.likes.push(userId);

      await post.save();

      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await notification.save();

      res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.log("Ërror in likeUnlikepost controller", error);
    res
      .status(500)
      .json({ error: "Internal server error while liking the post" });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).populate({
      path: "user",
      select: "-password",
    }).populate({
        path: "comments.user",
        select: "-password",
      }).populate({
        path: "likes",
        select: "-password",
      });
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getAllpost ", error);
    res.status(500).json({ error: "Ïnternal error in getall posts" });
  }
};
