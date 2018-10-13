export function authHeader() {
  // return authorization header with jwt token
  // console.log(JSON.parse(localStorage.getItem('auth_user')))

  const accessToken = JSON.parse(localStorage.getItem('auth_user')).token;

  if (accessToken) {
    return { 'Authorization': 'JWT ' + accessToken };
  } else {
    return {};
  }
  return;
}