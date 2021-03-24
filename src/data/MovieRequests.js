import { postRequest } from "axios/axiosHandler";


async function requestMovies(token = null, MovieGenerationModel) {
    const body = JSON.stringify(
        {
            MovieGenerationModel
        }
    );
    return await postRequest("/api/movies/movieGeneration", body, token)
        .then((data) => {
            return {
                moviesDom: {
                    id: data._id,
                    movies: data.movies,
                    movieSearchCriteria: data.movieSearchCriteria,
                    movieGenerationDate: data.movieGenerationDate
                },
                isRevised: data.isRevised
            }
        }).catch((err) => false);
}

export default requestMovies;