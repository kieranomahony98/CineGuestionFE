import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import CreateForm from "components/advertisments/CreateForm";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import Notification from "components/loginInRegisterNotification/Notification";

export default () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    console.log(isAuthenticated);
    if (!isAuthenticated) {
        Redirect("/");
    }

    return (
        < AnimationRevealPage >
            <Header />
            <Notification />
            <CreateForm />
        </AnimationRevealPage >
    )

};
