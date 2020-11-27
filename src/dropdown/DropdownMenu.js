import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Dropdown } from 'reactstrap';

const DowndownMenu = () => {
    const [drowndown, setDropdown] = useState(false);

    const toggle = () => {
        setDropdown(() => !drowndown);
    }

    return (
        <Dropdown nav isOpen={drowndown} toggle={setDropdown}>

        </Dropdown>
    )
}