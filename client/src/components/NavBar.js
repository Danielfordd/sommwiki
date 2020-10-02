import React from "react";
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, NavLink, useHistory } from 'react-router-dom';

import Logoutbutton from './LogoutButton'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import HomePage from './HomePage'
import Article from "./Article";
import WriteArticle from './WriteArticle'
import EditForm from './EditForm'
import SearchResults from './SearchResults'
import logo from '../images/LOGO.png'
import SearchBar from "./SearchBar";

const NavBar = ({loggedIn, searchResultsHandler}) => {


  if(loggedIn) {
    return (
      <BrowserRouter>
        <nav className="nav-bar">
        <NavLink exact to="/" className="Header-link logo"><img src={logo} alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
          <form onSubmit={searchResultsHandler} >
            <input
              className="Search-bar"
              type="text"
              placeholder="Search articles"
              />
          </form>
          <NavLink to="/articles/create" activeClassName="active" className="Header-link">Write Article</NavLink>
          <Logoutbutton />
        </nav>
        <Switch>
            <Route exact path="/articles/:id/edit" component={EditForm} />
            <Route exact path ="/articles" component={SearchResults} />
            <Route exact path="/articles/create"  component={WriteArticle} />
            <Route exact path="/article/:id" component={Article} />
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
        <NavLink exact to="/" className="Header-link logo"><img src={logo} alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
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

  const searchResultsHandler = e => {
    e.preventDefault();
  }

  return <NavBar loggedIn={loggedIn} />
}

export default NavBarContainer
