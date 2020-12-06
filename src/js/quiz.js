import {database} from '../services/firebase.js';
import {getUserPlaylists} from './spotify.js';
import QuizView from './view/quizView.js';
import React, { useState, useEffect} from "react";
import {roomModel} from '../index.js';


function PlaylistPresenter (props) {
    const arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2"];
    quizPlaylist(arrayuid);

    return React.createElement(QuizView, {
            onPlay: () => {
                props.history.push('/quizPlaying')
            }
        });
}


async function quizPlaylist (arrayuid) {
    let combinedPlaylist = [];

    for (let i = 0; i < arrayuid.length; i++) {
        let token = (await getUserToken(arrayuid[i])).val(); // hämtar ut token
        let userPlaylist = await getUserPlaylists(token);
        combinedPlaylist.push(userPlaylist); // lägger till i den stora playlisten med alla användares låtar
    }
    combinedPlaylist = combinedPlaylist.flat();
    let combinedPlaylistUnique = combinedPlaylist.reduce((acc, currentTrack) => {
        if (combinedPlaylist.filter(track => track[1] === currentTrack[1]).length === arrayuid.length) { // använder filter för att se om det finns mer än ett track
            combinedPlaylist = combinedPlaylist.filter(track => track[1] !== currentTrack[1]); // om det finns så tar vi bort den från original listan, detta för att unika låtar kan läggas till två gånger annars
            return ([...acc, currentTrack]); // och lägger till den till accumulatorn
        }
        else {
            return acc; // annars gör vi ingenting och returnerar accumulatorn
        }
    }, []);

    const combinedPlaylistUniqueDict = listWithObj(combinedPlaylistUnique);
    roomModel.setPlaylist(combinedPlaylistUniqueDict.slice(0, 10));
    console.log("Added playlist to roommodel");
    return combinedPlaylistUniqueDict;
    //roomModel.setPlaylist(combinedPlaylistUniqueDict);
}
async function getUserToken (uid) {
    return database.ref('users/' + uid + '/token').once('value', (snapshot) => { 
        console.log("Successfully received token")
    });
}

function listWithObj (list) {
    let newList = [];
    for (let i = 0; i < list.length; i++) {
        newList[i] = {name: list[i][0], url: list[i][2]};
    }
    return newList;
}

export default PlaylistPresenter;







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

/*useEffect(() => {
    const timer = setTimeout(() => {
    setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
});*/
