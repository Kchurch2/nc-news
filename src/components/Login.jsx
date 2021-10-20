import { useState } from "react"

export const LoginBar = ({login, User, logout}) => {
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
        <input disabled={User} value={LoginUser} onChange={(e) => setLoginUser(e.target.value)} type="text" id="login-value"></input>
        </form>
        <button onClick={handeClick}> Logout </button>
        </section>

    )
}