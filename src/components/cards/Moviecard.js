import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import "../../MovieCard.css";
import MovieModal from '../modal/movieModal';
const route = 'https://image.tmdb.org/t/p/original';

const MovieCard = (
    {
        title,
        img
    }
) => {


    return (
        <Card className="MovieItem">
            <CardImg src={`${route}${img}`} className="MovieItem-img" />
            <CardBody>
                <CardTitle tag="p" className="movieTitle text-center">{title}</CardTitle>
            </CardBody>
        </Card>
    )
}

export default MovieCard;