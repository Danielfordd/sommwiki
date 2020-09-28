import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import * as AuthAction from '../store/authentication';

const LoginForm = ({loginHandler, updateEmail, updatePassword, email, password}) => {
  return (
    <main className="centered middled">
    <form onSubmit={loginHandler}>
      <input type="text"
            placeholder="Email"
            value={email}
            onChange={updateEmail}/>
      <input type="password"
            placeholder="Password"
            value={password}
            onChange={updatePassword} />
      <button type="submit">Login</button>
    </form>
  </main>
  );
}

const LoginFormContainer = () => {
 const dispatch = useDispatch()
 const login = (email, password) => dispatch(AuthAction.login(email, password))
 const [email, setEmail] = useState()
 const [password, setPassword] = useState()

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

 return <LoginForm updateEmail={updateEmail} updatePassword={updatePassword} loginHandler={loginHandler}/>
}

export default LoginFormContainer
