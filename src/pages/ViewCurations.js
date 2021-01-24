import React from 'react';
import PreviousCurations from '../components/previousCurations/PreviousCurations'
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";

const ViewCurations = () => {
    return (
        <AnimationRevealPage>
            <Header />
            <PreviousCurations />
            <Footer />
        </AnimationRevealPage >
    )
}



export default ViewCurations;
