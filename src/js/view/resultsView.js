import { roomModel } from '../..';
import '../../css/Results.css';

const ResultsView = ({players, roomName, onExit}) =>
    /** Page that displays the results after a quiz */
    <div className="wrapper">
        <div className="exitContainer">
            <button onClick={() => onExit()}>Exit room</button>
        </div>
        <div className="results">
            <h1 className="winnertext">Winner</h1>
            <h1 className="winnername">
                {players[Object.keys(players).sort((a,b) => compareScores(players[a],players[b]))[0]].displayName}
                {players[Object.keys(players).sort((a,b) => compareScores(players[a],players[b]))[0]].img}
            </h1>
            <div className="resultsContainer">
                <h2>Results</h2>
                <table className="resultsTable">
                    <thead>
                        <tr key="plyerscore">
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
                </table>
            </div>
            <div className="resultsContainer">
                <h2>Tracks</h2>
                <table>
                    <tbody className="tracks">
                    {roomModel.playlist.map((track, index)=>
                        <tr key={index}>
                            <td>{track.name} - {track.artists.map((artist, index, array) =>
                                artist === array[array.length - 1] ? artist : (artist + ", ")
                            )}</td>
                        </tr>
                    )
                    } 
                    </tbody> 
                </table>
            </div>
        </div>
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
