export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://uniquiz-e9d1f.web.app/spotifyConnect";
const clientId = "41ee13f3c2d945ddb590fd2a99e1167e";

const scopes = [
  "user-top-read",
  "playlist-read-private"
];

export const getTokenFromUrl = () => {
    /**Retrives the token from the URL and makes it to string*/

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
"%20")}&response_type=token&show_dialog=true`;

function spotifyApiCall(token, URL) {
  /** Makes API call to Spotify */
  return fetch(URL, {
    "method": "GET",
    "headers": {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + token
    }}).then(data => data.json());
}

export async function getUserImg(token) {
  /**Gets the user's profile image from spotify */
  let apiObj = await spotifyApiCall(token, "https://api.spotify.com/v1/me");
  if (apiObj.images[0]) {
    return apiObj.images[0].url
  }
  else {
    return "defaultProfilePic.jpg"
  }
}
export async function getUserPlaylists(token) {
  /** */
  let apiObj = await spotifyApiCall(token, "https://api.spotify.com/v1/me/playlists?limit=20"); //calls for 20 playlists from the user
  let allTracks = [];

  for (let i = 0; i < apiObj.items.length; i++) {
    const playListsObj = await spotifyApiCall(token, apiObj.items[i].tracks.href) //calls all the tracks that are listed in the playlists
    playListsObj.items.forEach(trackObj => {
        if (trackObj.track!=null && trackObj.track.id && trackObj.track.album.images[0]) {
          let artists = [];
          trackObj.track.artists.forEach(artist => artists.push(artist.name));
          allTracks.push([trackObj.track.name, artists, trackObj.track.id, trackObj.track.preview_url, trackObj.track.album.images[0].url])
        }
      })
    }

  const allTracksUnique = allTracks.reduce((acc, currentTrack) => {
        if (allTracks.filter(track => track[1] === currentTrack[1]).length === 1) {
          return ([...acc, currentTrack]);
        }
        else {
            allTracks = allTracks.filter(track => track[1] !== currentTrack[1]); //removes all duplicates from the array
            if (acc.filter(track => track[1] === currentTrack[1]).length === 0) { //checks if currentTrack doesn't exist, if so, it gets added to the list
              return ([...acc, currentTrack]);
            }
            else { 
              return acc; 
            }
        }
    }, []);

  return allTracksUnique;
}