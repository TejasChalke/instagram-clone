import { useContext } from 'react';
import s from './Header.module.scss'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export default function Header(){
    const naivgate = useNavigate();
    const {userData} = useContext(UserContext);

    return(
        <div id={s.headerContainer}>
            <p>Instagram</p>
            <i className="fa-solid fa-user" onClick={() => {
                naivgate('/profile', {
                    state: {data: userData, type: 1}
                })
            }}></i>
        </div>
    )
}