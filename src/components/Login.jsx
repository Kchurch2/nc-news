import { useState } from "react"

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

    return (
        <section>
        <form onSubmit = {handleSubmit}>
        <label htmlFor="login"></label>
        <input disabled={User} value={LoginUser} onChange={((e) => {
            setLoginUser(e.target.value)
            setBadUser(null)
        })} type="text" id="login-value"></input>
        </form>
        {BadUser ? <p>Invalid Username</p> : null}
        <button onClick={handeClick}> Logout </button>
        </section>

    )
}