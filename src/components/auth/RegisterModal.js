import { PrimaryLink } from "components/headers/light";
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Button, FormGroup, Form, Input, Label, Modal, ModalBody, ModalHeader, Badge } from "reactstrap";
import { register } from "../../actions/authActions";
import registerValidation from "../../validation/registerValidation";
import "../../css/authModals.css"
const RegisterModal = ({ className }) => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
    });

    const [user, setUser] = useState({
        email: "",
        name: "",
        userName: "",
        password: "",
        password2: ""
    });

    const { id, msg } = useSelector(state => state.error);
    const { isAuthenticated } = useSelector(state => state.auth)
    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, password2, userName } = user;

        //user obj
        const newUser = {
            name,
            email,
            userName,
            password,
            password2
        }

        const { registerErrors, isValid } = registerValidation(newUser);
        if (isValid) {
            dispatch(register(user));
            if (modal) {
                if (isAuthenticated) {
                    setModal(() => !modal);
                }
            }
        } else {
            setErrors(errors => ({ ...errors, ...registerErrors }));
        }
    }

    // const
    const toggle = () => {
        setErrors(errors => ({
            ...errors, name: "",
            email: "",
            password: "",
        }));
        setModal(() => !modal);
    };

    const onChange = (e) => {
        const id = e.target.name;
        const value = e.target.value;
        setUser(user => ({ ...user, [id]: value }));
    };
    return (
        <>
            <PrimaryLink to="#" onClick={toggle} style={{ marginTop: "-10px" }} className={`authModal ${className}`}>
                Register
            </PrimaryLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Register</ModalHeader>
                <ModalBody>
                    {(id === "REGISTER_FAIL") ? <Badge color="warning" style={{ width: "100%" }} className="mb-2">{msg}</Badge> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name"></Label>
                            <Input type="text" name="name" placeholder="Full Name..." className="mb-3" onChange={onChange} />
                            {(errors.name) ? <p className="text-danger">{errors.name}</p> : null}

                            <Label for="userName"></Label>
                            <Input type="text" name="userName" placeholder="User Name..." className="mb-3" onChange={onChange} />
                            {(errors.userName) ? <p className="text-danger">{errors.userName}</p> : null}

                            <Label for="email"></Label>
                            <Input type="email" name="email" placeholder="Email..." className="mb-3" onChange={onChange} />
                            {(errors.email) ? <p className="text-danger">{errors.email}</p> : null}

                            <Label for="password"></Label>
                            <Input type="password" name="password" placeholder="Password..." className="mb-3" onChange={onChange} />
                            <Label for="Confrim Password"></Label>
                            <Input type="password" name="password2" placeholder="Confirm Password..." className="mb-3" onChange={onChange} />
                            {(errors.password) ? <p className="text-danger">{errors.password}</p> : null}

                            <Button type="submit" color="dark" style={{ marginTop: "2rem" }} block onClick={onSubmit}>Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>

    )
};

export default RegisterModal