import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import SliderCard from "../components/cards/ThreeColSlider";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
//this file is from the template, please refer to the read me file
export default () => (

  <AnimationRevealPage>
    <Hero />
    <Features />
    <SliderCard />
    <FAQ />
    <Footer />
  </AnimationRevealPage>
);
