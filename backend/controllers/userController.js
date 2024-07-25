import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userToModify = await User.findById(id);

    const currUser = await User.findById(req.user._id);

    if (id == req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow or unfollow yourself" });
    }

    if (!userToModify || !currUser) {
      return res.status(400).json({ error: "User not found" });
    }

    const isFollowing = currUser.following.includes(id);

    if (isFollowing) {
      // remove a user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed succesfully" });
    } else {
      // add a user

      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();

      res.status(200).json({ message: "User followed succesfully" });
    }
  } catch (error) {
    console.log("Error in followUnfollowUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following"); // array of following by user

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },

      {
        $sample: {
          size: 10
        },
      },
    ]);

    const filteredUsers = users.filter(user=>!usersFollowedByMe.following.includes(user._id));

    const suggestedUsers = filteredUsers.slice(0,4);

    suggestedUsers.forEach(user=>user.password=null);


    res.status(200).json(suggestedUsers);

     
  } catch (error) {

    console.log("error in getSuggestedUsers",error.message);
    res.status(500).json({error:error.message});

  }
};


export const updateUserProfile = async (req,res) => {
   
};