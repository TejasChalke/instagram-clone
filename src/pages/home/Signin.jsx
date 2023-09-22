import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';
import { RandomUsersContext } from '../../contexts/RandomUsers';

export default function Signin(){
    const navigate = useNavigate();

    //using the state passed by the context provider to possibly
    //change the current user
    const {setUserData} = useContext(UserContext);
    const {setRandomUsersData} = useContext(RandomUsersContext);

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

    return(
        <div id={s.container}>
            <div className={s.title}>Login to Instagram</div>
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