import { useState } from "react"

export const Login = ({login}) => {
    const [LoginUser, setLoginUser] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login(LoginUser)
    }



    return (
        <form onSubmit = {handleSubmit}>
        <label htmlFor="login"></label>
        <input onChange={(e) => setLoginUser(e.target.value)} type="text" id="login-value"></input>
        </form>
    )
}

export const Logout = ({logout, User}) => {

    const handleClick = (e) => {
        e.preventDefault()
        logout()
    }

    return (
        <div>
        <p> Logged in as {User}</p>
        <button onCLick={handleClick}> Logout </button>
        </div>
    )
}