import { getRequest } from "axios/axiosHandler";

async function requestMovies(token = null) {
    return await getRequest("/api/movies/returnMovies", token)
        .then((data) => data)
        .catch((err) => false);
}

export default requestMovies;