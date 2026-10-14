import React, { useState } from "react";
import { FaBriefcase } from "react-icons/fa";
import { opportunities } from "../../../global/api";
import { formatDate, useFetch } from "../../../global/hooks";
import FileViewerLink from "../../../global/FileViewerLink";
import { Chips, EmptyState, Loading, Modal, PageHero, Reveal } from "../../../global/ui";
import ApplyForm from "./opportunitiescomponents/ApplyForm";

const KINDS = [
  { value: "all", label: "All" },
  { value: "vacancy", label: "Vacancies" },
  { value: "tender", label: "Tenders" },
  { value: "partnership", label: "Partnerships" },
  { value: "business", label: "Business" },
];

function Opportunities() {
  const [kind, setKind] = useState("all");
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch(
    () => opportunities.list(kind === "all" ? {} : { kind }),
    [kind]
  );

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Work, tenders and partnerships"
        lead="Current vacancies, tenders and business opportunities with ESWAMCU."
      />
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <Chips options={KINDS} value={kind} onChange={setKind} />
          {loading ? (
            <Loading rows={3} />
          ) : error ? (
            <EmptyState title="Couldn't load opportunities" text="Please check your connection and try again." />
          ) : data.length === 0 ? (
            <EmptyState icon={<FaBriefcase />} title="No open opportunities" text="Please check back soon." />
          ) : (
            <div className="grid grid--3">
              {data.map((o, i) => (
                <Reveal key={o.id} delay={(i % 3) * 0.06}>
                  <article className="card card--hover" style={{ height: "100%", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <div className="meta-line">
                      <span className="tag tag--amber">{o.kind_display}</span>
                      {o.closing_date && <span>Closes {formatDate(o.closing_date)}</span>}
                    </div>
                    <h3 style={{ margin: 0 }}>{o.title}</h3>
                    {o.summary && <p style={{ margin: 0 }}>{o.summary}</p>}
                    <button
                      type="button"
                      className="btn btn--outline btn--small"
                      style={{ marginTop: "auto", alignSelf: "flex-start" }}
                      onClick={() => setSelected(o)}
                    >
                      View &amp; respond
                    </button>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div className="meta-line" style={{ marginBottom: "0.6rem" }}>
            <span className="tag tag--amber">{selected.kind_display}</span>
            {selected.closing_date && <span>Closes {formatDate(selected.closing_date)}</span>}
          </div>
          <h3>{selected.title}</h3>
          {selected.description && <p style={{ whiteSpace: "pre-wrap" }}>{selected.description}</p>}
          {selected.requirements && (
            <>
              <h4>Requirements</h4>
              <p style={{ whiteSpace: "pre-wrap" }}>{selected.requirements}</p>
            </>
          )}
          {selected.file && (
            <FileViewerLink file={selected.file} className="btn btn--outline btn--small">
              View document
            </FileViewerLink>
          )}
          <ApplyForm opportunity={selected} />
        </Modal>
      )}
    </>
  );
}

export default Opportunities;
