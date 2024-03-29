export async function convertToTextGeneration(movieSearchCriteria) {
    try {
        if (!movieSearchCriteria) {
            return {
                ...movieSearchCriteria,
                sort_by: null,
                with_genres: null,
                keywords: null,
                withCompanies: null
            }
        }
        const genreList = (movieSearchCriteria.with_genres) ? await listMatcher(movieSearchCriteria.with_genres.split(",")) : null;
        const keywords = (movieSearchCriteria.with_keywords) ? await keywordController(movieSearchCriteria.with_keywords.toString()) : null;
        const withCompanies = (movieSearchCriteria.with_companies) ? await companyMatcher(movieSearchCriteria.with_companies.split(",")) : null

        const sort_by = (movieSearchCriteria.sort_by) ? await sortByMatcher(movieSearchCriteria.sort_by) : null
        movieSearchCriteria.with_genres = (genreList) ? genreList.toString() : null;
        movieSearchCriteria.with_keywords = (keywords) ? keywords.toString() : null;
        movieSearchCriteria.sort_by = (sort_by) ? sort_by : null;
        movieSearchCriteria.with_companies = (withCompanies) ? withCompanies : null;

        return movieSearchCriteria;

    } catch (err) {
        console.log(`Failed conversion: ${err.message}`);
        return {
            error: 404,
            msg: `We"re sorry, we couldnt get your generations right now, please try again later`
        }
    }

}
async function sortByMatcher(sort_by) {
    return (sort_by === "vote_count.desc") ? "Showing the most interacted with movies out there!" : (sort_by === "revenue.desc") ? "Showing the movies that scored highest in the box offce!" : (sort_by === "vote_average.desc") ? "Showing the fan favourites!" : " Showing the most popular movies out there!";

}
async function genreMatcher(genres) {
    try {
        const movieGenreOBJ = await getGenres();
        let returnGenres = "";
        for (const genre of genres) {
            returnGenres += movieGenreOBJ[genre] ? (returnGenres.length === 0) ? `${movieGenreOBJ[genre]}` : `, ${movieGenreOBJ[genre]}` : null;
        }
        return returnGenres;
    } catch (err) {
        console.log(`failed to match genres: ${err.message}`);
        throw err;
    }
}
export async function convertGenresForChart(genres) {
    try {
        const genreObj = await getGenres();
        return genres.map((genre) => genreObj[genre]);
    } catch (err) {
        console.log(`Failed to match genre`);
        throw err;
    }

}

async function listMatcher(movieGenres) {
    try {
        if (!movieGenres) {
            return "";
        }
        return await genreMatcher(movieGenres);
    } catch (err) {
        console.log(`failed to match lists: ${err.message}`);
        throw err;
    }
}

async function keywordMatcher(keywords) {
    try {
        const movieKeywordsObj = await getKeywords();
        let returnkeywords = "";
        for (const keyword of keywords) {
            returnkeywords += movieKeywordsObj[keyword] ? (returnkeywords.length === 0) ? `${movieKeywordsObj[keyword]}` : `, ${movieKeywordsObj[keyword]}` : null;
        }
        return returnkeywords;
    } catch (err) {
        console.log(`failed to match keywords: ${err.message}`);
        throw err;
    }
}

export async function convertPlayListsText({ weeklyPlaylists, monthlyPlaylists, allTimePlaylists, trendingNow }) {
    try {

        if (weeklyPlaylists) {
            weeklyPlaylists.movieSearchCriteria = await convertToTextGeneration(weeklyPlaylists.movieSearchCriteria);
        }
        if (monthlyPlaylists) {
            monthlyPlaylists.movieSearchCriteria = await convertToTextGeneration(monthlyPlaylists.movieSearchCriteria);
        }
        if (allTimePlaylists) {
            allTimePlaylists.movieSearchCriteria = await convertToTextGeneration(allTimePlaylists.movieSearchCriteria);
        }
        if (trendingNow) {
            trendingNow.movieSearchCriteria = await convertToTextGeneration(trendingNow.movieSearchCriteria);
        }

        return {
            weeklyPlaylists,
            monthlyPlaylists,
            allTimePlaylists,
            trendingNow
        }
    } catch (err) {
        console.log(`failed to convert playlists: ${err.message}`);
        throw err;
    }
}

async function keywordController(moviekeyword) {
    try {
        if (!moviekeyword) {
            return '';
        };
        return await keywordMatcher(moviekeyword.split(","));
    } catch (err) {
        console.log(`failed to get keywords: ${err.message}`);
        throw err;
    }
}

export async function keywordGraphMatcher(keywords) {
    const keywordObj = await getKeywords();
    return keywords.map((keyword) => keywordObj[keyword]);
}
export async function filterMatcher(filters) {
    const filtersObj = await filetObj();
    return filters.map((filter) => filtersObj[filter]);

}

export async function dateFormatter(dateList) {
    return dateList.map((date) => date.split("T")[0]);
}
export async function releaseYearFormatter(releaseYearList) {
    return releaseYearList.map((year) => year === "2020" ? "2020+" : `${year}-${parseInt(year) + 5}`);
}
async function filetObj() {
    return {
        "revenue.desc": "Revenue Grossers",
        "popularity.desc": "Most Popular",
        "vote_average.desc": "Highest User Score",
        "vote_count.desc": "Most User Controversial"
    }
}
async function companyMatcher(companies) {
    try {
        if (!companies) {
            return '';
        }
        const productionCompanies = await getCompanies();
        let returnCompanies = '';
        for (const company of companies) {
            returnCompanies += productionCompanies[company] ? (returnCompanies.length === 0) ? `${productionCompanies[company]}` : `, ${productionCompanies[company]}` : null;
        }
        return returnCompanies;
    } catch (err) {
        throw err;
    }
}

async function getKeywords() {
    return {
        "10183": "independent Films",
        "4344": "musical",
        "3149": "gangster",
        "9799": "romantic Comedy",
        "18257": "educational"
    };
}

async function getGenres() {
    return {
        "37": "Western",
        "28": "Action",
        "12": "Adventure",
        "16": "Animation",
        "35": "Comedy",
        "80": "Crime",
        "99": "Documentary",
        "18": "Drama",
        "10751": "Family",
        "14": "Fantasy",
        "36": "History",
        "27": "Horror",
        "10402": "Music",
        "9648": "Mystery",
        "10749": "Romance",
        "878": "Sci-Fi",
        "10770": "TV Movie",
        "53": "Thriller",
        "10752": "War"
    };
}

async function getCompanies() {
    return {
        "420": "Marvel Studios",
        "1": "Lucasfilm",
        "11461": "Bad Robot",
        "128064": "DC Films",
        "174": "Warner Bros Pictures",
        "33": "Universal Pictures",
        "923": "Legendary Pictures",
        "5": "Columbia Pictures",
        "2": "Walt Disney Pictures",
        "3": "Pixar",
    }
}