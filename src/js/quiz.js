import {database} from '../services/firebase.js';
import {getUserPlaylists} from './spotify.js';


function playlistPresenter () {
    let arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2", "cv4yGGhfXoWKfIueyQdP1BNMPT43"];
    let roomPlaylist = quizPlaylist(arrayuid);
    console.log("loop");
    // step 1: get tokens from each player
    // step 2: get the top 100 playlist from each player
    // step 3: combine the playlists
    // step 4: return the new playlist
    return null;
}

async function quizPlaylist (arrayuid) {
    let combinedPlaylist = [];

    for (let i = 0; i < arrayuid.length; i++) {
        let token = (await getUserToken(arrayuid[i])).val(); // hämtar ut token
        let userPlaylist = await getUserPlaylists(token);
        combinedPlaylist.push(userPlaylist); // lägger till i den stora playlisten med alla användares låtar
    }
    //console.log("hej");
    combinedPlaylist = combinedPlaylist.flat();
    let combinedPlaylistUnique = combinedPlaylist.reduce((acc, currentTrack) => {
        //console.log(combinedPlaylist.filter(track => track[1] === currentTrack[1]).length);
        if (combinedPlaylist.filter(track => track[1] === currentTrack[1]).length === arrayuid.length) { // använder filter för att se om det finns mer än ett track
            combinedPlaylist = combinedPlaylist.filter(track => track[1] !== currentTrack[1]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
            return ([...acc, currentTrack]); // och lägger till den till accumulatorn
        }
        else {
            return acc; // annars gör vi ingenting och returnerar accumulatorn
        }
    }, []);

    console.log(combinedPlaylistUnique);
    return combinedPlaylistUnique;
}
async function getUserToken (uid) {
    return database.ref('users/' + uid + '/token').once('value', (snapshot) => { 
        //console.log("Successfully received token");
    });
}

export default playlistPresenter;

/*arrayuid.forEach(uid => {
    database.ref('users/' + uid + '/token').once('value', (snapshot) => { 
        getUser(snapshot.val())
        .then((obj) => obj.items.forEach((track) => playlists.push([track.name, track.id])))
        .then(console.log(playlists));             
        });
    });*/



/* for (let i = 0; i < arrayuid.length; i++) {
        let token = (await getUserToken(arrayuid[i])).val(); // hämtar ut token
        let userPlaylist = (await getUserTopPlaylist(token)).items; // hämtar ut top 50 låtar från användaren

        userPlaylist = userPlaylist.map((track) => [track.name, track.id]); // gör en ny array med bara namn och id
        combinedPlaylist.push(userPlaylist); // lägger till i den stora playlisten med alla användares låtar
    }
*/