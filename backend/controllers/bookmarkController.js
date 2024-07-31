import User from "../models/userModel.js";
import Post from "../models/postModel.js";

export const addBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!user.bookmarks.includes(post._id)) {
      user.bookmarks.push(post._id);
      await user.save();
    }

    res.status(200).json({ message: "Bookmark added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    user.bookmarks = user.bookmarks.filter(
      (bookmark) => bookmark.toString() !== post._id.toString()
    );
    await user.save();
    res.status(200).json({ message: "Post unbookmarked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("bookmarks");
    res.status(200).json(user.bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
