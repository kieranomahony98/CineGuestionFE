import React, { useEffect, useState } from "react";
import axios from "axios";
import route from "../../data/Routes";
import MovieCard from "components/cards/card";
import { Container, Row } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMovieDiscussion } from "actions/movieActions";

const Discussion = () => {
    const [discussion, setDiscussions] = useState([]);
    const [errors, setErrors] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        getAllDiscussions()
            .then((discussions) => {
                if (!discussions) {
                    setErrors((errors) => !errors);
                }
                setDiscussions(() => discussions.map((discussion, index) => {
                    return <MovieCard key={index} md="4" xs="6" title={discussion.movieTitle} img={discussion.movieImagePath} rating={discussion.rating} onClick={() => onClick(discussion)} />
                }));
            }).catch((err) => {
                setErrors((errors) => !errors);
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
            <Row>{errors ? <p>Failed to get discussions, please try again later!</p> : ""}</Row>
            <Row>
                {discussion.length > 0 ? discussion : ""}
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
        .then((res) => {
            if (res.status !== 200 || !res.data) return false;
            return res.data;
        })
        .catch((err) => {
            console.log(`Faield to get discussions: ${err.message}`);
            return false;
        });
}
export default Discussion;