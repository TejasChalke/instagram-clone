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
                            </div>
                        )
                    }) 
                }
            </div>
            
            <Footer />
        </>
    )
}