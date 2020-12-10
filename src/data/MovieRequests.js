import axios from 'axios';

async function requestMovies(token = null, MovieGenerationModel) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(
        {
            MovieGenerationModel,
            'x-auth-token': token
        }
    );
    return axios.post('/api/movies/movieGeneration', body, config)
        .then((req, res) => {
            if (req.status === 200) {
                return JSON.parse(JSON.stringify(req.data)).movies;
            }
        }).catch((err) => {
            throw err;
        });
}

export default requestMovies;