import React from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Logoutbutton from './LogoutButton'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import HomePage from './HomePage'
import Article from "./Article";
import WriteArticle from './WriteArticle'
import EditForm from './EditForm'
import SearchResults from './SearchResults'
import SearchBar from "./SearchBar";

const NavBar = ({ loggedIn }) => {


  if(loggedIn) {
    return (
      <BrowserRouter>
        <nav className="nav-bar">
        <NavLink exact to="/" className="Header-link logo"><img src="/logo.png" alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
          <SearchBar />
          <NavLink to="/articles/create" activeClassName="active" className="Header-link">Write Article</NavLink>
          <Logoutbutton />
        </nav>
        <Switch>
            <Route exact path="/articles/:id/edit" component={EditForm} />
            <Route exact path="/articles/create"  component={WriteArticle} />
            <Route exact path="/article/:id" component={Article} />
            <Route exact path ="/articles" component={SearchResults} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/signup" component={SignUpForm} />
            <Route path="/" component={HomePage}/>
        </Switch>
    </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <nav className="nav-bar">
        <NavLink exact to="/" className="Header-link logo"><img src="/logo.png"  alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
        <SearchBar />
        <NavLink to="/login" activeClassName="active" className="Header-link">Login</NavLink>
        <NavLink to="/signup" activeClassName="active" className="Header-link">Sign Up</NavLink>
      </nav>
      <Switch>
          <Route exact path ="/articles" component={SearchResults} />
          <Route path="/article/:id" component={Article} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup"component={SignUpForm} />
          <Route path="/" component={HomePage}/>
      </Switch>
    </BrowserRouter>
  )
}

const NavBarContainer = () => {
  const loggedIn = useSelector(state => !!state.authentication.id);

  return <NavBar loggedIn={loggedIn} />
}

export default NavBarContainer
