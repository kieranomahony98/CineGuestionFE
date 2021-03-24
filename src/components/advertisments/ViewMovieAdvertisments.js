import React, { useEffect, useState } from 'react';
import { Container, Badge, Row } from 'reactstrap';
import MovieCard from 'components/cards/card';
import stockImage from "images/stock-photo.jpeg";
import MovieModal from "components/modal/movieModal";
import { useParams } from 'react-router';
import Loader from "react-loader-spinner";
import { getRequest } from 'axios/axiosHandler';

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
                if (!movies) {
                    setErrors(error => !error);
                }
                setMovies(() => [...filterMovies(movies)]);

            });

    }, []);

    const filterMovies = movies => {
        return movies.map((m, i) => {
            return <MovieCard key={i} md="4" xs="6" title={m.movieDetails.movieTitle} img={(m.movieDetails.movieImagePath) ? m.movieDetails.movieImagePath : stockImage} notRoute={true} onClick={() => { movie = m; toggle(); }} className="mb-3" />
        });
    }
    const toggle = () => {
        setOpenModal(openModal => !openModal);
    }

    return (
        <Container>
            {error ? <Row><Badge color="warning">Sorry, we could not get community movies right now, please try again later</Badge></Row> : ""}

            {movies.length === 0 ? <Row className="justify-content-center"> <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /></Row> : <Row> {movies}          </Row>}

            {
                (openModal) ? <MovieModal toggle={toggle} isUserPage={isUserMovie} movieId={movie._id} isOpen={openModal} moviePlaybackPath={movie.movieDetails.moviePlaybackPath} movieImagePath={movie.movieDetails.movieImagePath} movieTitle={movie.movieDetails.movieTitle} movieDescription={movie.movieDetails.movieDescription} userName={movie.user.userName} moviePopularity={movie.movieDetails.moviePopularity} movieReleaseYear={movie.movieDetails.movieReleaseYear} userId={movie.user.userId} movieCredits={movie.movieDetails.movieCredits} movieGenres={movie.movieDetails.movieGenres} /> : ""
            }
        </Container>
    )
};

async function requestMovies() {
    return await getRequest("/api/movies/indie/get")
        .then((data) => data)
        .catch((err) => false);
}

async function requestMoviesForOneUser(userId) {
    return await getRequest(`/api/movies/indie/get/${userId}`)
        .then((data) => data)
        .catch((err) => false);
}