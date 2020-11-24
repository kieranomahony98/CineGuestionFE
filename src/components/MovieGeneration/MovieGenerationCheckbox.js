import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,

}) => {

    // const formItems = () => {
    //     formItemsList.map((item) => {
    //         <FormGroup>
    //             <InputGroup>
    //                 <InputGroupAddon addonType="prepend">
    //                     <InputGroupText> item.name
    //                         <Input addon type="checkbox" value={item.value.toString()} aria-label="Check for following Text input" />
    //                     </InputGroupText>
    //                 </InputGroupAddon>
    //             </InputGroup>
    //         </FormGroup>
    //     })
    // }
    const addToObject = (genreId) => {

        MovieGenerationModel.with_genres = !MovieGenerationModel.with_genres ? `${genreId}` : `${MovieGenerationModel.with_genres},${genreId}`;

        console.log(MovieGenerationModel);
    }
    return (
        <InputGroupAddon addonType="prepend" style={{ backgroundColor: 'white' }}>
            <div className="form">
                <label className="formItem"> {formItem.name}
                </label>
                <span className="carouselItem"> <Input addon type="checkbox" characteristic={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="inputItem" onClick={() => addToObject(formItem.value)} />
                </span>
            </div>
        </InputGroupAddon>

    );
}

export default MovieGenerationCheckbox;