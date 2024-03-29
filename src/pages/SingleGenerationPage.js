import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";
import ViewSingleGeneration from "components/MovieGeneration/ViewSingleGeneration";
import Notification from "components/loginInRegisterNotification/Notification";

export default () => {

    return (
        <AnimationRevealPage>
            <Header />
            <Notification />
            <ViewSingleGeneration />
            <Footer />
        </AnimationRevealPage >
    )
}

