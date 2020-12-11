const ResultsView = ({players, roomName, onExit}) =>
    /** Page that displays the results after a quiz */
    <div>
        <button onClick={() => onExit()}>Exit room</button>
        <h1>{roomName}</h1>
        <h2>Results</h2>
        <table>
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