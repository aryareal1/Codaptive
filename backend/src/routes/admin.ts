import express, { type Request, type Response } from "express";
import Module from "../models/Module";
import Lesson from "../models/Lesson";
import { verifyToken } from "../middleware/verifyToken";
import { isAdmin } from "../middleware/isAdmin";

const router = express.Router();

router.post(
  "/modules",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { name, description, order } = req.body;
      const newModule = await Module.create({ name, description, order });

      res.status(201).json({ status: "success", data: newModule });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: "Failed to create module" });
    }
  },
);

router.get(
  "/modules",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    const modules = await Module.find().sort("order");
    res.status(200).json({ status: "success", data: modules });
  },
);

router.post(
  "/lessons",
  verifyToken,
  isAdmin,
  async (req: Request, res: Response) => {
    try {
      const { moduleId, title, content, order, xpReward } = req.body;
      const newLesson = await Lesson.create({
        moduleId,
        title,
        content,
        order,
        xpReward,
      });

      res.status(201).json({ status: "success", data: newLesson });
    } catch (err) {
      res
        .status(500)
        .json({ status: "error", message: "Failed to create lesson" });
    }
  },
);

export default router;
