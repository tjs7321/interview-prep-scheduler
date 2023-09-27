import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import NavBar from './NavBar';
import Calendar from '../pages/Calendar';
import Friends from '../pages/Friends';
import NewPrepSessionForm from "../pages/NewPrepSessionForm";
import LoginSignUpPage from "../pages/LoginSignUpPage";

function App() {

  const [darkMode, setDarkMode] = useState(true)

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function onLogin(user){
    setUser(user)
    console.log(`user set to ${user.username}`)
  }


  function handleDarkModeToggle(){
    setDarkMode(!darkMode)
  }

  function handleLogout(){
    setUser(null)
  }

  return (
    <div className={darkMode?'Dark':'Light'}>
      <NavBar
      handleDarkModeToggle={handleDarkModeToggle}
      darkMode={darkMode}
      {...user}
      handleLogout={handleLogout}
      />
      <Switch>
        <Route exact path="/">
          <Home {...user}/>
        </Route>
        <Route path="/calendar">
          <Calendar
            user={user}
          />
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
