import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGenerationModel';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    className
}) => {

    const addToObject = (value) => {
        MovieGenerationModel[characteristic] = value;
    };

    return (
        <tr>
            <td>
                <label> {formItem.name}</label>
            </td>
            <td>
                <Input addon type="radio" className={className} name={characteristic}
                    value={formItem.value.toString()} aria-label="Check for following Text input"
                    className="carouselItem" onClick={() => addToObject(formItem.value)} />
            </td>

        </tr>

    );
}

export default MovieGenerationCheckbox;