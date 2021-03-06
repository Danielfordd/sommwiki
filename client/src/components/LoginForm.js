import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginDemoUser from './LoginDemoUser'

import * as AuthAction from '../store/authentication';

const LoginForm = ({loginHandler, updateEmail, updatePassword, email, password, token}) => {

  if (token) {
    return <Redirect to="/" />;
  }

  return (
      <main className="centered middled">
        <form onSubmit={loginHandler} className="Login-form">
          <input type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
                className="input" />
          <input type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
                className="input"/>
          <div>
            <button type="submit" className="form-button">Login</button>
            <LoginDemoUser />
          </div>
          {/* <div className="signup-form-login"> */}
              {/* <div>Dont have an account?</div><NavLink to="/signup"> Sign Up</NavLink> */}
          {/* </div> */}
        </form>
      </main>
  );
}

const LoginFormContainer = () => {
 const dispatch = useDispatch()
 const login = (email, password) => dispatch(AuthAction.login(email, password))
 const [email, setEmail] = useState()
 const [password, setPassword] = useState()
 const token = useSelector(state => state.authentication.id);

 const updateEmail = (e) => {
  setEmail(e.target.value)
}

const updatePassword = (e) => {
  setPassword(e.target.value)
}

const loginHandler = e => {
  e.preventDefault()
  login(email, password)
}

 return <LoginForm updateEmail={updateEmail} updatePassword={updatePassword} loginHandler={loginHandler} token={token}/>
}

export default LoginFormContainer
