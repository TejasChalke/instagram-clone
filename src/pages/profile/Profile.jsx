import s from './Profile.module.scss'
import Header from '../header/Header';
import Footer from '../footer/Footer';

export default function Profile(){
    return(
        <>
            <Header />

            <div id={s.profileContainer}>
                <div id={s.profileInfo}>
                    <img src="/logo192.png" alt="profile" />
                    <div className={s.text}>
                        <p className={s.big}>Tejas Chalke</p>
                        <p className={s.med}>@tejaschalke</p>
                    </div>
                    <div className={s.col2}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi, suscipit. Iste voluptatum quos cumque tenetur quis! Officiis vel dolorum rer.
                    </div>
                </div>

                <div id={s.followerInfo}>
                    <p className={s.med}>
                        <span>69</span> Followers
                    </p>
                    <p className={s.med}>
                        <span>420</span> Following
                    </p>
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