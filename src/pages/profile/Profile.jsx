import s from './Profile.module.scss'
import Header from '../header/Header';
import Footer from '../footer/Footer';

import { useLocation, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { RandomUsersContext } from '../../contexts/RandomUsers';

export default function Profile(){
    const {setUserData} = useContext(UserContext);
    const {setRandomUsersData} = useContext(RandomUsersContext);
    const navigate = useNavigate();

    const {state} = useLocation();
    const user_data = (state !== undefined && state !== null) ? state.data : {};
    
    // if type is 2 then check with database whether the person is followed or not
    const profile_type = (state !== undefined && state !== null) ? state.type : 1;

    function signout(){
        setUserData({});
        setRandomUsersData({});
        navigate("/signin");
    }

    return(
        <>
            <Header />

            <div id={s.profileContainer}>
                <div id={s.profileInfo}>

                    <img
                    src={user_data.image !== undefined && user_data.image !== null ? user_data.image : "/logo192.png"}
                    alt="profile"
                    />
                    
                    <div className={s.text}>
                        <p className={s.big}>
                            {user_data.name !== undefined ? user_data.name : "Default Name"}
                        </p>
                        <p className={s.med}>
                        @{user_data.uname !== undefined ? user_data.uname : "defaultuname"}
                        </p>
                    </div>
                    <div className={s.col2}>
                        {user_data.description !== undefined ? user_data.description : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, suscipit. Iste voluptatum quos cumque tenetur quis! Officiis vel dolorum rer."}
                    </div>
                </div>

                <div id={s.followerInfo}>
                    <p className={s.med}>
                        <span>
                            {user_data.followers !== undefined ? user_data.followers : 69}
                        </span> Followers
                    </p>
                    <p className={s.med}>
                        <span>
                            {user_data.following !== undefined ? user_data.following : 420}
                        </span> Following
                    </p>
                </div>

                <div id={s.buttons}>
                    {profile_type === 1 && 
                    <div className={s.btn} onClick={signout}>Sign Out</div>}

                    {profile_type === 2 && 
                    <div className={s.btn}>Follow</div>}

                    {profile_type === 3 && 
                    <div className={`${s.btn} ${s.white}`}>Unfollow</div>}
                    
                    {profile_type === 3 && 
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