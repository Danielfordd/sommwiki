import Cookies from "js-cookie";

const SET_USER = "sommWiki/authentication/SET_USER";
const REMOVE_USER = "sommWiki/authentication/REMOVE_USER";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const XSRFTOKEN = await fetch('/api/auth/getToken')
    const token = (await XSRFTOKEN.json())

    const response = await fetch(`/api/auth/login`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token':token.XSRFTOKEN
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { user } = await response.json();
      dispatch(setUser(user));
    }
  };
};

export const signup = (firstName, lastName, userName,email, password) => async dispatch => {
    const XSRFTOKEN = await fetch('/api/auth/getToken')
    const token = (await XSRFTOKEN.json())

    const response = await fetch(`/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'csrf-token':token.XSRFTOKEN
      },
      body: JSON.stringify({firstName, lastName, userName,email, password}),
    });

    if (response.ok) {
      const { user } = await response.json();
      dispatch(setUser(user));
    }
}

export const logout = () => async dispatch => {

  const XSRFTOKEN = await fetch('/api/auth/getToken')
  const token = (await XSRFTOKEN.json())

  const res = await fetch('/api/auth/logout', {
    method: "delete",
    headers: {
      'csrf-token':token.XSRFTOKEN
    },
  });
  if (res.ok) {
    dispatch(removeUser());
  }
}


function loadUser() {
  const authToken = Cookies.get("token");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];

      const decodedPayload = atob(payload);

      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
    } catch (e) {
      Cookies.remove("token");
    }
  }
  return {};
}

export default function reducer(state=loadUser(), action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case REMOVE_USER:
      return {};
    default:
      return state;
  }
}
