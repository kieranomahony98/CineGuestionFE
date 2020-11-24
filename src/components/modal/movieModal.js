import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const MovieModal = ({
    title,
    img,
    description,
    rating,
    modalTruth,

}) => {
    const route = 'https://image.tmdb.org/t/p/original';
    const [modal, setModal] = useState(modalTruth);

    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <Modal isOpen={modal} modalTransition={{ timeout: 500 }} toggle={toggle} >
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <img src={`${route}${img}`} style={{ maxHeight: '200px', maxWidth: '200px' }} />
                    <p>Movie description: {description}</p>
                    <p>User rating: {rating}</p>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default MovieModal;