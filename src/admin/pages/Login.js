import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { isAuthed, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (isAuthed) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await login(username, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Incorrect username or password.");
      setBusy(false);
    }
  };

  return (
    <div className="adm-login">
      <form className="adm-login__card" onSubmit={submit}>
        <img src="/logo.png" alt="ESWAMCU" />
        <h1>Sign In</h1>
        <p>Sign in to ESWAMCU</p>
        <label className="adm-field">
          <span className="adm-label">Username</span>
          <input className="adm-input" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus required autoComplete="username" />
        </label>
        <label className="adm-field">
          <span className="adm-label">Password</span>
          <input className="adm-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </label>
        {error && <div className="adm-error">{error}</div>}
        <button className="adm-btn adm-btn--primary adm-btn--block" type="submit" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <a href="/" className="adm-login__back">← Back to website</a>
      </form>
    </div>
  );
}

export default Login;
