import '../../css/playerSidebar.css';

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
            </div>
            
        )}
    </div>;
export default PlayersSidebarView;

