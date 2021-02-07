import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { logOutMovies } from "../actions/movieActions"
import { logout } from "../actions/authActions";
import { NavLink } from "../components/headers/light";
import "../css/dropdown.css";
import tw from "twin.macro";
const DropDown = tw.div`
    hidden lg:flex flex-1 justify-between items-center
`;
const DropDownMobile = tw.div`
    lg:hidden
`
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
        <>
            <DropDown ref={dropDownRef} style={{ marginTop: "-6px" }}>
                <UncontrolledDropdown nav isOpen={dropdown} onClick={toggle}>
                    <DropdownToggle style={{ display: "inline-block", paddingTop: "0px" }} tag="span" onClick={toggle} caret>
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
            </DropDown>
            <DropDownMobile>
                <NavLink className={dropDownText} href="/myGenerations">My Generations</NavLink>
                <NavLink className={dropDownText}>My Details</NavLink>
                <NavLink onClick={userLogout} className={dropDownText} href="/">Logout</NavLink>
            </DropDownMobile>
        </>
    );
}


export default DowndownMenu;