import React from "react";
import Hero from "./homecomponents/Hero";
import Welcome from "./homecomponents/Welcome";
import ServicesTeaser from "./homecomponents/ServicesTeaser";
import LatestUpdates from "./homecomponents/LatestUpdates";
import JoinBanner from "./homecomponents/JoinBanner";

function Home() {
  return (
    <>
      <Hero />
      <Welcome />
      <ServicesTeaser />
      <LatestUpdates />
      <JoinBanner />
    </>
  );
}

export default Home;
