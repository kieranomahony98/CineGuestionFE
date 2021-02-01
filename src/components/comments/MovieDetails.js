import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import "../../css/movieDetials.css";
import { HighlightedText } from "components/playlists/playlists"
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactComponent as Back } from "feather-icons/dist/icons/skip-back.svg";
const MovieDetails = () => {
    const history = useHistory();
    const route = "https://image.tmdb.org/t/p/original";
    const { movieDiscussion } = useSelector(state => state.movies);
    const buttonClick = () => {
        history.push({
            pathname: "/movies/discussions"
        });
    }
    return (
        <>
            <Row><Button className="mb-4" onClick={buttonClick}><Back style={{ display: 'inline-block' }} /><span className="ml-1">Back to Discussions</span></Button> </Row>

            <Row className="tm-bg-gray movieImg">
                <Col>
                    <img src={`${route}${movieDiscussion.movieImagePath}`} className="movieImg" />
                </Col>
                <Col className="desc">
                    <h3>{movieDiscussion.movieTitle}</h3>
                    <p><HighlightedText> Genres:</HighlightedText> {movieDiscussion.movieGenres}</p>
                    <p><HighlightedText> Popularity:</HighlightedText>  {movieDiscussion.moviePopularity}</p>
                    <p><HighlightedText> Release Year: </HighlightedText> {movieDiscussion.movieReleaseYear}</p>
                    <p><HighlightedText> Description: </HighlightedText>  {movieDiscussion.movieDescription}</p>

                </Col>
            </Row>
        </>
    )
}
export default MovieDetails;