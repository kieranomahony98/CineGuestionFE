import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    className
}) => {

    const addToObject = (value) => {
        MovieGenerationModel[characteristic] = value;
    };

    return (
        <Row>
            <InputGroupAddon addonType="prepend">
                <div className="mb-3 form">
                    <label> {formItem.name}</label>
                    <Input addon type="radio" className={className} name={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="carouselItem" onClick={() => addToObject(formItem.value)} />
                </div>
            </InputGroupAddon>
        </Row>
    );
}

export default MovieGenerationCheckbox;