import React from 'react';
import { Row, Col, Container, Card, CardImg } from 'reactstrap';
import "../../css/movieDetials.css";
import { HighlightedText } from "components/playlists/playlists"

const MovieDetails = () => {
    const fakeMovie = {
        title: "Adaptive",
        image: `https://image.tmdb.org/t/p/original/uDsJ0RraJDRjz46n30VkIYlqZ46.jpg`,
        pop: 'no votes',
        description: 'testing movies to see how stuff works',
        releaseYear: 2019,
        genres: 'action, classical, hard core rock'
    }
    return (

        <Row className="tm-bg-gray movieImg">
            <Col>
                <img src={fakeMovie.image} className="movieImg" />
            </Col>
            <Col className="desc">
                <h3>{fakeMovie.title}</h3>
                <p><HighlightedText> Genres:</HighlightedText> {fakeMovie.genres}</p>
                <p><HighlightedText> Popularity:</HighlightedText>  {fakeMovie.pop}</p>
                <p><HighlightedText> Release Year: </HighlightedText> {fakeMovie.releaseYear}</p>
                <p><HighlightedText> Description: </HighlightedText>  {fakeMovie.description}</p>

            </Col>
        </Row>
    )
}
export default MovieDetails;