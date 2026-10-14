import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { services } from "../../../../global/api";
import { useFetch } from "../../../../global/hooks";
import { Reveal } from "../../../../global/ui";
import { SERVICES_FALLBACK } from "../../../../global/siteConfig";

function ServicesTeaser() {
  const { data, loading } = useFetch(() => services.list(), []);
  const items = !loading && data.length > 0 ? data : SERVICES_FALLBACK;

  const featured = items[0];
  const remainingServices = items.slice(1);

  return (
    <section className="services-showcase">
      <div className="services-showcase__container">
        <div className="services-heading">
          <Reveal className="services-heading__main">
            <h2>
              Built for cooperatives.
              <span>Designed for growth.</span>
            </h2>
          </Reveal>

          <Reveal className="services-heading__side" delay={0.1}>
            <Link to="/about#what-we-do" className="services-pill">
              <span>Explore all services</span>
              <span className="services-pill__icon">
                <FaArrowRight />
              </span>
            </Link>
          </Reveal>
        </div>

        {featured && (
          <div className="services-mosaic">
            <Reveal className="services-feature-wrap">
              <Link
                to="/about#what-we-do"
                className="services-feature"
                aria-label={`Explore ${featured.title}`}
              >
                <div className="services-feature__main">
                  <span className="services-feature__eyebrow">
                    OUR SERVICES
                  </span>

                  <h3>{featured.title}</h3>

                  <p>
                    {featured.summary || featured.description}
                  </p>
                </div>

                <div className="services-feature__bottom">
                  <span className="services-pill services-pill--gold">
                    <span>Explore service</span>
                    <span className="services-pill__icon">
                      <FaArrowRight />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>

            {remainingServices.map((service, index) => (
              <Reveal
                key={service.id || service.title}
                className="services-tile-wrap"
                delay={(index + 1) * 0.06}
              >
                <Link
                  to="/about#what-we-do"
                  className="services-tile"
                >
                  <div className="services-tile__top">
                    <span className="services-tile__arrow">
                      <FaArrowRight size={16} />
                    </span>
                  </div>

                  <div className="services-tile__main">
                    <h3>{service.title}</h3>

                    <p>
                      {service.summary || service.description}
                    </p>
                  </div>

                  <span className="services-tile__line" />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .services-showcase {
          padding: 75px 0 85px;
          background: #f5f4ed;
          color: #244a35;
        }

        .services-showcase__container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px;
          box-sizing: border-box;
        }

        .services-heading {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 30px;
          margin-bottom: 35px;
        }

        .services-heading__main h2 {
          max-width: 650px;
          margin: 0;
          color: #214631;
          font-size: clamp(34px, 4vw, 49px);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -1.5px;
        }

        .services-heading__main h2 span {
          display: block;
          color: #947725;
        }

        /* The two main pill buttons */
        .services-pill {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 22px;
          min-height: 60px;
          padding: 7px 8px 7px 24px;
          border: 2px solid #214631;
          border-radius: 999px;
          background: #214631;
          color: #f5d976;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
          box-sizing: border-box;
          transition:
            background 0.22s ease,
            color 0.22s ease,
            transform 0.22s ease;
        }

        .services-pill__icon {
          display: grid;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 50%;
          background: #c9a227;
          color: #214631;
          transition: transform 0.22s ease;
        }

        .services-pill:hover {
          transform: translateY(-2px);
          background: #173f5f;
          border-color: #173f5f;
          color: #ffffff;
        }

        .services-pill:hover .services-pill__icon {
          transform: translateX(3px);
        }

        .services-pill--gold {
          width: 100%;
          min-height: 70px;
          padding: 8px 9px 8px 27px;
          border-color: #c9a227;
          background: #c9a227;
          color: #214631;
          font-size: 15px;
        }

        .services-pill--gold .services-pill__icon {
          width: 50px;
          height: 50px;
          background: #214631;
          color: #f5d976;
        }

        .services-pill--gold:hover {
          background: #f1d66d;
          border-color: #f1d66d;
          color: #214631;
        }

        /* Featured service and smaller cards */
        .services-mosaic {
          display: grid;
          grid-template-columns: 1.08fr 1fr 1fr;
          grid-auto-rows: minmax(205px, auto);
          gap: 17px;
        }

        .services-feature-wrap {
          grid-row: span 2;
          min-width: 0;
          min-height: 100%;
        }

        .services-feature {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 425px;
          box-sizing: border-box;
          padding: 30px;
          overflow: hidden;
          border-radius: 15px;
          background: #214631;
          color: #ffffff;
          text-decoration: none;
          transition: background 0.22s ease;
        }

        .services-feature:hover {
          background: #193b29;
        }

        .services-feature__main {
          padding: 28px 0;
          margin: auto 0;
        }

        .services-feature__eyebrow {
          display: inline-block;
          margin-bottom: 16px;
          color: #f1d66d;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.13em;
        }

        .services-feature__main h3 {
          margin: 0 0 15px;
          color: #ffffff;
          font-size: clamp(27px, 2.6vw, 36px);
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.7px;
        }

        .services-feature__main p {
          max-width: 310px;
          margin: 0;
          color: #dce7dd;
          font-size: 13px;
          line-height: 1.85;
        }

        .services-feature__bottom {
          display: flex;
          width: 100%;
          padding-top: 20px;
        }

        .services-feature__bottom .services-pill {
          flex: 1;
        }

        /* Smaller cards retain their circular arrows */
        .services-tile-wrap {
          min-width: 0;
          min-height: 0;
        }

        .services-tile {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          height: 100%;
          min-height: 205px;
          box-sizing: border-box;
          padding: 22px 23px 19px;
          border: 1px solid #e4e3d9;
          border-radius: 15px;
          background: #fffefa;
          color: #244a35;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .services-tile:hover {
          transform: translateY(-4px);
          border-color: #c9a227;
          box-shadow: 0 12px 26px rgba(27, 61, 47, 0.08);
        }

        .services-tile__top {
          display: flex;
          width: 100%;
          justify-content: flex-end;
        }

        .services-tile__arrow {
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 1px solid #d9dfd9;
          border-radius: 50%;
          color: #244a35;
          transition: all 0.22s ease;
        }

        .services-tile:hover .services-tile__arrow {
          transform: rotate(45deg);
          border-color: #c9a227;
          background: #c9a227;
        }

        .services-tile__main {
          margin-top: 25px;
        }

        .services-tile__main h3 {
          margin: 0 0 9px;
          color: #244a35;
          font-size: 17px;
          font-weight: 750;
          line-height: 1.4;
        }

        .services-tile__main p {
          margin: 0;
          color: #6b7169;
          font-size: 12px;
          line-height: 1.75;
        }

        .services-tile__line {
          width: 34px;
          height: 3px;
          margin-top: 18px;
          border-radius: 3px;
          background: #c9a227;
          transition: width 0.22s ease;
        }

        .services-tile:hover .services-tile__line {
          width: 58px;
        }

        @media (max-width: 900px) {
          .services-showcase {
            padding: 65px 0 70px;
          }

          .services-mosaic {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            grid-auto-rows: minmax(205px, auto);
          }

          .services-feature-wrap {
            grid-row: span 2;
          }

          .services-feature {
            min-height: 425px;
            padding: 23px;
          }

          .services-feature__main h3 {
            font-size: 29px;
          }

          .services-tile {
            padding: 20px;
          }
        }

        @media (max-width: 600px) {
          .services-showcase {
            padding: 50px 0 55px;
          }

          .services-showcase__container {
            padding: 0 17px;
          }

          .services-heading {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 28px;
          }

          .services-heading__main h2 {
            font-size: 35px;
            letter-spacing: -1px;
          }

          .services-heading__side {
            justify-self: start;
          }

          .services-mosaic {
            grid-template-columns: 1fr;
            grid-auto-rows: auto;
            gap: 14px;
          }

          .services-feature-wrap {
            grid-row: auto;
          }

          .services-feature {
            min-height: 310px;
            padding: 23px;
          }

          .services-feature__main h3 {
            font-size: 32px;
          }

          .services-tile {
            min-height: 190px;
            padding: 21px;
          }

          .services-tile__main {
            margin-top: 22px;
          }

          .services-tile__main h3 {
            font-size: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-pill,
          .services-pill__icon,
          .services-feature,
          .services-tile,
          .services-tile__arrow,
          .services-tile__line {
            transition: none;
          }

          .services-pill:hover,
          .services-tile:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default ServicesTeaser;