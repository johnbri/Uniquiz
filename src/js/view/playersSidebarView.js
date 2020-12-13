import '../../css/quiz.css';

const PlayersSidebarView= ({players, inRoom}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map(playerUid => 
            <div className="playerCard" key={playerUid}>
                <div className="userImg">
                {players[playerUid].profileImg === 'defaultProfilePic.jpg' ?
                    <img src={window.location.origin + '/' + players[playerUid].profileImg} alt ="playerImg" />
                    : <img src={players[playerUid].profileImg} alt ="playerImg" />}
                </div>
                <h2>{players[playerUid].displayName}</h2>
                {!inRoom && <h3>Score: {players[playerUid].score}</h3>}
            </div>
        )}
    </div>;
export default PlayersSidebarView;

