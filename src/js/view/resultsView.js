import '../../css/Results.css';
import React, {ScriptTag} from 'react';

const ResultsView = ({players, roomName, onExit}) =>
    /** Page that displays the results after a quiz */
    <div className="results">
        <h1 className="winnertext">Winner </h1>
        <h1 className="winnername">
            {(players[Object.keys(players).sort((a,b) =>
                    compareScores(players[a],players[b])[0])].displayName)}
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
                        {console.log(players[uid].score)}
                        <td>{players[uid].displayName}</td>
                        <td>{players[uid].score}</td>
                    </tr>
                )} 
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
