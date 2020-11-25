export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "41ee13f3c2d945ddb590fd2a99e1167e";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
    return window.location.hash
      .substring(1)
      .split("&")
      .reduce((initial, item) => {
        let parts = item.split("=");
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});
  };
  
export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
"%20"
)}&response_type=token&show_dialog=true`;

function apiCall(token) {
  console.log("hajhaj",token);
  return fetch("https://api.spotify.com/v1/me", {
    "method": "GET",
    "headers": {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    }}).then(data => data.json())
}

export function getUser(token) {
  return apiCall(token).then(jsonResponse => jsonResponse.id).catch(er => console.log(er))
}