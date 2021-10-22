import { Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Nav';
import Articles from "./components/Articles";
import SingleArticle from "./components/SIngleArticle";
import { Users } from "./components/Users";
import {LoginBar } from "./components/Login";
import axios from "axios";




function App() {
  const [Topics, setTopics] = useState([{}])
  const [Page, setPage] = useState(1)
  const [User, setUser] = useState(null)
  const [BadUser, setBadUser] = useState(null)

  const login = (username) => {
    axios.get(`https://nc-news-kc.herokuapp.com/api/users/${username}`)
    .then((res) => {
      setUser(JSON.stringify(username))
      localStorage.setItem('loggedin', JSON.stringify(username))
    })
    .catch(()=>{
      setBadUser('Invalid User')
      setUser(null)
    })


  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('loggedin')
  }

  useEffect(() => {
    const prevUser = localStorage.getItem('loggedin')
    if(prevUser) {
      setUser(prevUser)
    }
  }, [User, BadUser])

  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link className="page-header" onClick={()=>{setPage(1)}} to="/"><h1> NC News </h1></Link>
        <LoginBar className="login-bar" BadUser={BadUser} setBadUser={setBadUser} login={login} User={User} logout={logout}/>    
        <Navbar setTopics={setTopics} Topics={Topics} setPage={setPage}/>
      </header>
      <Switch>
        <Route exact path ="/">
          <Articles User={User} Topics={Topics} Page={Page} setPage={setPage}/>
        </Route>
        <Route exact path ="/articles/:topic">
        <Articles User={User} Topics={Topics} Page={Page} setPage={setPage}/>
        </Route>
        <Route exact path ="/article/:article_id">
        <SingleArticle User={User}/>
        </Route>
        <Route exact path ="/users">
        <Users />
        </Route>
        <Route path ="/">
        <p> Error - Page Not Found </p>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
