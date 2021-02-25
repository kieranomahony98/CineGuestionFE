import React from 'react';
import { Input } from 'reactstrap';
import { Description } from "./MovieGenerationCheckbox";
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    className,
    clickAction
}) => {
    return (
        <tr>
            <td>
                <Description> {formItem.name}</Description>
            </td>
            <td>
                <Input addon type="radio" className={`carouselItem ${className}`} name={characteristic}
                    value={formItem.value.toString()} aria-label="Check for following Text input"
                    onClick={clickAction} />
            </td>
        </tr>
    );
}

export default MovieGenerationCheckbox;