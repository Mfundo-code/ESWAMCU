import React, { useState } from "react";
import { FaNewspaper } from "react-icons/fa";
import { news } from "../../../../global/api";
import { formatDate, useFetch } from "../../../../global/hooks";
import FileViewerLink from "../../../../global/FileViewerLink";
import { Chips, EmptyState, Loading, Modal, Reveal, SectionHeading } from "../../../../global/ui";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "announcement", label: "Announcements" },
];

function News() {
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch(
    () => news.list(category === "all" ? {} : { category }),
    [category]
  );

  return (
    <section className="section" id="news">
      <div className="container">
        <SectionHeading eyebrow="News" title="News & announcements" />
        <Chips options={CATEGORIES} value={category} onChange={setCategory} />
        {loading ? (
          <Loading rows={3} />
        ) : error ? (
          <EmptyState title="Couldn't load news" text="Please check your connection and try again." />
        ) : data.length === 0 ? (
          <EmptyState icon={<FaNewspaper />} title="No news yet" text="Stories and announcements will appear here." />
        ) : (
          <div className="grid grid--3">
            {data.map((n, i) => (
              <Reveal key={n.id} delay={(i % 3) * 0.06}>
                <article className="card card--hover media-card">
                  <div className="media-card__img">{n.image ? <img src={n.image} alt={n.title} /> : <FaNewspaper />}</div>
                  <div className="media-card__body">
                    <div className="meta-line">
                      <span className="tag">{n.category_display}</span>
                      <span>{formatDate(n.published_at)}</span>
                    </div>
                    <h3>{n.title}</h3>
                    {n.summary && <p>{n.summary}</p>}
                    <div className="media-card__foot">
                      <button type="button" className="btn btn--outline btn--small" onClick={() => setSelected(n)}>
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

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          {selected.image && <img src={selected.image} alt={selected.title} style={{ width: "100%", borderRadius: 14, marginBottom: "1rem" }} />}
          <div className="meta-line" style={{ marginBottom: "0.6rem" }}>
            <span className="tag">{selected.category_display}</span>
            <span>{formatDate(selected.published_at)}</span>
          </div>
          <h3>{selected.title}</h3>
          <p style={{ whiteSpace: "pre-wrap" }}>{selected.body || selected.summary}</p>
          {selected.file && (
            <FileViewerLink file={selected.file} className="btn btn--primary btn--small">
              View attachment
            </FileViewerLink>
          )}
        </Modal>
      )}
    </section>
  );
}

export default News;
