export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/spotifyConnect";
const clientId = "41ee13f3c2d945ddb590fd2a99e1167e";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private"
];

export const getTokenFromUrl = () => {
    /** retrives the token from the url and make it to string*/

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

function spotifyApiCall(token, URL) {
  /** Makes api call to spotify */
  return fetch(URL, {
    "method": "GET",
    "headers": {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    }}).then(data => data.json());
}

export function getUserTopPlaylist(token) {
  let apiObj = spotifyApiCall(token, "https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term");
  return apiObj
}

export async function getUserPlaylists(token) {
  let apiObj = await spotifyApiCall(token, "https://api.spotify.com/v1/me/playlists?limit=20");
  let allTracks = [];
  for (let i = 0; i < apiObj.items.length; i++) {
    const playListsObj = await spotifyApiCall(token, apiObj.items[i].tracks.href)
    playListsObj.items.forEach(trackObj => allTracks.push([trackObj.track.name, trackObj.track.id, trackObj.track.preview_url]));
    
  }
  const allTracksUnique = allTracks.reduce((acc, currentTrack) => {
        //console.log((allTracks.filter(track => track[1] === currentTrack[1]).length === 1));
        //console.log(allTracks.filter(track => track[1] === currentTrack[1]).length);
        if (allTracks.filter(track => track[1] === currentTrack[1]).length === 1) {
          return ([...acc, currentTrack]);
        }
        else {
            allTracks = allTracks.filter(track => track[1] !== currentTrack[1]); // tar bort alla duplicates från arrayen, detta kan nog göras bättre för om den redan tagits bort äre onödigt
            if (acc.filter(track => track[1] === currentTrack[1]).length === 0) { // kollar om currentTrack inte finns, då lägger vi in den
              return ([...acc, currentTrack]);
            }
            else { // annars så betyder det att vi lagt in currentTrack redan, o då lägger vi aldrig in något. Detta görs för vi kmr ju gå igenom alla currentTracks så vi kan inte lägga in alla
              return acc; 
            }
        }
    }, []);
  //console.log(allTracksUnique);
  return allTracksUnique;
}