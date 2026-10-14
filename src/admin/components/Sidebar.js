import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt } from "react-icons/fa";
import resourceConfig, { SIDEBAR_GROUPS } from "../config/resourceConfig";

function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`adm-sidebar${open ? " is-open" : ""}`}>
      <div className="adm-sidebar__brand">
        <img src="/logo.png" alt="ESWAMCU" />
        <span>Staff portal</span>
      </div>
      <nav>
        <NavLink to="/admin" end className="adm-navlink" onClick={onNavigate}>
          <FaTachometerAlt /> Dashboard
        </NavLink>
        {SIDEBAR_GROUPS.map((g) => (
          <div key={g.label} className="adm-navgroup">
            <p>{g.label}</p>
            {g.items.map((slug) => (
              <NavLink key={slug} to={`/admin/${slug}`} className="adm-navlink" onClick={onNavigate}>
                {resourceConfig[slug].title}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
