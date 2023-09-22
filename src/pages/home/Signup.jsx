import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'

export default function Signup(){
    const navigate = useNavigate();

    async function signup(){
        const name = document.querySelector("#signup-name").value;
        const uname = document.querySelector("#signup-uname").value;
        const email = document.querySelector("#signup-email").value;
        const pass = document.querySelector("#signup-pass").value;

        try {
            const response = await fetch(`http://localhost:8080/getbyuname?uname=${uname}`)

            if(response.ok){
                console.log("Uname is fine");
            }else{
                console.log("Check your uname");
                return;
            }
        } catch (error) {
            console.log("Error verifying uname " + error)
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/getbyemail?email=${email}`)

            if(response.ok){
                console.log("Email is fine");
            }else{
                console.log("Check your email");
                return;
            }
        } catch (error) {
            console.log("Error verifying email " + error)
            return;
        }
        
        var userId = -1;
        
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("pass", pass);

            const response = await fetch("http://localhost:8080/addcredentials", {
                method: 'post',
                body: formData,
            })

            if(response.ok){
                userId = await response.json();
                console.log("User creds added");
            }else{
                console.log("Check your creds data");
                return;
            }
        } catch (error) {
            console.log("Error adding user creds " + error)
            return;
        }

        if(userId < 1) return;

        try {
            const userData = new FormData();
            userData.append("id", userId);
            userData.append("name", name);
            userData.append("uname", uname);

            const response = await fetch("http://localhost:8080/adduser", {
                method: 'post',
                body: userData,
            })

            if(response.ok){
                console.log("User added");
            }else{
                console.log("Check your user data");
                return;
            }
        } catch (error) {
            console.log("Error adding user " + error)
            return;
        }

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