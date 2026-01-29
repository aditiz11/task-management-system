import prisma from "../config/db.js";

// USER or ADMIN creating task
export const createTask = async (req, res) => {
  const { title, userId } = req.body;
  const currentUser = req.user;

  try {
    const assignedUserId = userId ? Number(userId) : currentUser.id;


    const task = await prisma.task.create({
      data: {
        title,
        userId: assignedUserId,
      },
    });

    if (assignedUserId === currentUser.id) {
      console.log(`[TASK][CREATE] Task Created by User: ID ${task.id}, Title: "${task.title}", Assigned To: USER_ID ${currentUser.id}`);
    } else {
      console.log(`[TASK][CREATE] Task Created by Admin: ID ${task.id}, Title: "${task.title}", Assigned To: USER_ID ${assignedUserId}`);
    }

    res.json(task);
  } catch (err) {
    console.error(`[TASK][ERROR] Create task failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Task creation failed" });
  }
};

// GET tasks for current user
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { id: "asc" },
    });
    console.log(`[TASK][FETCH] Tasks fetched for User ID ${req.user.id}`);
    res.json(tasks);
  } catch (err) {
    console.error(`[TASK][ERROR] Fetch tasks failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Failed to fetch tasks" });
  }
};

// Admin: fetch all users with their tasks
export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { role: "USER" },
      include: { tasks: true },
    });
    console.log(`[TASK][FETCH] Admin fetched all users with tasks`);
    res.json(users);
  } catch (err) {
    console.error(`[TASK][ERROR] Fetch all users tasks failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Failed to fetch users" });
  }
};

// PATCH task status
export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    console.log(`[TASK][UPDATE] Task Status Updated: ID ${task.id} → ${status}`);
    res.json(task);
  } catch (err) {
    console.error(`[TASK][ERROR] Update task status failed: ${err.message}`);
    res.status(500).json({ message: err.message || "Failed to update task" });
  }
};
