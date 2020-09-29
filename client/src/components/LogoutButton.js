import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import * as AuthAction from '../store/authentication';

const LogoutButton = ({ loggedOut, logout }) => {
  if (loggedOut) {
    return null;
  }
  return (
    <div id="logout-button-holder" >
      <button onClick={logout} className="Header-button">Logout</button>
    </div>
  );
}

const LogoutButtonContainer = () => {
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthAction.logout());
  const loggedOut = useSelector(state => !state.authentication.id);

  return <LogoutButton logout={logout} loggedOut={loggedOut} />;
};

export default LogoutButtonContainer;
