export function moviePopoverText({ with_genres, with_keywords, sort_by, primary_release_year }) {
    let body = (with_genres) ? "This curation is a selection of " : (with_keywords) ? "This curation includes many aspects of film, " : "This curation delivers the most hot and popular movies right now!";


    if (with_genres) {
        const genres = (typeof with_genres === typeof "") ? with_genres.split(",") : with_genres[0].split(",");
        const length = genres.length;
        if ((length > 1)) {
            for (const [i, genre] of genres.entries()) {
                body += (i === 0) ? ` genres including ${genre}` : (i !== length - 1) ? `, ${genre}` : ` and ${genre} `;
            }
        } else {
            body += `a single genre ${genres[0]}`;
        }
    }
    if (with_keywords) {
        const keywords = with_keywords.split(",");

        const keywordLength = keywords.length;
        if ((keywordLength > 1)) {
            for (const [i, keyword] of keywords.entries()) {
                body += (i === 0) ? ` while also delivering the vibes of ${keyword},` : (i !== keywordLength - 1) ? ` ${keyword},` : ` and ${keyword}`;
            }
        } else {
            body += ` while also delivering elements of ${keywords[0]} vibes `;
        }
    }
    if (primary_release_year) {
        body += `with all the movies coming from ${primary_release_year}`;
    }
    if (sort_by) {
        body += (sort_by === "vote_count.desc") ? " and is filtered to show the most interacted with movies out there!" : (sort_by === "revenue.desc") ? "and is filtered to show the movies that scored highest in the box offce!" : (sort_by === "vote_average.desc") ? "and is filtered to show the fan favourites!" : " and is filtered to show the most popular movies out there!";
    }

    return {
        title: "Generation Details",
        body
    }
}