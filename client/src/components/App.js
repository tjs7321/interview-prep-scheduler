import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import NavBar from './NavBar';
import Calendar from '../pages/Calendar';
import Friends from '../pages/Friends';
import NewPrepSessionForm from "../pages/NewPrepSessionForm";
import LoginSignUpPage from "../pages/LoginSignUpPage";

function App() {

  const [darkMode, setDarkMode] = useState(true)
  const [signedIn, setSignedIn] = useState(false)
  const [userID, setUserID] = useState(null)

  function onLogin(user){
    setUserID(user.id)
    console.log(`user set to ${user.id}`)
  }

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
        <Route path="/login">
          <LoginSignUpPage
          onLogin={onLogin}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
