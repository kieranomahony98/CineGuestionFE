import AnimationRevealPage from 'helpers/AnimationRevealPage';
import React from 'react';
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";
import { CommentLayout } from 'components/comments/CommentLayout';
import MovieDetails from "components/comments/MovieDetails";
import { Container } from 'reactstrap';
import Discussion from "components/discussions/discussion";
import Hr from "components/hr/Hr";

export const DiscussionLandingPage = () => {

    return <AnimationRevealPage>
        <Header />

        <Container>
            <Discussion />
        </Container>
        <Footer />
    </AnimationRevealPage>
}
