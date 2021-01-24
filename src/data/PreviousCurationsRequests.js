import axios from 'axios';

async function requestMovies(token = null) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(
        {
            'x-auth-token': token
        }
    );

    return axios.post('/api/movies/returnMovies', body, config)
        .then((res) => {
            if (res.status === 200) {
                return res.data;
            } else {
                return null;
            }
        }).catch((err) => {
            console.log(`Error in getting movies ${err.message}`);
            throw err;
        });
}

export default requestMovies;