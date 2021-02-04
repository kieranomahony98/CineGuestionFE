import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as Play } from "feather-icons/dist/icons/play.svg";
import { Col, Container, Row, Button } from "reactstrap";
import MovieGenerationRadioButton from './MovieGenerationRadioButton';
import MovieGenerationCheckbox from './MovieGenerationCheckbox';
import movieGenerationQuestions from '../../data/MovieGenerationQuestions';
import Loader from 'react-loader-spinner';
import MovieModal from 'components/modal/movieModal'
import MovieCard from '../cards/card';
import { MoviePopover } from "components/popover/popover";
import MovieRequests from '../../data/MovieRequests';
import { moviePopoverText } from "helpers/PopoverText";
import "../../MovieGeneration.css";
import { useSelector } from 'react-redux';
const HighlightedText = tw.h6`text-primary-500`;


const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;
// all the tailwind stuff inside here is from template, however im learning as I go
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;

const SlideCounter = tw.p`text-gray-400	`
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const QuestionSlider = styled(Slider)`
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1 border sm:rounded-xl  border-gray-400 mr-2 ml-2`}
  }
`;
// const Slide = tw.div`sm:border max-w-sm sm:rounded-4xl relative focus:outline-none border-4 border-gray-500`

let movieCards, movie;
function ArrowBack({ onClick }) {
    return <PrevButton onClick={onClick}><ChevronLeftIcon /></PrevButton>
}
function ArrowNext({ onClick }) {
    return <NextButton onClick={onClick}><ChevronRightIcon /></NextButton>

}
export default () => {
    // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
    const [sliderRef, setSliderRef] = useState(null);
    const [carouselVisible, setCarouselVisible] = useState(true);
    const [spinnerVisibility, setSpinnerVisibility] = useState(false);
    const [openModal, setModal] = useState(false);
    const [surveyResults, setSurveyResults] = useState({});
    const [popover, setPopover] = useState(false);
    const [popOverText, setPopoverText] = useState({
        title: "Curation Help",
        body: "Select anything you want to see in your movies. Everything is optional so dont feel pressured to select some slides!"
    });
    const [slideCount, setSlideCount] = useState(1);
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
                    return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => { movie = m; setModal(() => true) }} key={index} />
                });
            }).catch((err) => {
                throw err;
            });
        setSpinnerVisibility(false);
    }

    const sliderSettings = {
        arrows: false,
        slidesToShow: 1,

        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 1,
                }
            },

            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                }
            },
        ],

        prevArrow: <ArrowBack onClick={sliderRef?.slickPrev} />,
        nextArrow: <ArrowBack onClick={sliderRef?.slickNext} />
    };
    const handleSurvey = (value, characteristic) => {
        if (characteristic === 'with_genres' || characteristic === "with_keywords" || characteristic === "with_companies") {
            if (surveyResults[characteristic]) {
                const genres = surveyResults[characteristic].toString();
                value = (genres.match(new RegExp(`,${value}`, "g"))) ? genres.replace(new RegExp(`,${value}`, "g"), "") : (genres.match(new RegExp(`${value},`, "g"))) ? genres.replace(new RegExp(`${value},`, "g"), "") : (genres.match(new RegExp(`${value}`, "g"))) ? genres.replace(new RegExp(`${value}`, "g"), "") : `${genres},${value}`;
            } else {
                value = value.toString();
            }
        }
        setSurveyResults(surveyResults => ({ ...surveyResults, [characteristic]: value }));
        console.log(surveyResults);
    }

    const slides = movieGenerationQuestions.map((movieSlide, i) => {
        const className = movieSlide.type === "with_genres" || movieSlide.type === "with_companies" ? "objects" : '';
        const title = movieSlide.type === "with_genres" ? "Genres" : movieSlide.type === "primary_release_year" ? "Release Year" : movieSlide.type === "sort_by" ? "Rate by" : movieSlide.type === "with_companies" ? "Production Studios" : "Sub Genres";
        return (
            <React.Fragment key={i}>
                <HighlightedText style={{ textAlign: "center" }}>{title}</HighlightedText>
                <Container className={className}>
                    <Row>
                        <Col>
                            <table>
                                <tbody>
                                    {movieSlide.values.map((type) => {
                                        if (movieSlide.display === 'checkbox') {

                                            return (
                                                <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} clickAction={() => handleSurvey(type.value, movieSlide.type)} />
                                            );
                                        }
                                        return (
                                            <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} clickAction={() => handleSurvey(type.value, movieSlide.type)} />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    });

    const showSpinner = () => {
        return (
            <Row className="justify-content-center">
                <Col xs="1">
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner p-2" />
                </Col>
            </Row >
        );
    };
    const showMovies = () => {
        return (
            <>
                <Row>
                    <Row><button onClick={() => handleClick()} className="btn btn-light mb-3"><span className="d-inline-block mr-2"></span>Generation Survey</button></Row>
                </Row>
                <Row xs="3">
                    {movieCards}
                </Row >
            </>
        );
    };

    const handleClick = () => {
        setIsRevised(() => false);
        setCarouselVisible(carouselVisible => !carouselVisible);
        setSurveyResults(() => ({}));
    }
    const increment = (e) => {
        const slideNo = (slideCount === 1 && e === "right") ? 5 : (slideCount === 5 && e === "left") ? 1 : (e === "left") ? slideCount + 1 : slideCount - 1;
        setSlideCount(() => slideNo);

    }

    return (
        <Container>
            <Row>
                <MoviePopover toggle={popoverToggle} isOpen={popover} title={popOverText.title} body={popOverText.body} />
                {isRevised ? <HighlightedText className="mx-auto">Youre query was altered to guarantee movie responses!</HighlightedText> : ''}
            </Row>
            {(carouselVisible) ?
                <>
                    <Row className="justify-content-center">
                        <Col >
                            <Controls>
                                <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
                            </Controls>
                        </Col>
                        <Col>
                            <Controls style={{ display: 'table', margin: 'auto' }}>
                                <Button className="ml-auto mr-10 btnGenerate btn btn-light mb-10 " onClick={requestMovies}><Play className="mr-1" style={{ verticalAlign: "middle", display: "inline-block" }} />Generate Movies</Button>
                            </Controls>
                        </Col>
                        <Col>
                            <Controls style={{ float: "right" }}>
                                <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
                            </Controls>
                        </Col>

                    </Row>
                    <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <SlideCounter style={{ float: "right" }}>{slideCount}/5</SlideCounter>
                        </Col>
                    </Row>

                    <QuestionSlider ref={setSliderRef} {...sliderSettings} onSwipe={increment}>
                        {slides.map((s) => s)}
                    </QuestionSlider>

                </>
                :
                (spinnerVisibility) ?
                    showSpinner() :
                    showMovies()
            }
            {(openModal) ? <MovieModal toggle={toggle} movieId={movie.movieId} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ''}

        </Container >
    );
};

