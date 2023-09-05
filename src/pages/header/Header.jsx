import s from './Header.module.scss'

export default function Header(){
    return(
        <div id={s.headerContainer}>
            <p>Instagram</p>
            <i className="fa-solid fa-user"></i>
        </div>
    )
}