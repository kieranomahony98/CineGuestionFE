import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import requestMovies from '../../data/PreviousCurationsRequests';
import Loader from 'react-loader-spinner';
import { Button, Container, Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import MovieCard from '../../cards/card';
import '../../css/PreviousCurations.css';
import { Link } from 'react-router-dom';
import tw from "twin.macro";
const HighlightedText = tw.span`text-primary-500`;
const route = 'https://image.tmdb.org/t/p/original';

const PreviousCurations = () => {
    let previousCurations;
    let curations;
    const { token } = useSelector(state => state.auth);
    const [showMovies, setShowMovies] = useState(false);
    const [generations, setGenerations] = useState(false);
    const [openModal, setModal] = useState(false);
    const toggle = () => {
        setModal(() => !openModal);
    }

    const userMovies = async () => {
        previousCurations = await getMovies(token)
            .then(m => m)
            .catch((err) => {
                throw err;
            });
        console.log(previousCurations);
        curations = previousCurations.map((movie) => {
            const generationDate = movie.movieGenerationDate.split("T")[0];
            return (
                <Row className="curationRow mb-3" onClick={() => setSpecificCuration(movie)}>
                    <Col>
                        <div id="image">
                            {/* <img src=`` */}
                        </div>
                    </Col>
                    <Col>
                        <p className="mr-3">Generation Date: {generationDate}</p>
                        <p className="mr-3"> Genres: {(movie.movieSearchCriteria.with_genres) ? movie.movieSearchCriteria.with_genres : 'Any'}</p>
                        <p className="mr-3">Filtering: {(movie.movieSearchCriteria.sort_by) ? movie.movieSearchCriteria.sort_by : 'No Sorting selected'}</p>
                        <p className="mr-3">Release Year: {(movie.movieSearchCriteria.primary_release_year) ? movie.movieSearchCriteria.primary_release_year : 'Any'}</p>
                        <p className="mr-3">Movie Keywords: {(movie.movieSearchCriteria.with_keywords) ? movie.movieSearchCriteria.with_keywords : 'No keywords'}</p>
                    </Col>
                </Row >
            );
        });
        console.log(curations);
        setGenerations(() => true);
    }
    let movieCards;
    function setSpecificCuration(movie) {
        movieCards = movie.userMovies.map((m) => {
            const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = m;
            return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => movieModal(movie)} />
        });
    }
    let modalHead, modalBody;
    function movieModal(movie) {
        setModal(() => false);
        const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
        modalHead = <ModalHeader className="modalH" cssModule={{ 'modal-title': 'w-100 text-center' }}>{movieTitle}</ModalHeader>
        modalBody =
            <ModalBody className="modalBody">
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

    // function getRender(){
    //     if(generations) return curations;
    //     if(showMovies) return movieCards;
    //     return userMovies()
    //         .then((movies) => movie);
    // }
    return (
        <Row>
            {(generations) ? curations : userMovies}
            {/* <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                {modalHead}
                {modalBody}
            </Modal> */}
        </Row>

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
