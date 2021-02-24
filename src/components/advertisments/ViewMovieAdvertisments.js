import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import route from "data/Routes";
import { Container, Badge, Row } from 'reactstrap';
import MovieCard from 'components/cards/card';
import stockImage from "images/stock-photo.jpeg";
import MovieModal from "components/modal/movieModal";
import { useParams } from 'react-router';

let movie;
export default ({ isUserMovie }) => {
    const { userId } = useParams();

    const [movies, setMovies] = useState([]);
    const [error, setErrors] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!userId) {
            requestMovies()
                .then((movies) => {
                    setMovies(() => [...filterMovies(movies)]);

                }).catch((err) => {

                    setErrors((error) => !error);
                });
            return;
        }
        requestMoviesForOneUser(userId)
            .then((movies) => {
                console.log(movies);
                if (!movies) {
                    setErrors(error => !error);
                }

                setMovies(() => [...filterMovies(movies)]);

            })

    }, []);

    const filterMovies = movies => {
        return movies.map((m) => {
            console.log(m.movieDetails.movieTitle);
            return <MovieCard md="4" xs="6" title={m.movieDetails.movieTitle} img={(m.movieDetails.movieImagePath) ? m.movieDetails.movieImagePath : stockImage} notRoute={true} onClick={() => { movie = m; toggle(); }} className="mb-3" />
        });
    }
    const toggle = () => {
        setOpenModal(openModal => !openModal);
    }
    return (
        <Container>
            {error ? <Row><Badge color="warning">Sorry, we could not get community movies right now, please try again later</Badge></Row> : ""}
            <Row>
                {movies}
            </Row>
            {
                (openModal) ? <MovieModal toggle={toggle} isUserPage={isUserMovie} movieId={movie._id} isOpen={openModal} moviePlaybackPath={movie.movieDetails.moviePlaybackPath} movieImagePath={movie.movieDetails.movieImagePath} movieTitle={movie.movieDetails.movieTitle} movieDescription={movie.movieDetails.movieDescription} userName={movie.user.userName} moviePopularity={movie.movieDetails.moviePopularity} movieReleaseYear={movie.movieReleaseYear} userId={movie.user.userId} movieGenres={movie.movieGenres} /> : ""
            }
        </Container>
    )
};

async function requestMovies() {
    console.log('called');
    return axios.get(`${route}/api/movies/indie/get`)
        .then((movies) => {
            return movies.data;
        })
        .catch((err) => {
            return false;
        });
}

async function requestMoviesForOneUser(userId) {
    return axios.get(`${route}/api/movies/indie/get/${userId}`)
        .then((res) => res.data)
        .catch((err) => false);
}