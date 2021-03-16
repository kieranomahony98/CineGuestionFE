import AnimationRevealPage from "helpers/AnimationRevealPage";
import React from "react";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";
import { CommentLayout } from "components/comments/CommentLayout";
import MovieDetails from "components/comments/MovieDetails";
import { Container } from "reactstrap";
import Discussion from "components/discussions/discussion";
import Notification from "components/loginInRegisterNotification/Notification";

export const DiscussionLandingPage = () => {

    return <AnimationRevealPage>
        <Header />
        <Notification />
        <Container>
            <Discussion />
        </Container>
        <Footer />
    </AnimationRevealPage>
}
