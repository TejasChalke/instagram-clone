import Header from '../header/Header';
import Footer from '../footer/Footer';
import s from './Listing.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

export default function Listing(){
    const navigate = useNavigate();
    const [listData, setListData] = React.useState([]);
    const {state} = useLocation();

    const title = state.type === 1 ? "People that follow you" : "People you are following";
    const zero = state.type === 1 ? "You don't have any followers yet." : "You are not following anyone yet.";

    useEffect(() => {
        let temp = []

        async function fetchData(){

            if(state.type === 1){
                temp = await fetch(`http://localhost:8080/getfollowers/${state.id}`, {
                    method: 'get'
                }).then(res => res.json())
            } else {
                temp = await fetch(`http://localhost:8080/getfollowings/${state.id}`, {
                    method: 'get'
                }).then(res => res.json())
            }

            setListData(temp);
        }

        fetchData();
            
    }, [state])

    return(
        <>
            <Header />

            <div id={s.listingContainer}>
                <p id={s.title}>
                    {title}
                </p>
                    {
                        listData.length === 0 ?
                        <p className={s.big}>{zero}</p> : 
                        listData.map((item, idx) => {
                            return (
                                <div
                                className={s.listItem}
                                key={idx}
                                onClick={() => {
                                    navigate('/profile', {
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

            <Footer />
        </>
    )
}