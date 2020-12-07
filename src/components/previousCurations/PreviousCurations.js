import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import requestMovies from '../../data/PreviousCurationsRequests';
import Loader from 'react-loader-spinner';
import '../../css/PreviousCurations.css';
const route = 'https://image.tmdb.org/t/p/original';

const PreviousCurations = () => {
    let previousCurations;
    const { token } = useSelector(state => state.auth);
    const [showMovies, setShowMovies] = useState(false);
    const [movies, setMovies] = useState(null);

    const getCuration = (index) => {
        console.log(previousCurations[index]);
    }

    const userMovies = async () => {
        previousCurations = await getMovies(token)
            .then(m => m)
            .catch((err) => {
                throw err;
            });

        setMovies(
            previousCurations.map((movie, index) => {
                const generationDate = movie.movieGenerationDate.split("T")[0];
                // const imageRoute = `${route}${}`
                return (
                    <Row className="curationRow mb-3" onClick={() => getCuration(index)}>
                        <Col>
                            <div id="image">
                                {/* <img src=`` */}
                            </div>
                        </Col>
                        <Col>
                            <p className="mr-3">Generation Date: {generationDate}</p>
                            <p className="mr-3"> Genres: {(movie.movieSearchCriteria.with_genres) ? movie.movieSearchCriteria.with_genres : 'Any'}</p>
                            <p className="mr-3">Filtering: {(movie.movieSearchCriteria.sort_by) ? movie.movieSearchCriteria.sort_by : 'No Sorting selected'}</p>
                            <p className="mr-3">Release Year: {(movie.movieSearchCriteria.primary_release_year) ? movie.movieSearchCriteria.primary_release_year : 'Any'}</p>
                            <p className="mr-3">Movie Keywords: {(movie.movieSearchCriteria.with_keywords) ? movie.movieSearchCriteria.with_keywords : 'No keywords'}</p>
                        </Col>

                    </Row >
                )
            })
        );
        setShowMovies(true);
    }

    const showSpinner = () => {
        userMovies();
        return (
            <Row>
                <Col>
                    <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} className="spinner" />
                </Col>
            </Row>
        );
    };

    return (
        (showMovies) ? movies : showSpinner()
    );
}



async function getMovies(token = null) {
    return requestMovies(token)
        .then((movies) => {
            return movies
        }).catch((err) => {
            throw err;
        })
}

export default PreviousCurations;
