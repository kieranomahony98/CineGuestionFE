import React, { useState } from "react";
import MovieGenerationCheckbox from "./MovieGenerationCheckbox";
import { Carousel } from "react-responsive-carousel"
import MovieGenerationRadioButton from "./MovieGenerationRadioButton";
import { Button, Container, Row, Col, Table } from "reactstrap";
import movieGenerationQuestions from "../../data/MovieGenerationQuestions";
import Loader from "react-loader-spinner";
import MovieModal from "components/modal/movieModal"
import MovieCard from "../cards/card";
import { MoviePopover } from "components/popover/popover";
import MovieRequests from "../../data/MovieRequests";
import { moviePopoverText } from "helpers/PopoverText";
import tw from "twin.macro";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../MovieGeneration.css";
import { useSelector } from "react-redux";


const HighlightedText = tw.span`text-primary-500`;

let movieCards;
let movie;
let slides;
const MovieGenerationCarousel = () => {
    const [carouselVisible, setCarouselVisible] = useState(true);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [openModal, setModal] = useState(false);
    const [surveyResults, setSurveyResults] = useState({});
    const [popover, setPopover] = useState(false);
    const [popOverText, setPopoverText] = useState({
        title: "Curation Help",
        body: "Select anything you want to see in your movies. Everything is optional so dont feel pressured to select some slides!"
    });
    const [isRevised, setIsRevised] = useState(false);
    const popoverToggle = () => {
        setPopover(popover => !popover);
    }

    const { token } = useSelector(state => state.auth);
    const toggle = () => setModal(!openModal);
    async function requestMovies() {
        setCarouselVisible(false);
        setSpinnerVisibility(true);
        movieCards = await MovieRequests(token, surveyResults)
            .then(({ moviesDom, isRevised }) => {
                moviePopoverText(moviesDom.movieSearchCriteria)
                    .then((text) => {
                        setPopoverText(popOverText => ({ ...popOverText, title: "Generation Detials", body: text.body }));
                    })
                if (isRevised) setIsRevised(() => true);
                return moviesDom.movies.map((m, index) => {
                    const { movieImagePath, movieTitle, movieDescription, moviePopularity } = m;
                    return <MovieCard title={movieTitle} md="4" xs="6" img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => { movie = m; setModal(() => true) }} key={index} />
                });
            }).catch((err) => {
                throw err;
            });
        setSpinnerVisibility(false);
    }

    const handleSurvey = (value, characteristic) => {
        if (characteristic === "with_genres") {
            if (surveyResults.with_genres) {
                const genres = surveyResults.with_genres.toString();
                value = (genres.match(new RegExp(`,${value}`, "g"))) ? genres.replace(new RegExp(`,${value}`, "g"), "") : (genres.match(new RegExp(`${value},`, "g"))) ? genres.replace(new RegExp(`${value},`, "g"), "") : (genres.match(new RegExp(`${value}`, "g"))) ? genres.replace(new RegExp(`${value}`, "g"), "") : `${genres},${value}`;
            } else {
                value = value.toString();
            }
        }
        if (characteristic === "with_keywords") {
            if (surveyResults.with_keywords) {
                const keywords = surveyResults.with_keywords.toString();
                value = (keywords.match(new RegExp(`,${value}`, "g"))) ? keywords.replace(new RegExp(`,${value}`, "g"), "") : (keywords.match(new RegExp(`${value},`, "g"))) ? keywords.replace(new RegExp(`${value},`, "g"), "") : (keywords.match(new RegExp(`${value}`, "g"))) ? keywords.replace(new RegExp(`${value},`, "g"), "") : `${keywords},${value}`;
            }
        }
        setSurveyResults(surveyResults => ({ ...surveyResults, [characteristic]: value }));
    }

    slides = movieGenerationQuestions.map((movieSlide) => {
        return (
            movieSlide.values.map((type) => {
                if (movieSlide.display === "checkbox") {
                    return (
                        <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} clickAction={() => handleSurvey(type.value, movieSlide.type)} />
                    );
                };
                return (
                    <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} clickAction={() => handleSurvey(type.value, movieSlide.type)} />
                );
            }));
    });
    slides = slides.map((slide) => {
        return (
            <div key="carouselItem" className="carouselDiv">
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
            <Row className="justify-content-center">
                <Col xs="1">
                    < Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner p-2" />
                </Col>
            </Row >
        );
    };
    const handleClick = () => {
        setIsRevised(() => false);
        setCarouselVisible(carouselVisible => !carouselVisible);
        setSurveyResults(() => ({}));
    }

    const showMovies = () => {
        return (
            <>
                <Row>
                    <button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"></span>Generation Survey</button>
                </Row>
                <Row>
                    {movieCards}
                </Row >
            </>
        );
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <Row>
                <MoviePopover target="target1" toggle={popoverToggle} isOpen={popover} title={popOverText.title} body={popOverText.body} />
                {isRevised ? <HighlightedText className="mx-auto">Youre query was altered to guarantee movie responses!</HighlightedText> : ""}
            </Row>
            {(carouselVisible) ?
                <Row className="justify-content-center">

                    <div className="table">
                        {showCarousel()}
                    </div>
                </Row>

                :
                (spinnerVisibility) ?
                    showSpinner() :
                    showMovies()
            }
            {
                (openModal) ? <MovieModal toggle={toggle} movieId={movie.movieId} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ""
            }


            <Row>
                {(carouselVisible) ? <Button className="ml-auto mr-10 btnGenerate btn btn-light mb-10 " onClick={requestMovies}>Generate Movies</Button> : ""}
            </Row>
        </Container >
    );
}

export default MovieGenerationCarousel;



