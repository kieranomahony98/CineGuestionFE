import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, Row, Col, Badge } from "reactstrap";
import tw from "twin.macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMovieDiscussion } from "actions/movieActions";
import { postRequest } from "axios/axiosHandler";
//tw components come from the template, check out the read me for more.
const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;
const HighlightedText = tw.span`text-primary-500`;
const MovieModal = ({
    movieId,
    movieImagePath,
    movieTitle,
    movieDescription,
    moviePopularity,
    movieReleaseYear,
    isOpen,
    toggle,
    movieGenres,
    movieCredits,
    moviePlaybackPath,
    userName,
    userId,
    isUserPage,
    editMoviePage,
}) => {

    const movie = {
        movieId,
        movieImagePath,
        movieTitle,
        movieDescription,
        moviePopularity,
        movieReleaseYear,
        movieGenres,
        movieCredits,
        moviePlaybackPath
    };

    const dispatch = useDispatch();
    const history = useHistory();
    const { token, user } = useSelector(state => state.auth);
    const [deletedError, setDeletedError] = useState("");
    if (user && userId === user.id) {
        editMoviePage = true;
        isUserPage = true;
    }
    const route = "https://image.tmdb.org/t/p/original";
    const goToDiscussion = async () => {
        console.log(userName);
        if (userName === undefined) {
            dispatch(addMovieDiscussion(movie));
            history.push({
                pathname: `/movies/discussions/${movie.movieId}`
            });
            return;
        }
        history.push({
            pathname: `/movies/indie/get/user/${userId}`
        });

    }
    const editMovie = () => {
        history.push({
            pathname: `/movies/indie/edit/user/${movieId}`
        });
    }
    const deleteMovie = () => {
        deleteUserMovie({ movieId, userId }, token)
            .then((movie) => {
                if (!movie.isDeleted) {
                    setDeletedError(() => movie.error);
                    return;
                }
                window.location.reload();

            });
    }

    return (
        <>
            <Modal isOpen={isOpen} modalTransition={{ timeout: 500 }} toggle={toggle} className="modalFull">
                <ModalHeader className="modalH" cssModule={{ "modal-title": "w-100 text-center" }}>{movieTitle}</ModalHeader>
                <ModalBody className="modalBody">
                    <div className="modalImage mb-3">
                        {(moviePlaybackPath) ? <iframe height="100%" width="100%" src={moviePlaybackPath} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} /> : <img src={`${route}${movieImagePath}`} style={{ maxHeight: "200px", maxWidth: "200px" }} className="modalImage" alt={movieTitle} />}
                    </div>
                    <div className="modalDesc">
                        {deletedError ? <Badge color="warning">{deletedError}</Badge> : ""}
                        {movieDescription ? <p className="mb-2"><HighlightedText><b>Movie description: </b></HighlightedText> {movieDescription}</p> : ""}
                        {moviePopularity ? <p className="mb-2"><HighlightedText><b>User rating: </b></HighlightedText>{moviePopularity}</p> : ""}
                        {movieReleaseYear ? <p className="mb-2"><HighlightedText><b>Release Year: </b> </HighlightedText>{movieReleaseYear}</p> : ""}
                        {movieGenres ? <p className="mb-2"><HighlightedText><b>Included Genres:</b> </HighlightedText> {movieGenres}</p> : ""}
                        {movieCredits ? <p className="mb-2"><HighlightedText><b>Credits:</b> </HighlightedText> {movieCredits}</p> : ""}
                        {!isUserPage && !userName ? <p className="mb-2"><HighlightedText><b>Source:</b> </HighlightedText> TMDB</p> : ""}
                    </div>
                    {!isUserPage ? <PrimaryButton onClick={goToDiscussion}>{userName ? `View More Movies by ${userName}!` : "View Discussion!"}</PrimaryButton> : ""}
                    {editMoviePage ? <Row><Col><PrimaryButton onClick={editMovie}>Update Movie</PrimaryButton></Col><Col><PrimaryButton onClick={deleteMovie}>Delete Movie</PrimaryButton></Col></Row> : ""}
                </ModalBody>
            </Modal>
        </>
    );
}

async function deleteUserMovie(movieDetails, token) {
    if (!token) return false;

    const body = {
        movieDetails
    }
    return await postRequest("/api/movies/indie/delete", body, token)
        .then((data) => {
            return {
                isDeleted: true
            }
        }).catch((err) => {
            return {
                isDeleted: false,
                error: err.response?.data
            }
        })
}

export default MovieModal;