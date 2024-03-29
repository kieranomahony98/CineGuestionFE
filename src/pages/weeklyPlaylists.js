import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";
import Playlists from "components/playlists/playlists"
import { useSelector } from "react-redux";
import Notification from "components/loginInRegisterNotification/Notification";
import { Redirect, useParams } from "react-router-dom";

const WeeklyPlaylist = () => {
    let { type } = useParams();

    if (!type) {
        type = "trendingNow"
    }
    const { [type]: value } = useSelector(state => state.movies);


    return (
        <AnimationRevealPage>
            <Header />
            <Notification />
            <Playlists Playlist={value} />
            <Footer />
        </AnimationRevealPage >
    )
}

export default WeeklyPlaylist;
