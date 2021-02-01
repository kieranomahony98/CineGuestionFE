import React, { useState } from 'react';
import "../../css/movieComments.css";
import { Confirm } from "components/confirm/confirmAlert";
import { ReactComponent as Down } from "feather-icons/dist/icons/chevrons-down.svg";
import { ReactComponent as Up } from "feather-icons/dist/icons/chevrons-up.svg";
import { Container, Button, Form, Input, Row, FormGroup, Label, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { ReactComponent as Delete } from "feather-icons/dist/icons/x-circle.svg";
import axios from 'axios';
import route from "../../data/Routes";
export const Comments = ({
    comment,
    refresh,
    onSubmit,
}) => {
    const indent = `${(comment.depth - 1) * 5}%`
    const { user, token, isAuthenticated } = useSelector(state => state.auth);
    const [confirm, showConfirm] = useState(false);
    const [commentScore, setCommentScore] = useState(comment.commentScore);
    const [showReply, setShowReply] = useState(false);
    const [reply, setReply] = useState({
        commentText: comment.commentText
    });
    const [commentText, setCommentText] = useState({
        commentText: comment.commentText
    });

    const [tempText, setTempText] = useState({ commentText: comment.commentText })
    const [readOnly, setReadonly] = useState(true);

    const handleOnClick = () => {
        setShowReply(showReply => !showReply);
    }

    const replyOnInput = e => {
        const { value } = e.target;
        setReply((reply) => ({ ...reply, commentText: value }));
    }

    const replyOnClick = () => {
        setShowReply(showReply => !showReply);
    }
    const onCancel = () => {
        setReply(reply => ({ ...reply, commentText: '' }))
    }

    const editOnClick = () => {
        setReadonly(readOnly => !readOnly);
    }
    const setText = e => {
        const { value } = e.target;
        setTempText(commentText => ({ ...commentText, commentText: value }));
    }
    const updateComment = () => {
        updateCommentApi(tempText.commentText, comment._id, token)
            .then((res) => {
                setCommentText(commentText => ({ ...commentText, commentText: tempText }));
                setReadonly(readOnly => !readOnly);
                refresh();
            })

    }

    const onReplySubmit = () => {
        setShowReply(showReply => !showReply);
        onSubmit(true, comment, reply.commentText);
        setReply(reply => ({ reply, commentText: '' }));
    }

    const deleteComment = () => {
        deleteCommentApi(comment._id, token)
            .then((res) => {
                toggleConfirm();
                refresh();
            });
    }

    const toggleConfirm = () => {
        showConfirm(confirm => !confirm);
    }

    const changeCommentScore = (value) => {
        if (comment.isDeleted) return;
        if (!isAuthenticated) return;
        setCommentScoreApi(comment._id, commentScore + value, token)
            .then((comment) => {
                setCommentScore(commentUpvotes => commentUpvotes + value);
            });
    }

    return (
        <Container className="mt-2" style={{ marginLeft: indent }}>
            {confirm ? <Confirm deleteComment={deleteComment} toggleConfirm={toggleConfirm} /> : ''}
            <Row className="d-flex flex-row align-items-center commented-user">
                <h6 className="mr-2 mb-1">{comment.user.userName}</h6><span className="dot mb-1"></span><span className="mb-1 ml-2">{comment.postedDate.split("T")[0]}</span>{(user && comment.user.userId && comment.user.userId === user.id) ? <span ><Col><div className="float-right"><Delete style={{ float: 'inline-end' }} onClick={toggleConfirm} className="replyButton" /></div> </Col></span> : ''}
            </Row>
            {
                !readOnly ? <Row className="mb-2 ml-1"><Input type="text" defaultValue={comment.commentText} className="commentInput" onChange={setText} /></Row> : <p>{comment.commentText}</p>
            }
            {
                (user && comment.user.userId && comment.user.userId === user.id && !readOnly) ? <Button className="ml-2 mt-1 replyButton" onClick={() => updateComment()}>Update</Button> : ''
            }
            <Row className="reply-section">
                <Row className="d-flex flex-row align-items-center voting-icons"><Up onClick={() => changeCommentScore(1)} className="replyButton" /><Down className="replyButton" onClick={() => changeCommentScore(-1)} /><span className="ml-2">{commentScore}</span><span className="dot ml-2"></span>
                    <h6 className="ml-2 mt-1 replyButton" onClick={replyOnClick}>Reply</h6>
                    {user && comment.user.userId && comment.user.userId === user.id ? <h6 className="ml-2 mt-1 replyButton" onClick={editOnClick}>Edit</h6> : ''}
                </Row>
            </Row>
            {
                showReply ?
                    <>
                        <Input type="textarea" className="ml-2" name="replyBox" id="replyBox" onChange={replyOnInput} />
                        <Button onClick={onReplySubmit} style={{ float: 'right' }}>Reply</Button>
                        <Button onClick={onCancel}>Cancel</Button>
                    </>
                    : ''
            }

        </Container >
    )
}

async function updateCommentApi(commentText, commentId, token) {
    const body = {
        commentText,
        commentId
    }

    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    console.log(route);
    if (token) {
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/movies/comments/update`, JSON.stringify(body), config)
            .then((updatedComment) => updatedComment)
            .catch((err) => {
                console.log(`failed to update commment: ${err.message}`);
                throw err;
            })
    }
}

async function deleteCommentApi(commentId, token) {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    if (token) {
        config.headers["x-auth-token"] = token;
        axios.get(`${route}/api/movies/comments/delete/${commentId}`, config)
            .then((updatedComment) => updatedComment)
            .catch((err) => {
                console.log(`failed to update commment: ${err.message}`);
                throw err;
            })
    }
}

async function setCommentScoreApi(commentId, commentScore, token) {
    console.log(commentScore);
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    if (token) {
        config.headers["x-auth-token"] = token;
        axios.get(`${route}/api/movies/comments/increase/score/${commentId}/${commentScore}`, config)
            .then((updatedComment) => updatedComment)
            .catch((err) => {
                console.log(`failed to update commment: ${err.message}`);
                throw err;
            })
    }
}
