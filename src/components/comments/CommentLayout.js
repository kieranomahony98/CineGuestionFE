import React, { useState } from "react";
import { Form, Input, Label, Row, Container, Button } from "reactstrap";
import { Comments } from "./Comments"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import route from "data/Routes"
export const CommentLayout = () => {
    getComments();
    // const { discussionId } = useParams();
    const [commentText, setCommentText] = useState({
        text: ''
    });
    const [comments, setComments] = useState(null);
    const { token, user } = useSelector(state => state.auth)
    const addComment = (e, replyComment = false, parentComment = null, replyCommentText = null) => {
        console.log('in here');
        e.preventDefault();
        if (!user) return;
        if (!replyComment && commentText === "") return;

        const commentObj = {
            movieId: '2',
            id: user._id,
            userName: user.name,
            commentText: (replyComment) ? replyCommentText : commentText.text
        }
        if (replyComment) {
            commentObj.parentId = parentComment._id;
            commentObj.depth = parentComment.depth + 1;
        }
        console.log(commentObj);
        addCommentAPI(commentObj, token);
    }

    const addCommentOnChange = e => {
        const { value } = e.target;
        setCommentText(commentText => ({ ...commentText, text: value }));
        console.log(commentText);
    }

    async function getComments() {
        makeRequest()
            .then((result) => {
                const commentList = [];
                for (const commentObj in result) {
                    commentList.push
                }
            }).catch((err) => {

            });
    }
    const showComments = (comments) => {
        let comments = [];
        for (const [key, value] of commments.entries()) {
            comments.push(
                <Row>
                    <Comments comment={value} addComment={addComment} />
                </Row>);
            if (comment.children && Object.keys(comment).length > 0) {
                const responses = showComments(comment.children);
                comments = comments.concat(responses);
            }
        }
        setComments(() => comments);
    }
    return (
        <Container>
            <Row>
                <Form onSubmit={addComment}>
                    <Label for="addComment" />
                    <Input type="textarea" id="addComment" name="addComment" onChange={addCommentOnChange} />
                    <Button type="submit">Add Comment</Button>
                </Form>
            </Row>
            <Row style={{ margin: 20 }}><Comments /></Row>

        </Container>
    )

}

async function makeRequest() {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    axios.get(`${route}/api/movies/comments/getComments/2`, config)
        .then((comments) => comments)
        .catch((err) => {
            console.log(err.message);
            throw err;
        });

}

async function addCommentAPI(comment, token) {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    if (token) {
        config.headers["x-auth-token"] = token;
        axios.post(`${route}/api/movies/comments/addComments`, JSON.stringify(comment), config)
            .then((comments) => comments)
            .catch((err) => {
                console.log(err.message);
                throw err;
            });
    }
}