import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "reactstrap";
import "../../css/movieDetials.css";
import { HighlightedText } from "components/playlists/playlists"
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ReactComponent as Back } from "feather-icons/dist/icons/skip-back.svg";
import route from "data/Routes";
import axios from "axios"
const MovieDetails = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const history = useHistory();

    const route = "https://image.tmdb.org/t/p/original";
    const { movieDiscussion } = useSelector(state => state.movies);
    useEffect(() => {
        if (parseInt(movieId) !== movieDiscussion.movieId) {
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

                    <Row className="tm-bg-gray movieImg">
                        <Col>
                            <img src={`${route}${movie.movieImagePath}`} className="movieImg" />
                        </Col>

                        <Col className="desc justify-content-center">
                            <h3>{movie.movieTitle}</h3>
                            <p className="mt-2"><HighlightedText> Genres:</HighlightedText> {movie.movieGenres}</p>
                            <p className="mt-2"><HighlightedText> Popularity:</HighlightedText>  {movie.moviePopularity}</p>
                            <p className="mt-2"><HighlightedText> Release Year: </HighlightedText> {movie.movieReleaseYear}</p>
                            <p className="mt-2"><HighlightedText> Description: </HighlightedText>  {movie.movieDescription}</p>

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