import AnimationRevealPage from "helpers/AnimationRevealPage";
import React from "react";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";
import { CommentLayout } from "components/comments/CommentLayout";
import MovieDetails from "components/comments/MovieDetails";
import { Container } from "reactstrap";
import { useParams } from "react-router-dom";
export const DiscussionPage = () => {
    return <AnimationRevealPage>
        <Header />
        <Container>
            <MovieDetails />
            <CommentLayout />
        </Container>
        <Footer />
    </AnimationRevealPage>
}