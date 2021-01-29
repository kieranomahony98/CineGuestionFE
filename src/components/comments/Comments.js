import React, { useState } from 'react';
import "../../css/movieComments.css";
import { ReactComponent as Down } from "feather-icons/dist/icons/chevrons-down.svg";
import { ReactComponent as Up } from "feather-icons/dist/icons/chevrons-up.svg";
import { Container, Button, Form, Input, Row, FormGroup, Label } from 'reactstrap';
export const Comments = ({
    comment,
    refresh,
    addComment

}) => {
    const [showReply, setShowReply] = useState(false);
    const [reply, setReply] = useState({
        commentText: ''
    });
    const [commentText, setCommentText] = useState("testin");
    const [readOnly, setReadonly] = useState(true);

    const handleOnClick = () => {
        setShowReply(showReply => !showReply);
    }
    const onSubmit = e => {
        e.prevevntDefault();

    }
    const replyOnInput = e => {
        setReply((reply) => ({
            ...reply,
            commentText: e.target.value
        }));
    }

    const replyOnClick = () => {
        setShowReply(showReply => !showReply);
    }
    const onCancel = () => {

    }

    const editOnClick = () => {
        setReadonly(readOnly => !readOnly);
    }
    const setText = e => {
        console.log(e);
        setCommentText(commentText => `${commentText}${e.target.value}`);
    }
    return (
        <Container className="mt-2">
            <Row className="d-flex flex-row align-items-center commented-user">
                <h5 className="mr-2">Corey oates</h5><span className="dot mb-1"></span><span className="mb-1 ml-2">4 hours ago</span>
            </Row>
            <Row className="mb-2 ml-1"><Input type="text" defaultValue={commentText} className="commentInput" readOnly={readOnly} /></Row>
            {(!readOnly) ? <h6 className="ml-2 mt-1 replyButton" onClick={editOnClick}>Update</h6> : ''}
            <Row className="reply-section">
                <Row className="d-flex flex-row align-items-center voting-icons"><Up /><Down /><span className="ml-2">10</span><span className="dot ml-2"></span>
                    <h6 className="ml-2 mt-1 replyButton" onClick={replyOnClick}>Reply</h6>
                    <h6 className="ml-2 mt-1 replyButton" onClick={editOnClick}>Edit</h6>
                </Row>
            </Row>
            {showReply ?
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="replyBox" />
                        <Input type="textarea" className="ml-2" name="replyBox" id="replyBox" onChange={replyOnInput} />
                    </FormGroup>
                    <Button type="submit" style={{ float: 'right' }}>Reply</Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Form>
                : ''}

        </Container >
    )
}