import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Curve, Waves } from "../../../../global/ui";
import { ORG } from "../../../../global/siteConfig";

function Hero() {
  return (
    <section
      className="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        background: "#102b35",
      }}
    >
      <img
        src="/Hero.png"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(90deg, rgba(8,24,32,0.82) 0%, rgba(8,24,32,0.55) 48%, rgba(8,24,32,0.08) 100%)",
        }}
      />

      {/* Waves restored to their original position and size */}
      <Waves className="hero__waves" />

      <div
        className="container hero__inner"
        style={{
          position: "relative",
          zIndex: 3,
          display: "block",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          <h1 className="hero__title">
            Leading multipurpose <em>cooperatives</em> to drive inclusive
            sustainable economic growth
          </h1>

          <p className="hero__lead">
            ESWAMCU represents, strengthens and connects multipurpose
            cooperatives across Eswatini — so members can govern better,
            grow their businesses and improve their livelihoods.
          </p>

          <div className="hero__actions">
            <Link to="/affiliates#join" className="btn btn--amber">
              Become an affiliate <FaArrowRight size={13} />
            </Link>

            <Link to="/about#what-we-do" className="btn btn--ghost-light">
              What we do
            </Link>
          </div>

          <p className="hero__motto">
            &ldquo;{ORG.motto}&rdquo;
          </p>
        </div>
      </div>

      <div
        className="hero__curve"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 4,
          pointerEvents: "none",
        }}
      >
        <Curve fill="#f8f8f3" />
      </div>
    </section>
  );
}

export default Hero;