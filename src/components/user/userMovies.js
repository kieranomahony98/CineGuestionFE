import React, { useEffect, useState } from "react";
import axios from "axios";
import route from "data/Routes";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import MovieModal from "components/modal/movieModal";
let movie;
export default () => {
    const { user, token } = useSelector(state => state.auth);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        makeRequest(user.id)
            .then((movies) => {
                setMovies(() => [...filterMovies(movies)]);
            }).catch(err => {
                setError(error => !error);
            });
    }, []);
    const filterMovies = movies => {
        return movies.map((m) => {
            return <MovieCard md="4" xs="6" title={m.movieDetails.movieTitle} img={(m.movieDetails.movieImagePath) ? m.movieDetails.movieImagePath : stockImage} notRoute={true} onClick={() => { movie = m; toggle(); }} className="mb-3" />
        });
    }
    const toggle = () => {
        setOpenModal(openModal => !openModal);
    }


    return (
        <Container>
            <Row>
                {(error) ? <h2>failed to get your movies, please try again later</h2> : ""}
            </Row>
            <Row>
                {movies}
            </Row>
            {(openModal) ? <MovieModal toggle={toggle} deleteMovie={() => deleteMovie(movie)} movieId={movie._id} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} userId={user.id} isUserPage={true} /> : ""}

        </Container>
    );
}

async function makeRequest(userId) {
    axios.get(`${route}/api/movies/user/get/:${userId}`)
        .then((res) => res.data)
        .catch((err) => {
            return false;
        })
}

async function deleteUserMovie(movieDetails, token) {
    console.log('in here');
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = {
        movieDetails
    }
    if (token) {
        config.headers["x-auth-token"] = token;
        return await axios.post(`${Routes}/api/movies/indie/delete`, body, config)
            .then((deleted) => deleted)
            .catch((err) => false);
    }
}