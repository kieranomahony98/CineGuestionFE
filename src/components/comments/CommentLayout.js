import React, { useState } from "react";
import { Form, Input, Label, Row, Container, Button } from "reactstrap";
import { Comments } from "./Comments"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import route from "data/Routes"
import { useEffect } from "react";
export const CommentLayout = () => {
    // const { discussionId } = useParams();
    const [commentText, setCommentText] = useState({
        text: ''
    });
    const [commentCount, setCommentCount] = useState(0);
    const [comments, setComments] = useState([]);
    const { token, user } = useSelector(state => state.auth);
    useEffect(() => {
        makeRequest()
            .then((result) => {
                setCommentCount(() => result.count);
                const placeHolder = [];
                console.log(result.comment)
                for (const comment of Object.values(result.comments)) {
                    placeHolder.push(comment);
                }
                setComments(() => manageComments(placeHolder));
            }).catch((err) => {
                throw err
            });
    }, []);

    const refreshData = () => {
        makeRequest()
            .then((result) => {
                setCommentCount(() => result.count);
                const placeHolder = [];
                console.log(result.comment)
                for (const comment of Object.values(result.comments)) {
                    placeHolder.push(comment);
                }
                setComments(() => manageComments(placeHolder));
            }).catch((err) => {
                throw err
            });
    }

    const addComment = (replyComment = false, parentComment = null, replyCommentText = null) => {
        if (!user) return;
        if (!replyComment && commentText === "") return;

        const commentObj = {
            movieId: '2',
            id: user.id,
            userName: user.name,
            commentText: (replyComment) ? replyCommentText : commentText.text
        }
        if (replyComment) {
            commentObj.parentId = parentComment._id;
            commentObj.depth = parentComment.depth + 1;
        }
        addCommentAPI(commentObj, token);
    }

    const addCommentOnChange = e => {
        const { value } = e.target;
        setCommentText(commentText => ({ ...commentText, text: value }));
        console.log(commentText);
    }

    const manageComments = (comments) => {
        let commentComponents = [];
        for (const comment of Object.values(comments)) {
            commentComponents.push(
                <Row>
                    <Comments comment={comment} addComment={addComment} onSubmit={addComment} refresh={refreshData} />
                </Row>);
            if (comment.children && Object.keys(comment).length > 0) {
                const responses = manageComments(comment.children);
                commentComponents = commentComponents.concat(responses);
            }
        }
        setComments(() => commentComponents);
    }

    return (
        <Container>
            <Row>

                <Input type="textarea" id="addComment" name="addComment" onChange={addCommentOnChange} />
                <Button onClick={addComment}>Add Comment</Button>

            </Row>
            {(comments) ? comments : ''}
        </Container>
    )

}

async function makeRequest() {
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    return await axios.get(`${route}/api/movies/comments/getComments/2`, config)
        .then((comments) => comments.data)
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