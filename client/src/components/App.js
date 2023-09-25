import React, {useState} from "react";
import { Route, Switch } from "react-router-dom";
import Home from './Home';
import NavBar from './NavBar';
import Calendar from './Calendar';
import Friends from './Friends';

function App() {

  const [darkMode, setDarkMode] = useState(true)

  function handleDarkModeToggle(){
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode?'Dark':'Light'}>
      <NavBar
      handleDarkModeToggle={handleDarkModeToggle}
      darkMode={darkMode}
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
      </Switch>
    </div>
  );
}

export default App;
