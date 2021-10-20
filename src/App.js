import { Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {useEffect, useState } from "react";
import './App.css';
import Navbar from './components/Nav';
import Articles from "./components/Articles";
import SingleArticle from "./components/SIngleArticle";
import {Login, Logout} from "./components/Login";




function App() {
  const [Topics, setTopics] = useState([{}])
  const [Page, setPage] = useState(1)
  const [User, setUser] = useState(null)

  const login = (username) => {
    setUser(username)
    localStorage.setItem("loggedin", username)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("loggedin")
  }

  useEffect(() => {
    const prevUser = localStorage.getItem("loggedin")
    if(prevUser) {
      setUser(prevUser)
    }
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link onClick={()=>{setPage(1)}} to="/"><h1> NC News </h1></Link>
        {User ? <Login login={login} User={User}/> : <Logout User={User} logout={logout}/>}        
        <Navbar setTopics={setTopics} Topics={Topics} setPage={setPage}/>
      </header>
      <Switch>
        <Route exact path ="/">
          <Articles Topics={Topics} Page={Page} setPage={setPage}/>
        </Route>
        <Route exact path ="/articles/:topic">
        <Articles  Topics={Topics} Page={Page} setPage={setPage}/>
        </Route>
        <Route exact path ="/article/:article_id">
        <SingleArticle />
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
