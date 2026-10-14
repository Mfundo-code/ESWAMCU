import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaNewspaper } from "react-icons/fa";
import { events, news } from "../../../../global/api";
import { formatDate, useFetch } from "../../../../global/hooks";
import { EmptyState, Reveal, SectionHeading } from "../../../../global/ui";

function LatestUpdates() {
  const latestNews = useFetch(() => news.list({ page_size: 3 }), []);
  const upcoming = useFetch(
    () => events.list({ when: "upcoming", page_size: 3 }),
    []
  );

  const loading = latestNews.loading || upcoming.loading;

  const cards = [
    ...latestNews.data.map((n) => ({
      key: `n${n.id}`,
      kind: n.category_display || "News",
      date: formatDate(n.published_at),
      title: n.title,
      text: n.summary,
      to: "/news-events#news",
      isEvent: false,
    })),
    ...upcoming.data.map((e) => ({
      key: `e${e.id}`,
      kind: "Event",
      date: formatDate(e.event_date),
      title: e.title,
      text: e.location,
      to: "/news-events#events",
      isEvent: true,
    })),
  ].slice(0, 3);

  return (
    <section className="section latest-updates">
      <div className="container">
        <SectionHeading
          eyebrow="News & events"
          title="Latest from ESWAMCU"
        />

        {loading ? (
          <div className="updates-loading">Loading updates...</div>
        ) : cards.length === 0 ? (
          <EmptyState
            icon={<FaNewspaper />}
            title="Updates will appear here"
            text="News, announcements and upcoming events will be shared here as soon as they are published."
          />
        ) : (
          <div className="updates-grid">
            {cards.map((card, index) => (
              <Reveal key={card.key} delay={index * 0.06}>
                <article className="updates-card">
                  <div className="updates-card__meta">
                    <span
                      className={`updates-tag ${
                        card.isEvent ? "updates-tag--event" : ""
                      }`}
                    >
                      {card.kind}
                    </span>
                    <span className="updates-date">{card.date}</span>
                  </div>

                  <h3>{card.title}</h3>

                  {card.text && <p>{card.text}</p>}

                  <Link to={card.to} className="updates-read">
                    Read more
                    <FaArrowRight size={12} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        )}

        <div className="updates-footer">
          <Link to="/news-events" className="updates-all">
            All news &amp; events
            <span>
              <FaArrowRight size={13} />
            </span>
          </Link>
        </div>
      </div>

      <style>{`
        .latest-updates {
          background: #f5f4ed;
          padding-top: 75px;
          padding-bottom: 80px;
        }

        /* Make the section heading green */
        .latest-updates h2 {
          color: #244a35 !important;
        }

        .updates-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
          margin-top: 32px;
        }

        .updates-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 235px;
          height: 100%;
          box-sizing: border-box;
          padding: 27px 24px;
          background: #f2f2ee;
          border: 1px solid #e2e4dc;
          border-top: 4px solid #28583d;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(36, 74, 53, 0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .updates-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(36, 74, 53, 0.14);
        }

        .updates-card__meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 19px;
        }

        .updates-tag {
          display: inline-block;
          padding: 6px 11px;
          border-radius: 999px;
          background: #dce8ef;
          color: #234f6d;
          font-size: 10px;
          font-weight: 800;
        }

        .updates-tag--event {
          background: #f1e4b9;
          color: #705a18;
        }

        .updates-date {
          color: #737b72;
          font-size: 11px;
        }

        .updates-card h3 {
          margin: 0 0 12px;
          color: #244a35;
          font-size: 19px;
          font-weight: 750;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .updates-card p {
          margin: 0 0 20px;
          color: #5e665e;
          font-size: 13px;
          line-height: 1.7;
        }

        .updates-read {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          width: fit-content;
          margin-top: auto;
          padding-top: 14px;
          color: #28583d;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
        }

        .updates-read svg {
          transition: transform 0.2s ease;
        }

        .updates-read:hover svg {
          transform: translateX(4px);
        }

        .updates-footer {
          display: flex;
          justify-content: center;
          margin-top: 34px;
        }

        .updates-all {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          min-height: 55px;
          padding: 6px 7px 6px 23px;
          border: 2px solid #28583d;
          border-radius: 999px;
          background: #28583d;
          color: #f5d976;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .updates-all span {
          display: grid;
          width: 39px;
          height: 39px;
          place-items: center;
          border-radius: 50%;
          background: #c9a227;
          color: #244a35;
        }

        .updates-all:hover {
          transform: translateY(-2px);
          background: #173f5f;
          border-color: #173f5f;
        }

        .updates-loading {
          padding: 40px 0;
          color: #28583d;
          text-align: center;
        }

        @media (max-width: 800px) {
          .updates-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
          }
        }

        @media (max-width: 560px) {
          .latest-updates {
            padding-top: 50px;
            padding-bottom: 55px;
          }

          .updates-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .updates-card {
            min-height: 200px;
            padding: 24px 21px;
          }

          .updates-card h3 {
            font-size: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .updates-card,
          .updates-read svg,
          .updates-all {
            transition: none;
          }

          .updates-card:hover,
          .updates-all:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default LatestUpdates;