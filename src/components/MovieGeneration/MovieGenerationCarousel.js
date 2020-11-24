import React, { useState } from 'react';
import MovieGenerationCheckbox from './MovieGenerationCheckbox';
import { Carousel } from 'react-responsive-carousel'
import MovieGenerationRadioButton from './MovieGenerationRadioButton';
import MovieCard from '../cards/Moviecard';
import { Button, InputGroup, Container, Row, Col } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
import movieGenerationQuestions from '../../data/MovieGenerationQuestions';
import Loader from 'react-loader-spinner';
import axios from 'axios'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../MovieGeneration.css";

let movieCards;
let modalHead, modalBody;
const route = 'https://image.tmdb.org/t/p/original';
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

const MovieGenerationCarousel = ({
}) => {

    const [carouselVisible, setCarouselVisible] = useState(true);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [openModal, setModal] = useState(false);

    const toggle = () => {
        setModal(!openModal);
    }
    function requestMovies() {
        setCarouselVisible(false);
        setSpinnerVisibility(true);
        const body = JSON.stringify(MovieGenerationModel);
        axios.post('/api/movies/movieGeneration', body, config)
            .then((req, res) => {
                if (req.status === 200) {
                    movieCards = JSON.parse(JSON.stringify(req.data)).movies.map((movie) => {
                        return (
                            <Col key={movie.movieId} onClick={() => {
                                movieModal(movie);
                            }} sm="4">
                                <MovieCard img={movie.movieImagePath} title={movie.movieTitle} description={movie.movieDescription} rating={movie.moviePopularity} key={movie.movieTitle} />
                            </Col>
                        );
                    });
                }
                setSpinnerVisibility(false);
            }).catch((err) => {
                throw err;
            });
    }

    function movieModal(movie) {
        setModal(false);
        const { movieImagePath, movieTitle, movieDescription, moviePopularity } = movie;
        modalHead = <ModalHeader toggle={toggle}>{movieTitle}</ModalHeader>
        modalBody = <ModalBody>
            <img src={`${route}${movieImagePath}`} style={{ maxHeight: '200px', maxWidth: '200px' }} />
            <p>Movie description: {movieDescription}</p>
            <p>User rating: {moviePopularity}</p>
        </ModalBody>
        setModal(true);
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
                    {slide}
                </div>
            </div>
        )
    });

    const showCarousel = () => {
        return (
            <Col>
                <Carousel className="carousel" showThumbs={false}>
                    {slides}
                </Carousel>
            </Col>
        );
    };
    const showSpinner = () => {
        return (
            <Row style={{ visibility: (spinnerVisibility) ? 'visible' : 'hidden' }}>
                <Col>
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
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
                    <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle}>
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



