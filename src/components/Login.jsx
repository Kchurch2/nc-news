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
        <div>
        {!User ? <form onSubmit = {handleSubmit}><label className ="label-login" htmlFor="login"> Login </label>
        <input disabled={User} value={LoginUser} onChange={((e) => {
            setLoginUser(e.target.value)
            setBadUser(null)
        })} type="text" id="login-value"></input>
        <button type="submit"> submit</button>
        </form>
        : null}  
        {BadUser ? <p>Invalid Username</p> : null}
        {User? <p> Welcome {JSON.parse(User)} </p> : null}
        {User? <button onClick={handeClick} className="login-button"> Logout </button> : null }
        </div>

    )
}