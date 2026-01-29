import { useState } from "react";
import { register } from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async () => {
    const res = await register(form);
    if (res.id) alert("Registered successfully. Please login.");
    else alert("Registration failed: " + res.message);
  };

  return (
    <div className="form-container">
            <div style={{ marginBottom: "20px" }}>
        <h2>Register</h2>
        <input
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={submit}>Register</button>
        </div>
    </div>
    
  );
}
