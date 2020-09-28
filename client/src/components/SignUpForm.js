import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as AuthAction from '../store/authentication';



const SignupForm = () => {
  const dispatch = useDispatch()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const signup = (firstName, lastName, userName,email, password) => dispatch(AuthAction.signup(firstName, lastName, userName,email, password))

  const SignupHandler = e => {
    e.preventDefault()
    signup(firstName, lastName, userName,email, password)
  }

  return (
    <main className="centered middled">
    <form onSubmit={SignupHandler}>
      <input type="text"
             placeholder="First Name"
             value={firstName}
             onChange={e => setFirstName(e.target.value)}/>
      <input type="text"
             placeholder="Last Name"
             value={lastName}
             onChange={e => setLastName(e.target.value)}/>
      <input type="text"
             placeholder="User Name"
             value={userName}
             onChange={e => setUserName(e.target.value)}/>
      <input type="text"
             placeholder="Email"
             value={email}
             onChange={e => setEmail(e.target.value)}/>
      <input type="password"
             placeholder="Password"
             value={password}
             onChange={e => setPassword(e.target.value)} />
      <input type="password"
             placeholder="Confirm Password"
             value={confirmPassword}
             onChange={e => setConfirmPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  </main>
  );
}

export default SignupForm
