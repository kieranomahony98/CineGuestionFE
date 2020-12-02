import { PrimaryLink } from 'components/headers/light';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, FormGroup, Form, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { login } from '../../actions/authActions';
import loginValidation from '../../validation/loginValidation';
import { NavLink } from '../headers/light';
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

    const toggle = () => {
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
            <NavLink onClick={toggle} to="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Register</ModalHeader>
                <ModalBody>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <div className="mb-3">
                                <Label for="email"></Label>
                                <Input type="email" name="email" placeholder="Email..." className="mb-3" onChange={onChange} />
                            </div>
                            <div>
                                <Label for="password"></Label>
                                <Input type="password" name="password" placeholder="Password..." className="mb-3" onChange={onChange} />
                            </div>
                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>

    )
}

export default LoginModal;