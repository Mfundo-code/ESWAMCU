import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { leadership } from "../../../../global/api";
import { initials, useFetch } from "../../../../global/hooks";
import { Chips, EmptyState, Loading, Modal, Reveal, SectionHeading } from "../../../../global/ui";

const CATEGORIES = [
  { value: "board", label: "Board of Directors" },
  { value: "management", label: "Management" },
  { value: "governance", label: "Governance" },
];

const BLURB = {
  board: "The directors who guide ESWAMCU's strategy on behalf of its affiliated cooperatives.",
  management: "The team that runs ESWAMCU's programmes and services day to day.",
  governance: "The structures and office-bearers that keep ESWAMCU accountable to its members.",
};

function LeadershipSection() {
  const [category, setCategory] = useState("board");
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch(() => leadership.list({ category }), [category]);

  return (
    <section className="section" id="leadership">
      <div className="container">
        <SectionHeading
          eyebrow="Leadership"
          title="The people guiding ESWAMCU"
          lead="Meet the board, management and governance structures that lead the Union."
        />
        <Chips options={CATEGORIES} value={category} onChange={setCategory} />
        <p style={{ color: "var(--muted)", marginTop: "-0.8rem", marginBottom: "2rem" }}>{BLURB[category]}</p>

        {loading ? (
          <Loading rows={3} />
        ) : error ? (
          <EmptyState title="Couldn't load this list" text="Please check your connection and try again." />
        ) : data.length === 0 ? (
          <EmptyState icon={<FaUserTie />} title="Profiles coming soon" text="We're preparing this section. Please check back shortly." />
        ) : (
          <div className="grid grid--4">
            {data.map((m, i) => (
              <Reveal key={m.id} delay={(i % 4) * 0.06}>
                <article className="card card--hover person">
                  <div className="person__photo">
                    {m.image ? <img src={m.image} alt={m.name} /> : <span className="person__initials">{initials(m.name)}</span>}
                  </div>
                  <div className="person__body">
                    <h3>{m.name}</h3>
                    <span className="person__role">{m.position}</span>
                    {m.bio && (
                      <button type="button" className="btn btn--outline btn--small" onClick={() => setSelected(m)}>
                        View profile
                      </button>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="modal__person">
            {selected.image ? (
              <img src={selected.image} alt={selected.name} />
            ) : (
              <span className="person__initials">{initials(selected.name)}</span>
            )}
            <div style={{ flex: "1 1 240px" }}>
              <h3 style={{ marginBottom: "0.2rem" }}>{selected.name}</h3>
              <span className="person__role">{selected.position}</span>
              <p style={{ color: "var(--muted)", whiteSpace: "pre-wrap" }}>{selected.bio}</p>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default LeadershipSection;