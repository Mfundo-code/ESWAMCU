import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { Reveal } from "../../../../global/ui";

const pillars = [
  {
    title: "Representation",
    text: "One voice for cooperatives across Eswatini.",
    to: "/about",
  },
  {
    title: "Capacity Building",
    text: "Stronger leaders. Stronger cooperatives.",
    to: "/what-we-do#cooperative-development",
  },
  {
    title: "Resources & Markets",
    text: "Connecting members to markets and opportunities.",
    to: "/what-we-do#finance-facilitation",
  },
];

function Welcome() {
  return (
    <section className="welcome-modern">
      {/* Three cards overlapping the hero */}
      <div className="welcome-cards-container">
        <Reveal className="welcome-cards">
          {pillars.map((item) => (
            <article className="welcome-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>

              <Link to={item.to} className="welcome-card__link">
                Explore
                <span className="welcome-card__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              </Link>
            </article>
          ))}
        </Reveal>
      </div>

      {/* Full-width welcome section */}
      <div className="welcome-intro">
        <div className="welcome-intro__inner">
          <Reveal className="welcome-intro__heading">
            <span className="welcome-eyebrow">
              WELCOME TO ESWAMCU
            </span>

            <h2>
              Better together.
              <span>Stronger through cooperation.</span>
            </h2>
          </Reveal>

          <Reveal className="welcome-intro__content" delay={0.12}>
            <Link to="/about" className="welcome-about-button">
              <span>About ESWAMCU</span>

              <span className="welcome-about-button__icon">
                <FaArrowRight size={17} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>

      <style>{`
        .welcome-modern {
          position: relative;
          z-index: 5;
        }

        /* Cards at the bottom of the hero */
        .welcome-cards-container {
          position: relative;
          z-index: 2;
          max-width: 1100px;
          margin: -48px auto 0;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .welcome-cards {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .welcome-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          padding: 29px 25px 26px;
          background: #F2F2EE;
          border-top: 4px solid #c9a227;
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(27, 61, 47, 0.13);
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease;
        }

        .welcome-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 36px rgba(27, 61, 47, 0.17);
        }

        .welcome-card h3 {
          margin: 0 0 9px;
          color: #244a35;
          font-size: 19px;
          font-weight: 750;
          line-height: 1.4;
        }

        .welcome-card p {
          margin: 0;
          color: #555c55;
          font-size: 14px;
          line-height: 1.65;
        }

        .welcome-card__link {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 19px;
          padding: 9px 15px;
          border-radius: 999px;
          background: #244a35;
          color: #f5d976;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-decoration: none;
          text-transform: uppercase;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .welcome-card__link:hover {
          background: #c9a227;
          color: #244a35;
        }

        .welcome-card__dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
        }

        .welcome-card__dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: currentColor;
          animation: welcome-dot-bounce 1.3s ease-in-out infinite;
        }

        .welcome-card__dots span:nth-child(2) {
          animation-delay: 0.15s;
        }

        .welcome-card__dots span:nth-child(3) {
          animation-delay: 0.3s;
        }

        @keyframes welcome-dot-bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.5;
          }

          30% {
            transform: translateY(-3px);
            opacity: 1;
          }
        }

        /* Full-width dark green section below the cards */
        .welcome-intro {
          width: 100%;
          box-sizing: border-box;
          padding: 85px 20px 90px;
          background: #214631;
          border-top: 5px solid #c9a227;
        }

        .welcome-intro__inner {
          display: grid;
          grid-template-columns: 1fr 0.8fr;
          align-items: center;
          gap: 70px;
          max-width: 1060px;
          margin: 0 auto;
        }

        .welcome-eyebrow {
          display: inline-block;
          margin-bottom: 15px;
          color: #f1d66d;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.15em;
        }

        .welcome-intro__heading h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(29px, 3.5vw, 43px);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .welcome-intro__heading h2 span {
          display: block;
          margin-top: 4px;
          color: #f1d66d;
        }

        /* Button aligned to the right edge of Resources & Markets */
        .welcome-intro__content {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: 0;
        }

        .welcome-about-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 35px;
          min-width: 260px;
          box-sizing: border-box;
          padding: 12px 13px 12px 25px;
          border: 2px solid #c9a227;
          border-radius: 999px;
          background: #c9a227;
          color: #214631;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
          animation: welcome-button-pulse 2.5s ease-in-out infinite;
          transition:
            background 0.25s ease,
            color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .welcome-about-button__icon {
          display: grid;
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 50%;
          background: #214631;
          color: #f1d66d;
          transition:
            transform 0.25s ease,
            background 0.25s ease,
            color 0.25s ease;
        }

        .welcome-about-button:hover {
          background: #f2f2ee;
          border-color: #f2f2ee;
          color: #214631;
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
        }

        .welcome-about-button:hover .welcome-about-button__icon {
          background: #214631;
          color: #f1d66d;
          transform: translateX(4px);
        }

        @keyframes welcome-button-pulse {
          0%, 100% {
            box-shadow: 0 8px 22px rgba(201, 162, 39, 0.16);
          }

          50% {
            box-shadow: 0 8px 30px rgba(201, 162, 39, 0.42);
          }
        }

        /* Tablet */
        @media (max-width: 800px) {
          .welcome-cards {
            gap: 15px;
          }

          .welcome-card {
            padding: 24px 18px;
          }

          .welcome-card h3 {
            font-size: 16px;
          }

          .welcome-card p {
            font-size: 13px;
          }

          .welcome-intro__inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .welcome-intro {
            padding: 60px 24px 65px;
          }

          .welcome-intro__content {
            justify-content: flex-start;
          }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .welcome-cards-container {
            margin-top: -25px;
            padding: 0 16px;
          }

          .welcome-cards {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .welcome-card {
            padding: 24px 21px;
          }

          .welcome-card h3 {
            font-size: 18px;
          }

          .welcome-card__link {
            margin-top: 14px;
          }

          .welcome-intro {
            padding: 45px 20px 50px;
          }

          .welcome-intro__heading h2 {
            font-size: 31px;
          }

          .welcome-about-button {
            width: 100%;
            min-width: 0;
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-card,
          .welcome-card__link,
          .welcome-about-button,
          .welcome-about-button__icon {
            animation: none;
            transition: none;
          }

          .welcome-card__dots span {
            animation: none;
          }

          .welcome-card:hover,
          .welcome-about-button:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default Welcome;