import { useContext } from 'react';
import Footer from '../footer/Footer'
import Header from '../header/Header'
import s from './NewPost.module.scss'
import { UserContext } from '../../contexts/UserContext';

export default function NewPost(){
    const {userData} = useContext(UserContext);

    function changeImage(e){
        const image = document.querySelector("#imgFile").files[0];

        if(image){
            const preview = document.querySelector("#preview")
            preview.src = URL.createObjectURL(image)
        }
    }

    async function sendPost(){
        const img = document.querySelector("#imgFile").files[0];
        const desc = document.querySelector("#postDesc").value;

        if(img === undefined){
            return
        }

        const formData = new FormData();
        formData.append('image', img);
        formData.append('userId', userData.id);
        formData.append('description', desc);

        
        try {
            const response = await fetch("http://localhost:8080/addpost", {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const postId = await response.json();
                console.log("Post added: " + postId);
            } else {
                console.log("Error adding post: " + response.statusText);
            }
        } catch (err) {
            console.error("Error adding post: " + err.message);
        }
    }

    return(
        <>
            <Header />

            <div id={s.newpostConatiner}>
                <p id={s.title}>Add a new post</p>
                <div id={s.imageUpload}>
                    <input
                        type="file"
                        name="imgFile"
                        id="imgFile"
                        hidden
                        onChange={(e) => changeImage(e)}/>
                    <div
                        id={s.fileBtn}
                        onClick={() => {
                            document.querySelector("#imgFile").click();
                        }}
                    >
                        Select a file
                    </div>
                    <img src="logo512.png" alt="Preview" id='preview'/>
                </div>

                <textarea name="postDesc" id="postDesc" cols="30" rows="6"></textarea>

                <div
                    id={s.submit}
                    onClick={sendPost}
                >
                        Upload post
                </div>
            </div>

            <Footer />
        </>
    )
}