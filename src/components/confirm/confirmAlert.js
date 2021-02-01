import React from 'react';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Container } from 'reactstrap';

export const Confirm = ({ deleteComment, toggleConfirm }) => {

    return (
        <div>
            <ReactConfirmAlert
                title="Delete Comment"
                message="Are you sure you want to delete this comment?"
                buttons={
                    [

                        {
                            label: 'Cancel',
                            onClick: toggleConfirm
                        },
                        {
                            label: 'Delete',
                            onClick: deleteComment
                        }

                    ]
                }
                closeOnClickOutside={true}
                closeOnEscape={true}
            />
        </div>
    )
}