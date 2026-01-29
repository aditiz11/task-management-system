import prisma from "../config/db.js";

// Create task (admin or user)
export const createTask = async (req, res) => {
  try {
    const { title, userId } = req.body;
    // If userId is null or not provided, assign task to current user
    const assignedUserId = userId ? parseInt(userId) : req.user.id;

    const task = await prisma.task.create({
      data: {
        title,
        userId: assignedUserId,
      },
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Task creation failed" });
  }
};


// Get tasks for current user
export const getTasks = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
    });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// Update task status (only for own tasks)
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await prisma.task.findUnique({ where: { id: parseInt(id) } });
    if (!task || task.userId !== req.user.id) {
      return res.status(403).json({ message: "Not allowed to update this task" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Admin: Get all users with tasks
export const getAllUsersWithTasks = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true },
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
