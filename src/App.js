import { Switch, Route, BrowserRouter } from "react-router-dom";
import {useState } from "react";
import './App.css';
import Navbar from './components/Nav';
import Articles from "./components/Articles";

function App() {
  const [Topics, setTopics] = useState([{}])
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <h1> NC News </h1>
        <Navbar setTopics={setTopics} Topics={Topics}/>
      </header>
      <Switch>
        <Route exact path ="/">
          <Articles />
        </Route>
        <Route exact path ="/{topic}">
          <Articles />
        </Route>
        <Route exact path ="/articles/{article_id}">
          <p>hello</p>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
