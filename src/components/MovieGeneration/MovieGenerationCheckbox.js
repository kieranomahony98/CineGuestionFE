import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic
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
        MovieGenerationModel.with_genres.push(genreId);
    }
    return (
        <InputGroup>
            <InputGroupAddon addonType="prepend">
                <InputGroupText> {formItem.name}
                    <Input addon type="checkbox" characteristic={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="carouselItem" onClick={() => addToObject(formItem.value)} />
                </InputGroupText>
            </InputGroupAddon>
        </InputGroup>

    );
}

export default MovieGenerationCheckbox;
