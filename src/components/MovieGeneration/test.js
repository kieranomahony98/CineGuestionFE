import React, { useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { Col, Container, Row } from "reactstrap";
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
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const QuestionSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-2xl font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Rating = tw.span`ml-2 font-bold`;

const Text = tw.div`ml-2 text-sm font-semibold text-gray-800`;
let movieCards, movie;
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
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
        ]
    };
    const slides = movieGenerationQuestions.map((movieSlide) => {
        return (
            movieSlide.values.map((type) => {
                if (movieSlide.display === 'checkbox') {
                    return (
                        <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} />
                    );
                }
                return (
                    <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} />
                );
            }));
    });
    const showCarousel = () => {
        return (
            <Col>
                {slides}

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


    return (
        <Container>
            <Content>
                <HeadingWithControl>
                    <Heading>Popular Hotels</Heading>

                </HeadingWithControl>

                <QuestionSlider ref={setSliderRef} {...sliderSettings}>

                    {slides.map((slide) => (
                        <Row>
                            {slide}
                        </Row>
                    ))}
                    <div style={{ textAlign: "center" }}>
                        <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
                        <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
                    </div>
                </QuestionSlider>
            </Content>
        </Container>
    );
};

