import { useContext } from 'react';
import s from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export default function Header(){
    const naivgate = useNavigate();
    const {userData} = useContext(UserContext);

    return(
        <div id={s.headerContainer}>
            <p>MySpace</p>
            <div id={s.icons}>
                <i
                    className="fa-solid fa-plus"
                    onClick={() => {
                        naivgate('/newpost')
                    }}
                ></i>
                <i
                    className="fa-solid fa-bell"
                    onClick={() => {
                        naivgate('/notifications')
                    }}
                ></i>
                <i
                    className="fa-solid fa-user"
                    onClick={() => {
                        naivgate('/profile', {
                            state: {data: userData, type: 1}
                        })
                    }}
                ></i>
            </div>
        </div>
    )
}