import axios from "axios";
import route from "./Routes";

async function requestMovies(token = null, MovieGenerationModel) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify(
        {
            MovieGenerationModel,
            "x-auth-token": token
        }
    );

    return axios.post(`${route}/api/movies/movieGeneration`, body, config)
        .then((res) => {
            if (res.status === 200) {
                console.log(res);
                return {
                    moviesDom: {
                        id: res.data._id,
                        movies: res.data.movies,
                        movieSearchCriteria: res.data.movieSearchCriteria,
                        movieGenerationDate: res.data.movieGenerationDate
                    },
                    isRevised: res.data.isRevised
                };
            }
        }).catch((err) => {
            throw err;
        });
}

export default requestMovies;