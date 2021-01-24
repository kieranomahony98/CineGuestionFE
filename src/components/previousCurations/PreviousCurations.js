import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import requestMovies from '../../data/PreviousCurationsRequests';
import Loader from 'react-loader-spinner';
import { Container, Row, Col } from 'reactstrap';
import MovieCard from '../cards/card';
import '../../css/PreviousCurations.css';
import tw from "twin.macro";
import { SkipBackward } from 'react-bootstrap-icons';

import MovieModal from 'components/modal/movieModal';
import { moviePopoverText } from 'helpers/PopoverText';
import { MoviePopover } from 'components/popover/popover';
const HighlightedText = tw.span`text-primary-500`;
let movie;

const PreviousCurations = () => {
    const { token } = useSelector(state => state.auth);
    const [showMovies, setShowMovies] = useState(false);
    const [generations, setGenerations] = useState(false);
    const [openModal, setModal] = useState(false);
    const [previousCurations, setPreviousCurations] = useState(null);
    const [movieCards, setMovieCards] = useState(null);
    const [errors, setErrors] = useState(false);
    const [popover, setPopover] = useState(false);
    const [popOverText, setPopoverText] = useState({
        title: "",
        body: ""
    });
    const popoverToggle = () => {
        setPopover(popover => !popover);
    }
    const toggle = () => {
        setModal(openModal => !openModal);
    }

    const userMovies = async () => {
        await getMovies(token)
            .then(m => {
                if (m) {
                    setPreviousCurations(m.map((movie, i) => {
                        const generationDate = movie.movieGenerationDate.split("T")[0];
                        return (
                            <Row className="curationRow mb-3" onClick={() => setSpecificCuration(movie)} key={i}>
                                <Col>
                                    <p className="mr-3">Generation Date: {generationDate}</p>
                                    <p className="mr-3"> Genres: {(movie.movieSearchCriteria.with_genres) ? movie.movieSearchCriteria.with_genres : 'Any'}</p>
                                    <p className="mr-3">Filtering: {(movie.movieSearchCriteria.sort_by) ? movie.movieSearchCriteria.sort_by : 'No Sorting selected'}</p>
                                    <p className="mr-3">Release Year: {(movie.movieSearchCriteria.primary_release_year) ? movie.movieSearchCriteria.primary_release_year : 'Any'}</p>
                                    <p className="mr-3">Movie Keywords: {(movie.movieSearchCriteria.with_keywords) ? movie.movieSearchCriteria.with_keywords : 'No keywords'}</p>
                                </Col>
                            </Row >
                        );
                    }));
                }
                else {
                    setErrors(errors => !errors);
                }
            })
            .catch((err) => {
                throw err;
            });
        setGenerations(() => true);
    }

    function setSpecificCuration(mv) {
        const text = moviePopoverText(mv.movieSearchCriteria);
        setPopoverText(popOverText => ({ ...popOverText, title: text.title, body: text.body }));

        setMovieCards(mv.movies.map((m, i) => {
            const { movieImagePath, movieTitle, movieDescription, moviePopularity } = m;
            return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => { movie = m; toggle() }} key={i} />
        }));
        handleClick();
    }

    const showSpinner = () => {
        userMovies();
        return (
            <Row className="justify-content-center">
                <Col xs="1">
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner" />
                </Col>
            </Row>
        );
    };
    const handleClick = () => {
        setGenerations(generations => !generations);
        setShowMovies(showMovies => !showMovies);
    }

    return (
        <Container>
            {(showMovies) ? <MoviePopover title={popOverText.title} body={popOverText.body} toggle={popoverToggle} isOpen={popover} /> : ''}
            {(errors) ? <HighlightedText>Failed to get Curations</HighlightedText> :
                (generations) ?
                    previousCurations :
                    (showMovies) ?
                        <> <Row><button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"><SkipBackward alignmentBaseline="auto" className="align-middle" /></span>All Curations </button></Row> <Row xs="3"> {movieCards}</Row></> :
                        showSpinner()
            }
            {
                (openModal) ? <MovieModal toggle={toggle} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ''

            }

        </Container >
    );
}

async function getMovies(token = null) {
    return requestMovies(token)
        .then((movies) => {
            return movies
        }).catch((err) => {
            throw err;
        })
}

export default PreviousCurations;
