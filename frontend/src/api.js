const API_URL = "http://localhost:5000/api/v1";
const getToken = () => localStorage.getItem("token");

// ---------- AUTH ----------
export const register = async (data) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// ---------- TASKS ----------
// Get current user's tasks
export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};

// Create task (user creates for self, admin can create for any user)
export const createTask = async ({ title, userId }) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, userId }),
  });
  return res.json();
};

// Update task status
export const updateTaskStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/tasks/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// Admin: get all users + tasks
export const getAllUsersWithTasks = async () => {
  const res = await fetch(`${API_URL}/tasks/admin/tasks`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.json();
};
