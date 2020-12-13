import '../../css/playerSidebar.css';

const PlayersSidebarView= ({players, inRoom}) =>
    /** Displays all the players connected to the room */
    <div className="playersSidebar">
        {Object.keys(players).map(playerUid => 
            <div>
                {players[playerUid].answer !== "" && <img className="light" src={window.location.origin + '/lightbulb.svg'} alt ="Loading gif" />}
                <div className="posistionbox">
                    <h1>1</h1>
                    <div classsName="playerCard" key={playerUid}>
                        <div className="userImage">
                        {players[playerUid].profileImg === 'defaultProfilePic.jpg' ?
                            <img src={window.location.origin + '/' + players[playerUid].profileImg} alt ="playerImg" />
                            : <img src={players[playerUid].profileImg} alt ="playerImg" />}
                        </div>
                        <div className="userInfo">
                            <h2>{players[playerUid].displayName}</h2>
                            {!inRoom && <h3>{players[playerUid].score} points</h3>}
                        </div>
                    </div>
                </div>
            </div>
            
        )}
    </div>;
export default PlayersSidebarView;

