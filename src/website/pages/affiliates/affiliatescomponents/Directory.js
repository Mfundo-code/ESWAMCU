import React, { useMemo, useState } from "react";
import { FaEnvelope, FaPhone, FaSearch, FaMapMarkerAlt, FaGlobe, FaHandshake } from "react-icons/fa";
import { affiliates } from "../../../../global/api";
import { useFetch } from "../../../../global/hooks";
import { Chips, EmptyState, Loading, Reveal, SectionHeading } from "../../../../global/ui";
import { REGIONS } from "../../../../global/siteConfig";
import { initials } from "../../../../global/hooks";

const REGION_OPTIONS = [{ value: "all", label: "All regions" }, ...REGIONS];

function Directory() {
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const { data, loading, error } = useFetch(() => affiliates.list(), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((a) => {
      if (region !== "all" && a.region !== region) return false;
      if (!q) return true;
      return [a.name, a.town, a.activities].some((v) => (v || "").toLowerCase().includes(q));
    });
  }, [data, region, query]);

  return (
    <section className="section section--white" id="directory">
      <div className="container">
        <SectionHeading
          eyebrow="Directory"
          title="Our affiliated cooperatives"
          lead="Multipurpose cooperatives across the four regions of Eswatini."
        />

        <div className="toolbar">
          <Chips options={REGION_OPTIONS} value={region} onChange={setRegion} />
          <label className="search">
            <FaSearch />
            <input
              className="input"
              type="search"
              placeholder="Search by name, town or activity"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search affiliates"
            />
          </label>
        </div>

        {loading ? (
          <Loading rows={3} />
        ) : error ? (
          <EmptyState title="Couldn't load the directory" text="Please check your connection and try again." />
        ) : visible.length === 0 ? (
          <EmptyState
            icon={<FaHandshake />}
            title={data.length === 0 ? "Directory coming soon" : "No matches"}
            text={
              data.length === 0
                ? "Affiliated cooperatives will be listed here shortly."
                : "Try a different region or search term."
            }
          />
        ) : (
          <div className="grid grid--3">
            {visible.map((a, i) => (
              <Reveal key={a.id} delay={(i % 3) * 0.05}>
                <article className="card card--hover affiliate">
                  <div className="affiliate__head">
                    <span className="affiliate__logo">
                      {a.logo ? <img src={a.logo} alt="" /> : initials(a.name)}
                    </span>
                    <div>
                      <h3>{a.name}</h3>
                      {a.region_display && <span className="tag">{a.region_display}</span>}
                    </div>
                  </div>
                  {a.activities && <p style={{ margin: 0 }}>{a.activities}</p>}
                  <div className="affiliate__meta">
                    {a.town && (
                      <span>
                        <FaMapMarkerAlt /> {a.town}
                      </span>
                    )}
                    {a.phone && (
                      <span>
                        <FaPhone /> {a.phone}
                      </span>
                    )}
                    {a.email && (
                      <span>
                        <FaEnvelope /> <a href={`mailto:${a.email}`}>{a.email}</a>
                      </span>
                    )}
                    {a.website_url && (
                      <span>
                        <FaGlobe />{" "}
                        <a href={a.website_url} target="_blank" rel="noopener noreferrer">
                          Website
                        </a>
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Directory;
