import { useEffect, useState } from "react";
import {
  getTasks,
  getAllUsersWithTasks,
  createTask,
  updateTaskStatus,
} from "../api";

export default function Dashboard({ onLogout }) {
  const role = localStorage.getItem("role"); // "ADMIN" or "USER"
  const [tasks, setTasks] = useState([]); // current user's tasks
  const [users, setUsers] = useState([]); // other users (admin)
  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState(""); // for admin assignment

  // Load tasks for current user + all users if admin
  const loadTasks = async () => {
    const myTasks = await getTasks();
    setTasks(myTasks);

    if (role === "ADMIN") {
      const allUsers = await getAllUsersWithTasks();
      setUsers(allUsers.filter((u) => u.role !== "ADMIN")); // exclude self
    }
  };

  const handleStatusChange = async (id, status) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  const handleCreateTask = async () => {
    if (!title) return alert("Enter task title");

    let assignedUserId = null;
    if (role === "ADMIN") {
      assignedUserId = userId === "self" || !userId ? null : userId;
    }

    await createTask({ title, userId: assignedUserId });
    setTitle("");
    setUserId("");
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Function to return status class for coloring
  const statusClass = (status) => {
    if (status === "NOT_STARTED") return "status-NOT_STARTED";
    if (status === "IN_PROGRESS") return "status-IN_PROGRESS";
    if (status === "FINISHED") return "status-FINISHED";
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard ({role})</h2>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.clear();
          onLogout();
        }}
      >
        Logout
      </button>

      {/* ---------- My Tasks ---------- */}
      <section style={{ marginBottom: "40px" }}>
        <h3>My Tasks</h3>
        <div className="task-input-group">
          <input
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {role === "ADMIN" && (
            <select value={userId} onChange={(e) => setUserId(e.target.value)}>
              <option value="self">Assign to Self</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleCreateTask}>
            {role === "ADMIN" ? "Assign Task" : "Add Task"}
          </button>
        </div>

        <ul>
          {tasks.map((t) => (
            <li key={t.id}>
              <span>{t.title}</span>
              <select
                value={t.status}
                onChange={(e) => handleStatusChange(t.id, e.target.value)}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="FINISHED">Finished</option>
              </select>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Admin: Other Users Tasks (read-only colored badge) ---------- */}
      {role === "ADMIN" && (
        <section>
          <h3>Other Users' Tasks</h3>
          {users.map((u) => (
            <div key={u.id} style={{ marginBottom: "20px" }}>
              <h4>{u.name}</h4>
              <ul>
                {u.tasks.map((t) => (
                  <li key={t.id}>
                    <span>{t.title}</span>
                    <span className={`status-badge ${statusClass(t.status)}`}>
                      {t.status.replace("_", " ")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
