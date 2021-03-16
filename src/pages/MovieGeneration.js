import AnimationRevealPage from "helpers/AnimationRevealPage";
import React from "react";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";
import Test from "components/MovieGeneration/test";
import Notification from "components/loginInRegisterNotification/Notification";

const checkBoxQuestions = () => {
    return (
        <AnimationRevealPage>
            <Header />
            <Notification />
            <Test />
            <Footer />
        </AnimationRevealPage >
    );
};

export default checkBoxQuestions;