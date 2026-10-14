import React from "react";
import { Link } from "react-router-dom";
import { useContact } from "../../../../global/ContactContext";
import { Reveal } from "../../../../global/ui";

function JoinBanner() {
  const { openContact } = useContact();
  return (
    <section className="section--tight">
      <div className="container">
        <Reveal className="join">
          <p className="eyebrow eyebrow--light">Join the movement</p>
          <h2>Is your multipurpose cooperative part of ESWAMCU?</h2>
          <p>
            Affiliated cooperatives gain a collective voice, practical business support and access to a
            wider network of partners. Tell us about your cooperative and we&rsquo;ll be in touch.
          </p>
          <div className="join__actions">
            <Link to="/affiliates#join" className="btn btn--amber">
              Become an affiliate
            </Link>
            <button type="button" className="btn btn--ghost-light" onClick={openContact}>
              Talk to us
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default JoinBanner;