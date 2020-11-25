import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,

}) => {
    const addToObject = (genreId) => {
        if (characteristic === 'with_genres') {
            MovieGenerationModel.with_genres = !MovieGenerationModel.with_genres ? `${genreId}` : `${MovieGenerationModel.with_genres},${genreId}`;
        } else {
            MovieGenerationModel.with_keywords = `${genreId}`
        }
    }
    return (
        <tr>
            <InputGroupAddon addonType="prepend" style={{ backgroundColor: 'white' }}>
                <div className="mb-3 form">
                    <td>
                        <label className="formItem"> {formItem.name} </label>
                    </td>
                    <td>
                        <Input addon type="checkbox" characteristic={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="inputItem" onClick={() => addToObject(formItem.value)} />
                    </td>
                </div>
            </InputGroupAddon>
        </tr>
    );
}

export default MovieGenerationCheckbox;
