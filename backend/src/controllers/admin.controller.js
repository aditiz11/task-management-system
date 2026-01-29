const prisma = require("../config/db");

// Get all users (ADMIN only)
exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });
  res.json(users);
};

// Delete any task (ADMIN only)
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  await prisma.task.delete({ where: { id: parseInt(taskId) } });
  res.json({ message: "Task deleted" });
};
