import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Topbar({ onMenu }) {
  const { username, logout } = useAuth();
  return (
    <header className="adm-topbar">
      <button type="button" className="adm-iconbtn adm-menu" onClick={onMenu} aria-label="Open menu">
        <FaBars />
      </button>
      <Link to="/" className="adm-topbar__site">
        View website ↗
      </Link>
      <div className="adm-topbar__right">
        <span>{username || "Admin"}</span>
        <button type="button" className="adm-btn adm-btn--small" onClick={logout}>
          Log out
        </button>
      </div>
    </header>
  );
}

export default Topbar;
