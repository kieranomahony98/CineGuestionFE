import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import requestMovies from '../../data/PreviousCurationsRequests';
import Loader from 'react-loader-spinner';
import { Button, Container, Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import MovieCard from '../cards/card';
import '../../css/PreviousCurations.css';
import tw from "twin.macro";
import { SkipBackward } from 'react-bootstrap-icons';
const HighlightedText = tw.span`text-primary-500`;
const route = 'https://image.tmdb.org/t/p/original';
let modalHead, modalBody;

const PreviousCurations = () => {
    const { token } = useSelector(state => state.auth);
    const [showMovies, setShowMovies] = useState(false);
    const [generations, setGenerations] = useState(false);
    const [openModal, setModal] = useState(false);
    const [previousCurations, setPreviousCurations] = useState(null);
    const [movieCards, setMovieCards] = useState(null);
    const [errors, setErrors] = useState(false);

    const toggle = () => {
        setModal(openModal => !openModal);
    }
    const userMovies = async () => {
        await getMovies(token)
            .then(m => {
                if (m) {
                    console.log(m);
                    setPreviousCurations(m.map((movie) => {
                        const generationDate = movie.movieGenerationDate.split("T")[0];
                        return (
                            <Row className="curationRow mb-3" onClick={() => setSpecificCuration(movie)}>

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
        setGenerations(generations => true);
    }

    function setSpecificCuration(movie) {
        setMovieCards(movie.movies.map((m) => {
            const { movieImagePath, movieTitle, movieDescription, moviePopularity } = m;
            return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => movieModal(m)} className="mb-3" />
        }));

        setGenerations(() => false);
        setShowMovies(showMovies => !showMovies);
        console.log(generations, showMovies);
    }
    function movieModal(movie) {
        const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
        modalHead = <ModalHeader className="modalH" cssModule={{ 'modal-title': 'w-100 text-center' }}>{movieTitle}</ModalHeader>
        modalBody = <ModalBody className="modalBody">
            <div className="modalImage mb-3">
                <img src={`${route}${movieImagePath}`} style={{ maxHeight: '200px', maxWidth: '200px' }} className="modalImage" />
            </div>
            <div className="modalDesc">
                <p className="mb-2"><HighlightedText><b>Movie description: </b></HighlightedText> {movieDescription}</p>
                <p className="mb-2"><HighlightedText><b>User rating: </b></HighlightedText>{moviePopularity}</p>
                <p className="mb-2"><HighlightedText><b>Release Year: </b> </HighlightedText>{movieReleaseYear}</p>
                <p className="mb-2"><HighlightedText><b>Included Genres:</b> </HighlightedText> {movieGenres}</p>
            </div>
        </ModalBody>
        setModal(() => true);
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

            {(errors) ? <HighlightedText>Failed to get Curations</HighlightedText> :
                (generations) ?
                    previousCurations :
                    (showMovies) ?
                        <> <Row><button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"><SkipBackward alignmentBaseline="auto" className="align-middle" /></span>All Curations </button></Row> <Row xs="3"> {movieCards}</Row></> :
                        showSpinner()
            }
            {
                (openModal) ?
                    <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                        {modalHead}
                        {modalBody}
                    </Modal>
                    :
                    ''
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
