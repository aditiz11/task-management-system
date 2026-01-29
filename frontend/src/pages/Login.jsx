import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await login({ email, password });
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role);
      onLogin();
    } else {
      alert("Login failed: " + res.message);
    }
  };

  return (
    <div className="form-container">
        <div style={{ marginBottom: "20px" }}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={submit}>Login</button>
        </div>
    </div>
    
  );
}
