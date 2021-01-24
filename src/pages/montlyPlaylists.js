import React from 'react';
import AnimationRevealPage from 'helpers/AnimationRevealPage';
import Footer from "components/footers/MiniCenteredFooter.js";
import Header from "components/headers/light";
import Playlists from "components/playlists/playlists"
import { useSelector } from 'react-redux';

const MontlyPlaylist = () => {
    const { montlyPlaylist } = useSelector(state => state.movies);

    return (
        <>
            <Header />
            <Playlists Playlist={montlyPlaylist} />
            <Footer />
        </ >
    )
}

export default MontlyPlaylist;
