import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGenerationModel';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    onClick

}) => {

    return (
        <tr>
            <td>
                <label className="formItem"> {formItem.name} </label>
            </td>
            <td>
                <Input addon type="checkbox" characteristic={characteristic}
                    value={formItem.value.toString()} aria-label="Check for following Text input"
                    className="inputItem" onClick={onClick} />
            </td>
        </tr >

    );
}

export default MovieGenerationCheckbox;
