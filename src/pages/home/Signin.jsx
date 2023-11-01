import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'
import { UserContext } from '../../contexts/UserContext';
import { useContext, useState } from 'react';
import { RandomUsersContext } from '../../contexts/RandomUsers';
import { Toast } from '../toast/Toast';

export default function Signin(){
    const navigate = useNavigate();

    //using the state passed by the context provider to possibly
    //change the current user
    const {setUserData} = useContext(UserContext);
    const {setRandomUsersData} = useContext(RandomUsersContext);

    //messages
    const [message, setMessage] = useState("Test message");
    const [show, setShow] = useState(false);

    async function signin(){
        const data = {
            email: document.querySelector('#email').value,
            pass: document.querySelector('#pass').value
        };


        const resId = await fetch('http://localhost:8080/signin', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const id = await resId.json();

        if(id === -1){
            console.error("User not found!");
            setMessage("User not found!");
            setShow(true);
            return;
        }

        const resData = await fetch(`http://localhost:8080/getuser/${id}`,{
            method: 'get'
        });

        const userData = await resData.json();

        const resRandom = await fetch(`http://localhost:8080/getrandomusers/${id}`,{
            method: 'get'
        });

        const randomUserData = await resRandom.json();


        setUserData(userData);
        setRandomUsersData(randomUserData);

        navigate('/feed');
    }

    if(show){
        setTimeout(() => {
            setShow(false);
        }, 3500)
    }

    return(
        <div id={s.container}>
            {show && <Toast text={message} type="error"/>}
            <div className={s.title}>Login to MySpace</div>
            <div id={s.form}>
                <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Email</p>
                    </div>
                    <input type="text" name="email" id="email" />
                </div>
                <div className={s.formItem}>
                    <div className={s.labels}>
                        <p>Password</p>
                        <p className={s.link} tabIndex={0}>Forgot password?</p>
                    </div>
                    <input type="password" name="pass" id="pass" />
                </div>
                <input
                    type="button"
                    value="Sign In"
                    onClick={signin}
                    onKeyDown={signin}
                />
            </div>
            <div className={s.msg}>
                <p>
                    Don't have a account? 
                    <span
                    className={s.link}
                    tabIndex={0}
                    onClick={() => { navigate('/signup');}}
                    onKeyDown={() => { navigate('/signup');}}
                    >
                        Sign up!
                    </span>
                </p>
            </div>
        </div>
    )
}