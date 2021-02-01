import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import tw from 'twin.macro';
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovieDiscussion } from 'actions/movieActions';
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
const HighlightedText = tw.span`text-primary-500`;
const MovieModal = ({
    movieId,
    movieImagePath,
    movieTitle,
    movieDescription,
    moviePopularity,
    movieReleaseYear,
    movieGenres,
    isOpen,
    toggle
}) => {
    const movie = {
        movieId,
        movieImagePath,
        movieTitle,
        movieDescription,
        moviePopularity,
        movieReleaseYear,
        movieGenres,
    }
    const dispatch = useDispatch();
    const history = useHistory();

    const route = 'https://image.tmdb.org/t/p/original';
    const goToDiscussion = () => {
        dispatch(addMovieDiscussion(movie));
        history.push({
            pathname: `/movies/discussions/${movie.movieId}`
        });
    }
    return (
        <>
            <Modal isOpen={isOpen} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                <ModalHeader className="modalH" cssModule={{ 'modal-title': 'w-100 text-center' }}>{movieTitle}</ModalHeader>
                <ModalBody className="modalBody">
                    <div className="modalImage mb-3">
                        <img src={`${route}${movieImagePath}`} style={{ maxHeight: '200px', maxWidth: '200px' }} className="modalImage" alt={movieTitle} />
                    </div>
                    <div className="modalDesc">
                        <p className="mb-2"><HighlightedText><b>Movie description: </b></HighlightedText> {movieDescription}</p>
                        <p className="mb-2"><HighlightedText><b>User rating: </b></HighlightedText>{moviePopularity}</p>
                        <p className="mb-2"><HighlightedText><b>Release Year: </b> </HighlightedText>{movieReleaseYear}</p>
                        <p className="mb-2"><HighlightedText><b>Included Genres:</b> </HighlightedText> {movieGenres}</p>
                    </div>
                    <PrimaryButton onClick={goToDiscussion}>View Discussion!</PrimaryButton>

                </ModalBody>
            </Modal>
        </>
    );
}

export default MovieModal;