import React from "react";
import { Input } from "reactstrap";
const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    clickAction
}) => {

    return (
        <tr>
            <td>
                <label className="formItem"> {formItem.name} </label>
            </td>
            <td>
                <Input addon type="checkbox" characteristic={characteristic}
                    value={formItem.value.toString()} aria-label="Check for following Text input"
                    className="inputItem" onClick={clickAction} />
            </td>
        </tr >

    );
}

export default MovieGenerationCheckbox;
