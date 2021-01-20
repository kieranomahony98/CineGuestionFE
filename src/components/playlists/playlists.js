import React, { useState } from 'react';
import { Container, Modal, ModalHeader, Row, ModalBody } from 'reactstrap';
import MovieCard from '../cards/card';
import '../../css/PreviousCurations.css';
import tw from "twin.macro";
import { useSelector } from 'react-redux';
const HighlightedText = tw.span`text-primary-500`;
const route = 'https://image.tmdb.org/t/p/original';
let modalHead, modalBody;

const Playlists = ({ Playlist }) => {
    let movieCards;
    const [openModal, setModal] = useState(false);
    const [errors, setErrors] = useState(false);
    // console.log(Playlist);
    if (Playlist) {
        movieCards = Playlist.movies.map((m) => {
            return <MovieCard title={m.movieTitle} img={m.movieImagePath} rating={m.moviePopularity} desc={m.movieDescription} onClick={() => movieModal(m)} className="mb-3" />
        });
    }
    const toggle = () => {
        setModal(openModal => !openModal);
    }

    function movieModal(movie) {
        const { movieImagePath, movieTitle, movieDescription, moviePopularity, movieReleaseYear, movieGenres } = movie;
        modalHead = <ModalHeader className="modalH" cssModule={{ 'modal-title': 'w-100 text-center' }}>{movieTitle}</ModalHeader>
        modalBody = <ModalBody className="modalBody">
            <div className="modalImage mb-3">
                <img src={`${route}${movieImagePath}`} style={{ maxHeight: '200px', maxWidth: '200px' }} className="modalImage" />
            </div>
            <div className="modalDesc">
                <p className="mb-2"><HighlightedText><b>Movie description: </b></HighlightedText> {movieDescription}</p>
                <p className="mb-2"><HighlightedText><b>User rating: </b></HighlightedText>{moviePopularity}</p>
                <p className="mb-2"><HighlightedText><b>Release Year: </b> </HighlightedText>{movieReleaseYear}</p>
                <p className="mb-2"><HighlightedText><b>Included Genres:</b> </HighlightedText> {movieGenres}</p>
            </div>
        </ModalBody>
        setModal(() => true);
    }

    return (
        <Container>
            {(movieCards) ? <><Row xs="3"> {movieCards}</Row></> : ''}
            {
                (openModal) ?
                    <Modal isOpen={openModal} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                        {modalHead}
                        {modalBody}
                    </Modal>
                    :
                    ''
            }

        </Container >
    );
}


export default Playlists;
