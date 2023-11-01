import s from './Toast.module.scss'

export function Toast(props){
    let icon = "fa-solid fa-circle-info";
    let bgcolor = "white", color = "black", icolor = "blue";

    if(props.type === "error") {
        icon = "fa-solid fa-circle-xmark";
        icolor = "red"
    }

    if(props.theme === "dark") {
        bgcolor = "black"
        color = "white"
    }

    const style = {
        backgroundColor: bgcolor,
        color: color
    }
    
    return(
        <div id={s.toast} style={style}>
            <i className={icon} style={{color: icolor}}></i>
            <p>{props.text}</p>
        </div>
    )

}