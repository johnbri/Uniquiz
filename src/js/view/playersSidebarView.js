import '../../css/quiz.css';

const PlayersSidebarView= ({players, inRoom, onResults}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map(playerUid => 
            <div className="playerCard" key={playerUid}>
                <div className="userImg">
                    <img src={players[playerUid].profileImg} alt="playerImg"/>
                </div>
                <h2>{players[playerUid].displayName}</h2>
                {!inRoom && <h3>Score: {players[playerUid].score}</h3>}
            </div>
        )}
        <button onClick={() => onResults()}>results</button>
    </div>;
export default PlayersSidebarView;

