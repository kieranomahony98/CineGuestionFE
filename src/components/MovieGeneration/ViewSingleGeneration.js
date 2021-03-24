import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container, Row } from 'reactstrap';
import Loader from 'react-loader-spinner';
import MovieCard from 'components/cards/card';
import MovieModal from 'components/modal/movieModal';
import { MoviePopover } from 'components/popover/popover';
import { moviePopoverText } from 'helpers/PopoverText';
import { getRequest } from 'axios/axiosHandler';

let movie;
export default () => {
    const { generationId } = useParams();
    console.log(generationId);
    const [errors, setErrors] = useState(false);
    const [movies, setMovies] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [popOverText, setPopoverText] = useState({
        title: "",
        body: ""
    });
    const [popover, setPopover] = useState(false);
    useEffect(() => {
        if (!generationId) return;
        makeRequest(generationId)
            .then((movies) => {
                console.log(movies);
                if (!movies) { setErrors(errors => !errors); return; }
                if (movies.movieSearchCriteria) {
                    moviePopoverText(movies?.movieSearchCriteria)
                        .then((text) => {
                            setPopoverText((popOverText) => ({ ...popOverText, title: text.title, body: text.body }));
                        });
                } else {
                    setPopoverText((popOverText) => ({ ...popOverText, title: "Generation Details", body: "This generation shows the hottest movies out right now!" }));
                }
                setMovies(() => [...movies.movies]);
            }).catch((err) => {
                setErrors(errors => !errors);
            });

    }, []);
    const toggle = () => {
        setOpenModal((openModal) => !openModal);
    }
    const popoverToggle = () => {
        setPopover((popover) => !popover);
    }
    return (
        <Container>
            <MoviePopover toggle={popoverToggle} target="movieQuestionaire" isOpen={popover} title={popOverText.title} body={popOverText.body} />

            {errors ? <Row><h2>Sorry, we couldnt get those movies for you, please try again later, or try out or generate page to get discovering now!!!1</h2></Row> : ""}
            {(movies.length === 0) && !errors ?
                <Row className="justify-content-center"><Loader type="ThreeDots" /> </Row>
                : <Row xs="3">
                    {
                        movies.map((m) => (<MovieCard title={m.movieTitle} md="4" xs="6" img={m.movieImagePath} rating={m.moviePopularity} onClick={() => { movie = m; setOpenModal(openModal => !openModal); }} />))
                    }
                </Row>

            }
            {(openModal) ? <MovieModal toggle={toggle} movieId={movie.movieId} isOpen={openModal} movieImagePath={movie.movieImagePath} movieTitle={movie.movieTitle} movieDescription={movie.movieDescription} moviePopularity={movie.moviePopularity} movieReleaseYear={movie.movieReleaseYear} movieGenres={movie.movieGenres} /> : ''}

        </Container>

    )
}

async function makeRequest(generationId) {
    return await getRequest(`/api/movies/generations/single/${generationId}`)
        .then((data) => data)
        .catch((err) => false)
}