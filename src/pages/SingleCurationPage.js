import React from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import Footer from "components/footers/FiveColumnWithInputForm.js";
import Header from "components/headers/light.js";
import SingleCuration from "../components/previousCurations/SingleCuration";
import { useLocation } from 'react-router-dom';

const SingleCurationPage = () => {
    const data = useLocation();
    console.log(data);

    return (
        <AnimationRevealPage>
            <Header />
            <SingleCuration data={data} />
            <Footer />
        </AnimationRevealPage>
    )
}

export default SingleCurationPage;