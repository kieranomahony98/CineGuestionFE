import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
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
    const addToObject = (value) => {
        MovieGenerationModel[characteristic] = value;
        console.log(MovieGenerationModel);
    };

    return (
        <InputGroupAddon addonType="prepend">
            <InputGroupText> {formItem.name}
                <Input addon type="radio" name={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="carouselItem" onClick={() => addToObject(formItem.value)} />
            </InputGroupText>
        </InputGroupAddon>


    );
}

export default MovieGenerationCheckbox;