import React from "react";
import { Input } from "reactstrap";
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    className,
    clickAction
}) => {
    return (
        <tr>
            <td>
                <label> {formItem.name}</label>
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