import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';
import Calendar from './Calendar';
import Friends from './Friends';
import NewPrepSessionForm from "./NewPrepSessionForm";

function App() {

  const [darkMode, setDarkMode] = useState(true)
  const [signedIn, setSignedIn] = useState(false)

  function handleDarkModeToggle(){
    setDarkMode(!darkMode)
  }

  function handleSignIn(){
    setSignedIn(!signedIn)
  }

  return (
    <div className={darkMode?'Dark':'Light'}>
      <NavBar
      handleDarkModeToggle={handleDarkModeToggle}
      darkMode={darkMode}
      handleSignIn={handleSignIn}
      signedIn={signedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/calendar">
          <Calendar/>
        </Route>
        <Route path="/friends">
          <Friends/>
        </Route>
        <Route path="/newprepsession">
          <NewPrepSessionForm/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
