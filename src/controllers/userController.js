const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  try {
    const categories = ["admin", "individual", "institution"];
    const stats = {};
    const usersByCategory = {};

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfPreviousMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );

    for (const category of categories) {
      const users = await User.find({ role: category });
      const total = users.length;
      const totalPreviousMonth = await User.countDocuments({
        role: category,
        createdAt: { $lt: startOfCurrentMonth, $gte: startOfPreviousMonth },
      });

      const increaseRate =
        totalPreviousMonth === 0
          ? total * 100
          : ((total - totalPreviousMonth) / totalPreviousMonth) * 100;

      stats[category] = {
        total,
        increaseRate,
      };

      usersByCategory[category] = users;
    }

    const verifiedUsers = await User.find({ isVerified: true });
    const verifiedUsersTotal = verifiedUsers.length;
    const verifiedUsersPreviousMonth = await User.countDocuments({
      isVerified: true,
      createdAt: { $lt: startOfCurrentMonth, $gte: startOfPreviousMonth },
    });

    const verifiedIncreaseRate =
      verifiedUsersPreviousMonth === 0
        ? verifiedUsersTotal * 100
        : ((verifiedUsersTotal - verifiedUsersPreviousMonth) /
            verifiedUsersPreviousMonth) *
          100;

    stats.verified = {
      total: verifiedUsersTotal,
      increaseRate: verifiedIncreaseRate,
    };

    usersByCategory.verified = verifiedUsers;

    res.status(200).json({ stats, usersByCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { authId, username, fullName, email, role, bio, profilePicture } =
    req.body;
  const user = new User({
    authId,
    username,
    fullName,
    email,
    role,
    bio,
    profilePicture,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ authId: req.user.authId });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isVerified = true;
    await user.save();
    res.status(200).json(user);
  } catch (error) {}
};
