import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Switch, Route, Link, Redirect } from "react-router-dom";

import Login from "./Components/SignIn/signIn";
import SignUp from "./Components/SignUp/signUp";
import Profile from './Components/Profile/Profile';

function App() {
  const token=localStorage.getItem("token")
  return (
    
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/signin"}>uploading@s3</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/signin"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/signup"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          {!token?
          <Switch>
          <Route exact path='/' component={Login} />
          <Route path="/signin" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/profile" component={Profile}/>
          <Route path="*" render={() => { return <Redirect to="/signin" /> }} exact />
        </Switch>
          :
          <Switch>
            <Route path="/profile" component={Profile}/>
          <Route path="/signin" component={Login} />
            <Route path="*" render={() => { return <Redirect to="/profile" /> }} exact />
          </Switch>
          }
          
        </div>
      </div>
    </div>
  );
}

export default App;