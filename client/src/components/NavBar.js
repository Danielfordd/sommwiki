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
import { Icon } from '@iconify/react';
import linkedin2Icon from '@iconify-icons/icomoon-free/linkedin2';
import githubOutlined from '@iconify-icons/ant-design/github-outlined';
import angellistIcon from '@iconify-icons/fa/angellist';
import LoginModal from './LoginModal'
import SignUpModal from './SignUpModal'

const NavBar = ({ loggedIn }) => {


  if(loggedIn) {
    return (
      <BrowserRouter>
        <nav className="nav-bar space">
          <div className="nav-bar">
            <NavLink exact to="/" className="Header-link logo"><img src="/logo.png" alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
            <SearchBar />
            <NavLink to="/articles/create" activeClassName="active" className="Header-link loginheader">Write Article</NavLink>
            <Logoutbutton />
          </div>
          <div className="nav-bar">
            <a href="https://github.com/Danielfordd/sommwiki" className="github-a" alt="github"><Icon icon={githubOutlined} className="github" /></a>
            <a href="https://www.linkedin.com/in/daniel-ford-29970a5a/" alt="linkedin"><Icon icon={linkedin2Icon} className="linkedin" /></a>
            <a href="https://angel.co/u/daniel-ford-14" className="angel" alt="angellist" ><Icon icon={angellistIcon} className="angels" /></a>
          </div>
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
      <nav className="nav-bar space">
        <div className="nav-bar">
        <NavLink exact to="/" className="Header-link logo"><img src="/logo.png"  alt={"Somm Wiki"} className="nav-bar__logo" /></NavLink>
        <SearchBar />
        <LoginModal />
        <SignUpModal />
        </div>
        <div className="nav-bar">
            <a href="https://github.com/Danielfordd/sommwiki" className="github-a" alt="github"><Icon icon={githubOutlined} className="github" /></a>
            <a href="https://www.linkedin.com/in/daniel-ford-29970a5a/" alt="linkedin"><Icon icon={linkedin2Icon} className="linkedin" /></a>
            <a href="https://angel.co/u/daniel-ford-14" className="angel" alt="angellist" ><Icon icon={angellistIcon} className="angels" /></a>
          </div>
      </nav>
      <Switch>
          <Route exact path ="/articles" component={SearchResults} />
          <Route path="/article/:id" component={Article} />
          {/* <Route path="/login" component={LoginForm} />
          <Route path="/signup"component={SignUpForm} /> */}
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
