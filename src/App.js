import { Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {useState } from "react";
import './App.css';
import Navbar from './components/Nav';
import Articles from "./components/Articles";
import SingleArticle from "./components/SIngleArticle";


function App() {
  const [Topics, setTopics] = useState([{}])
  const [Page, setPage] = useState(1)
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link onClick={()=>{setPage(1)}} to="/"><h1> NC News </h1></Link>
        <Navbar setTopics={setTopics} Topics={Topics} setPage={setPage}/>
      </header>
      <Switch>
        <Route exact path ="/">
          <Articles Page={Page} setPage={setPage}/>
        </Route>
        <Route exact path ="/articles/:topic">
        <Articles  Page={Page} setPage={setPage}/>
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
