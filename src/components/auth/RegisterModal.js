import { PrimaryLink } from 'components/headers/light';
import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Form, Input, Label, Modal, ModalBody, ModalHeader, Alert } from 'reactstrap';
import { register } from '../../actions/authActions';

const RegisterModal = () => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState({
        email: '',
        name: '',
        password: '',
    });
    const { id, msg } = useSelector(state => state.error);
    const { isAuthenticated } = useSelector(state => state.auth)

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = user;

        //user obj
        const newUser = {
            name,
            email,
            password
        }
        dispatch(register(user));
        if (modal) {
            if (isAuthenticated) {
                setModal(() => !modal);
            }
        }
    }

    // const
    const toggle = () => {
        setModal(() => !modal);
    }

    const onChange = (e) => {
        const id = e.target.name;
        const value = e.target.value;
        setUser(user => ({ ...user, [id]: value }));
    }
    return (
        <>
            <PrimaryLink to="#" style={{ marginLeft: '10px' }} onClick={toggle}>
                Register
            </PrimaryLink>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Register</ModalHeader>
                <ModalBody>
                    {(id === 'REGISTER_FAIL') ? <Alert color="danger">{msg}</Alert> : null}
                    <Form onSubmit={onSubmit}>

                        <FormGroup>
                            <Label for="name"></Label>
                            <Input type="text" name="name" placeholder="Full Name..." className="mb-3" onChange={onChange} />

                            <Label for="email"></Label>
                            <Input type="email" name="email" placeholder="Email..." className="mb-3" onChange={onChange} />

                            <Label for="password"></Label>
                            <Input type="password" name="password" placeholder="Password..." className="mb-3" onChange={onChange} />

                            <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block onClick={onSubmit}>Register</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </>

    )
};

export default RegisterModal