import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Badge } from "reactstrap";
import { changeBadgeStatus } from "actions/authActions";

export default () => {
    const dispatch = useDispatch();
    const { justLoggedIn, justRegistered } = useSelector(state => state.auth);

    const text = justLoggedIn ? "Log in successful" : "Registration successful";
    useEffect(() => {
        window.setTimeout(() => {
            dispatch(changeBadgeStatus());
        }, 2000);
    }, [justLoggedIn, justRegistered]);

    return (
        justLoggedIn | justRegistered ? <Alert color="success" style={{ width: "100%" }} className="mb-2">{text}</Alert> : ""
    );
}