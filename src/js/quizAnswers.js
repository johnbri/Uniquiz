import QuizAnswersView from './view/quizAnswersView.js';
import React, { useState, useEffect} from "react";
import {roomModel} from '../index.js';
import {userModel} from '../index.js';
import useModelProp from './useModelProp.js';
import {setCurrentSongIndexFB} from '../services/firebase.js';

function QuizAnswers (props) {
    const displayName = useModelProp(userModel, "displayName");
    const score = useModelProp(roomModel, "score");
    const correctAnswer = useModelProp(roomModel, "playedSongs");
    const creator = useModelProp(roomModel, "creator");
    const [nextSong, setNextSong] = useState(null);
    const currentSongIndex = useModelProp(roomModel, "currentSongIndex");
    useEffect(function(){ 
        console.log("nextSong", nextSong);
        console.log("currentsongindex", currentSongIndex);
        setNextSong(currentSongIndex);
        console.log("testa next song", nextSong != null && "hej");
        nextSong != null && props.history.push('/quizPlaying');   
    }, [currentSongIndex]); 
    //const arrayuid = ["7Bj00PUe4bPpJbp4L2vf5bRDbtI2"];
    //quizPlaylist(arrayuid);

    return React.createElement(QuizAnswersView, {
            correctAnswer: correctAnswer[0].name,
            score: score,
            displayName: displayName,
            onPlay: () => {
                setCurrentSongIndexFB();
            },
            creator: creator
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
