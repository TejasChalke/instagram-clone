
import React, { useContext, useEffect } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import s from './Feed.module.scss';
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function Feed(){
    const [posts, setPosts] = React.useState([]);
    const {userData} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts(){
            try {
                const response = await fetch(`http://localhost:8080/getposts?userId=${userData.id}`);

                if (response.ok) {
                    const temp = await response.json();
                    setPosts(temp);
                } else {
                    console.log("Error getting posts: " + response.statusText);
                }
            } catch (error) {
                console.log("Error getting posts. " + error.message)
            }
        }

        getPosts();
    }, [userData])

    return(
        <>
            <Header />
            
            <div id={s.feedContainer}>
                {
                    posts.length > 0 &&
                    posts.map((item, idx) => {
                        return (
                            <div 
                                key={idx}
                                className={s.item}
                            >
                                <div className={s.data}>
                                    <p
                                        className={s.med}
                                        onClick={() => {
                                            navigate('/profile', {
                                                state: {data: {id: item.userid}, type: -1}
                                            })
                                        }}
                                    >
                                        {item.name}
                                    </p>
                                    <p
                                        className={s.med}
                                    >
                                        Likes: {item.likes}
                                    </p>
                                </div>
                                <img
                                    src={`data:image/jpeg;base64,${item.image}`}
                                    alt=""
                                    onClick={() => {
                                        navigate('/viewpost', {
                                            state: {data: item}
                                        })
                                    }}
                                />
                            </div>
                        );
                    })
                }
                {
                    posts.length === 0 &&
                    <div id={s.title}>Nothing posted yet!</div>
                }
            </div>

            <Footer />
        </>
    )
}