import s from './Profile.module.scss'
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { useLocation, useNavigate } from "react-router-dom"
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RandomUsersContext } from '../../contexts/RandomUsers';

export default function Profile(){
    const {userData, setUserData} = useContext(UserContext);
    const {setRandomUsersData} = useContext(RandomUsersContext);

    const navigate = useNavigate();
    const [pageType, setPageType] = React.useState();


    const {state} = useLocation();
    const [profileData, setProfileData] = React.useState({});
    const [followData, setFollowData] = React.useState({
        followers: 0,
        following: 0
    });
    
    
    // used for setting the type of page to be showed
    useEffect(() => {
        if(state === undefined || state === null || userData.id === undefined){
            navigate('/signin');
            return;
        }

        async function checkFriends(){
            // userId is the person's id whose profile we are visting
            // followerId is the current logged in user
            // result 0 indicates current user does not follow the person 
            // result 1 indicates current user follows the person 

            const result = await fetch(`http://localhost:8080/checkfriends?userId=${state.data.id}&followerId=${userData.id}`).then(res => res.json())


            if(result === 1){
                setPageType(3);
            }else{
                setPageType(2);
            }
        }
        

        if(userData.id === state.data.id){
            setPageType(1);
        }else{
            checkFriends();
        }

    }, [pageType, state, userData, navigate])


    //used for setting the follower and following count
    useEffect(() => {
        if(state === undefined || state === null){
            navigate('/signin');
            return;
        }

        async function getUser(){
            try {
                const response = await fetch(`http://localhost:8080/getuser/${state.data.id}`,{
                    method: 'get'
                });

                if(response.ok){
                    setProfileData(await response.json());
                }else{
                    console.log("Error getting user after post click from server: " + response.statusText);
                }

            } catch (error) {
                console.log("Error getting user after post click: " + error)
            }
        }
        

        // if visiting profile page after clicking on a post
        // type will be -1 and user data will not be present
        // so retrieve the data
        if(state.type === -1){
            getUser();
        }else{
            setProfileData(
                (state !== undefined && state !== null) ? state.data : {}
            )
        }

        async function getFollowersCount(){
            const count = await fetch(`http://localhost:8080/getfollowercount?userId=${state.data.id}`, {
                method: 'get'
            })
            .then(res => res.text())
            .catch(err => {
                console.log("Error getting followers", err)
            })
            
            setFollowData(prev => {
                return {...prev, followers: count}
            })
        }

        async function getFollowingCount(){
            const count = await fetch(`http://localhost:8080/getfollowingcount?userId=${state.data.id}`)
            .then(res => res.json())
            .catch(err => {
                console.log("Error getting following", err)
                return;
            })

            setFollowData(prev => {
                return {...prev, following: count}
            })
        }

        getFollowersCount();
        getFollowingCount();
    }, [navigate, state])

    function signout(){
        setUserData({});
        setRandomUsersData({});
        navigate("/signin");
    }

    async function followUser(){
        const data = {
            userId: profileData.id,
            followerId: userData.id
        }

        const didFollow = await fetch('http://localhost:8080/followuser', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error following user", err)
            return;
        })

        if(didFollow === -1){
            console.log("Coludn't update followers")
        }else{
            setFollowData(prev => {
                return {...prev, followers: parseInt(prev.followers) + parseInt(1)}
            })
            setPageType(3);

            sendFollowNotification();
        }

    }

    async function unFollowUser(){
        const data = {
            userId: profileData.id,
            followerId: userData.id
        }

        const didUnFollow = await fetch('http://localhost:8080/unfollowuser', {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error unfollowing user", err)
            return;
        })
        
        if(didUnFollow === -1){
            console.log("Coludn't update followers")
        }else{
            setFollowData(prev => {
                return {...prev, followers: parseInt(prev.followers) - parseInt(1)}
            })
            setPageType(2);
        }
    }

    async function sendFollowNotification(){
        const data = {
            user: profileData.id,
            type: "follower",
            message: `User ${userData.name.toUpperCase()} (@${userData.uname}) has started following you.`
        }

        await fetch('http://localhost:8080/addnotification', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log("Error adding notification", err)
            return;
        })
    }

    return(
        <>
            <Header />

            <div id={s.profileContainer}>
                <div id={s.profileInfo}>

                    <img
                    src={profileData.image !== undefined && profileData.image !== null ? profileData.image : "/logo192.png"}
                    alt="profile"
                    />
                    
                    <div className={s.text}>
                        <p className={s.big}>
                            {profileData.name !== undefined ? profileData.name : "Default Name"}
                        </p>
                        <p className={s.med}>
                        @{profileData.uname !== undefined ? profileData.uname : "defaultuname"}
                        </p>
                    </div>
                    <div className={s.col2}>
                        {profileData.description !== undefined ? profileData.description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, suscipit. Iste voluptatum quos cumque tenetur quis! Officiis vel dolorum rer."}
                    </div>
                </div>

                <div id={s.followerInfo}>
                    <p className={s.med}>
                        <span onClick={
                            () => {
                                navigate('/listing',{
                                    state: {
                                        type: 1,
                                        id: profileData.id
                                    }
                                })
                            }
                        }>
                            {followData.followers !== undefined ? followData.followers : 69}
                        </span> Followers
                    </p>
                    <p className={s.med}>
                    <span onClick={
                            () => {
                                navigate('/listing',{
                                    state: {
                                        type: 2,
                                        id: profileData.id
                                    }
                                })
                            }
                        }>
                            {followData.following !== undefined ? followData.following : 420}
                        </span> Following
                    </p>
                </div>

                <div id={s.buttons}>
                    {pageType === 1 && 
                    <div className={s.btn} onClick={signout}>Sign Out</div>}

                    {pageType === 2 && 
                    <div
                        className={s.btn}
                        onClick={followUser}
                    >
                        Follow
                    </div>}

                    {pageType === 3 && 
                    <div
                        className={`${s.btn} ${s.white}`}
                        onClick={unFollowUser}
                    >
                        Unfollow
                    </div>}
                    
                    {pageType === 3 && 
                    <div className={s.btn}>Message</div>}
                </div>

                <div id={s.postsContainer}>
                    <div className={s.med}>Posts</div>
                    <div id={s.posts}>
                        <p className={s.big}>User has not posted anything!</p>
                    </div>
                </div>

            </div>

            <Footer />
        </>
    )
}