import React from "react";
import { useContact } from "../../../global/ContactContext";
import { services } from "../../../global/api";
import { useFetch } from "../../../global/hooks";
import { Loading, PageHero, Reveal } from "../../../global/ui";
import { SERVICE_ICONS, slugify } from "../../../global/icons";
import { SERVICES_FALLBACK } from "../../../global/siteConfig";

function WhatWeDo() {
  const { openContact } = useContact();
  const { data, loading } = useFetch(() => services.list(), []);
  const items = data.length > 0 ? data : SERVICES_FALLBACK;

  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="Practical support for cooperative growth"
        lead="Cooperative development, business support, agriculture, finance facilitation and property management."
        anchors={items.map((s) => ({ id: slugify(s.title), label: s.title }))}
      />

      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="container container--narrow">
          {loading ? (
            <Loading rows={2} />
          ) : (
            items.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon] || SERVICE_ICONS.general;
              return (
                <Reveal key={s.id} className="service-row">
                  <div className="service-row__num" id={slugify(s.title)} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h2>
                      <span className="icon-badge icon-badge--amber">
                        <Icon />
                      </span>
                      {s.title}
                    </h2>
                    <p>{s.description || s.summary}</p>
                  </div>
                </Reveal>
              );
            })
          )}

          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <button type="button" className="btn btn--primary" onClick={openContact}>
              Ask how we can support you
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhatWeDo;