import s from './Search.module.scss'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { RandomUsersContext } from '../../contexts/RandomUsers';

export default function Search(){
    const naivgate = useNavigate();
    const {randomUsersData} = useContext(RandomUsersContext);

    // const user_data = [
    //     {
    //         "name": "Viraj Dhumal",
    //         "tag": "@virajdhumal",
    //         "followers": 69,
    //         "following": 420,
    //         "desc": "Passionate about technology, coding, and hiking. Always learning and exploring new horizons.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "John Doe",
    //         "tag": "@johndoe",
    //         "followers": 100,
    //         "following": 50,
    //         "desc": "Lover of books, music, and travel. Enjoys the simple pleasures of life.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Alice Smith",
    //         "tag": "@alicesmith",
    //         "followers": 200,
    //         "following": 150,
    //         "desc": "Art enthusiast, coffee addict, and aspiring chef. Life is a canvas waiting to be painted.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Eva Johnson",
    //         "tag": "@evajohnson",
    //         "followers": 45,
    //         "following": 75,
    //         "desc": "Nature lover, birdwatcher, and yoga enthusiast. Finding peace in the great outdoors.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Michael Brown",
    //         "tag": "@michaelbrown",
    //         "followers": 150,
    //         "following": 100,
    //         "desc": "Tech geek, gamer, and DIY enthusiast. Building a world one project at a time.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Sarah Wilson",
    //         "tag": "@sarahwilson",
    //         "followers": 300,
    //         "following": 250,
    //         "desc": "Passionate about fitness, nutrition, and helping others lead a healthier life.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "David Lee",
    //         "tag": "@davidlee",
    //         "followers": 75,
    //         "following": 60,
    //         "desc": "Film buff, foodie, and avid traveler. Exploring cultures and cuisines around the world.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Emily Davis",
    //         "tag": "@emilydavis",
    //         "followers": 50,
    //         "following": 40,
    //         "desc": "Dreamer, writer, and eternal optimist. Creating stories and spreading positivity.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Alex Turner",
    //         "tag": "@alexturner",
    //         "followers": 80,
    //         "following": 70,
    //         "desc": "Musician, guitarist, and music lover. Letting the melodies speak when words fail.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Olivia Clark",
    //         "tag": "@oliviaclark",
    //         "followers": 110,
    //         "following": 90,
    //         "desc": "Fashionista, trendsetter, and aspiring fashion designer. Style is a form of self-expression.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Daniel White",
    //         "tag": "@danielwhite",
    //         "followers": 120,
    //         "following": 110,
    //         "desc": "Adventurer, thrill-seeker, and adrenaline junkie. Embracing life's daring challenges.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Sophia Green",
    //         "tag": "@sophiagreen",
    //         "followers": 55,
    //         "following": 65,
    //         "desc": "Animal lover, volunteer, and advocate for a more compassionate world.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "William Taylor",
    //         "tag": "@williamtaylor",
    //         "followers": 95,
    //         "following": 85,
    //         "desc": "Photographer, storyteller, and capturing life's moments one click at a time.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Mia Martinez",
    //         "tag": "@miamartinez",
    //         "followers": 70,
    //         "following": 55,
    //         "desc": "Gourmet chef, food critic, and connoisseur of culinary delights. Savoring every bite.",
    //         "image": undefined
    //     },
    //     {
    //         "name": "Liam Anderson",
    //         "tag": "@liamanderson",
    //         "followers": 130,
    //         "following": 120,
    //         "desc": "Explorer, historian, and uncovering the mysteries of the past. History comes alive.",
    //         "image": undefined
    //     }
    // ];
    
    return(
        <>
            <Header />

            <div id={s.searchContainer}>
                <div id={s.searchBar}>
                    {/* <p>Enter a name or id</p> */}
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" name="search" id="search" placeholder='Enter a name or id'/>
                </div>

                <div id={s.searchResults}>
                    {randomUsersData.size === 0 && <div id={s.title}>
                        No search results!
                    </div>}
                    {
                        randomUsersData.map((item, idx) => {
                            return (
                                <div
                                className={s.searchItem}
                                key={idx}
                                onClick={() => {
                                    naivgate('/profile', {
                                        state: {data: item, type: 2}
                                    })
                                }}>
                                    <i className="fa-solid fa-user"></i>
                                    <p>{item.name}</p>
                                    <p>@{item.uname}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}