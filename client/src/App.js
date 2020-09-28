import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import UserList from './components/UsersList';
import LoginFormContainer from './components/LoginForm'
import SignupForm from './components/SignUpForm'
import LogoutButtonContainer from './components/LogoutButton';

function App() {

  return (
    <BrowserRouter>
    <LoginFormContainer />
    <LogoutButtonContainer />
    <SignupForm />
        <nav className="nav-bar">
          <NavLink to="/" activeClassName="active" className="pure-button">Home</NavLink>
          <NavLink to="/users" activeClassName="active" className="pure-button">Users</NavLink>
        </nav>
        <Switch>
            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
