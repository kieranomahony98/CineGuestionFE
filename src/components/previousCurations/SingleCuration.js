import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, Row } from "reactstrap";
import MovieCard from "../cards/card";
const SingleCuration = () => {
    const [modal, setModal] = useState(false);
    const [isMovies, setMovies] = useState(false);
    const data = useLocation();
    let movieCards;
    function createMovieDom() {
        movieCards = data.movies.map((movie) => {
            const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
            return <MovieCard title={movieTitle} img={movieImagePath} rating={moviePopularity} desc={movieDescription} onClick={() => movieModal(movie)} />


        });
        setMovies(() => true);
    }
    const toggle = () => {
        setModal(() => !Modal);
    }

    let modalHead, modalBody;
    function movieModal(movie) {

        setModal(() => false);
        const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
        modalHead = <ModalHeader className="modalH" cssModule={{ 'modal-title': 'w-100 text-center' }}>{movieTitle}</ModalHeader>
        modalBody =
            <ModalBody className="modalBody">

            </ModalBody>
        setModal(() => true);
    }
    return (
        <Row>
            {(isMovies) ? movieCards : createMovieDom()}
            <Modal isOpen={modal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull" >
                {modalHead}
                {modalBody}
            </Modal >
        </Row>
    );


}

export default SingleCuration;