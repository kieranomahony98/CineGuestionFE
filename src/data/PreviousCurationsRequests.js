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
                console.log(res.data);
                return JSON.parse(JSON.stringify(res.data));
            }
        }).catch((err) => {
            console.log('Error in getting movies');
            throw err;
        });
}

export default requestMovies;