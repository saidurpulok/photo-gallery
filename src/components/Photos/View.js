import React, { useEffect, useState } from 'react';
import { db } from "../../firebase";
import firebase from "firebase";
import './View.css';

const View = (props) => {
    const data = props.location.viewProps.data;
    const id = props.location.viewProps.id;
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const postComment = (event) => {
        event.preventDefault();
        db.collection("photos").doc(id).collection("comments").add({
          text: comment,
          username: (name !== "" ? name : "anonymous"),
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
        setName("")
    };
    
    useEffect(() => {
        let unsubscribe;
        if (id) {
            unsubscribe = db
            .collection("photos")
            .doc(id)
            .collection("comments")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }
        return () => {
            unsubscribe();
        };
    }, [id]);
    return (
        <div>
            <img
                src={data.imageUrl}
                alt={data.caption}
                width="100%"
            />
            <h5>{data.caption}</h5>
            <h6>Category: {data.category}</h6>
            <hr />
            <h5>Feedbacks</h5>
            <div className="post__comments">
                {comments.map((comment, id) => (
                <div key={"comment"+id}>
                    <strong key={"comment"+id}>{comment.username}</strong> {comment.text}
                </div>
                ))}
            </div>
            <form className="post__commentBox">
                <input
                    className="post__input"
                    type="text"
                    placeholder="Enter your name (or keep blank for anonymous feedback)."
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />
                <input
                    className="post__input"
                    type="text"
                    placeholder="Enter a feedback..."
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />
                <button
                    type="submit"
                    className="post__button"
                    disabled={!comment}
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
        </div>
    );
}

export default View;
