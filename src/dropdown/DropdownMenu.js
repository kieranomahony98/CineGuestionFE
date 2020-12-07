import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DropdownToggle, DropdownMenu, DropdownItem, Dropdown, UncontrolledDropdown } from 'reactstrap';
import { logout } from '../actions/authActions';
import { NavLink } from '../components/headers/light';
import '../dropdown.css';

const DowndownMenu = () => {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const toggle = () => {
        setDropdown(() => !dropdown);
    };
    const dropDownRef = useRef();

    const handleClickOutside = e => {
        if (dropDownRef.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setDropdown(!dropdown);
    };

    useEffect(() => {
        if (dropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdown]);

    const userLogout = () => {
        dispatch(logout());
    }
    return (
        <div ref={dropDownRef} style={{ marginTop: '-2px' }}>
            <UncontrolledDropdown nav isOpen={dropdown} onClick={toggle}>
                <DropdownToggle tag="span" onClick={toggle} caret>
                    <NavLink>
                        My Account
                </NavLink>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>My Generations</DropdownItem>
                    <DropdownItem>My Details</DropdownItem>
                    <DropdownItem onClick={userLogout}>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        </div>
    );
}


export default DowndownMenu;