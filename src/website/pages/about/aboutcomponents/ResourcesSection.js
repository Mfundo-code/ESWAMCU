import React, { useMemo, useState } from "react";
import { FaFileAlt } from "react-icons/fa";
import { resources } from "../../../../global/api";
import { useFetch } from "../../../../global/hooks";
import FileViewerLink, { FileDownloadButton } from "../../../../global/FileViewerLink";
import { Chips, EmptyState, Loading, Reveal, SectionHeading } from "../../../../global/ui";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "report", label: "Reports" },
  { value: "form", label: "Forms" },
  { value: "policy", label: "Policies" },
  { value: "publication", label: "Publications" },
];

function ResourcesSection() {
  const [category, setCategory] = useState("all");
  const { data, loading, error } = useFetch(() => resources.list(), []);

  const visible = useMemo(() => {
    return data.filter((r) => category === "all" || r.category === category);
  }, [data, category]);

  return (
    <section className="section section--white" id="resources">
      <div className="container container--narrow">
        <SectionHeading eyebrow="Resources" title="Reports, forms and policies" lead="Download or read ESWAMCU documents online." />
        <Chips options={CATEGORIES} value={category} onChange={setCategory} />

        {loading ? (
          <Loading rows={3} />
        ) : error ? (
          <EmptyState title="Couldn't load documents" text="Please check your connection and try again." />
        ) : visible.length === 0 ? (
          <EmptyState icon={<FaFileAlt />} title="No documents found" text="Documents will be added here as they are published." />
        ) : (
          <div className="stack">
            {visible.map((r, i) => (
              <Reveal key={r.id} delay={(i % 5) * 0.04}>
                <div className="doc">
                  <span className="doc__icon">
                    <FaFileAlt />
                  </span>
                  <div className="doc__text">
                    <h3>{r.title}</h3>
                    <p>
                      {r.category_display}
                      {r.year ? ` · ${r.year}` : ""}
                      {r.description ? ` · ${r.description}` : ""}
                    </p>
                  </div>
                  <div className="doc__actions">
                    <FileViewerLink file={r.file} className="btn btn--primary btn--small">
                      View
                    </FileViewerLink>
                    <FileDownloadButton file={r.file} className="btn btn--outline btn--small">
                      Download
                    </FileDownloadButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResourcesSection;