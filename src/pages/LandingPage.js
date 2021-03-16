import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/FullWidthWithImage.js";
import Features from "components/features/ThreeColSimple.js";
import SliderCard from "../components/cards/ThreeColSlider";
import FAQ from "components/faqs/SimpleWithSideImage.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Notification from "components/loginInRegisterNotification/Notification";
export default () => (

  <AnimationRevealPage>
    <Hero />
    <Features />
    <SliderCard />
    <FAQ />
    <Footer />
  </AnimationRevealPage>
);
