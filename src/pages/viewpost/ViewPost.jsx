import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import s from './ViewPost.module.scss';
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Toast } from '../toast/Toast';

export default function ViewPost(){
    const {state} = useLocation();
    const navigate = useNavigate();
    const {userData} = useContext(UserContext);

    // retrieve comments
    const [comments, setComments] = React.useState([]);

    //messages
    const [message, setMessage] = React.useState("Test message");
    const [show, setShow] = React.useState(false);

    useEffect(() => {
        if(userData.id === undefined){
            navigate('/signin');
            return;
        }

        async function getComments(){
            try {
                const response = await fetch(`http://localhost:8080/getcomments?pid=${state.data.id}`);
    
                if (response.ok) {
                    setComments(await response.json());
                } else {
                    console.log("Error getting comment: " + response.statusText);
                }
            } catch (err) {
                console.error("Error in getting comment request: " + err.message);
            }
        }

        getComments();
    }, [state.data.id, navigate, userData]);

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
                await response.json();
                document.querySelector("#commentInput").value = "";
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
                setComments(await response.json());
            } else {
                console.log("Error getting comment: " + response.statusText);
            }
        } catch (err) {
            console.error("Error in getting comment request: " + err.message);
        }
    }    

    async function reportComment(id, comment){
        try {
            const response = await fetch(`http://localhost:5000/predict_sentiment?text=${comment}`);
            
            if (response.ok) {
                const data = await response.json();

                if(data.sentiment === 1){
                    setMessage("The comment seems fine");
                    setShow(true);
                    return;
                }
                
            } else {
                console.log("Error getting report: " + response.statusText);
            }
        } catch (err) {
            console.error("Error in report request: " + err.message);
        }
        
        // delete and retrieve the comment
        let retrieved = null;
        try {
            const response = await fetch(`http://localhost:8080/deleteandgetcomment?id=${id}`);
            if (response.ok) {
                setMessage("Comment will be validated");
                setShow(true);
                retrieved = await response.json();
            } else {
                console.log("Error deleting comment: " + response.statusText);
                return;
            }
        } catch (err) {
            console.error("Error in making delete request: " + err.message);
            return;
        }
        
        // save the comment in the new table
        const formdata = new FormData();

        if(retrieved !== null){
            formdata.append('userId', retrieved.userId);
            formdata.append('postId', retrieved.postId);
            formdata.append('uname', retrieved.uname);
            formdata.append('comment', retrieved.comment);
        }else{
            console.log("Couldn't retreive comment to be deleted");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:8080/addpendingcomment", {
                method: 'POST',
                body: formdata,
            });

            if (response.ok) {
                document.querySelector("#commentInput").value = "";
            } else {
                console.log("Error adding pending comment: " + response.statusText);
                return;
            }
        } catch (err) {
            console.error("Error in request for adding pending comment: " + err.message);
            return;
        }

        // send a notification to the user
        const notifyData = {
            user: retrieved.userId,
            type: "report",
            message: `Your comment "${retrieved.comment}" has been reported.`
        };

        await fetch('http://localhost:8080/addnotification', {
            method: 'post',
            body: JSON.stringify(notifyData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error adding report notification", err)
            return;
        })

        changeComments();
    }

    if(show){
        setTimeout(() => {
            setShow(false);
        }, 3500)
    }

    return(
        <>
            <Header />
                <div id={s.postConatiner}>
                    {show && <Toast text={message}/>}
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
                                    <div key={idx} className={s.item}>
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