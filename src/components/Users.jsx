import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { getUsers, getUserInfo } from "../utils/api"


export const Users = () => {
    const [UsersList, setUsersList] = useState([])
    


    const UsersInfo = (username) => {
    const [UserInfo, setUserInfo] = useState([])
        useEffect(() => {
            console.log(username)
            getUserInfo(username.username).then((res) => {
                setUserInfo(res)
            })
        }, [])

        return (
            <div>
            <p className ="user-name"> Name : {UserInfo.name}</p> 
           <img className="user-img"src={UserInfo.avatar_url} alt={UserInfo.name} ></img>
           </div>
        )
    }

    useEffect(() => {
        getUsers().then((res) => {
            setUsersList(res)
        })
    }, [])

    return (
        <div>
        <h2> Authors </h2>
        <ul className="user-list">
        {UsersList.map((user) => {
            return (
                <Link>
                <li key={user.username} className ="user-box">
                {console.log(user)}
                <h3 className="user-username"> {user.username} </h3>
                {<UsersInfo username={user.username} />}
                </li>
                </Link>
            )
        })}
        </ul>
        </div>
    )
}