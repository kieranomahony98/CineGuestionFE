import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import { MoviePopover } from "../popover/popover";
import MovieCard from "../cards/card";
import "../../css/PreviousCurations.css";
import tw from "twin.macro";
import MovieModal from "components/modal/movieModal";
import { useParams } from "react-router-dom";
export const HighlightedText = tw.span`text-primary-500`;
const route = "https://image.tmdb.org/t/p/original";
let movie;

const Playlists = ({ Playlist }) => {
    const { type } = useParams();

    let movieCards;
    const [openModal, setOpenModal] = useState(false);
    const [modal, setModal] = useState(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => {
        setOpenModal(openModal => !openModal);
    }
    console.log(Playlist);
    const body = `This curation is a selection of ${(Playlist.movieSearchCriteria.with_genres)} genres${keywordsText(Playlist.movieSearchCriteria.with_keywords)}${sortByText(Playlist.movieSearchCriteria.sort_by)}`
    const popoverToggle = () => {
        setPopoverOpen(popoverOpen => !popoverOpen);
    }
    if (Playlist) {
        movieCards = Playlist.movies.map((m, i) => {
            return <MovieCard md="4" xs="6" key={i} title={m.movieTitle} img={m.movieImagePath} rating={m.moviePopularity} desc={m.movieDescription} onClick={() => { movie = m; setOpenModal(() => true) }} className="mb-3" />
        });
    }

    return (
        <Container>
            {(movieCards) ?
                <>
                    <MoviePopover target="target1" isOpen={popoverOpen} toggle={popoverToggle} body={body} title={type} />
                    <Row xs="3" className="justify-content-centre">
                        {movieCards}
                    </Row>
                </>
                : ""
            }
            {
                (openModal) ? <MovieModal toggle={toggle} movieId={movie.movieId} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ""

            }
        </Container >
    );
}

function genreText(with_genres) {
    console.log(with_genres)
    const genres = with_genres.split(",");
    let genreText = "";
    if (genres) {
        for (const [i, genre] of genres.entries()) {
            genreText += (i === 0) ? `both ${genre}` : ` and ${genre}`;
        }
    }
    return genreText;
}

function keywordsText(keywords) {
    if (keywords) {
        return `, while all also delivering elements of ${keywords} vibes`
    }
    return ''
}

function sortByText(sortBy) {
    if (sortBy) {
        return (sortBy === "vote_count.desc") ? " and lastly is filtered to show the most interacted with movies out there!" : " and lastly is filtered to show the most popular movies out there!";
    }
    return '';
}

export default Playlists;
