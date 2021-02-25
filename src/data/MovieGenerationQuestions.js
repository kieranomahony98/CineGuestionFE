const movieGenerationQuestions = [
    {
        type: "with_genres",
        display: "checkbox",
        values: [
            {
                name: "Western",
                value: 37
            },
            {
                name: "Crime",
                value: 80
            },
            {
                name: "Documentary",
                value: 99
            },
            {
                name: "Drama",
                value: 18

            },
            {
                name: "Family",
                value: 10751
            },
            {
                name: "Fantasy",
                value: 14
            },
            {
                name: "Mystery",
                value: 9648
            },
            {
                name: "Horror",
                value: 27
            },
            {
                name: "Romance",
                value: 10749
            },
            {
                name: "Thriller",
                value: 53
            },
            {
                name: "Sci-Fi",
                value: 878
            },
            {
                name: "Action",
                value: 28
            },
            {
                name: "Adventure",
                value: 12
            },
            {
                name: "Animation",
                value: 16
            },
            {
                name: "Comedy",
                value: 35
            },
            {
                name: "Music",
                value: "10402"
            }
        ]
    },
    {
        type: "with_keywords",
        display: "checkbox",
        values: [
            {
                name: "Independent Films",
                value: "10183"
            },
            {
                name: "Musical",
                value: "4344"
            },
            {
                name: "Gangster",
                value: "3149"
            },
            {
                name: "Romantic Comedy",
                value: "9799"
            },
            {
                name: "Educational",
                value: "18257"
            }
        ]
    },
    {
        type: "with_companies",
        display: "checkbox",
        values: [
            {
                name: "Marvel",
                value: "420"
            },
            {
                name: "Lucasfilm",
                value: "1"
            },
            {
                name: "Bad Robot",
                value: "11461"
            },
            {
                name: "DC Films",
                value: "128064"
            },
            {
                name: "Warner Bros",
                value: "174"
            },
            {
                name: "Universal",
                value: "33"
            },
            {
                name: "Legendary",
                value: "923"
            },
            {
                name: "Columbia",
                value: "5"
            },
            {
                name: "Walt Disney",
                value: "2"
            },
            {
                name: "Pixar",
                value: "3"
            }

        ]
    },
    {
        type: "primary_release_year",
        display: "radio",
        values: [
            {
                name: "2020+",
                value: "2020"
            },
            {
                name: "2014-2019",
                value: "2014-2019"
            },
            {
                name: "2010-2014",
                value: "2010-2014"
            },
            {
                name: "2005-2009",
                value: "2005-2009"
            },
            {
                name: "2000-2004",
                value: "2000-2004"
            },
            {
                name: "1995-1999",
                value: "1995-1999"
            },
            {
                name: "1990-1994",
                value: "1990-1994"
            }
        ]

    },
    {
        type: "sort_by",
        display: "radio",
        values: [
            {
                name: "Revenue Grossers",
                value: "revenue.desc"
            },
            {
                name: "Most Popular",
                value: "popularity_desc"
            },
            {
                name: "Highest User Score",
                value: "vote_average.desc"
            },
            {
                name: "Most User Controversial",
                value: "vote_count.desc"
            }
        ]

    },


]

export default movieGenerationQuestions;
