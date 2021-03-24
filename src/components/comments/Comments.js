import React, { useEffect, useState } from 'react';
import "../../css/movieComments.css";
import { Confirm } from "components/confirm/confirmAlert";
import { ReactComponent as Down } from "feather-icons/dist/icons/chevrons-down.svg";
import { ReactComponent as Up } from "feather-icons/dist/icons/chevrons-up.svg";
import { Container, Button, Form, Input, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import { ReactComponent as Delete } from "feather-icons/dist/icons/x-circle.svg";

import { getRequest, postRequest } from 'axios/axiosHandler';
export const Comments = ({
    comment,
    refresh,
    onSubmit,
}) => {
    const indent = `${(comment.depth - 1) * 5}%`
    const { user, token, isAuthenticated } = useSelector(state => state.auth)
    const [confirm, showConfirm] = useState(false);
    const [upvotes, setUpVotes] = useState(comment.commentUpVotes);
    const [downVotes, setDownVotes] = useState(comment.commentDownVotes);
    const [commentScore, setCommentScore] = useState(comment.commentScore);
    const [isDownVoted, setIsDownVoted] = useState(false);
    const [isUpVoted, setIsUpVoted] = useState(false);
    const [showReply, setShowReply] = useState(false);
    const [reply, setReply] = useState({
        commentText: comment.commentText
    });
    const [commentText, setCommentText] = useState({
        commentText: comment.commentText
    });
    const [tempText, setTempText] = useState({ commentText: comment.commentText })
    const [readOnly, setReadonly] = useState(true);
    useEffect(() => {
        if (user && user.id) {
            const i = (comment.commentDownVotes) ? comment.commentDownVotes.indexOf(user.id) : -1;
            if (i !== -1) {

                setIsDownVoted(isDownVoted => !isDownVoted);
            }

            const x = (comment.commentUpVotes) ? comment.commentUpVotes.indexOf(user.id) : -1;

            if (x !== -1) {
                setIsUpVoted(isUpVoted => !isUpVoted);
            }
        }
    }, [user]);
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
            }).catch((err) => {
                throw err;
            })
    }

    const onReplySubmit = () => {
        setShowReply(showReply => !showReply);
        onSubmit(true, comment, reply.commentText)
            .then((r) => r);
        setReply(reply => ({ reply, commentText: '' }));
    }

    const deleteComment = () => {
        deleteCommentApi(comment._id, token, user.id, comment.user.userId)
            .then((res) => {
                toggleConfirm();
                refresh()
                    .then((r) => r);
            });
    }

    const toggleConfirm = () => {
        showConfirm(confirm => !confirm);
    }

    const changeCommentScore = (value) => {
        let changeFromUpvote = false;
        let changeFromDownVote = false;
        let isAlreadyUpVoted = false;
        let isAlreadyDownVoted = false;

        if ((value === 1 && isUpVoted) | (value === -1 && isDownVoted) | !isAuthenticated | comment.isDeleted) return;

        if (value === 1 && isDownVoted) {
            changeFromDownVote = true;
        }
        if (value === -1 && isUpVoted) {
            changeFromUpvote = true;
        }
        if (value === -1 && isDownVoted) {
            isAlreadyDownVoted = true;
        }
        if (value === -1 && isDownVoted) {
            isAlreadyUpVoted = true;
        }

        setCommentScoreApi(comment._id, commentScore + value, token, value, changeFromUpvote, changeFromDownVote, isAlreadyUpVoted,)
            .then((comment) => {
                setCommentScore(commentUpVotes => commentUpVotes + value);
                if (changeFromUpvote) {
                    const temp = [...upvotes];
                    const i = temp.indexOf(user.id);
                    if (i !== -1) {
                        temp.splice(i, 1);
                        setUpVotes(() => temp);
                    }
                    setIsUpVoted(isUpVoted => !isUpVoted)
                    return;
                }
                if (changeFromDownVote) {
                    const temp = [...downVotes];
                    const i = temp.indexOf(user.id);
                    if (i !== -1) {
                        temp.splice(i, 1);
                        setDownVotes(() => temp);
                    }
                    setIsDownVoted(isDownVoted => !isDownVoted);
                    return;
                }
                if (value === 1) {
                    setUpVotes(upvotes => [...upvotes, user.id]);
                    setIsUpVoted(() => true);
                }
                if (value === -1) {
                    setDownVotes(downVotes => [...downVotes, user.id]);
                    setIsDownVoted(() => true);
                }
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
                <Row className="d-flex flex-row align-items-center voting-icons"><Up onClick={() => changeCommentScore(1)} className="replyButton" color={(isUpVoted) ? "#6415ff" : ''} /><Down className="replyButton" onClick={() => changeCommentScore(-1)} color={(isDownVoted) ? "#6415ff" : ''} /><span className="ml-2">{commentScore}</span><span className="dot ml-2"></span>
                    <h6 className="ml-2 mt-1 replyButton" onClick={replyOnClick}>Reply</h6>
                    {user && comment.user.userId && comment.user.userId === user.id ? <h6 className="ml-2 mt-1 replyButton" onClick={editOnClick}>Edit</h6> : ''}
                </Row>
            </Row>
            {
                showReply ?
                    <>
                        <Input type="textarea" className="ml-2" name="replyBox" id="replyBox" onChange={replyOnInput} />
                        <Button className="mt-2" onClick={onReplySubmit} style={{ float: 'right' }}>Reply</Button>
                        <Button className="mt-2" onClick={onCancel}>Cancel</Button>
                    </>
                    : ''
            }
        </Container >
    )
}

async function updateCommentApi(commentText, commentId, token) {
    if (!token) return false;
    const body = {
        commentText,
        commentId
    }

    return await postRequest("/api/movies/comments/update", JSON.stringify(body), token)
        .then((data) => data)
        .catch((err) => false);
}

async function deleteCommentApi(commentId, token, id, commentUserId) {
    if (!token) return false;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    getRequest(`/api/movies/comments/delete/${commentId}/${id}/${commentUserId}`, token)
        .then((data) => data)
        .catch((err) => false);
}

async function setCommentScoreApi(commentId, commentScore, token, value, changeFromUpvote, changeFromDownVote) {
    if (!token) return false;
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    const body = {
        commentId,
        commentScore,
        value,
        changeFromDownVote,
        changeFromUpvote
    }
    return await postRequest(`/api/movies/comments/set/score`, body, token)
        .then((data) => data)
        .catch((err) => false);
}
