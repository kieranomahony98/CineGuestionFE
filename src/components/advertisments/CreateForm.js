import React, { useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "images/cineGuestion/logo.png";
import route from "data/Routes";
import { validateMovie } from "validation/createMovieValidation";
import axios from "axios";
import { MoviePopover } from "components/popover/popover"
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { Form, Input, Row, Col, Container, ModalBody, Button, Badge } from "reactstrap";
import { HighlightedText } from "components/playlists/playlists";
import MovieCard from "components/cards/card";
import { useSelector } from "react-redux";
import { PrimaryButton } from "components/misc/Buttons";

const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const Heading = tw.h3`text-xl xl:text-xl font-extrabold`;

const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

export default ({
    logoLinkUrl = "#",
    headingText = "Add your movie to CineGuestion!",
    submitButtonText = "Create Posting!",
    SubmitButtonIcon = LoginIcon,
}) => {
    const [titlePopover, setTitlePopoer] = useState(false);
    const [releasePopover, setReleasePopover] = useState(false);
    const [creditsPopover, setCreditsPopover] = useState(false);
    const [descriptionPopover, setDescriptionPopover] = useState(false);
    const [imagePopover, setImagePopover] = useState(false);
    const [playbackPopover, setPlaybackPopover] = useState(false);
    const [genrePopover, setGenrePopover] = useState(false);
    const [isRadioChecked, setIsRadioChecked] = useState(false);
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState({
        movieTitle: "",
        movieReleaseYear: "",
        movieCredits: "",
        movieDescription: "",
        movieImagePath: "",
        moviePlaybackPath: "",
        movieGenres: ""
    });
    const [movieDetails, setMovieDetails] = useState({
        movieTitle: "",
        movieReleaseYear: "",
        movieCredits: "",
        movieDescription: "",
        movieImagePath: "",
        moviePlaybackPath: "",
        movieGenres: ""
    });
    const { user, token } = useSelector(state => state.auth);
    const genreToggle = () => setGenrePopover((genrePopover) => !genrePopover);
    const titleToggle = () => setTitlePopoer((titlePopover) => !titlePopover);
    const releaseToggle = () => setReleasePopover((releasePopover) => !releasePopover);
    const creditToggle = () => setCreditsPopover((creditsPopover) => !creditsPopover);
    const descriptionToggle = () => setDescriptionPopover((descriptionPopover) => !descriptionPopover);
    const imageToggle = () => setImagePopover((imagePopover) => !imagePopover);
    const playBackToggle = () => setPlaybackPopover((playbackPopover) => !playbackPopover);

    const updateMovieDetails = (e) => {
        const { name, value } = e.target;
        setMovieDetails((movieDetails) => ({
            ...movieDetails,
            [name]: value
        }));

        if (name === "moviePlaybackPath") {
            const isVerified = verifyYoutubeAddress(value);
            setIsAddressValid(() => isVerified);
        }
    }

    const radioToggle = () => {
        setIsRadioChecked((isRadioChecked) => !isRadioChecked);
    }

    const submit = (e) => {
        e.preventDefault();

        const { isValid, validation } = validateMovie(movieDetails);
        console.log(isValid);
        console.log(validation);
        if (!isValid) {
            setErrors(errors => ({ ...errors, ...validation }));
        }

        const verifyLink = verifyYoutubeAddress(movieDetails.moviePlaybackPath);
        if (!verifyLink) setErrors(errors => ({ ...errors, moviePlaybackPath: "Please enter a valid youtube URL, We ask you to use the embed link within the share option" }));
        console.log(errors);
        if (!isValid || !verifyLink) return;
        addMovieToDatabase(movieDetails, token, user)
            .then((movieAdded) => {
                if (movieAdded) {
                    setMovieDetails((movieDetails) => ({
                        ...movieDetails,
                        movieTitle: "",
                        movieReleaseYear: "",
                        movieCredits: "",
                        movieDescription: "",
                        movieImagePath: "",
                        moviePlaybackPath: "",
                        movieGenres: ""
                    }));
                    setSuccess(success => !success);
                }

            }).catch((err) => {
                throw err;
            });
    }

    return (
        <Container className="mt-3">
            <Row className="justify-content-center">
                <LogoLink href={logoLinkUrl}>
                    <LogoImage src={logo} />
                </LogoLink>
                {success ? <Badge color="green">Your Movie has successfully been uploaded!</Badge> : ''}
            </Row>
            <Row>
                <Col>
                    <Row className="justify-content-center">
                        <Heading>{headingText}</Heading>
                    </Row>
                    <Form className="ml-5" onSubmit={submit}>
                        <Row><Col md="10" sm="8"><Input type="text" name="movieTitle" placeholder="Movie Title" className="mb-2" onChange={updateMovieDetails} /></Col>   <Col sm="1"><MoviePopover isOpen={titlePopover} toggle={() => titleToggle()} target="movieTitle" title="Movie Title" body="Pleae enter the title of you movie!" /></Col></Row>
                        <Badge color="warning" className="mb-1">{errors.movieTitle}</Badge>
                        <Row><Col md="10" sm="8"><Input type="text" name="movieReleaseYear" placeholder="Movie Release Year" className="mb-2" onChange={updateMovieDetails} maxLength="4" /> </Col > <Col sm="1"><MoviePopover isOpen={releasePopover} toggle={() => releaseToggle()} target="release" title="Movie Release Year" body="Please enter the release year of your movie, in the format of YYYY/2019" /></Col></Row>
                        <Badge color="warning" className="mb-1">{errors.movieReleaseYear}</Badge>

                        <Row><Col md="10" sm="8"><Input type="text" name="movieCredits" placeholder="Credits" className="mb-2" onChange={updateMovieDetails} />  </Col>    <Col sm="1"><MoviePopover isOpen={creditsPopover} toggle={() => creditToggle()} title="Movie Credits" target="credits" body="Enter those who worked on the project, this is optional in order to keep privacy" /></Col></Row>

                        <Row><Badge color="warning" className="mb-1">{errors.movieCredits}</Badge></Row>

                        <Row><Col md="10" sm="8"><Input type="text" name="movieGenres" placeholder="Movie Genres" className="mb-2" onChange={updateMovieDetails} /> </Col> <Col sm="1"><MoviePopover isOpen={genrePopover} toggle={() => genreToggle()} title="Movie Genres" target="genres" body="Please enter the genres included in this movie, i.e. Action, Thriller, Animation." /></Col></Row>

                        <Row> <Badge color="warning" className="mb-1">{errors.movieCredits}</Badge></Row>

                        <Row><Col md="10" sm="8"><Input type="textarea" name="movieDescription" placeholder="Movie Description" className="mb-2" onChange={updateMovieDetails} />  </Col> <Col sm="1"><MoviePopover isOpen={descriptionPopover} toggle={() => descriptionToggle()} target="desc" title="Movie Description" body="Please enter a short description of your movie" /></Col></Row>
                        <Row> <Badge color="warning" className="mb-1">{errors.movieDescription}</Badge></Row>

                        <Row><Col md="10" sm="8"><Input type="text" name="movieImagePath" placeholder="Movie Image URL" className="mb-2" onChange={updateMovieDetails} />    </Col> <Col sm="1"><MoviePopover isOpen={imagePopover} toggle={() => imageToggle()} title="Movie Image" target="movieImg" body="Please enter the URL of image source for your movie, this is optional so if there is none we will put in a placeholder for you" /></Col></Row>

                        <Row><Col md="10" sm="8"><Input type="text" name="moviePlaybackPath" placeholder="Movie Playback URL" className="mb-2" onChange={updateMovieDetails} /> </Col> <Col sm="1"><MoviePopover isOpen={playbackPopover} toggle={() => playBackToggle()} title="Movie Playback" target="playback" body="Please enter the URL where the movie is uploaded, make sure to grab the 'embed' link under share rather then the link in your web browser. Please note, as of now we only accept youtube uploads." /></Col></Row>
                        <Row><Badge color="warning" className="mb-1">{errors.moviePlaybackPath}</Badge></Row>

                        <SubmitButton type="submit">
                            <SubmitButtonIcon className="icon" />
                            <span className="text">{submitButtonText}</span>
                        </SubmitButton>
                    </Form>
                </Col>
                <Col className="mt-6">
                    {/* <Heading>Preview</Heading> */}
                    <SubmitButton onClick={radioToggle} className="mt-2" > <span className="text">{!isRadioChecked ? "See Movie Card" : "See Movie Modal"}</span></SubmitButton>
                    {(isRadioChecked) ?

                        <MovieCard title={movieDetails.movieTitle} img={movieDetails.movieImagePath} notRoute={true} />

                        :
                        <ModalBody className="modalBody" style={{ marginLeft: "0%" }}>
                            <div className="modalImage mb-3">
                                {
                                    (isAddressValid) ?
                                        <iframe width="100%" height="100%" src={movieDetails.moviePlaybackPath} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} /> : <img src={`${movieDetails.movieImagePath}`} style={{ maxHeight: "200px", maxWidth: "200px" }} className="modalImage" />
                                }
                            </div>
                            <div className="modalDesc">
                                <HighlightedText className="mb-5"><b>Movie Title: </b></HighlightedText>{movieDetails.movieTitle}
                                <br />
                                <HighlightedText className="mb-5"><b> Movie description: </b></HighlightedText>{movieDetails.movieDescription}
                                <br />
                                <HighlightedText className="mb-5"><b>Release Year: </b> </HighlightedText>{movieDetails.movieReleaseYear}
                                <br />
                                <HighlightedText className="mb-5"><b>Included Genres:</b> </HighlightedText>{movieDetails.movieGenres}
                                <br />
                                <HighlightedText className="mb-5"><b>Credits:</b> </HighlightedText>{movieDetails.movieCredits}

                            </div>
                        </ModalBody>
                    }

                </Col>
            </Row>
        </Container >
    )
}


function verifyYoutubeAddress(clientUrl) {
    if (clientUrl != undefined || clientUrl != '') {

        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        const match = clientUrl.match(regExp);
        if (match && match[2].length == 11) {
            console.log("afas");
            return true;
        }
    }
    return false
}


async function addMovieToDatabase(movieObj, token, currentUser) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = {
        movieObj,
        currentUser
    }
    if (token) {
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/movies/indie/create`, body, config)
            .then((res) => res)
            .catch((err) => {
                return false;
            })
    }

}