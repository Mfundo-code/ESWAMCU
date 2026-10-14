import React from "react";
import { services } from "../../../../global/api";
import { useContact } from "../../../../global/ContactContext";
import { useFetch } from "../../../../global/hooks";
import { SERVICE_ICONS } from "../../../../global/icons";
import { SERVICES_FALLBACK } from "../../../../global/siteConfig";
import { Loading, Reveal, SectionHeading } from "../../../../global/ui";

function WhatWeDoSection() {
  const { openContact } = useContact();
  const { data, loading } = useFetch(() => services.list(), []);
  const items = data.length > 0 ? data : SERVICES_FALLBACK;

  return (
    <section className="section" id="what-we-do">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="Practical support for cooperative growth"
          lead="Cooperative development, business support, agriculture, finance facilitation and property management."
        />

        {loading ? (
          <Loading rows={2} />
        ) : (
          <div className="grid grid--3">
            {items.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon] || SERVICE_ICONS.general;
              return (
                <Reveal key={s.id} delay={(i % 3) * 0.06}>
                  <article className="card card--hover" style={{ height: "100%" }}>
                    <span className="icon-badge icon-badge--amber">
                      <Icon />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.summary || s.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}

        <p style={{ marginTop: "2rem" }}>
          <button type="button" className="btn btn--primary" onClick={openContact}>
            Ask how we can support you
          </button>
        </p>
      </div>
    </section>
  );
}

export default WhatWeDoSection;