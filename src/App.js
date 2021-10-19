import { Switch, Route, BrowserRouter, Link} from "react-router-dom";
import {useState } from "react";
import './App.css';
import Navbar from './components/Nav';
import Articles from "./components/Articles";
import SingleArticle from "./components/SIngleArticle";


function App() {
  const [Topics, setTopics] = useState([{}])
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to="/"><h1> NC News </h1></Link>
        <Navbar setTopics={setTopics} Topics={Topics}/>
      </header>
      <Switch>
        <Route exact path ="/">
          <Articles />
        </Route>
        <Route exact path ="/articles/:topic">
        <Articles />
        </Route>
        <Route exact path ="/article/:article_id">
        <SingleArticle />
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
