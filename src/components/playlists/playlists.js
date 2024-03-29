import React, { useState } from "react";
import { Container, Row, Badge } from "reactstrap";
import { MoviePopover } from "../popover/popover";
import MovieCard from "../cards/card";
import "../../css/PreviousCurations.css";
import tw from "twin.macro";
import MovieModal from "components/modal/movieModal";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
//this component comes from the tempalte, check out read me for more
export const HighlightedText = tw.span`text-primary-500`;
let movie;

const Playlists = ({ Playlist }) => {
    const { type } = useParams();
    const history = useHistory();
    const { isAuthenticated } = useSelector(state => state.auth);
    const [errors, setErrors] = useState(false);
    if (type !== "trendingNow" && !isAuthenticated) {
        history.push({
            pathname: "/"
        });
    }

    let movieCards;
    const [openModal, setOpenModal] = useState(false);
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
    } else {
        setErrors(errors => !errors);
    }

    return (
        <Container>
            {errors ? <Row><Badge color="warning">Sorry, we couldnt get your playlist right now, please try again later</Badge></Row> : ""}
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
                (openModal) ? <MovieModal toggle={toggle} isUserPage={false} movieId={movie.movieId} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ""

            }
        </Container >
    );
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
