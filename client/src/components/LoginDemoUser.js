import React from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authentication';

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const loggedOut = useSelector(state => state.authentication.username);

  if (loggedOut) {
    return null
  }

  const popDemoUser = e => {
    e.preventDefault()
    dispatch(login("demo@example.com", "password"))
    history.push('/')
  }

  return (
          <button type="submit" onClick={popDemoUser} className="demo-login-button">Login Demo User</button>
  );
}

export default LoginForm
