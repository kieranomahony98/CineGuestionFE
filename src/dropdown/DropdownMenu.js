import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { logOutMovies } from "../actions/movieActions"
import { logout } from "../actions/authActions";
import { NavLink } from "../components/headers/light";
import "../css/dropdown.css";
const dropDownText = "text-gray-400"
const DowndownMenu = () => {
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const toggle = () => {
        setDropdown(() => !dropdown);
    };
    const dropDownRef = useRef();



    useEffect(() => {
        const handleClickOutside = e => {
            if (dropDownRef.current.contains(e.target)) {
                return;
            }
            setDropdown(!dropdown);
        };

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
        dispatch(logOutMovies());
        dispatch(logout());

    }

    return (
        <div ref={dropDownRef} style={{ display: "inline-block" }}>
            <UncontrolledDropdown nav isOpen={dropdown} onClick={toggle}>
                <DropdownToggle tag="span" onClick={toggle} caret>
                    <NavLink>
                        My Account
                </NavLink>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem className={dropDownText} href="/myGenerations">My Generations</DropdownItem>
                    <DropdownItem className={dropDownText}>My Details</DropdownItem>
                    <DropdownItem onClick={userLogout} className={dropDownText} href="/">Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown >
        </div>
    );
}


export default DowndownMenu;