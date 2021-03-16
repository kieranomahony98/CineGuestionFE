import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Container, Form, Input, Label, Row, Button, FormGroup } from "reactstrap";
import isEmpty from "validation/isEmpty";
import { userNameValidation, emailValidation, nameValidation, passwordValidation } from "validation/updateUserDetailsValidation";
import { useHistory } from "react-router";
import { updateDetails } from "actions/authActions";
import Loader from "react-loader-spinner";
import { clearErrors } from "actions/errorActions";
export default () => {
    const { user, isAuthenticated, updated } = useSelector(state => state.auth);
    const { msg } = useSelector(state => state.error);
    const history = useHistory();
    const dispatch = useDispatch();
    if (!isAuthenticated) {
        history.push({
            pathname: "/"
        });
    }

    const [isUpdating, setIsUpdating] = useState(false);
    const [updateErrors, setErrors] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        password2: "",
        currentPassword: "",

    });

    const [userDetails, setUserDetails] = useState({
        email: user.email,
        name: user.name,
        userName: user.userName,
        currentPassword: "",
        password: "",
        password2: ""
    });

    const submit = (e) => {
        e.preventDefault();
        dispatch(clearErrors());
        setIsUpdating(isUpdating => !isUpdating);
        let userObj = {
            _id: user.id
        };

        let errorsObj = {};
        if (userDetails.userName !== user.userName) {
            const { errors, isValid } = userNameValidation(userDetails.userName);
            if (isValid) userObj.userName = userDetails.userName;
            errorsObj = { ...errorsObj, ...errors, };
        }
        if (userDetails.name !== user.name) {
            const { errors, isValid } = nameValidation(userDetails.name);
            if (isValid) userObj.name = userDetails.name;
            errorsObj = { ...errors, ...errorsObj }
        }
        if (userDetails.email !== user.email) {
            const { errors, isValid } = emailValidation(userDetails.email);
            if (isValid) userObj.email = userDetails.email;
            errorsObj = { ...errorsObj, ...errors, }
        }
        if (userDetails.currentPassword || userDetails.password || userDetails.password2) {
            const { errors, isValid } = passwordValidation(userDetails.currentPassword, userDetails.password, userDetails.password2);
            if (isValid) {
                userObj.currentPassword = userDetails.currentPassword;
                userObj.password = userDetails.password;
            }
            errorsObj = { ...errors, ...errorsObj }
        }


        const isValid = isEmpty(errorsObj);
        if (!isValid) {
            setErrors(updateErrors => ({ ...updateErrors, ...errorsObj }));
            setIsUpdating(isUpdating => !isUpdating);
            return;
        }
        dispatch(updateDetails(userObj));
        if (msg) {
            setIsUpdating(isUpdating => !isUpdating);
        }
    }
    const onChange = (e) => {
        const id = e.target.name;
        const value = e.target.value;
        setUserDetails(userDetails => ({ ...userDetails, [id]: value }));
    }
    return (
        <Container style={{ width: "50%" }}>
            {updated ? <Row className="justify-content-center"><Badge color="success" className="mb-2"> You're details have successfully been updated</Badge></Row> : ""}
            {msg ? <Row className="justify-content-center"><Badge color="warning" className="mb-2">{msg}</Badge></Row> : ""}

            <Form onSubmit={(e => submit(e))}>
                <FormGroup>
                    <Row>
                        <Label for="email" className="mr-2"> E-Mail: </Label>
                        <Input onChange={onChange} type="text" defaultValue={userDetails.email} onChange={onChange} id="email" name="email" placeholder="email..." />

                        {updateErrors.email ? <Badge color="warning" className="mb-2">{updateErrors.email} </Badge> : ""}
                    </Row>
                    <Row>
                        <Label for="name"> Name: </Label>
                        <Input className="mb-2" onChange={onChange} type="text" defaultValue={userDetails.name} id="name" name="name" placeholder="Full Name..." />
                        {updateErrors.name ? <Badge color="warning" className="mb-2">{updateErrors.name} </Badge> : ""}

                    </Row>
                    <Row>
                        <Label for="userName">User Name:</Label>
                        <Input className="mb-2" onChange={onChange} type="text" defaultValue={userDetails.userName} id="userName" name="userName" placeholder="user name..." />
                        {updateErrors.userName ? <Badge color="warning" className="mb-2">{updateErrors.userName} </Badge> : ""}
                    </Row>
                    <Row>
                        <Label for="currentPassword">Current Password:</Label>
                        <Input className="mb-2" onChange={onChange} type="password" id="currentPassword" name="currentPassword" placeholder="current password..." />
                        {updateErrors.currentPassword ? <Badge color="warning" className="mb-2">{updateErrors.currentPassword} </Badge> : ""}
                    </Row>
                    <Row>
                        <Label for="newPassword"> New Password:</Label>
                        <Input className="mb-2" onChange={onChange} type="password" id="password" name="password" placeholder="new password..." />
                        {updateErrors.password ? <Badge color="warning" className="mb-2">{updateErrors.password} </Badge> : ""}
                    </Row>
                    <Row>
                        <Label for="newPassword2">New Password:</Label>
                        <Input className="mb-2" onChange={onChange} type="password" id="password2" name="password2" placeholder="re-enter new password..." />
                        {updateErrors.password2 ? <Badge color="warning" className="mb-2">{updateErrors.password2} </Badge> : ""}
                    </Row>
                    {isUpdating && !msg && !updated ? <Loader type="ThreeDots" color="blue" /> : <Row className="justify-content-center"> <Button type="submit">Update Details</Button></Row>}

                </FormGroup>
            </Form>
        </Container >
    )
}