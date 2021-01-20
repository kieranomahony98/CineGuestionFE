import React, { useState } from 'react';
import MovieGenerationCheckbox from './MovieGenerationCheckbox';
import { Carousel } from 'react-responsive-carousel'
import MovieGenerationRadioButton from './MovieGenerationRadioButton';
import { SkipBackward, Play } from 'react-bootstrap-icons';
import { Button, Container, Row, Col, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import movieGenerationQuestions from '../../data/MovieGenerationQuestions';
import Loader from 'react-loader-spinner';
import MovieCard from '../cards/card';
import MovieRequests from '../../data/MovieRequests';
import tw from "twin.macro";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../MovieGeneration.css";
import { useSelector } from 'react-redux';
import MovieGenerationModel from '../../data/MovieGenerationModel';

const HighlightedText = tw.span`text-primary-500`;

let movieCards;
let modalHead, modalBody;
const route = 'https://image.tmdb.org/t/p/original';
let slides;
const MovieGenerationCarousel = ({ }) => {

    const [carouselVisible, setCarouselVisible] = useState(true);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [openModal, setModal] = useState(false);
    const [surveyResults, setSurveyResults] = useState({});

    const { token } = useSelector(state => state.auth);
    const toggle = () => setModal(!openModal);
    async function requestMovies() {
        setCarouselVisible(false);
        setSpinnerVisibility(true);
        movieCards = await MovieRequests(token, surveyResults)
            .then((moviesDom) => {
                return moviesDom.map((movie) => {
                    const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
                    return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => movieModal(movie)} />
                });
            }).catch((err) => {
                throw err;
            });
        setSpinnerVisibility(false);
    }

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


    const handleSurvey = (value, characteristic) => {
        console.log(characteristic);
        if (characteristic === 'with_genres') {
            if (surveyResults.with_genres) {
                const genres = surveyResults.with_genres.toString();
                value = (genres.match(new RegExp(`,${value}`, "g"))) ? genres.replace(new RegExp(`,${value}`, "g"), "") : (genres.match(new RegExp(`${value},`, "g"))) ? genres.replace(new RegExp(`${value},`, "g"), "") : (genres.match(new RegExp(`${value}`, "g"))) ? genres.replace(new RegExp(`${value}`, "g"), "") : `${genres},${value}`;
            }
        }
        if (characteristic === 'with_keywords') {
            if (surveyResults.with_keywords) {
                const keywords = surveyResults.with_keywords.toString();
                console.log(keywords);
                value = (keywords.match(new RegExp(`,${value}`, "g"))) ? keywords.replace(new RegExp(`,${value}`, "g"), "") : (keywords.match(new RegExp(`${value},`, "g"))) ? keywords.replace(new RegExp(`${value},`, "g"), "") : (keywords.match(new RegExp(`${value}`, "g"))) ? keywords.replace(new RegExp(`${value},`, "g"), "") : `${keywords},${value}`;
            }
        }

        setSurveyResults(surveyResults => ({ ...surveyResults, [characteristic]: value }));
        console.log(surveyResults);

    }

    slides = movieGenerationQuestions.map((movieSlide) => {
        return (
            movieSlide.values.map((type) => {
                if (movieSlide.display === 'checkbox') {
                    return (
                        <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} onClick={() => handleSurvey(type.value, movieSlide.type)} />
                    );
                };
                return (
                    <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} onClick={() => handleSurvey(type.value, movieSlide.type)} />
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
            <div className="d-flex justify-content-center">
                <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner p-2" />
            </div>
        );
    };
    const handleClick = () => {
        setCarouselVisible(carouselVisible => !carouselVisible);
        setSurveyResults(() => ({}));
    }

    const showMovies = () => {
        return (
            <>
                <Row>
                    <Row><button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"><SkipBackward alignmentBaseline="auto" className="align-middle" /></span>Generation Survey</button></Row>
                </Row>
                <Row xs="3">
                    {movieCards}
                </Row >
            </>
        );
    };
    const resetSurvey = () => {
        setSurveyResults(() => ({}));
        showCarousel();
        setCarouselVisible(carouselVisible => !carouselVisible);
        setSpinnerVisibility(spinnerVisibility => !spinnerVisibility);
        setCarouselVisible(carouselVisible => !carouselVisible);


    }
    return (
        <Container style={{ marginTop: '20px' }}>
            <div className="table">
                <Row>
                    {(carouselVisible) ?
                        showCarousel() :
                        (spinnerVisibility) ?
                            showSpinner() :
                            showMovies()
                    }
                    <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                        {modalHead}
                        {modalBody}
                    </Modal>
                </Row>
            </div>
            <Row>
                {(carouselVisible) ? <Button className="ml-auto mr-10 btnGenerate btn btn-light mb-10 " onClick={requestMovies}>Generate Movies</Button> : ''}
            </Row>
        </Container >
    );
}

export default MovieGenerationCarousel;



