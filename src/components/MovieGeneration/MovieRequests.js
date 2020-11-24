import axios from 'axios';

export default function requestMovies(MovieGenerationModel) {

    const body = JSON.stringify(MovieGenerationModel);
    axios.post('/api/movies/movieGeneration', body,)
        .then((req, res) => {
            if (req.status === 200) {
                movieCards = JSON.parse(JSON.stringify(req.data)).movies.map((movie) => {
                    return (
                        <Col key={movie.movieId} sm="4">
                            <MovieCard img={movie.movieImagePath} title={movie.movieTitle} key={movie.movieTitle} />
                        </Col>
                    );
                });
            }
            setSpinnerVisibility(false);
        }).catch((err) => {
            throw err;
        });
}