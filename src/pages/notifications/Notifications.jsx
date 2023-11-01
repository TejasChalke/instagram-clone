import React, { useEffect } from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import s from './Notifications.module.scss'
import { UserContext } from '../../contexts/UserContext';

export default function Notifications(){
    const [data, setData] = React.useState([]);
    const {userData} = React.useContext(UserContext);

    useEffect(() => {
        async function getNotifications(){
            const temp = await fetch(`http://localhost:8080/getnotifications?userId=${userData.id}`, {
                method: 'get'
            })
            .then(res => res.json())
            .catch(err => {
                console.log("error getting notifications" + err)
                setData([])
                return;
            })

            setData(temp);
        }

        getNotifications();
    }, [userData])

    async function changeNotifications(){
        const temp = await fetch(`http://localhost:8080/getnotifications?userId=${userData.id}`, {
            method: 'get'
        })
        .then(res => res.json())
        .catch(err => {
            console.log("error getting notifications" + err)
            setData([])
            return;
        })

        setData(temp);
    }

    async function requestReview(comment, id){
        const start = comment.indexOf(`"`) + 1, end = comment.lastIndexOf(`"`);
        const reqComment = comment.substring(start, end);

        const data = {
            userid: userData.id,
            comment: reqComment
        }

        //get pending comment id
        const pendingId = await fetch("http://localhost:8080/findpendingcomment", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error finding pending comment: " + err);
            return;
        })

        if(pendingId === -1){
            console.log("Coludn't find pending comment");
            return;
        }

        //add comment for review
        await fetch(`http://localhost:8080/addreview?pendingid=${pendingId}`, {
            method: 'get'
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error adding comment for review" + err)
            return;
        })

        //delete the notification
        await fetch(`http://localhost:8080/deletenotification?id=${id}`, {
            method: 'get'
        })
        .then(res => res.json())
        .catch(err => {
            console.log("error deleting notifications" + err)
            setData([])
            return;
        })

        changeNotifications();
    }

    return(
        <>
            <Header />
            
            <div id={s.notificationsContainer}>
                {
                    data.map((item, idx) => {
                        return(
                            <div className={s.notification} key={idx}>
                                <div className={s.header}>
                                    <p>{item.type + " notification"}</p>
                                    <p>{item.date}</p>
                                </div>
                                <p className={s.med}>{item.message}</p>
                                {
                                    item.type === "report" && 
                                    <
                                        div
                                        className={s.btn}
                                        onClick={
                                            () => requestReview(item.message, item.id)
                                        }
                                    >
                                        Request review
                                    </div>
                                }
                            </div>
                        )
                    }) 
                }
            </div>
            
            <Footer />
        </>
    )
}