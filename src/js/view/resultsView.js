import { roomModel } from '../..';
import '../../css/Results.css';

const ResultsView = ({players, roomName, onExit}) =>

    /** Page that displays the results after a quiz */
    <div className="results">
        <h1 className="winnertext">Winner</h1>
        <h1 className="winnername">
            {players[Object.keys(players).sort((a,b) => compareScores(players[a],players[b]))[0]].displayName}
            {players[Object.keys(players).sort((a,b) => compareScores(players[a],players[b]))[0]].img}
        </h1>
    
        <div className="resultsContainer">
            <h3>Results</h3>
            <table className="resultsTable">
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(players).sort((a,b) => compareScores(players[a],players[b])).map(uid => 
                    <tr key={uid}>
                        <td>{players[uid].displayName}</td>
                        <td>{players[uid].score}</td>
                    </tr>
                )} 
                </tbody>
                <thead>
                    <tr>
                        <th className="trackheader">Track</th>
                        
                    </tr>
                </thead>
                <tbody className="tracks">
                {console.log(roomModel.playlist)}
                {roomModel.playlist.map(track=>
                    <tr key={track.uid}>
                        <td>{track.name} - {track.artists.map((artist, index, array) =>
                            artist === array[array.length - 1] ? artist : (artist + ", ")
                         )}</td>
                    </tr>
                )
                } 
                </tbody>   

            </table>
        </div>
        <button onClick={() => onExit()}>Exit room</button>
        
    </div>

export default ResultsView;

//Ska den här funktionen vara här???? Har för mig att de nämnde något i tutorialen att man kanske vill ha en sortering metod 
//i viewn eftersom det bara handlar on hur man presternar data. Men den skulle passa bättre in modellen eftersom den används på flera ställen
function compareScores(a,b){
    /** Compares the score of the players */
    if(a.score > b.score) {
        return -1;  
    } else if (a.score < b.score) {
        return 1;
    } else {
        return 0;
    }
}
