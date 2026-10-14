import React, { useState } from "react";
import { FaSeedling } from "react-icons/fa";
import { projects } from "../../../global/api";
import { formatDate, useFetch } from "../../../global/hooks";
import { Chips, EmptyState, Loading, Modal, PageHero, Reveal } from "../../../global/ui";

const CATEGORIES = [
  { value: "all", label: "All projects" },
  { value: "agriculture", label: "Agriculture" },
  { value: "financing", label: "Financing" },
  { value: "other", label: "Other" },
];

function Projects() {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch(
    () => projects.list(category === "all" ? {} : { category }),
    [category]
  );

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Programmes that grow cooperatives"
        lead="Agriculture, financing and other initiatives delivered with and for our affiliates."
      />
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Chips options={CATEGORIES} value={category} onChange={setCategory} />
          {loading ? (
            <Loading rows={3} />
          ) : error ? (
            <EmptyState title="Couldn't load projects" text="Please check your connection and try again." />
          ) : data.length === 0 ? (
            <EmptyState icon={<FaSeedling />} title="No projects to show yet" text="Projects will be published here soon." />
          ) : (
            <div className="grid grid--3">
              {data.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 0.06}>
                  <article className="card card--hover media-card">
                    <div className="media-card__img">{p.image ? <img src={p.image} alt={p.title} /> : <FaSeedling />}</div>
                    <div className="media-card__body">
                      <div className="meta-line">
                        <span className="tag">{p.category_display}</span>
                        <span className="tag tag--amber">{p.status_display}</span>
                      </div>
                      <h3>{p.title}</h3>
                      {p.summary && <p>{p.summary}</p>}
                      <div className="media-card__foot">
                        <button type="button" className="btn btn--outline btn--small" onClick={() => setSelected(p)}>
                          Read more
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          {selected.image && <img src={selected.image} alt={selected.title} style={{ width: "100%", borderRadius: 14, marginBottom: "1rem" }} />}
          <div className="meta-line" style={{ marginBottom: "0.6rem" }}>
            <span className="tag">{selected.category_display}</span>
            <span className="tag tag--amber">{selected.status_display}</span>
            {selected.start_date && <span>Started {formatDate(selected.start_date)}</span>}
          </div>
          <h3>{selected.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{selected.description || selected.summary}</p>
        </Modal>
      )}
    </>
  );
}

export default Projects;
