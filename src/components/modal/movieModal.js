import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import tw from 'twin.macro';

const HighlightedText = tw.span`text-primary-500`;
const MovieModal = ({
    movieImagePath,
    movieTitle,
    movieDescription,
    moviePopularity,
    movieReleaseYear,
    movieGenres
}) => {
    const route = 'https://image.tmdb.org/t/p/original';
    const [modal, setModal] = useState(true);
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <>
            <div className="modalImage mb-3">
                <img src={`${route}${movieImagePath}`} style={{ maxHeight: '200px', maxWidth: '200px' }} className="modalImage" />
            </div>
            <div className="modalDesc">
                <p className="mb-2"><HighlightedText><b>Movie description: </b></HighlightedText> {movieDescription}</p>
                <p className="mb-2"><HighlightedText><b>User rating: </b></HighlightedText>{moviePopularity}</p>
                <p className="mb-2"><HighlightedText><b>Release Year: </b> </HighlightedText>{movieReleaseYear}</p>
                <p className="mb-2"><HighlightedText><b>Included Genres:</b> </HighlightedText> {movieGenres}</p>
            </div>
        </>
    );
}

export default MovieModal;