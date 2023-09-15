import s from './Footer.module.scss'
import { useNavigate } from 'react-router-dom';

export default function Footer(){
    const naivgate = useNavigate();

    return(
        <div id={s.footerContainer}>
            <i
                className="fa-solid fa-rss"
                    onClick={() => {
                    naivgate('/feed')
                }}
            ></i>
            <i
                className="fa-solid fa-magnifying-glass"
                onClick={() => {
                    naivgate('/search')
                }}
            ></i>
            <i className="fa-regular fa-comment"></i>
        </div>
    )
}