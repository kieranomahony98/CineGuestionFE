import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";
import { logOutMovies } from "../actions/movieActions"
import { logout } from "../actions/authActions";
import { NavLink, MobileNavLinks } from "../components/headers/light";
import "../css/dropdown.css";
import tw from "twin.macro";
import { useHistory } from "react-router";
const DropDown = tw.div`
    hidden lg:flex flex-1 justify-between items-center
`;
const dropDownText = "text-gray-400"
const DowndownMenu = () => {
    const { innerWidth } = window;
    const dispatch = useDispatch();
    const [dropdown, setDropdown] = useState(false);
    const toggle = () => {
        setDropdown(() => !dropdown);
    };
    const dropDownRef = useRef();
    const history = useHistory();
    const { isAuthenticated, user } = useSelector(state => state.auth);
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

    const goToCreatePage = () => {
        if (isAuthenticated) {
            history.push({
                pathname: "/movies/indie/create"
            });
        }
    }

    const goToMoviesPage = () => {
        history.push({
            pathname: `/movies/indie/get/user/${user.id}`
        });
    }
    const goToUpdatePage = () => {
        history.push({
            pathname: '/user/update/details'
        });
    }

    return (
        innerWidth > 640 ?
            <DropDown ref={dropDownRef} style={{ marginTop: "-6px" }}>
                <UncontrolledDropdown nav isOpen={dropdown} onClick={toggle}>
                    <DropdownToggle style={{ display: "inherit", paddingTop: "0px" }} tag="span" onClick={toggle} caret>
                        <NavLink>
                            My Account
                    </NavLink>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className={dropDownText} href="/myGenerations">My Generations</DropdownItem>
                        <DropdownItem className={dropDownText} onClick={goToUpdatePage}>My Details</DropdownItem>
                        <DropdownItem className={dropDownText} onClick={goToCreatePage}>Add a Movie</DropdownItem>
                        <DropdownItem className={dropDownText} onClick={goToMoviesPage}>My Movies</DropdownItem>
                        <DropdownItem onClick={userLogout} className={dropDownText} href="/">Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown >
            </DropDown>
            :
            <>
                <NavLink href="/myGenerations">My Generations</NavLink>
                <NavLink onClick={goToUpdatePage} >My Details</NavLink>
                <NavLink onClick={goToCreatePage}>Add a Movie</NavLink>
                <NavLink onClick={userLogout} href="/">Logout</NavLink>
            </>
    );
}


export default DowndownMenu;