import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import "../../css/movieDetials.css";
import { HighlightedText } from "components/playlists/playlists"
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Back } from "feather-icons/dist/icons/skip-back.svg";
import route from "data/Routes";
import axios from "axios"
import tw from "twin.macro";
import { findRenderedComponentWithType } from "react-dom/test-utils";

const MovieText = tw.p`sm:text-sm`;

const MovieDetails = () => {


    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const history = useHistory();

    const route = "https://image.tmdb.org/t/p/original";
    const { movieDiscussion } = useSelector(state => state.movies);
    useEffect(() => {
        if (!movieDiscussion || parseInt(movieId) !== movieDiscussion.movieId) {
            getMovie(movieId)
                .then((movie) => {
                    console.log(movie);
                    setMovie(() => movie);
                    return;
                });
        }
        setMovie(() => movieDiscussion);

    }, []);
    const buttonClick = () => {
        history.push({
            pathname: "/movies/discussions"
        });
    }
    return (

        <>
            {(movie) ?
                <>
                    <Row><Button className="mb-4" onClick={buttonClick}><Back style={{ display: "inline-block" }} /><span className="ml-1">Back to Discussions</span></Button> </Row>
                    <Row className="justify-content-center"><h3>{movie.movieTitle}</h3></Row>
                    <Row className="tm-bg-gray movieImg">
                        <Col style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <img src={`${route}${movie.movieImagePath}`} className="movieImg" />
                        </Col>

                        <Col className="desc justify-content-center ml-2" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            <p style={{ fontSize: "2vw" }}><HighlightedText> Genres:</HighlightedText><span><MovieText >{movie.movieGenres}</MovieText></span> </p>
                            <p style={{ fontSize: "2vw" }}><HighlightedText> Popularity:</HighlightedText>  <MovieText>{movie.moviePopularity}</MovieText></p>
                            <p style={{ fontSize: "2vw" }}><HighlightedText> Release Year: </HighlightedText> <MovieText>{movie.movieReleaseYear}</MovieText></p>
                            <p style={{ fontSize: "2vw" }}><HighlightedText> Description: </HighlightedText>  <MovieText>{movie.movieDescription}</MovieText></p>

                        </Col>
                    </Row>
                </> : ''}
        </>

    )
}

async function getMovie(movieId) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    return await axios.get(`${route}/api/movies/getMovie/${movieId}`, config)
        .then((res) => {
            console.log(res);
            return res.data[0];
        })
        .catch((err) => {
            throw err;
        });
}
export default MovieDetails;