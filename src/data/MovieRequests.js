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
                return {
                    moviesDom: res.data.formattedMovies,
                    isRevised: res.data.isRevised
                };
            }
        }).catch((err) => {
            throw err;
        });
}

export default requestMovies;