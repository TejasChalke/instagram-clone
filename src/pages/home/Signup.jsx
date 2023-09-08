import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'

export default function Signup(){
    const navigate = useNavigate();

    function signup(){
        console.log("signup")
    }

    return(
        <div id={s.container}>
            <div className={s.title}>Sign up for Instagram</div>
            <div id={s.form}>
                 <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Enter your Name</p>
                    </div>
                    <input type="text" name="signup-name" id="signup-name" />
                </div>
                 <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Choose a Username</p>
                    </div>
                    <input type="text" name="signup-uname" id="signup-uname" />
                </div>
                <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Email</p>
                    </div>
                    <input type="email" name="signup-email" id="signup-email" />
                </div>
                <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Password</p>
                    </div>
                    <input type="password" name="signup-pass" id="signup-pass" />
                </div>
                <input
                    type="button"
                    value="Sign Up"
                    onClick={signup}
                    onKeyDown={signup}
                />
            </div>
            <div className={s.msg}>
                <p>
                    Already have an account? 
                    <span
                    className={s.link}
                    tabIndex={0}
                    onClick={() => { navigate('/signin');}}
                    onKeyDown={() => { navigate('/signin');}}
                    >
                        Sign in!
                    </span>
                </p>
            </div>
        </div>
    )
}