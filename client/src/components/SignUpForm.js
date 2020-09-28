import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
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
                     onChange={e => setFirstName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="Last Name"
                     value={lastName}
                     onChange={e => setLastName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="User Name"
                     value={userName}
                     onChange={e => setUserName(e.target.value)}
                     className="input"/>
              <input type="text"
                     placeholder="Email"
                     value={email}
                     onChange={e => setEmail(e.target.value)}
                     className="input"/>
              <input type="password"
                     placeholder="Password"
                     value={password}
                     onChange={e => setPassword(e.target.value)}
                     className="input"/>
              <input type="password"
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChange={e => setConfirmPassword(e.target.value)}
                     className="input"/>
              <button type="submit" className="form-button">Sign Up</button>
              <div className="signup-form-login">
                <div>Already have an account?</div><NavLink to="/login"> Login</NavLink>
              </div>
       </form>
    </main>
  );
}

export default SignupForm
