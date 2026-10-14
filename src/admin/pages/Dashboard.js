import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelopeOpenText, FaHandshake, FaBriefcase, FaNewspaper, FaFileAlt, FaUsers,
} from "react-icons/fa";
import { contactMessages, membershipApplications, news, opportunityApplications, resources, affiliates } from "../../global/api";
import { useFetch } from "../../global/hooks";

const count = (fn) => () => fn({ page_size: 1 }).then((res) => ({ data: [{ n: res.data.count ?? (res.data.results || res.data).length }] }));

function Stat({ label, fetcher, to, icon: Icon, highlight }) {
  const { data, loading } = useFetch(count(fetcher), []);
  const n = loading ? "…" : data[0] ? data[0].n : "–";
  return (
    <Link to={to} className={`adm-stat${highlight && n > 0 ? " adm-stat--hot" : ""}`}>
      <span className="adm-stat__icon"><Icon /></span>
      <b>{n}</b>
      <span>{label}</span>
    </Link>
  );
}

function Dashboard() {
  return (
    <>
      <h1 className="adm-h1">Dashboard</h1>
      <p className="adm-sub">Waiting for attention</p>
      <div className="adm-stats">
        <Stat label="New contact messages" fetcher={(p) => contactMessages.list({ ...p, status: "new" })} to="/admin/contact-messages" icon={FaEnvelopeOpenText} highlight />
        <Stat label="New affiliate requests" fetcher={(p) => membershipApplications.list({ ...p, status: "new" })} to="/admin/membership-applications" icon={FaHandshake} highlight />
        <Stat label="New opportunity responses" fetcher={(p) => opportunityApplications.list({ ...p, status: "new" })} to="/admin/opportunity-applications" icon={FaBriefcase} highlight />
      </div>
      <p className="adm-sub" style={{ marginTop: "2rem" }}>On the website</p>
      <div className="adm-stats">
        <Stat label="Affiliates" fetcher={affiliates.list} to="/admin/affiliates" icon={FaUsers} />
        <Stat label="News posts" fetcher={news.list} to="/admin/news" icon={FaNewspaper} />
        <Stat label="Documents" fetcher={resources.list} to="/admin/resources" icon={FaFileAlt} />
      </div>
      <div className="adm-tip">
        Tip: all website content (leaders, affiliates, news, events, documents, projects, opportunities) is added from the menu on the left.
      </div>
    </>
  );
}

export default Dashboard;
