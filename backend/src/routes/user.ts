import express, { type Request } from "express";
import User from "../models/User";
import { verifyToken } from "../middleware/verifyToken";
import { updateUserSettings, updateUserChallengeProgress } from "../services/progressService";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const router = express.Router();

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    console.error("Failed to Get Profile");
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
});

router.put("/update", verifyToken, async (req, res) => {
  try {
    const { username, email, avatar, theme, notifications } = req.body;
    const userId = req.userId as string;

    const updatedData: any = {};
    if (username) updatedData.username = username;
    if (email) updatedData.email = email;
    if (avatar) updatedData.avatar = avatar;

    let updatedUser: any = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    if (theme || notifications !== undefined) {
      updatedUser = await updateUserSettings(userId, { theme, notifications });
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Failed to update user");
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
});

router.post("/complete-challenge", verifyToken, async (req, res) => {
  try {
    const userId = req.userId as string;
    const updatedUser = await updateUserChallengeProgress(userId);

    res.status(200).json({
      status: "success",
      message: "Challenge progress updated successfully",
      data: { activity: updatedUser.activity },
    });
  } catch (err) {
    console.error("Failed to complete challenge", err);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
});

export default router;
