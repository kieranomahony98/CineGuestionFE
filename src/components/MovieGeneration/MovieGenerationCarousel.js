import React, { useState } from 'react';
import MovieGenerationCheckbox from './MovieGenerationCheckbox';
import { Carousel } from 'react-responsive-carousel'
import MovieGenerationRadioButton from './MovieGenerationRadioButton';
import { Form, FormGroup, Button, Input, InputGroup } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
import movieGenerationQuestions from '../../data/MovieGenerationQuestions';
import axios from 'axios'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "../../MovieGeneration.css";




const MovieGenerationCarousel = () => {
    const [visible, setVisible] = useState(true);

    async function requestMovies() {
        const body = JSON.stringify(MovieGenerationModel);
        const response = await axios.post('/api/movies/movieGeneration', body)
            .then((req, res) => {
                if (req.status === 200) {
                    return JSON.parse(JSON.stringify(req.data));
                }
            }).catch((err) => {
                console.log(err);
            });
        console.log(response);
    }
    let slides = movieGenerationQuestions.map((movieSlide) => {
        return (
            movieSlide.values.map((type) => {
                if (movieSlide.display === 'checkbox') {
                    return (
                        <MovieGenerationCheckbox key={type.value} characteristic={movieSlide.type} formItem={type} />
                    );
                };
                return (
                    <MovieGenerationRadioButton key={type.value} characteristic={movieSlide.type} formItem={type} />
                );
            }));
    });
    slides = slides.map((slide) => {
        return (
            <div className="carouselDiv" key='carouselItem'>
                <InputGroup>
                    {slide}
                </InputGroup>

            </div>
        )
    })

    return (
        <div style={{ visibility: (visible ? 'visible' : 'hidden') }}>
            <Carousel className="carousel" showThumbs={false}>
                {slides}
            </Carousel>
            <Button color="success" onClick={() => requestMovies()}>Click</Button>
        </div >


    )
}
export default MovieGenerationCarousel;



