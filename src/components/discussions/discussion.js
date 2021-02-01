import React, { useEffect, useState } from 'react';
import axios from 'axios';
import route from '../../data/Routes';
import MovieCard from 'components/cards/card';
import { Container, Row, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addMovieDiscussion } from 'actions/movieActions';

const Discussion = () => {
    const [discussion, setDiscussions] = useState([])
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        getAllDiscussions()
            .then((discussions) => {
                setDiscussions(() => discussions.map((discussion, index) => {
                    return <MovieCard key={index} title={discussion.movieTitle} img={discussion.movieImagePath} rating={discussion.rating} onClick={() => onClick(discussion)} />
                }));
            });
    }, []);

    const onClick = (discussion) => {
        dispatch(addMovieDiscussion(discussion));
        history.push({
            pathname: `/movies/discussions/${discussion.movieId}`
        });
    }

    return (
        <Container>
            <Row xs="3">
                {discussion.length > 0 ? discussion : ''}
            </Row >
        </Container>
    )
}

async function getAllDiscussions() {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    return await axios.get(`${route}/api/movies/discussions/getDiscussions`, config)
        .then((res) => res.data)
        .catch((err) => {
            console.log(`Faield to get discussions: ${err.message}`);
            return 'Failed to get discussions, please try again later';
        });
}
export default Discussion;