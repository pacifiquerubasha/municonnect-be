const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authId = req.header("Authorization").replace("Bearer ", "");
    const user = await User.findOne({
      authId,
    });

    if (!user) {
      throw new Error();
    } else if (user?.isBanned?.status) {
      res.status(401).json({
        message:
          "Your account has been banned. Please contact Support for help.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate." });
  }
};

const adminMiddleware = async (req, res, next) => {
  try {
    const authId = req.header("Authorization").replace("Bearer ", "");
    const user = await User.findOne({
      authId,
    });

    if (!user) {
      throw new Error();
    } else if (user.role !== "admin") {
      res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Please authenticate." });
  }
};

const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      throw new Error();
    }

    const user = await User.findOne({ apiKey });

    if (!user) {
      return res.status(401).json({ message: "Invalid API key" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "API key required" });
  }
};

module.exports = { authMiddleware, adminMiddleware, authenticateApiKey };
