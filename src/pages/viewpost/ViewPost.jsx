import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import s from './ViewPost.module.scss';
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function ViewPost(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const {userData} = useContext(UserContext);

    // retrieve comments
    const [comments, setComments] = React.useState([]);

    useEffect(() => {
        async function getComments(){
            try {
                const response = await fetch(`http://localhost:8080/getcomments?pid=${state.data.id}`);
    
                if (response.ok) {
                    setComments(await response.json());
                    console.log("Comments retrieved");
                } else {
                    console.log("Error getting comment: " + response.statusText);
                }
            } catch (err) {
                console.error("Error in getting comment request: " + err.message);
            }
        }

        getComments();
    }, [state.data.id]);

    async function addComment(){
        const comment = document.querySelector("#commentInput").value;

        if(comment.trim().length < 3) return;

        
        const formData = new FormData();
        formData.append('comment', comment);
        formData.append('userId', userData.id);
        formData.append('postId', state.data.id);
        formData.append('uname', userData.uname);
        
        try {
            const response = await fetch("http://localhost:8080/addcomment", {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const commentId = await response.json();
                document.querySelector("#commentInput").value = "";
                console.log("Comment added: " + commentId);
            } else {
                console.log("Error adding comment: " + response.statusText);
            }
        } catch (err) {
            console.error("Error adding comment: " + err.message);
        }

        changeComments();
    }

    async function changeComments(){
        try {
            const response = await fetch(`http://localhost:8080/getcomments?pid=${state.data.id}`);

            if (response.ok) {
                // console.log(await response.json());
                setComments(await response.json());
                console.log("Comments retrieved");
            } else {
                console.log("Error getting comment: " + response.statusText);
            }
        } catch (err) {
            console.error("Error in getting comment request: " + err.message);
        }
    }    

    async function reportComment(id, comment){
        try {
            const response = await fetch(`http://localhost:5000/analyze?text=${comment}`);
            
            if (response.ok) {
                const data = await response.json();

                if(data.score > -0.2){
                    console.log("the comment is fine");
                    return;
                }
                
            } else {
                console.log("Error getting report: " + response.statusText);
            }
        } catch (err) {
            console.error("Error in report request: " + err.message);
        }
        

        // if score is bad then delete comment
        try {
            const response = await fetch(`http://localhost:8080/deletecomment?id=${id}`);

            if (response.ok) {
                console.log("Comment deleted");
            } else {
                console.log("Error deleting comment: " + response.statusText);
            }
        } catch (err) {
            console.error("Error in making delete request: " + err.message);
        }
    }

    return(
        <>
            <Header />
                <div id={s.postConatiner}>
                    <img
                        src={`data:image/jpeg;base64,${state.data.image}`}
                        alt=""
                    />
                    <div id={s.data}>
                        <p
                            className={s.big}
                            onClick={() => {
                                navigate('/profile', {
                                    state: {data: {id: state.data.userid}, type: -1}
                                })
                            }}
                        >
                            <i
                                className="fa-solid fa-user"
                            ></i>
                            {state.data.name}
                        </p>
                        <p
                            className={s.big}
                            >
                            Likes: {state.data.likes}
                        </p>
                    </div>
                    <div id={s.comments}>
                        <input type="text" name="" id="commentInput" />
                        <div className={s.btn} onClick={addComment}>Add Comment</div>
                        {
                            comments.length !== 0 && 
                            comments.map((comment, idx) => {
                                return (
                                    <div className={s.item}>
                                        <div className={s.itemHeader}>
                                            <
                                                p
                                                onClick={() => {
                                                    navigate('/profile', {
                                                        state: {data: {id: comment.userId}, type: -1}
                                                    })
                                                }}
                                            >
                                                @{comment.uname}
                                            </p>
                                            <
                                                i
                                                className="fa-solid fa-flag"
                                                onClick={() => reportComment(comment.id, comment.comment)}
                                            >
                                            </i>
                                        </div>
                                        <p>{comment.comment}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            <Footer />
        </>
    )
}