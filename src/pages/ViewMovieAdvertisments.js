import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import ViewUserMovies from "components/advertisments/ViewMovieAdvertisments";
import Notification from "components/loginInRegisterNotification/Notification";


export default () => {
    return (
        < AnimationRevealPage >
            <Header />
            <Notification />
            <ViewUserMovies />
        </AnimationRevealPage >
    );
};