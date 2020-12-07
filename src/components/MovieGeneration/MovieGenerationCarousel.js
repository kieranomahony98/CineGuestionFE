import React, { useState } from 'react';
import MovieGenerationCheckbox from './MovieGenerationCheckbox';
import { Carousel } from 'react-responsive-carousel'
import MovieGenerationRadioButton from './MovieGenerationRadioButton';
import { Button, Container, Row, Col, Table } from 'reactstrap';
import movieGenerationQuestions from '../../data/MovieGenerationQuestions';
import Loader from 'react-loader-spinner';
// import MovieCard from '../cards/Moviecard';
import MovieCard from '../../cards/card';
import MovieRequests from '../../data/MovieRequests';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import tw from "twin.macro";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import "../../MovieGeneration.css";
import { useSelector } from 'react-redux';

const HighlightedText = tw.span`text-primary-500`;

let movieCards;
let modalHead, modalBody;
const route = 'https://image.tmdb.org/t/p/original';

const MovieGenerationCarousel = ({
    movies
}) => {

    const [carouselVisible, setCarouselVisible] = useState(true);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [openModal, setModal] = useState(false);
    const { token } = useSelector(state => state.auth);

    const toggle = () => {
        setModal(() => !openModal);
    }

    if (movies) {
        setCarouselVisible(false);
        setSpinnerVisibility(false);
    }

    async function requestMovies() {
        setCarouselVisible(false);
        setSpinnerVisibility(true);
        movieCards = await MovieRequests(token)
            .then((moviesDom) => {
                return moviesDom.map((movie) => {
                    return (
                        <Col key={movie.movieId} sm="4">
                            <MovieCard img={movie.movieImagePath}
                                title={movie.movieTitle}
                                key={movie.movieTitle}
                                desc={movie.movieDescription}
                                rating={movie.moviePopularity}
                                onClick={() => {
                                    movieModal(movie);
                                }} />
                        </Col>
                    );
                });
            }).catch((err) => {
                throw err;
            });
        setSpinnerVisibility(false);
    }

    function movieModal(movie) {
        setModal(false);
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

    let slides = movieGenerationQuestions.map((movieSlide) => {
        return (
            movieSlide.values.map((type) => {
                if (movieSlide.display === 'checkbox') {
                    return (
                        <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} />
                    );
                };
                return (
                    <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} />
                );
            }));
    });

    slides = slides.map((slide) => {
        return (
            <div key='carouselItem' className="carouselDiv">
                <div className="wrapper">
                    <Table>
                        <tbody>
                            {slide}
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    });

    const showCarousel = () => {
        return (
            <Col>
                <Carousel className="carousel" showThumbs={false} >
                    {slides}
                </Carousel>
            </Col>
        );
    };

    const showSpinner = () => {
        return (
            <Row style={{ visibility: (spinnerVisibility) ? 'visible' : 'hidden' }}>
                <Col>
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner" />
                </Col>
            </Row>
        );
    };
    const showMovies = () => {
        return (
            <Row xs="3">
                {movieCards}
            </Row >
        );
    };

    return (
        <Container style={{ marginTop: '20px' }}>
            <div className="table">
                <Row>
                    {(carouselVisible) ? showCarousel() : (spinnerVisibility) ? showSpinner() : showMovies()}
                    <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                        {modalHead}
                        {modalBody}
                    </Modal>
                </Row>
            </div>
            <Row>
                {(carouselVisible) ? <Button color="success" className="btnGenerate" onClick={requestMovies}>Generate Movies</Button> : ''}
            </Row>
        </Container >
    );
}

export default MovieGenerationCarousel;



