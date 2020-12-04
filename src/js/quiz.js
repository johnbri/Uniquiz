import {database} from '../services/firebase.js';
import {getUserPlaylists} from './spotify.js';
import QuizView from './view/quizView.js';
import React, { useState, useEffect} from "react";
import usePromise from './usePromise.js';
import PromiseNoData from './view/promiseNoData.js';


function PlaylistPresenter () {
    const arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2"];
    //const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [promise, setPromise] = useState(null);

    useEffect(() =>  {
        setPromise(quizPlaylist(arrayuid))
    }, []);
    
    const [data, error] = usePromise(promise);
    //console.log(data);

    return PromiseNoData(promise, data, error) // cases 0, 1, 3
    || React.createElement(QuizView, {
        //timeLeft: timeLeft,
        onPlay: () => new Audio(data[0].url).play()
        });
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
    //console.log(combinedPlaylist);
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

    //console.log(combinedPlaylistUnique);
    const combinedPlaylistUniqueDict = listWithObj(combinedPlaylistUnique);
    return combinedPlaylistUniqueDict;
}
async function getUserToken (uid) {
    return database.ref('users/' + uid + '/token').once('value', (snapshot) => { 
        //console.log("Successfully received token");
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

const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;

}







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
