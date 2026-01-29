import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import './styles.css';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  if (!loggedIn)
    return (
      <div>
        <Register />
        <Login onLogin={() => setLoggedIn(true)} />
      </div>
    );

  return <Dashboard onLogout={() => setLoggedIn(false)} />;
}
