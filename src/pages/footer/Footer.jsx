import s from './Footer.module.scss'

export default function Footer(){
    return(
        <div id={s.footerContainer}>
            <i className="fa-solid fa-rss"></i>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-regular fa-comment"></i>
        </div>
    )
}