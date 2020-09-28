import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { signup } from "../store/authentication";

import Logoutbutton from './LogoutButton'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ArticlePreview from './ArticlePreview'
import HomePage from './HomePage'

const NavBar = ({loggedIn}) => {
  if(loggedIn) {
    return (
      <BrowserRouter>
      <nav className="nav-bar">
        <NavLink exact to="/" className="Header-link">LOGO STANDIN</NavLink>
        <form>
          <input
            className="Search-bar"
            type="text"
            placeholder="Search articles" />
        </form>
        <NavLink to="/api/articles/create" activeClassName="active" className="Header-link">Write Article</NavLink>
        <Logoutbutton />
      </nav>
      <Switch>
          <Route exact path="/login">
              <LoginForm />
          </Route>
          <Route exact path="/signup">
              <SignUpForm />
          </Route>
          <Route path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <nav className="nav-bar">
        <NavLink exact to="/" className="Header-link">LOGO STANDIN</NavLink>
        <form>
          <input
            className="Search-bar"
            type="text"
            placeholder="Search articles" />
        </form>
        <NavLink to="/login" activeClassName="active" className="Header-link">Login</NavLink>
        <NavLink to="/signup" activeClassName="active" className="Header-link">Sign Up</NavLink>
      </nav>
      <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup"component={SignUpForm} />
          <Route path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
  )
}

const NavBarContainer = () => {
  const loggedIn = useSelector(state => !!state.authentication.id)
  return <NavBar loggedIn={loggedIn}/>
}

export default NavBarContainer
