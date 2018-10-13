import { authHeader } from '../helpers/auth-header';
// import { addListener } from 'cluster';

export const userService = {
  login,
  logout,
  register,
  getAll
};

function login(email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };
  return fetch('http://127.0.0.1:4200/users/authenticate', requestOptions)
    .then(response => {

      if (!response.ok) {

        return Promise.reject(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('===here111===')
      console.log(data)

      // login successful if there's a jwt token in the response
      if (data) {
      console.log('===here222===')
        
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('auth_user', JSON.stringify(data));
      }

      return data;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('auth_user');
}

function register(username, email, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  };
  // alert(username,email,password);
  return fetch('http://127.0.0.1:4200/users/register', requestOptions)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.statusText);
      }

      return response.json();
    })
    .then(data => data);
}

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch('/users', requestOptions).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  return response.json();
}