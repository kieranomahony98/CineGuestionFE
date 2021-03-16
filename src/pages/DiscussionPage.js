import AnimationRevealPage from "helpers/AnimationRevealPage";
import React from "react";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";
import { CommentLayout } from "components/comments/CommentLayout";
import MovieDetails from "components/comments/MovieDetails";
import { Container } from "reactstrap";
import Notification from "components/loginInRegisterNotification/Notification";
export const DiscussionPage = () => {
    return <AnimationRevealPage>
        <Header />
        <Notification />
        <Container>
            <MovieDetails />
            <CommentLayout />
        </Container>
        <Footer />
    </AnimationRevealPage>
}