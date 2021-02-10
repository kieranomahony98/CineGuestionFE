import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage";
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";
import Playlists from "components/playlists/playlists"
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

const WeeklyPlaylist = () => {
    let { type } = useParams();
    if (!type) {
        type = "trendingNow"
    }
    const { [type]: value } = useSelector(state => state.movies);

    if (!value) {
        return <Redirect to="/" />
    }

    return (
        <AnimationRevealPage>
            <Header />
            <Playlists Playlist={value} />
            <Footer />
        </AnimationRevealPage >
    )
}

export default WeeklyPlaylist;
