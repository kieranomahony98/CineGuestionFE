import AnimationRevealPage from 'helpers/AnimationRevealPage';
import React from 'react';
import MovieGenerationCarousel from '../components/MovieGeneration/MovieGenerationCarousel';
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light.js";

const checkBoxQuestions = () => {
    return (
        <>
            <Header />
            <MovieGenerationCarousel />
            <Footer />
        </>
    );
};

export default checkBoxQuestions;