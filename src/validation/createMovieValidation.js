import Validator from "validator";
import isEmpty from "./isEmpty"
export function validateMovie({ movieTitle, movieDescription, movieReleaseYear, movieGenres, moviePlaybackPath }) {
    let validation = {};
    movieTitle = !isEmpty(movieTitle) ? movieTitle : "";
    movieDescription = !isEmpty(movieDescription) ? movieDescription : "";
    movieReleaseYear = !isEmpty(movieReleaseYear) ? movieReleaseYear : "";
    movieGenres = !isEmpty(movieGenres) ? movieGenres : "";
    moviePlaybackPath = !isEmpty(moviePlaybackPath) ? moviePlaybackPath : "";

    if (Validator.isEmpty(movieTitle)) { validation.movieTitle = "Please enter a valid title"; }

    if (Validator.isEmpty(movieDescription)) { validation.movieDes = "Please enter a valid description"; }

    if (Validator.isEmpty(movieReleaseYear)) { validation.movieReleaseYear = "Please enter a valid release year"; }

    if (Validator.isEmpty(movieGenres)) { validation.movieGenres = "Please enter atleast one genre"; }

    if (Validator.isEmpty(moviePlaybackPath)) { validation.moviePlaybackPath = "Please upload the source of your movie"; }

    return {
        validation,
        isValid: isEmpty(validation)
    }

}