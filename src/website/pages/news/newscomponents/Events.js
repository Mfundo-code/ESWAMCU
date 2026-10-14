import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { events } from "../../../../global/api";
import { formatDateTime, useFetch } from "../../../../global/hooks";
import { Chips, EmptyState, Loading, Modal, Reveal, SectionHeading } from "../../../../global/ui";

const WHEN = [
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

function Events() {
  const [when, setWhen] = useState("upcoming");
  const [selected, setSelected] = useState(null);
  const { data, loading, error } = useFetch(() => events.list({ when }), [when]);

  return (
    <section className="section section--white" id="events">
      <div className="container">
        <SectionHeading eyebrow="Events" title="Events & gatherings" />
        <Chips options={WHEN} value={when} onChange={setWhen} />
        {loading ? (
          <Loading rows={2} />
        ) : error ? (
          <EmptyState title="Couldn't load events" text="Please check your connection and try again." />
        ) : data.length === 0 ? (
          <EmptyState
            icon={<FaCalendarAlt />}
            title={when === "upcoming" ? "No upcoming events" : "No past events"}
            text="Check back soon."
          />
        ) : (
          <div className="grid grid--2">
            {data.map((e, i) => {
              const d = new Date(e.event_date);
              const valid = !isNaN(d.getTime());
              return (
                <Reveal key={e.id} delay={(i % 2) * 0.06}>
                  <article className="card card--hover event">
                    <div className="event__date">
                      <b>{valid ? d.getDate() : "–"}</b>
                      <span>{valid ? d.toLocaleDateString("en-GB", { month: "short" }) : ""}</span>
                    </div>
                    <div>
                      <h3>{e.title}</h3>
                      <div className="meta-line" style={{ marginBottom: "0.5rem" }}>
                        <span>
                          <FaCalendarAlt /> {formatDateTime(e.event_date)}
                        </span>
                        {e.location && (
                          <span>
                            <FaMapMarkerAlt /> {e.location}
                          </span>
                        )}
                      </div>
                      {e.description && (
                        <button type="button" className="btn btn--outline btn--small" onClick={() => setSelected(e)}>
                          Details
                        </button>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          {selected.cover_photo && (
            <img src={selected.cover_photo} alt={selected.title} style={{ width: "100%", borderRadius: 14, marginBottom: "1rem" }} />
          )}
          <h3>{selected.title}</h3>
          <div className="meta-line" style={{ marginBottom: "0.8rem" }}>
            <span>{formatDateTime(selected.event_date)}</span>
            {selected.location && <span>{selected.location}</span>}
          </div>
          <p style={{ whiteSpace: "pre-wrap" }}>{selected.description}</p>
        </Modal>
      )}
    </section>
  );
}

export default Events;
