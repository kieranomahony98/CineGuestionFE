import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormGroup, Form, Input, Label, Modal, ModalBody, ModalHeader, Badge } from 'reactstrap';
import { login } from '../../actions/authActions';
import loginValidation from '../../validation/loginValidation';
import { NavLink } from '../headers/light';
import "../../css/authModals.css"
import { clearErrors } from 'actions/errorActions';


const LoginModal = () => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        password: ''
    });
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const { isAuthenticated } = useSelector(state => state.auth);
    const { loginError } = useSelector(state => state.error);
    const toggle = () => {
        setErrors(errors => ({
            ...errors, name: '',
            password: ''
        }));
        dispatch(clearErrors());
        setModal(!modal);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = user;

        //user obj
        const loginUser = {
            email,
            password
        }
        const { loginErrors, isValid } = loginValidation(loginUser);
        if (isValid) {
            dispatch(login(loginUser));
            if (modal) {
                if (isAuthenticated) {
                    setModal(() => !modal);
                }
            }
            setErrors(() => ({ ...errors, email: '', password: '' }));
        } else {
            setErrors(() => ({ ...errors, ...loginErrors }));
        }


    }

    const onChange = (e) => {
        const id = e.target.name;
        const value = e.target.value;
        setUser(user => ({ ...user, [id]: value }));
    }

    return (
        <>
            <NavLink onClick={toggle} to="#" className="authModal">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Login</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <div className="mb-3">
                                {(loginError) ? <Badge color="warning" style={{ width: "100%" }} className="mb-2">{loginError}</Badge> : ''}
                                <Label for="email"></Label>
                                <Input type="email" name="email" placeholder="Email..." className="mb-3" onChange={onChange} />
                                {(errors.email) ? <p className="text-danger">{errors.email}</p> : null}
                            </div>
                            <div>
                                <Label for="password"></Label>
                                <Input type="password" name="password" placeholder="Password..." className="mb-3" onChange={onChange} />
                                {(errors.password) ? <p className="text-danger">{errors.password}</p> : null}

                            </div>
                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>Login</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>

    )
}

export default LoginModal;