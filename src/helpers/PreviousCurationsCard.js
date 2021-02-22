import React, { useState } from "react"
import MovieCard from "../components/cards/card";
import { Col } from "reactstrap";
import MovieModal from "../components/modal/movieModal";

const PreviousCurationsCard = ({
    movieImagePath,
    movieTitle,
    movieDescription,
    moviePopularity,
    onClick }) => {
    const [card, setCard] = useState(null);
    const [modal, showModal] = useState(false);
    const route = "https://image.tmdb.org/t/p/original";

    const movieCards = () => {
        return (
            <Col key={movieTitle} sm="4" >
                <MovieCard img={movieImagePath}
                    title={movieTitle}
                    key={movieTitle}
                    desc={movieDescription}
                    rating={moviePopularity}
                    onClick={onClick}
                    md="4" xs="6"
                />
            </Col >
        )
    }


    return (
        <>
            {(card) ? card : movieCards()}
        </>

    )
}

export default PreviousCurationsCard;