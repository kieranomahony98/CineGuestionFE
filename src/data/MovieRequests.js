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
        .then((res) => {
            if (res.status === 200) {
                console.log(res.data);
                return JSON.parse(JSON.stringify(res.data)).movies;
            }
        }).catch((err) => {
            throw err;
        });
}

export default requestMovies;