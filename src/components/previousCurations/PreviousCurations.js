import React, { useState } from "react";
import { useSelector } from "react-redux";
import requestMovies from "../../data/PreviousCurationsRequests";
import Loader from "react-loader-spinner";
import { Container, Row, Col } from "reactstrap";
import MovieCard from "../cards/card";
import "../../css/PreviousCurations.css";
import tw from "twin.macro";
import MovieModal from "components/modal/movieModal";
import { moviePopoverText } from "helpers/PopoverText";
import { MoviePopover } from "components/popover/popover";
import { convertToTextGeneration } from "helpers/convertGenres";
const HighlightedText = tw.span`text-primary-500`;
const route = "https://image.tmdb.org/t/p/original";
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
            .then(async (m) => {
                if (m) {
                    const generations = await Promise.all(m.map(async (movie, i) => {
                        const generationDate = movie.movieGenerationDate.split("T")[0];
                        return await convertToTextGeneration(movie.movieSearchCriteria, false)
                            .then((convertedValues) => {
                                return (
                                    <Row className="curationRow movieCard mb-3" onClick={() => setSpecificCuration(movie)} key={i}>
                                        <Col>
                                            <p className="mr-3">Generation Date: {generationDate}</p>
                                            <p className="mr-3"> Genres: {(convertedValues.with_genres) ? convertedValues.with_genres : "Any"}</p>
                                            <p className="mr-3">Filtering: {(convertedValues.sort_by) ? convertedValues.sort_by : "No Sorting selected"}</p>
                                            <p className="mr-3">Release Year: {(convertedValues.primary_release_year) ? convertedValues.primary_release_year : "Any"}</p>
                                            <p className="mr-3">Movie Keywords: {(convertedValues.with_keywords) ? convertedValues.with_keywords : "No keywords"}</p>
                                        </Col>
                                    </Row >
                                );
                            })
                    }));
                    setPreviousCurations(() => generations);
                }
                else {
                    setErrors(errors => !errors);
                }
            })
            .catch((err) => {
                setErrors(errors => !errors);
                throw err;
            });
        setGenerations(() => true);
    }

    function setSpecificCuration(mv) {
        moviePopoverText(mv.movieSearchCriteria, true)
            .then((text) => {
                setPopoverText(popOverText => ({ ...popOverText, title: text.title, body: text.body }));
            })
            .catch((err) => {
                throw err;
            })

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
            {(showMovies) ? <MoviePopover title={popOverText.title} body={popOverText.body} toggle={popoverToggle} isOpen={popover} /> : ""}
            {(errors) ? <Row><HighlightedText className="mx-auto">It appears you have no generations with us, <a href="/Generate">Get Started here!</a></HighlightedText></Row> :
                (generations) ?
                    previousCurations :
                    (showMovies) ?
                        <> <Row><button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"></span>All Curations </button></Row> <Row> {movieCards}</Row></> :
                        showSpinner()
            }
            {
                (openModal) ? <MovieModal toggle={toggle} isOpen={openModal} movieId={movie.movieId} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ""

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
