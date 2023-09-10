import s from './Search.module.scss'
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import { RandomUsersContext } from '../../contexts/RandomUsers';

export default function Search(){
    const naivgate = useNavigate();

    //initialized during page load and used whenever nothing is searched
    const {randomUsersData} = useContext(RandomUsersContext);

    //controlled input used for searching
    const [searchText, setSearchText] = React.useState("");

    //array which is used to display the data
    const [displayData, setDisplayData] = React.useState([]);

    useEffect(() => {
        setDisplayData(randomUsersData);
    }, [randomUsersData])

    useEffect(() => {
        async function searchUsers(){
            let temp = await fetch('http://localhost:8080/getusersbypattern/' + searchText, {
                method: 'get'
            }).then(res => res.json());
    
            setDisplayData(temp);
        }

        const delay = 1500;

        const debounce = setTimeout(() => {
            if(searchText.trim().length === 0){
                setDisplayData(randomUsersData);
            }else{
                searchUsers();
            }
        }, delay)

        return () => {
            clearTimeout(debounce);
        }
    }, [searchText, randomUsersData])


    return(
        <>
            <Header />

            <div id={s.searchContainer}>
                <div id={s.searchBar}>
                    {/* <p>Enter a name or id</p> */}
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Enter a name or id'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <div id={s.searchResults}>
                    {displayData.size === 0 && <div id={s.title}>
                        No search results!
                    </div>}
                    {
                        displayData.map((item, idx) => {
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