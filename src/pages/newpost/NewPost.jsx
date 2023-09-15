import Footer from '../footer/Footer'
import Header from '../header/Header'
import s from './NewPost.module.scss'

export default function NewPost(){
    return(
        <>
            <Header />

            <div id={s.newpostConatiner}>

            </div>

            <h1>Upload here</h1>

            <Footer />
        </>
    )
}