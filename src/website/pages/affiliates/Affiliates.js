import React from "react";
import { PageHero } from "../../../global/ui";
import Benefits from "./affiliatescomponents/Benefits";
import Directory from "./affiliatescomponents/Directory";
import JoinForm from "./affiliatescomponents/JoinForm";

const anchors = [
  { id: "benefits", label: "Benefits" },
  { id: "directory", label: "Directory" },
  { id: "join", label: "Join ESWAMCU" },
];

function Affiliates() {
  return (
    <>
      <PageHero
        eyebrow="Our affiliates"
        title="Cooperatives stronger together"
        lead="The multipurpose cooperatives that make up the Union, and how yours can join them."
        anchors={anchors}
      />
      <Benefits />
      <Directory />
      <JoinForm />
    </>
  );
}

export default Affiliates;
