import React, { useState } from "react";
import { Input, Row, Container, Button, Col, Collapse, UncontrolledCollapse } from "reactstrap";
import { ReactComponent as Minus } from "feather-icons/dist/icons/minus-circle.svg";
import { Comments } from "./Comments"
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSelector } from "react-redux";
import route from "data/Routes"
import { useEffect } from "react";
export const CommentLayout = () => {
    const { movieDiscussion } = useSelector(state => state.movies);
    const [commentText, setCommentText] = useState({ text: '' });
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const [collapse, setCollapse] = useState({ key: 'value' });
    const [errors, setErrors] = useState(false);
    const { token, user, isAuthenticated } = useSelector(state => state.auth);
    useEffect(() => {
        makeRequest(movieDiscussion)
            .then((result) => {
                if (result.count === 0) {
                    setErrors(error => !error);
                    return;
                }
                setCommentCount(() => result.count);
                const placeHolder = [];
                console.log(result.comment)
                for (const comment of Object.values(result.comments)) {
                    placeHolder.push(comment);
                }
                manageComments(placeHolder)
                    .then((res) => {
                        console.log(res);
                        setComments(() => res);
                    })
            }).catch((err) => {
                throw err
            });
    }, []);

    const refreshData = async () => {
        try {
            const comments = await makeRequest(movieDiscussion)
                .then((comments) => comments)
                .catch((err) => {
                    console.log(`failed to make request`);
                    throw err;
                });
            if (comments.count === 0) {
                setErrors(error => !error)
                return;
            }
            setCommentCount(() => comments.count);
            const placeHolder = [];
            for (const comment of Object.values(comments.comments)) {
                placeHolder.push(comment);
            }
            manageComments(placeHolder)
                .then((res) => {
                    setCommentText(commentText => ({ ...commentText, text: '' }));
                    setComments(() => res);
                });
        } catch (err) {
            throw err;
        }
    }

    const addComment = async (replyComment = false, parentComment = null, replyCommentText = null) => {
        if (!user) return;
        if (!replyComment && commentText === "") return;
        setErrors(errors => !errors);
        const commentObj = {
            movieId: movieDiscussion.movieId,
            id: user.id,
            userName: user.name,
            commentText: (replyComment) ? replyCommentText : commentText.text
        }
        if (replyComment) {
            commentObj.parentId = parentComment._id;
            commentObj.depth = parentComment.depth + 1;
        }
        await addCommentAPI(commentObj, token)
            .then((comment) => {
                refreshData();
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }

    const addCommentOnChange = e => {
        const { value } = e.target;
        setCommentText(commentText => ({ ...commentText, text: value }));
        console.log(commentText);
    }

    const manageComments = async (comments) => {
        let commentComponents = [];
        for (const comment of Object.values(comments)) {
            const key = uuid();
            commentComponents.push(
                <Row key={key}>
                    <Comments comment={comment} addComment={addComment} onSubmit={addComment} refresh={refreshData} />
                </Row>
            );
            if (comment.children && Object.keys(comment.children).length !== 0) {
                let responses = await manageComments(comment.children);
                const newKey = uuid();
                console.log(newKey);
                responses = <Container key={newKey}> {responses} </Container>
                commentComponents = commentComponents.concat(responses);
            }
        }
        return commentComponents;
    }

    return (
        <Container className="mt-4">
            <Row>
                {isAuthenticated ?
                    <>
                        <Input type="textarea" id="addComment" name="addComment" value={commentText.text} onChange={addCommentOnChange} />
                        <Button className="mt-2" style={{ float: 'right' }} onClick={() => addComment(false, null, null)}>Add Comment</Button>
                    </>
                    : <Input type="textarea" id="addComment" name="addComment" value="Please log in to leave a comment" onChange={addCommentOnChange} disabled />}

            </Row>
            {(errors) ? <Row><Col md="4"></Col> <Col md="4"> <h4>Be the first to share your opinion on this movie!</h4> </Col><Col md="4"></Col></Row> : ''}
            {(comments) ? comments : ''}
        </Container>
    )

}

async function makeRequest(movie) {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };
    return await axios.post(`${route}/api/movies/comments/getComments`, JSON.stringify(movie), config)
        .then((comments) => comments.data)
        .catch((err) => {
            console.log(err.message);
            throw err;
        });
}

async function addCommentAPI(comment, token) {
    console.log('in add coment api');
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/movies/comments/addComments`, JSON.stringify(comment), config)
            .then((res) => {
                if (res.status === 200) return true;
                return false
            })
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }
}