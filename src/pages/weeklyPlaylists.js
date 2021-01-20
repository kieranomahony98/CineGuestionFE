import React from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";
import Playlists from "components/playlists/playlists"
import { useSelector } from 'react-redux';

const WeeklyPlaylist = () => {
    const { weeklyPlaylist } = useSelector(state => state.movies);

    return (
        <AnimationRevealPage>
            <Header />
            <Playlists Playlist={weeklyPlaylist} />
            <Footer />
        </AnimationRevealPage >
    )
}



export default WeeklyPlaylist;
