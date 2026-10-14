import React from "react";
import { BENEFITS } from "../../../../global/siteConfig";
import { BENEFIT_ICONS } from "../../../../global/icons";
import { Reveal, SectionHeading } from "../../../../global/ui";

function Benefits() {
  return (
    <section className="section" id="benefits">
      <div className="container">
        <SectionHeading
          eyebrow="Why affiliate"
          title="What your cooperative gains"
          lead="Affiliated multipurpose cooperatives benefit from the Union's representation, advisory services and networks."
        />
        <div className="grid grid--3">
          {BENEFITS.map((b, i) => {
            const Icon = BENEFIT_ICONS[b.icon] || BENEFIT_ICONS.network;
            return (
              <Reveal key={b.title} delay={(i % 3) * 0.06}>
                <article className="card card--hover" style={{ height: "100%" }}>
                  <span className="icon-badge icon-badge--indigo">
                    <Icon />
                  </span>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Benefits;
