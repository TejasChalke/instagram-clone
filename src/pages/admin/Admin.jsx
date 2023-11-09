import { useLocation } from 'react-router-dom'
import s from './Admin.module.scss'
import AdminHeader from './AdminHeader'
import { useEffect, useState } from 'react';
import { Toast } from '../toast/Toast'

export default function Admin(){
    const [data, setData] = useState([]);
    const {state} = useLocation();

    //messages
    const [message, setMessage] = useState("Test message");
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function loadData(){
            const response = await fetch("http://localhost:8080/getpendingforreview")
            .then(res => res.json());

            setData(response);
        }

        loadData();
    }, []);

    async function validateComment(comment){
        const formData = new FormData();
        formData.append('comment', comment.comment);
        formData.append('userId', comment.userId);
        formData.append('postId', comment.postId);
        formData.append('uname', comment.uname);
        
        try {
            const response = await fetch("http://localhost:8080/addcomment", {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                await response.json();
            } else {
                console.log("Error adding comment: " + response.statusText);
                setMessage("Server error: Validating comment");
                setShow(true);
                return;
            }
        } catch (err) {
            console.error("Error in request for adding comment: " + err.message);
            setMessage("Request error: Validating comment");
            setShow(true);
            return
        }
        
        deleteComment(comment);
    }
    
    async function deleteComment(comment){
        await fetch(`http://localhost:8080/deletependingcomment?id=${comment.id}`, {
            method: 'get'
        })
        .then(res => res.json())
        .catch(err => {
            console.log("error deleting pending comment" + err)
            setMessage("Error deleting pending comment");
            setShow(true);
            return;
        })

        await fetch(`http://localhost:8080/deletereview?pendingid=${comment.id}`, {
            method: 'get'
        })
        .then(res => res.json())
        .catch(err => {
            console.log("error deleting review" + err)
            setMessage("Error deleting pending review");
            setShow(true);
            return;
        })

        setMessage("Review Completed");
        setShow(true);

        changeData();
    }

    async function changeData(){
        const response = await fetch("http://localhost:8080/getpendingforreview")
        .then(res => res.json());

        setData(response);
    }

    if(show){
        setTimeout(() => {
            setShow(false);
        }, 3500)
    }

    return(
        <>
            {show && <Toast text={message}/>}
            <AdminHeader />
            <div id={s.adminContainer}>
                <div id={s.title}>
                    <p>Comments for review</p>
                    <i
                        className="fa-solid fa-arrows-rotate"
                        onClick={changeData}
                    ></i>
                </div>
                <div id={s.list}>
                    {
                        data.map((item, idx) => {
                            return (
                                <div className={s.listItem} key={idx}>
                                    <p className={s.big}>
                                        <span>User: </span>
                                        @{item.uname}
                                    </p>
                                    <p className={s.med}>
                                        <span>Comment: </span>
                                        {item.comment}
                                    </p>
                                    <div className={s.btns}>
                                        <div
                                            className={s.btn}
                                            onClick={
                                                () => validateComment(item)
                                            }
                                        >
                                            Validate
                                        </div>
                                        <div
                                            className={`${s.btn} ${s.red}`}
                                            onClick={
                                                () => deleteComment(item)
                                            }
                                        >
                                            Delete
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}