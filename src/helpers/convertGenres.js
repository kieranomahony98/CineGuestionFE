export async function convertToTextGeneration(movieSearchCriteria) {
    try {
        const genreList = (movieSearchCriteria.with_genres) ? await listMatcher(movieSearchCriteria.with_genres.split(",")) : null;
        const keywords = (movieSearchCriteria.with_keywords) ? await keywordController(movieSearchCriteria.with_keywords.toString()) : null;
        const sort_by = (movieSearchCriteria.sort_by) ? await sortByMatcher(movieSearchCriteria.sort_by) : null
        movieSearchCriteria.with_genres = (genreList) ? genreList.toString() : null;
        movieSearchCriteria.with_keywords = (keywords) ? keywords.toString() : null;
        movieSearchCriteria.sort_by = (sort_by) ? sort_by : null;

        return movieSearchCriteria;

    } catch (err) {
        throw err;
    }

}
async function sortByMatcher(sort_by) {
    return (sort_by === "vote_count.desc") ? "Showing the most interacted with movies out there!" : (sort_by === "revenue.desc") ? "Showing the movies that scored highest in the box offce!" : (sort_by === "vote_average.desc") ? "Showing the fan favourites!" : " Showing the most popular movies out there!";

}
async function genreMatcher(genres) {
    const movieGenreOBJ = await getGenres();
    let returnGenres = '';
    for (const genre of genres) {
        returnGenres += movieGenreOBJ[genre] ? (returnGenres.length === 0) ? `${movieGenreOBJ[genre]}` : `, ${movieGenreOBJ[genre]}` : null;
    }
    return returnGenres;
}

async function listMatcher(movieGenres) {
    if (!movieGenres) {
        return '';
    }
    const g = await genreMatcher(movieGenres);
    console.log(g)
    return g;
}

async function keywordMatcher(keywords) {
    const movieKeywordsObj = await getKeywords();
    let returnkeywords = '';
    for (const keyword of keywords) {
        returnkeywords += movieKeywordsObj[keyword] ? (returnkeywords.length === 0) ? `${movieKeywordsObj[keyword]}` : `, ${movieKeywordsObj[keyword]}` : null;
    }
    return returnkeywords;
}

export async function convertPlayListsText({ weeklyPlaylist, monthlyPlaylist, allTimePlaylist }) {
    if (weeklyPlaylist) {
        weeklyPlaylist.movieSeachCriteria = await convertToTextGeneration(weeklyPlaylist.movieSeachCriteria);
    }
    if (monthlyPlaylist) {
        monthlyPlaylist.movieSeachCriteria = await convertPlayListsText(monthlyPlaylist.movieSeachCriteria);
    }
    if (monthlyPlaylist) {
        allTimePlaylist.movieSeachCriteria = await convertPlayListsText(allTimePlaylist.movieSeachCriteria);
    }
    return {
        weeklyPlaylist,
        monthlyPlaylist,
        allTimePlaylist
    }
}

async function keywordController(movieGenres) {
    if (!movieGenres) {
        return '';
    };
    const genres = movieGenres.split(",");
    return await keywordMatcher(genres);

}

async function getKeywords() {
    return {
        '10183': 'independent Films',
        '4344': 'musical',
        '3149': 'gangster',
        '9799': 'romantic Comedy',
        '18257': 'educational'
    };
}

async function getGenres() {
    return {
        '37': 'Western',
        '28': 'Action',
        '12': 'Adventure',
        '16': 'Animation',
        '35': 'Comedy',
        '80': 'Crime',
        '99': 'Documentary',
        '18': 'Drama',
        '10751': 'Family',
        '14': 'Fantasy',
        '36': 'History',
        '27': 'Horror',
        '10402': 'Music',
        '9648': 'Mystery',
        '10749': 'Romance',
        '878': 'Sci-Fi',
        '10770': 'TV Movie',
        '53': 'Thriller',
        '10752': 'War'
    };
}