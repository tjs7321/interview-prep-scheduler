import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import NavBar from './NavBar';
import Calendar from '../pages/Calendar';
import Friends from '../pages/Friends';
import NewPrepSessionForm from "../pages/NewPrepSessionForm";
import LoginSignUpPage from "../pages/LoginSignUpPage";
import SessionDetailPage from '../pages/SessionDetailPage'
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
          <Home
          darkMode={darkMode}
          {...user}/>
        </Route>
        <Route path="/calendar">
          <Calendar
          darkMode={darkMode}
            user={user}
          />
        </Route>
        <Route path="/friends">
          <Friends
          darkMode={darkMode}
          />
        </Route>
        <Route path="/newprepsession">
          <NewPrepSessionForm
          darkMode={darkMode}
          />
        </Route>
        <Route path="/login">
          <LoginSignUpPage
          onLogin={onLogin}
          />
        </Route>
        <Route path='/sessions/:id'>
          <SessionDetailPage
          darkMode={darkMode}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
