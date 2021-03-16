import React from "react";
import GenreChart from "components/Charts/GenreChart";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter.js";
import Notification from "components/loginInRegisterNotification/Notification";

export default () => {
    return (
        <AnimationRevealPage>
            <Header />
            <Notification />
            <GenreChart />
            <Footer />
        </AnimationRevealPage>
    )
}