import { useEffect, useState } from "react"
import { getUserInfo } from "../utils/api"

export const LoginBar = ({BadUser,setBadUser, login, User, logout}) => {
    const [LoginUser, setLoginUser] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        login(LoginUser)
        setLoginUser('')
    }

    const handeClick = (e) => {
        e.preventDefault()
        logout()
    }

    const UserImg = ({User}) => {
        const [Image, setImage] = useState('')
        console.log(User)

        useEffect(() => {
        getUserInfo(JSON.parse(User)).then((res) => {
            console.log(res)
            setImage(res.avatar_url)
        })
        }, [User])

        return (
            <img className="profile-img" src={Image} alt="profile-pic"></img>
        )
    }

    return (
        <section className="login-bar">
        {BadUser ? <p className ="label-login">Invalid Username</p> : null}
        {!User ? <form className ="login-form" onSubmit = {handleSubmit}><label class-name="login-label" htmlFor="login"> Login </label>
        <input required disabled={User} value={LoginUser} onChange={((e) => {
            setLoginUser(e.target.value)
            setBadUser(null)
        })} type="text" id="login-value"></input>
        <button type="submit"> submit</button>
        </form>
        : null}  
        {User? <UserImg User={User} />: null}
        {User? <p className ="label-login"> Welcome {JSON.parse(User)} </p> : null}
        {User? <button onClick={handeClick} className="login-button"> Logout </button> : null }
        </section>

    )
}