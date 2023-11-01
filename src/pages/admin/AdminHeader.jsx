import s from './AdminHeader.module.scss'

export default function AdminHeader(props){
    function toggleMenu(){
        document.querySelector(`#${s.drop}`).classList.toggle("active");
    }

    return(
        <div id={s.container}>
            <p>MySpace Dashboard</p>
            <div id={s.adminIcons} onClick={toggleMenu}>
                <p>Log out</p>
            </div>
        </div>
    )
}