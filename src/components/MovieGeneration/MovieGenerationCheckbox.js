import React from 'react';
import { Input } from 'reactstrap';
import tw from 'twin.macro';
export const Description = tw.p`text-sm leading-loose mt-2 mr-2`;

const MovieGenerationCheckbox = ({
    formItem,
    characteristic,
    clickAction
}) => {
    return (
        <tr>
            <td>
                <Description >{formItem.name}</Description>
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
