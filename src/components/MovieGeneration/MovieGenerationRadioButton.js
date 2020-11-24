import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, Row } from 'reactstrap';
import MovieGenerationModel from '../../data/MovieGeneration';
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    className
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
        <Row>
            <InputGroupAddon addonType="prepend">
                <div className="form">
                    <label> {formItem.name}</label>
                    {/* <span> */}
                    <Input addon type="radio" className={className} name={characteristic} value={formItem.value.toString()} aria-label="Check for following Text input" className="carouselItem" onClick={() => addToObject(formItem.value)} />
                    {/* </span> */}
                </div>
            </InputGroupAddon>
        </Row>
    );
}

export default MovieGenerationCheckbox;