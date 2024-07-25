import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });
    await Notification.updateMany(
      {
        to: userId,
      },
      {
        read: true,
      }
    );
    res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getNotifications: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.log("Error in deletenotificaton: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteOneNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notId = req.params.id;

    const notification = await Notification.findById(notId);

    if (!notification) {
      return res
        .status(404)
        .json({ error: "there is not notification u want to delete" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "you are not authorize to delete the notifications" });
    }

    await Notification.findByIdAndDelete(notId);

    res.status(200).json({ message: "One Notification deleted successfully" });
  } catch (error) {
    console.log("Error in One deletenotificaton: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
