const movieGenerationQuestions = [
    {
        type: "with_genres",
        display: "checkbox",
        values: [
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
            }
        ]
    },
    {
        type: "primary_release_year",
        display: "radio",
        values: [
            {
                name: "2020",
                value: "2020"
            },
            {
                name: "2019",
                value: "2019"
            },
            {
                name: "2018",
                value: "2018"
            },
            {
                name: "2017",
                value: "2017"
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
    }

]
export default movieGenerationQuestions;