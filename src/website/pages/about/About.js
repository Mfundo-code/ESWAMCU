import React, { useState } from "react";
import { PageHero, Reveal, SectionHeading } from "../../../global/ui";
import WhatWeDoSection from "./aboutcomponents/WhatWeDoSection";
import LeadershipSection from "./aboutcomponents/LeadershipSection";
import ResourcesSection from "./aboutcomponents/ResourcesSection";
import {
  ABOUT,
  OBJECTIVES,
  VALUES,
  VALUES_INTRO,
} from "../../../global/siteConfig";

const anchors = [
  { id: "background", label: "Background" },
  { id: "vision-mission", label: "Vision & Mission" },
  { id: "what-we-do", label: "What We Do" },
  { id: "objectives", label: "Objectives" },
  { id: "values", label: "Core Values" },
  { id: "leadership", label: "Leadership" },
  { id: "resources", label: "Resources" },
];

function About() {
  const [expanded, setExpanded] = useState(false);
  const [objectivesOpen, setObjectivesOpen] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A collective voice for multipurpose cooperatives"
        lead="Established in 2006 as the apex body for the multipurpose cooperative sector in Eswatini."
        anchors={anchors}
      />

      {/* Background — forest green */}
      <section
        className="section about-background-section"
        id="background"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Background"
            title="Who we are"
          />

          <Reveal className="prose about-background__content">
            {ABOUT.background.map((p, i) => (
              <p key={p.slice(0, 24)} hidden={i > 0 && !expanded}>
                {p}
              </p>
            ))}

            <button
              type="button"
              className="btn about-read-button"
              aria-expanded={expanded}
              onClick={() => {
                if (expanded) {
                  document
                    .getElementById("background")
                    ?.scrollIntoView({ behavior: "smooth" });
                }

                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </Reveal>
        </div>
      </section>

      {/* Vision and Mission — existing design preserved */}
      <section
        className="section section--white"
        id="vision-mission"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Direction"
            title="Our vision and mission"
          />

          <div className="vm">
            <Reveal className="vm__card vm__card--vision">
              <h3>Vision</h3>
              <p>{ABOUT.vision}</p>
            </Reveal>

            <Reveal delay={0.1} className="vm__card vm__card--mission">
              <h3>Mission</h3>
              <p>{ABOUT.mission}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <WhatWeDoSection />

      {/* Objectives — navy blue */}
      <section
        className="section about-objectives-section"
        id="objectives"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Mandate & objectives"
            title="What ESWAMCU aims to do"
            lead="Twelve objectives guide the Union's work with its affiliated cooperatives."
          />

          <div
            hidden={!objectivesOpen}
            id="objectives-list"
          >
            <Reveal as="ol" className="objectives">
              {OBJECTIVES.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </Reveal>
          </div>

          <button
            type="button"
            className="btn objectives-view-button"
            aria-expanded={objectivesOpen}
            aria-controls="objectives-list"
            onClick={() => {
              if (objectivesOpen) {
                document
                  .getElementById("objectives")
                  ?.scrollIntoView({ behavior: "smooth" });
              }

              setObjectivesOpen(!objectivesOpen);
            }}
          >
            {objectivesOpen
              ? "Hide objectives"
              : `View all ${OBJECTIVES.length} objectives`}
          </button>
        </div>
      </section>

      {/* Core Values — existing design preserved */}
      <section className="section" id="values">
        <div className="container">
          <SectionHeading
            eyebrow="Core values"
            title="The pillars of service excellence"
            lead={VALUES_INTRO}
          />

          <div className="values">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.06}
                className="value"
              >
                <h3>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {v.title}
                </h3>

                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <LeadershipSection />
      <ResourcesSection />

      {/* Section-specific styling */}
      <style>{`
        /* =========================================
           BACKGROUND — DOMINANT FOREST GREEN
        ========================================= */

        .section.about-background-section {
          position: relative;
          padding-top: 85px;
          padding-bottom: 90px;
          background: #214631;
          color: #ffffff;
          border-top: 5px solid #c9a227;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .about-background-section .eyebrow {
          color: #f1d66d !important;
        }

        .about-background-section h2 {
          color: #ffffff !important;
        }

        .about-background-section .about-background__content,
        .about-background-section .about-background__content p {
          color: #f4f7f3 !important;
        }

        .about-background-section .about-background__content p {
          font-size: 15px;
          line-height: 1.9;
        }

        .about-background-section .about-background__content p[hidden] {
          display: none !important;
        }

        /* Read more / Show less button */

        .about-read-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          margin-top: 20px;
          padding: 12px 27px;
          border: 2px solid #c9a227;
          border-radius: 999px;
          background: #c9a227;
          color: #214631 !important;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .about-read-button:hover {
          transform: translateY(-2px);
          background: #f1d66d;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.14);
        }

        /* =========================================
           OBJECTIVES — NAVY BLUE
        ========================================= */

        .section.about-objectives-section {
          position: relative;
          padding-top: 85px;
          padding-bottom: 90px;
          background: #173f5f;
          color: #ffffff;
          border-top: 5px solid #c9a227;
        }

        .about-objectives-section .eyebrow {
          color: #f1d66d !important;
        }

        .about-objectives-section h2 {
          color: #ffffff !important;
        }

        .about-objectives-section p {
          color: #edf4fa !important;
        }

        /* Open objectives list */

        .about-objectives-section #objectives-list:not([hidden]) {
          display: block !important;
          margin-top: 30px;
        }

        .about-objectives-section #objectives-list ol {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin: 0;
          padding-left: 25px;
          color: #ffffff;
        }

        .about-objectives-section #objectives-list li {
          padding: 17px 19px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff !important;
          font-size: 14px;
          line-height: 1.75;
          overflow-wrap: anywhere;
        }

        /* View all objectives button */

        .objectives-view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 54px;
          margin-top: 26px;
          padding: 12px 27px;
          border: 2px solid #c9a227;
          border-radius: 999px;
          background: #c9a227;
          color: #173f5f !important;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .objectives-view-button:hover {
          transform: translateY(-2px);
          background: #f1d66d;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.14);
        }

        /* =========================================
           RESPONSIVE STYLING
        ========================================= */

        @media (max-width: 768px) {
          .section.about-background-section,
          .section.about-objectives-section {
            padding-top: 60px;
            padding-bottom: 65px;
          }

          .about-background-section .about-background__content p {
            font-size: 14px;
          }

          .about-objectives-section #objectives-list ol {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .section.about-background-section,
          .section.about-objectives-section {
            padding-top: 48px;
            padding-bottom: 52px;
          }

          .about-read-button,
          .objectives-view-button {
            width: 100%;
            box-sizing: border-box;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-read-button,
          .objectives-view-button {
            transition: none;
          }

          .about-read-button:hover,
          .objectives-view-button:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

export default About;