import React, { useState } from "react";
import { Input, Row, Container, Button, Col } from "reactstrap";
import { Comments } from "./Comments"
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Collapsible from "react-collapsible";
import "css/commentLayout.css";
import { postRequest } from "axios/axiosHandler";

export const CommentLayout = () => {
    const { movieDiscussion } = useSelector(state => state.movies);
    const [commentText, setCommentText] = useState({ text: "" });
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(-1);
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
                for (const comment of Object.values(result.comments)) {
                    placeHolder.push(comment);
                }
                manageComments(placeHolder)
                    .then((res) => {
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
                    setCommentText(commentText => ({ ...commentText, text: "" }));
                    setComments(() => res);
                });
        } catch (err) {
            throw err;
        }
    }

    const addComment = async (replyComment = false, parentComment = null, replyCommentText = null) => {
        if (!user) return;
        if (!replyComment && commentText === "") return;
        if (errors) {
            setErrors(errors => !errors);
        }
        const commentObj = {
            movieId: movieDiscussion.movieId,
            id: user.id,
            userName: user.userName,
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
                throw err;
            });
    }

    const addCommentOnChange = e => {
        const { value } = e.target;
        setCommentText(commentText => ({ ...commentText, text: value }));
    }

    const manageComments = async (comments) => {
        let commentComponents = [];
        for (const comment of Object.values(comments)) {
            commentComponents.push(

                <Row key={uuid()}>
                    <Comments comment={comment} addComment={addComment} onSubmit={addComment} refresh={refreshData} />
                </Row>
            );
            if (comment.children && Object.keys(comment.children).length !== 0) {
                let responses = await manageComments(comment.children);

                responses = <Collapsible trigger="View Replies" open={false} overflowWhenOpen="visible" classParentString="replies" key={uuid()}>
                    <Container> {responses} </Container></Collapsible>
                commentComponents = commentComponents.concat(responses);
            }
        }
        return commentComponents;
    }

    return (
        <Container className="mt-4">
            <Row>{commentCount !== -1 ? <p>Total Comments: {commentCount}</p> : ""}</Row>
            <Row>
                {isAuthenticated ?
                    <>
                        <Input type="textarea" id="addComment" name="addComment" value={commentText.text} onChange={addCommentOnChange} />
                        <Button className="mt-2" style={{ float: "right" }} onClick={() => addComment(false, null, null)}>Add Comment</Button>
                    </>
                    : <Input type="textarea" id="addComment" name="addComment" value="Please log in to leave a comment" onChange={addCommentOnChange} disabled />}
            </Row>
            {(errors) ? <Row><Col md="4"></Col> <Col md="4" className="mt-2"> <h4>Be the first to share your opinion on this movie!</h4> </Col><Col md="4"></Col></Row> : ""}
            {(comments) ? comments : ""}
        </Container>
    )

}

async function makeRequest(movie) {
    return await postRequest("/api/movies/comments/getComments", JSON.stringify(movie))
        .then((data) => data)
        .catch((err) => false);
}

async function addCommentAPI(comment, token) {
    if (!token) return false;
    return await postRequest("/api/movies/comments/addComments", JSON.stringify(comment), token)
        .then((data) => true)
        .catch((err) => false);
}