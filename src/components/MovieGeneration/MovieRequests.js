import React from 'react';
import axios from 'axios';
import MovieGenerationModel from '../../data/MovieGeneration';

async function requestMovies() {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify(MovieGenerationModel);
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