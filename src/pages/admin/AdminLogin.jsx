import { useNavigate } from 'react-router-dom';
import s from './Admin.module.scss'
import { Toast } from '../toast/Toast';
import { useState } from 'react';

export default function AdminLogin(){
    const navigate = useNavigate();

    //messages
    const [message, setMessage] = useState("Test message");
    const [show, setShow] = useState(false);

    async function signin(){
        const data = {
            email: document.querySelector('#aemail').value,
            pass: document.querySelector('#apass').value
        };

        const resId = await fetch('http://localhost:8080/adminsignin', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const id = await resId.json();

        if(id === -1){
            console.error("Admin not found!");
            setMessage("Admin not found!");
            setShow(true);
            return;
        }

        navigate('/admin/home', {
            state: {email: document.querySelector('#aemail').value}
        });
    }

    if(show){
        setTimeout(() => {
            setShow(false);
        }, 3500)
    }

    return(
        <div id={s.outerContainer}>
            <div id={s.container}>
                {show && <Toast text={message} type="error"/>}
                <div className={s.title}>Login to Admin Dashboard</div>
                <div id={s.form}>
                    <div className={s.formItem}>
                        <div className={s.labels}>
                            <p>Email</p>
                        </div>
                        <input type="text" name="email" id="aemail" />
                    </div>
                    <div className={s.formItem}>
                        <div className={s.labels}>
                            <p>Password</p>
                        </div>
                        <input type="password" name="pass" id="apass" />
                    </div>
                    <input
                        type="button"
                        value="Sign In"
                        onClick={signin}
                        onKeyDown={signin}
                        />
                </div>
            </div>
            <div id={s.imageContainer}>
                <img src='adminLogin.png' alt="" />
            </div>
        </div>
    )
}