import React from "react";
import { PageHero } from "../../../global/ui";
import News from "./newscomponents/News";
import Events from "./newscomponents/Events";

const anchors = [
  { id: "news", label: "News" },
  { id: "events", label: "Events" },
];

function NewsEvents() {
  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="What's happening at ESWAMCU"
        lead="Stories, announcements and gatherings across the cooperative movement."
        anchors={anchors}
      />
      <News />
      <Events />
    </>
  );
}

export default NewsEvents;
