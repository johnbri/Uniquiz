import {database} from '../services/firebase.js';
import {getUserPlaylists} from './spotify.js';
import QuizAnswersView from './view/quizAnswersView.js';
import React, { useState, useEffect} from "react";
import {roomModel} from '../index.js';
import {userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import { useHistory } from "react-router-dom";

function QuizAnswers (props) {
    let history = useHistory();
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const correctAnswer = useModelProp(roomModel, "playedSongs");
    //const arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2"];
    //quizPlaylist(arrayuid);

    return React.createElement(QuizAnswersView, {
        correctAnswer: correctAnswer[0].name,
        score: score,
        displayName: displayName,
        onPlay: () => {
            history.push('/quizPlaying'); // Måste fixas, props går inte att nå så gjorde en ful lösning
        }
        });
}

export default QuizAnswers;
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
