import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";
import {
  createTask,
  getTasks,
  updateTaskStatus,
  getAllUsersWithTasks,
} from "../controllers/task.controller.js";

const router = express.Router();

// Create task (user creates for self, admin can assign to any user)
router.post("/", auth, createTask);

// Get tasks for current user
router.get("/", auth, getTasks);

// Update task status (only for own tasks)
router.patch("/:id/status", auth, updateTaskStatus);

// Admin only: get all users + tasks
router.get("/admin/tasks", auth, isAdmin, getAllUsersWithTasks);

export default router;
